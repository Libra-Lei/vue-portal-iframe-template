/*
 * @Description: 飞线
 * @Author: 幺五六
 * @Date: 2020-08-19 13:25:38
 * @LastEditors: 幺五六
 * @LastEditTime: 2020-08-24 09:55:35
 */


import * as THREE from 'three';

const vs = `
  uniform float time;
  uniform float size;
  varying vec3 iPosition;
  void main(){
      iPosition = vec3(position);
      float pointsize = 1.;
      if(position.x > time && position.x < (time + size)){
          pointsize = (position.x - time) / size;
      }
      gl_PointSize = pointsize * 3.0;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const fs = `
  uniform float time;
  uniform float size;
  uniform vec3 colorf;
  uniform vec3 colort;
  varying vec3 iPosition;
  void main( void ) {
    float end = time + size;
    vec4 color;
    if(iPosition.x > end || iPosition.x < time){
      discard;
      //color = vec4(0.213,0.424,0.634,0.3);
    }else if(iPosition.x > time && iPosition.x < end){
      float step = fract((iPosition.x - time)/size);
      float dr = abs(colort.x - colorf.x);
      float dg = abs(colort.y - colorf.y);
      float db = abs(colort.z - colorf.z);
      float r = colort.x > colorf.x?(dr*step+colorf.x):(colorf.x -dr*step);
      float g = colort.y > colorf.y?(dg*step+colorf.y):(colorf.y -dg*step);
      float b = colort.z > colorf.z?(db*step+colorf.z):(colorf.z -db*step);
      color = vec4(r,g,b,1.0);
    }
    float d = distance(gl_PointCoord, vec2(0.5, 0.5));
    if(abs(iPosition.x - end) < 0.2 || abs(iPosition.x - time) < 0.2){
      if(d > 0.5){
        discard;
      }
    }
    gl_FragColor = color;
  }
`;

export default class FlyPointsLine {
  constructor() {
    this._lineGroup = new THREE.Group;
  }
  
  getLineGroup() {
    return this._lineGroup;
  }
  
  /**
   * 添加飞线
   * @param {object} start 飞线起始坐标 {x, y, z}
   * @param {object} end 飞线终点坐标 {x, y, z}
   * @param {object} colorFrom 颜色 {r, g, b}
   * @param {object} colorTo 颜色 {r, g, b}
   */
  addLine(start, end, heightLimit, colorFrom, colorTo) {
    colorFrom = colorFrom || { r: 0.0, g: 0.0, b: 0.0 };
    colorTo = colorTo || { r: 1.0, g: 1.0, b: 1.0 };

    const middleCurveX = (start.x + end.x) / 2;
    const middleCurveY = start.y + heightLimit;
    const middleCurveZ = (start.z + start.z) / 2;
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(start.x, start.y, start.z), // 起点
      new THREE.Vector3(middleCurveX, middleCurveY, middleCurveZ), // 第一个控制点
      new THREE.Vector3(middleCurveX, middleCurveY + heightLimit, middleCurveZ), // 第二个控制点
      new THREE.Vector3(end.x, end.y, end.z) // 终点
    );

    // 构建几何体 --> 三维三次贝塞尔曲线
    const num = Math.ceil(Math.sqrt(Math.pow((end.x - start.x), 2) + Math.pow((end.z - start.z), 2)));
    console.log('num: ', num);
    const points = curve.getPoints(Math.pow(num, 2));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    // 构建 shader 材质
    const material = this._createMaterial();
    // 创建 点
    const flyline = new THREE.Points(geometry, material);

    flyline.material.uniforms.time.value = 0; // start.x;
    flyline.material.uniforms.colorf = {
      type:'v3',
      value:new THREE.Vector3(colorFrom.r, colorFrom.g, colorFrom.b)
    };
    flyline.material.uniforms.colort = {
      type:'v3',
      value:new THREE.Vector3(colorTo.r, colorTo.g, colorTo.b)            
    };
    flyline.minx = 0; // start.x;
    flyline.maxx = num; // end.x;
    flyline.step = num / (50 * (num / 39));
    flyline.direction = (end.x - start.x) > 0 ? 1 : 0;
    this._lineGroup.add(flyline);
  }

  /**
   * 批量添加 飞线
   * @param {array} positions [{ start: {x, y, z}, end: {x, y, z} }]
   * @param {object} colorFrom 颜色 {r, g, b}
   * @param {object} colorTo 颜色 {r, g, b}
   */
  addLineBatch(positions, colorFrom, colorTo) {
    if (!positions || !positions.length) return;
    positions.forEach(position => {
      this.addLine(position.start, position.end, colorFrom, colorTo);
    });
  }

  /**
   * 构建 shaderMaterial
   */
  _createMaterial() {
    const vertShader = vs; //获取顶点着色器的代码
    const fragShader = fs; //获取片元着色器的代码
    //配置着色器里面的attribute变量的值
    const attributes = {};
    //配置着色器里面的uniform变量的值
    const uniforms = {
      time: {type: 'f', value: -70.0},
      size: {type:'f', value:25.0}
    };
    const meshMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      defaultAttributeValues : attributes,
      vertexShader: vertShader,
      fragmentShader: fragShader,
      transparent: true
    });
    return meshMaterial;
  }
}