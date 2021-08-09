/*
 * @Description: 3D 地图加载器 -- 基于threejs
 * @Author: 幺五六
 * @Date: 2020-07-27 09:38:29
 * @LastEditors: 幺五六
 * @LastEditTime: 2021-08-04 09:00:06
 */ 
import * as THREE from 'three';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

import * as d3geo from 'd3-geo'
const TWEEN = require('@tweenjs/tween.js/dist/tween.cjs')

import {
  // loadOBJ,
  // loadFBX,
  loadGLTF
} from './modelLoader'

import FlyLine2 from './fly-line2'
import FlyPointsLine from './fly-point-line'

let __mapThis = null;

export class Map3D {
  constructor(elementTo, tipCallback, clickCallback) {
    // 物体点击回调
    this._clickCallback = clickCallback;
    // 提示框元素
    this._tipCallback = tipCallback;

    this.canvas = elementTo;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    // this.control = null;
    this._composer = null; // 后期处理
    this._map = null; // 地图
    this._stars = null; // 星空
    this._outlinePass = null; // 发光线
    this._outlinePassBox = null; // 发光线 --> 用于柱子

    this._landmarkGroup = new THREE.Object3D(); // 地标（风机等）组，用于鼠标点击事件

    this._raycaster = null; // 光线投射
    this._mouse = null;
    this._activeInstersect = []; // 鼠标当前所在的 风机模型
    this._eventOffset = { x: 0, y: 0 }; // 鼠标在屏幕上的位置
    
    this._flyLinegroup = { children: [] }; // shader 飞线

    this._animationMixerGroup = []; // 动画混合器
    this._clock = new THREE.Clock();
  }
  
  /**
   * 初始化环境
   */
  init() {
    // 渲染器
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      autoClear: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // 定义渲染器的输出编码。默认为THREE.LinearEncoding
    // this.renderer.outputEncoding = THREE.sRGBEncoding;
    
    // 建一个空对象存放对象
    this._map = new THREE.Object3D()
    // 创建场景
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color('#070C1F');
    const sceneTexture = new THREE.TextureLoader().load('/3d/textures/sky.jpg');
    this.scene.background = sceneTexture;

    // 设置相机
    this._setCamera();
    // 设置灯光
    this._setLight();

    // 初始化 3D 场景 --> 背景等
    this._initBaseScene();

    // 监听窗口变化
    window.addEventListener('resize', this._onWindowResize.bind(this), false);
    
    // 光线投射 --> 用于鼠标拾取， 鼠标经过的物体，绑定点击事件
    this._raycaster = new THREE.Raycaster();
    this._mouse = new THREE.Vector2();

    __mapThis = this;
    window.addEventListener('click', onMouseClick, false);
    window.addEventListener('mousemove', onMouseMove, false);
    
    // 后期处理
    this._buildUnrealBloom();
  }

  /**
   * 渲染
   */
  render() {
    if (!this.renderer.autoClear) this.renderer.clear();
    // 星光的旋转
    this._stars.rotation.y += 0.001;
    // this.control.update();
    TWEEN.update();

    // 飞线动画
    if(this._flyLinegroup.children.length){
      for(let i = 0; i < this._flyLinegroup.children.length; i++){
        let flyline = this._flyLinegroup.children[i];
        if(flyline && flyline.material.uniforms){
          let time = flyline.material.uniforms.time.value;
          let size = flyline.material.uniforms.size.value;
          if (flyline.direction) {
            if(time > flyline.maxx){
              flyline.material.uniforms.time.value = flyline.minx - size;
            }
            flyline.material.uniforms.time.value += flyline.step;
          } else {
            if(time < (flyline.minx - size)){
              flyline.material.uniforms.time.value = flyline.maxx + size;
            }
            flyline.material.uniforms.time.value -= flyline.step;
          }
        }
      }
    }

    this.renderer.render(this.scene, this.camera);
    this._composer.render();

    // 动画
    if (this._animationMixerGroup) {
      const time = this._clock.getDelta();
      this._animationMixerGroup.forEach(mixer => {
        mixer.update(time);
      })
    }
  }

