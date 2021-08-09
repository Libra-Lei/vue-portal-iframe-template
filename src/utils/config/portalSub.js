/*
 * @Description: 门户-子系统交互 配置
 * @Author: 幺五六
 * @Date: 2020-11-02 15:12:49
 * @LastEditors: 幺五六
 * @LastEditTime: 2021-01-13 14:46:43
 */

const ROUTE_MAP = {
  Health: {
    fault: '/fault/layout/list/alarmStatus/0',
    defect: '/defects/layout/list/alarmStatus/0',
    alert: '/alert/layout/list/alarmStatus/0'
  },
  Pro: {},
  Monitor: {}
}

/**
 * 获取子系统的 path
 * @param {string} portalKey 门户中：子系统路由名称
 * @param {string} subKey 子系统 路由 地址的 key (前端约定的)
 */
export function getSubPath(portalKey, subKey) {
  return ROUTE_MAP[portalKey][subKey];
}