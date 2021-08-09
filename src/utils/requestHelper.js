/*
 * @Description: 
 * @Author: 幺五六
 * @Date: 2020-09-05 17:08:35
 * @LastEditors: 幺五六
 * @LastEditTime: 2020-09-05 17:09:30
 */
const fileDomain = process.env.VUE_APP_FILE_DOMAIN;
const filePrefix = process.env.VUE_APP_FILE_PREFIX;

/**
 * 转换 FormData
 * @param {array} arr { key: value }
 */
export function convert2FormData(obj) {
  const formdata = new FormData();
  for (const key of Object.keys(obj)) {
    formdata.append(key, obj[key]);
  }
  return formdata;
}

/**
 * 转换 文件访问地址并返回
 * @param {string} path 图片路径
 */
export function convertFileAddress(path) {
  return path? `${fileDomain}${filePrefix}/${path}` : path;
}