  /**
   * 渲染地图 GeoJson
   */
  initMap(geoJson) {
    // d3-geo转化坐标
    const projection = d3geo.geoMercator().center([104.0, 37.5]).scale(85).translate([10, 3]);
     // 遍历省份构建模型
    geoJson.features.forEach(elem => {
      // 新建一个省份容器：用来存放省份对应的模型和轮廓线
      const province = new THREE.Object3D();
      const coordinates = elem.geometry.coordinates;
      // 有的地区可能是多个区域闭环
      coordinates.forEach(multiPolygon => {
        multiPolygon.forEach(polygon => {
          // 这里的坐标要做2次使用：1次用来构建模型，1次用来构建轮廓线
          const shape = new THREE.Shape();
          const lineMaterial = new THREE.LineBasicMaterial({ color: 'rgb(115,103,240)' });
          const linGeometry = new THREE.Geometry();
          for (let i = 0; i < polygon.length; i++) {
            const [x, y] = projection(polygon[i]);
            if (i === 0) {
              shape.moveTo(x, -y);
            }
            shape.lineTo(x, -y);
            linGeometry.vertices.push(new THREE.Vector3(x, -y, 4.01));
          }
          const extrudeSettings = {
            depth: 4,
            bevelEnabled: false
          };
          const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

          const materialArr = [];
          materialArr.push(new THREE.MeshBasicMaterial({ color: '#00183a', transparent: true, opacity: 0.95 }));
          materialArr.push(new THREE.MeshBasicMaterial({ color: '#00183a', transparent: true, opacity: 0.95 }));
          
          const mesh = new THREE.Mesh(geometry, materialArr);
          mesh.name = `MY-${elem.properties.name}`;
          const line = new THREE.Line(linGeometry, lineMaterial);
          province.add(mesh);
          province.add(line);
        })
      })
      // 将geojson的properties放到模型中，后面会用到
      province.properties = elem.properties;
      province.name = elem.properties.name;
      if (elem.properties.centroid) {
        const [x, y] = projection(elem.properties.centroid);
        province.properties._centroid = [x, y];
      }
      this._map.add(province);
    })

    this._map.rotation.x = -Math.PI / 2;
    this.scene.add(this._map);
    // 边缘加发光特效
    this._outlinePass.selectedObjects = [this._map];
  }

  /**
   * 更新模型信息
   * @param {array} positions [{ id: 1, location: [113, 50] }] 位置信息
   */
  updateModel(positions) {
    // d3-geo转化坐标
    const projection = d3geo.geoMercator().center([104.0, 37.5]).scale(85).translate([10, 3]);
    const points = positions.map(item => {
      const [x, y] = projection(item.location);
      return {
        id: item.id,
        location: { x: x, y: 4.01, z: y }
      }
    });
    this._addTurbineModel(points);
  }

  /**
   * shader 飞线
   */
  initShaderFlyLine() {
    const targets = ['山西省', '湖北省', '新疆维吾尔自治区', '辽宁省', '甘肃省'];
    const flyStart = this._map.children.find(x => x.properties.name === '北京市').properties._centroid;
    const flyEnd = this._map.children.filter(x => targets.findIndex(y => y === x.properties.name) > -1).map(x => x.properties._centroid);
    const startPoint = { x: flyStart[0], y: 4.01, z: flyStart[1] };
    // 存储飞线坐标点，用于添加地理标识
    const points = [], flyPositions = [];
    points.push(startPoint);
    flyEnd.forEach(item => {
      const endPoint = { x: item[0], y: 4.01, z: item[1] };
      points.push(endPoint);
      flyPositions.push({ start: startPoint, end: endPoint });
    })

    // shader 飞线
    const fly = new FlyPointsLine();
    // fly.addLineBatch(flyPositions, 7, { r: 0.663, g: 0.98, b: 0.6 }, { r: 0.208, g: 0.623, b: 0.697});
    fly.addLineBatch(flyPositions, 7, { r: 0.663, g: 0.98, b: 0.6 }, { r: 0.6, g: 0.187, b: 0.223 });
    // fly.addLine(flyPositions[4].start, flyPositions[4].end, { r: 0.663, g: 0.98, b: 0.6 }, { r: 0.208, g: 0.623, b: 0.697})
    this._flyLinegroup = fly.getLineGroup();
    
    // 基础 Line2 飞线
    const flyLine2 = new FlyLine2(TWEEN);
    flyLine2.addLineBatch(flyPositions, 7, 2000, { color: 'rgb(255,255,255)', linewidth: 1 });
    const flyLine2Group = flyLine2.getLineGroup();

    this.scene.add(flyLine2Group);
    this.scene.add(this._flyLinegroup);
    
    // 添加风机模型
    this._addTurbineModel(points);
  }

