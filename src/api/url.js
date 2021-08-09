/*
 * @Description: 
 * @Author: 幺五六
 * @Date: 2020-05-25 09:08:04
 * @LastEditors: 幺五六
 * @LastEditTime: 2021-07-06 11:34:48
 */ 
const sysPath = process.env.VUE_APP_API;

export const route = {
  list: `${sysPath}route/selectRouteByAll`, // 获取首页菜单数据
  getAppRemoteAddress: `${sysPath}route/selectRouteConfigByParam` // 根据场站Id, 查询子系统远程地址
}
