/*
 * @Description: 各种类型 模型文件加载工具
 * @Author: 幺五六
 * @Date: 2020-07-27 13:55:23
 * @LastEditors: 幺五六
 * @LastEditTime: 2021-08-03 13:49:28
 */ 

import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';


/**
 * MTL + obj 格式 模型文件加载 (异步)
 * @param {string} mtlPath ntl 模型文件路径
 * @param {string} objPath obj 模型文件路径
 * @return promise
 */
export function loadMTL(mtlPath, objPath) {
  const manager = new THREE.LoadingManager();
  return new Promise((resolve, reject) => {
    new MTLLoader(manager)
      .load(mtlPath,
        materials => {
          materials.preload();
          new OBJLoader(manager)
            .setMaterials(materials)
            .load(objPath,
              object => {
                console.log('OBJ模型 加载成功:::', object);
                object.traverse(child => {
                  if (child instanceof THREE.Mesh) {
                    // child.material.color.set(new THREE.Color('rgb(255, 255, 255)'));
                    // child.material.opacity = 0;
                  }
                });
                resolve(object);
              }, 
              xhr => {
                // 模型加载进度
                console.log('OBJ模型 正在加载:::', xhr.loaded, xhr.total);
              },
              err => {
                console.error('OBJ模型 加载失败:::', err);
                reject(err);
              }
            );
        },
        xhr => {
          // 模型加载进度
          console.log('MTL 正在加载:::', xhr.loaded, xhr.total);
        },
        err => {
          console.error('MTL 加载失败:::', err);
          reject(err);
        }
      );
  });
}

/**
 * OBJ格式 模型文件加载 (异步)
 * @param {string} modelPath obj 模型文件路径
 * @param {string} texturePath 纹理 文件路径
 * @return promise
 */
export function loadOBJ(modelPath, texturePath) {
  // OBJ模型加载器
  const objLoader = new OBJLoader();
  const textureLoader = new THREE.TextureLoader();
  return new Promise((resolve, reject) => {
    let texture = null;
    if (texturePath) {
      texture = textureLoader.load(texturePath);
    }
    objLoader.load(
      modelPath,
      obj => {
        console.log('OBJ模型 加载成功:::', obj);
        obj.traverse(child => {
          if (child instanceof THREE.Mesh) {
            if (texture) child.material.map = texture;
            // child.material.ambient.setHex(0xFF0000);
            child.material.color.set(new THREE.Color('rgb(255,255,255)'));
            child.material.opacity = 0.6;
          }
        });
        resolve(obj);
      },
      xhr => {
        // 模型加载进度
        console.log('OBJ模型 正在加载:::', xhr.loaded, xhr.total);
      },
      err => {
        console.error('OBJ模型 加载失败:::', err);
        reject(err);
      }
    );
  })
}

/**
 * GLTF 文件加载
 * @param {string} path 
 */
export function loadGLTF(path) {
  return new Promise((resolve, reject) => {
    new GLTFLoader()
    .load(
      path,
      gltf => {
        console.log('gltf模型 加载成功:::', gltf);
        resolve(gltf);
      },
      xhr => {
        // 模型加载进度
        console.log('gltf模型 正在加载:::', xhr.loaded, xhr.total);
      },
      err => {
        console.error('gltf模型 加载失败:::', err);
        reject(err);
      }
    );
  });
}

/**
 * FBX 文件加载
 * @param {string} path 
 */
export function loadFBX(path) {
  return new Promise((resolve, reject) => {
    new FBXLoader()
    .load(
      path,
      fbx => {
        console.log('FBX模型 加载成功:::', fbx);
        fbx.traverse(child => {
          if (child instanceof THREE.Mesh) {
            // const index = child.material.findIndex(x => x.name === 'Red');
            // child.material[index].color.set(new THREE.Color('rgb(255, 255, 255)'));
            // const index1 = child.material.findIndex(x => x.name === 'Window_Frames');
            // child.material[index1].color.set(new THREE.Color('rgb(201, 203, 208)'));
            // const index2 = child.material.findIndex(x => x.name === 'Grey');
            // child.material[index2].color.set(new THREE.Color('rgb(110, 112, 115)'));

            // const index = child.material.findIndex(x => x.name === 'Red');
            // child.material[index].color.set('#e0ceb8');
            // const index1 = child.material.findIndex(x => x.name === 'Window_Frames');
            // child.material[index1].color.set('#745548');
            // const index2 = child.material.findIndex(x => x.name === 'Grey');
            // child.material[index2].color.set('#9d9386');
          }
        });
        resolve(fbx);
      },
      xhr => {
        // 模型加载进度
        console.log('FBX模型 正在加载:::', xhr.loaded, xhr.total);
      },
      err => {
        console.error('FBX模型 加载失败:::', err);
        reject(err);
      }
    );
  });
}