  /**
   * 添加风机模型
   * @param {array} points [{x, y, z}]
   */
  _addTurbineModel(points) {
    this._animationMixerGroup = [];
    points.forEach(async point => {
      // 这里多次加载模型，是因为如果只加载一次模型后 clone 使用，那么 材质是无法被 克隆的。
      // const obj = await loadFBX('/3d/site.fbx');
      // obj.scale.set(0.003,0.003,0.003);
      
      // 铁塔模型
      // const obj = await loadOBJ('/3d/tower.obj');
      // obj.scale.set(0.01,0.01,0.01);

      // 能源组模型
      const gltf = await loadGLTF('/3d/power-group.gltf');
      // 动画
      const animationMixer = new THREE.AnimationMixer(gltf.scene);
      const clips = gltf.animations;
      clips.forEach(clip => {
        const action = animationMixer.clipAction(clip);
        action.play();
      });
      this._animationMixerGroup.push(animationMixer);
      // 物体
      const obj = gltf.scene;
      obj.scale.set(0.004,0.004,0.004);
      obj.traverse(function (child) {
        if (child.isMesh) {
          child.material.metalness = 0;
          // 用于标识风机
          child.userData.id = point.id;
          // child.material.alphaTest = 0.8;
          // child.material.depthWrite = false;
          // child.material.emissive = child.material.color;
          // child.material.emissiveMap = child.material.map;
        }
      });

      obj.position.set(point.location.x, point.location.y, point.location.z);
      obj.name = point.id;
      // 将风机加入地标 组
      this._landmarkGroup.add(obj);
    })
    this.scene.add(this._landmarkGroup);
    const objects = this._outlinePassBox.selectedObjects;
    objects.push(this._landmarkGroup);
    this._outlinePassBox.selectedObjects = objects;
  }

  /**
   * 创建 整个 3D 场景的基础环境效果
   */
  _initBaseScene() {
    // 构建网格和坐标
    this._buildAuxSystem();
    // 构建星光
    this._buildStarForge();
    // 加载地球背景
    // loadOBJ('/3d/earth.obj', '/3d/textures/earth-night.png').then(obj => {
    //   // 放单模型
    //   obj.scale.set(15, 15, 15);
    //   // 设置显示位置坐标
    //   obj.position.set(0, -40, -40);
    //   // 将 模型 加入场景
    //   this.scene.add(obj);
    //   const objects = this._outlinePassBox.selectedObjects;
    //   objects.push(obj);
    //   this._outlinePassBox.selectedObjects = objects;
    // });
  }

  /**
   * 构建光柱
   * @param {object} point 三维坐标
   */
  _buildLightBox(point) {
    const height = 10;
    const geometry = new THREE.BoxBufferGeometry(1, height, 1);
    const texture = new THREE.TextureLoader().load('/3d/textures/tri_pattern.jpg');
    const material = new THREE.MeshBasicMaterial({ color: 'rgb(255, 255, 255)', transparent: true, opacity: 0.6, map: texture });
    const box = new THREE.Mesh(geometry, material);
    box.position.set(point.x, height / 2 + point.y, point.z);
    return box;
  }

  /**
   * 构建后期 光晕效果
   */
  _buildUnrealBloom() {
    // 地图
    const outlineParams = {
      pulsePeriod: 7, // 发光闪烁的频率
      edgeThickness: 1, // 边缘浓度
      edgeGlow: 2, // 发光强度
      edgeStrength: 1.5, // 发光的扩散强度
      // visibleEdgeColor: new THREE.Color("rgb(115,103,240)"),
      // hiddenEdgeColor: new THREE.Color("rgb(115,103,240)")
      visibleEdgeColor: new THREE.Color('rgb(250, 245, 216)'),
      hiddenEdgeColor: new THREE.Color('rgb(250, 245, 216)')
    };

    // 风机
    // const outlineBoxParams = {
    //   pulsePeriod: 8, // 发光闪烁的频率
    //   edgeThickness: 2, // 边缘浓度
    //   edgeGlow: 1, // 发光强度
    //   edgeStrength: 1, // 发光的扩散强度
    // };

    this._composer = new EffectComposer(this.renderer);

    const renderPass = new RenderPass(this.scene, this.camera);
    this._composer.addPass(renderPass);

    this._outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), this.scene, this.camera);
    this._outlinePass.edgeGlow = outlineParams.edgeGlow;
    this._outlinePass.edgeStrength = outlineParams.edgeStrength;
    this._outlinePass.visibleEdgeColor = outlineParams.visibleEdgeColor;
    this._outlinePass.hiddenEdgeColor = outlineParams.hiddenEdgeColor;
    this._outlinePass.edgeThickness = outlineParams.edgeThickness;
    this._outlinePass.pulsePeriod = outlineParams.pulsePeriod;

    
    this._outlinePassBox = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), this.scene, this.camera);
    // this._outlinePassBox.edgeGlow = outlineBoxParams.edgeGlow;
    // this._outlinePassBox.edgeStrength = outlineBoxParams.edgeStrength;
    // this._outlinePassBox.edgeThickness = outlineBoxParams.edgeThickness;
    // this._outlinePassBox.pulsePeriod = outlineBoxParams.pulsePeriod;
    
    
    this._composer.addPass(this._outlinePass);
    // this._composer.addPass(this._outlinePassBox);
    const effectFXAA = new ShaderPass(FXAAShader);
    effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
    this._composer.addPass(effectFXAA);
  }

  /**
   * 构建粒子系统 --> 模拟星空
   */
  _buildStarForge() {
    const geometry = new THREE.SphereGeometry(1000, 100, 50);
    const starStuff = new THREE.PointsMaterial({
      // color: 0xffffff,
      // 映射到材质上的贴图
      map: new THREE.TextureLoader().load('/3d/textures/dot.png'),
      // alphaMap: new THREE.TextureLoader().load('/3d/textures/dot.png'),
      size: 1,
      opacity: 0.9,
      // 粒子的大小是否和其与摄像机的距离有关，默认值 true
      sizeAttenuation: true,
    });
    starStuff.alphaTest = 0.1;

    const starQty = 100000;
    for (let i = 0; i < starQty; i++) {
      const starVertex = new THREE.Vector3();
      starVertex.x = Math.random() * 2000 - 1000;
      starVertex.y = Math.random() * 2000 - 1000;
      starVertex.z = Math.random() * 2000 - 1000;
      geometry.vertices.push(starVertex);
    }
    this._stars = new THREE.Points(geometry, starStuff);
    this.scene.add(this._stars);
  }

  /**
   * 构建网格和坐标和控制系统
   */
  _buildAuxSystem() {
    // 三维坐标轴
    // let axisHelper = new THREE.AxesHelper(100);
    // this.scene.add(axisHelper);
    // 网格
    // const circle = new THREE.PolarGridHelper(1000, 1, 50, 64, 'rgb(80, 89, 136)', 'rgb(80, 89, 136)');
    // let grid = new THREE.GridHelper(1000, 100, 'rgb(50, 58, 93)', 'rgb(50, 58, 93)');
    // this.scene.add(circle);
    // this.scene.add(grid);
    let controls = new OrbitControls(this.camera, this.renderer.domElement.parentNode);
    controls.enableDamping = true;
    controls.dampingFactor = 0.3;
    controls.rotateSpeed = 0.35;
    controls.autoRotate = false;
    controls.maxPolarAngle = Math.PI * 0.45;
    controls.minPolarAngle = -Math.PI / 2;
    controls.maxAzimuthAngle = Math.PI * 0.3;
    controls.minAzimuthAngle = -Math.PI * 0.3;
  }

  /**
   * 设置相机
   */
  _setCamera() {
    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.set(0, 70, 90);
    this.camera.lookAt(0, 0, 0);
  }

  /**
   * 设置灯光系统
   */
  _setLight() {
    let directionalLight = new THREE.DirectionalLight(new THREE.Color('rgb(255, 255, 255)'), 1.3);
    directionalLight.position.set(300, 1000, 500);
    directionalLight.target.position.set(0, 0, 0);
    directionalLight.castShadow = true;

    const fov = 45 //拍摄距离  视野角值越大，场景中的物体越小
    const near = 1 //相机离视体积最近的距离
    const far = 1000//相机离视体积最远的距离
    const aspect = window.innerWidth / window.innerHeight; //纵横比
    directionalLight.shadow.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    directionalLight.shadow.bias = 0.0001;
    directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024;
    this.scene.add(directionalLight)

    // const sphere = new THREE.SphereBufferGeometry( 0.5, 16, 8 );
    // const light = new THREE.PointLight(0xff0040, 2, 0);
    // light.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff0040 })));
    // light.position.set(0, 20, 0);
    // this.scene.add(light);

    let light = new THREE.AmbientLight(0xcccccc, 0.4)
    this.scene.add(light);
  }

  _onWindowResize () {
    if (!this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this._composer.setSize(window.innerWidth, window.innerHeight);
  }
}

/**
 * 鼠标点击选中物体
 * @param {*} event 
 */
function onMouseClick(event) {
  event.preventDefault();
  // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
  __mapThis._mouse.x = ((event.clientX - 30) / window.innerWidth) * 2 - 1;
  __mapThis._mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  // 通过摄像机和鼠标位置更新射线
  __mapThis._raycaster.setFromCamera(__mapThis._mouse, __mapThis.camera);
  // 计算物体和射线的焦点
  const intersects = __mapThis._raycaster.intersectObject(__mapThis._landmarkGroup, true);
  
  const self = event.composedPath().findIndex(x => x.id === 'map-action-tip');
  if (self > -1) {
    if (__mapThis._clickCallback) {
      __mapThis._clickCallback(true, true);
    }
  } else if (intersects.length) {
    if (__mapThis._clickCallback) {
      __mapThis._clickCallback(
        true,
        false,
        // intersects[0].object.parent.name,
        intersects[0].object.userData.id,
        { x: `${event.clientX - 237 - 100}px`, y: `${event.clientY - 250}px` }
      );
    }
  } else {
    if (__mapThis._clickCallback) {
      __mapThis._clickCallback(false, false);
    }
  }
}

/**
 * 鼠标 划过物体，突出显示
 * @param {*} event 
 */
function onMouseMove(event) {
  event.preventDefault();
  // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
  __mapThis._mouse.x = ((event.clientX - 30) / window.innerWidth) * 2 - 1;
  __mapThis._mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  __mapThis._eventOffset.x = event.clientX;
  __mapThis._eventOffset.y = event.clientY;

  // 通过摄像机和鼠标位置更新射线
  __mapThis._raycaster.setFromCamera(__mapThis._mouse, __mapThis.camera);
  // 计算物体和射线的焦点
  const intersects = __mapThis._raycaster.intersectObject(__mapThis._landmarkGroup, true);
  
  // =====================鼠标激活颜色设置================================
  // // 先恢复之前的
  // __mapThis._activeInstersect.forEach(item => {
  //   resetColor(item.object.material);
  // })

  // if (intersects.length) {
  //   __mapThis._activeInstersect.push(intersects[0]);
  //   setColor(intersects[0].object.material);
  // } else {
  //   __mapThis._activeInstersect.forEach(item => {
  //     resetColor(item.object.material);
  //   })
  //   __mapThis._activeInstersect = [];
  // }
  // =====================================================

  createTip(intersects);
}

/**
 * 显示提示框
 * @param {array} intersects 
 */
const createTip = (intersects) => {
  // console.log('intersects: ', intersects);
  // const self = event.composedPath().findIndex(x => x.id === 'map-tip');
  if (intersects.length) {
    if (__mapThis._tipCallback) {
      __mapThis._tipCallback(
        true,
        // intersects[0].object.parent.name,
        intersects[0].object.userData.id,
        { x: `${__mapThis._eventOffset.x - 70}px`, y: `${__mapThis._eventOffset.y - 30}px` }
      );
    }
  } else {
    if (__mapThis._tipCallback) __mapThis._tipCallback(false);
  }
}

// /**
//  * 重置 激活颜色
//  * @param {array} material 
//  */
// const resetColor = (material) => {
//   const index = material.findIndex(x => x.name === 'Red');
//   material[index].color.set('#e0ceb8');
//   const index1 = material.findIndex(x => x.name === 'Window_Frames');
//   material[index1].color.set('#745548');
//   const index2 = material.findIndex(x => x.name === 'Grey');
//   material[index2].color.set('#9d9386');
// }

// /**
//  * 设置 激活颜色
//  * @param {array} material 
//  */
// const setColor = (material) => {
//   const index = material.findIndex(x => x.name === 'Red');
//   material[index].color.set(new THREE.Color('rgb(255, 255, 255)'));
//   const index1 = material.findIndex(x => x.name === 'Window_Frames');
//   material[index1].color.set(new THREE.Color('rgb(201, 203, 208)'));
//   const index2 = material.findIndex(x => x.name === 'Grey');
//   material[index2].color.set(new THREE.Color('rgb(110, 112, 115)'));
// }

/**
 * 销毁 window 上的监听事件
 */
export function destoryListener() {
  window.removeEventListener('click', onMouseClick, false);
  window.removeEventListener('mousemove', onMouseMove, false);
}