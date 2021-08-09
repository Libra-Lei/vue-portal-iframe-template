/*
 * @Description: 首页 API
 * @Author: 幺五六
 * @Date: 2020-10-21 13:30:09
 * @LastEditors: 幺五六
 * @LastEditTime: 2021-02-22 16:48:06
 */

import service from './service'
import { home as url } from './url'

/**
 * 发电量统计
 * @param {string} tenantDomain 租户域
 * @param {string} windFarm 风场id
 */
export function getPowerStatistics({ tenantDomain, windFarm }) {
  return service({
    url: url.getPowerStatistics,
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    params: { tenantDomain, windFarm }
  })
}

/**
 * 查询 天气预报信息
 * @param {string} tenantId 租户id
 */
export function getWeather({ tenantId }) {
  return service({
    url: url.getWeather,
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    params: { tenantId }
  })
}

/**
 * 安全运行天数
 * @param {string} tenantDomain 租户域
 * @param {string} windFarm 风场id
 */
export function getSafeDays({ tenantDomain, windFarm }) {
  return service({
    url: url.getSafeDays,
    method: 'GET',
    params: { tenantDomain, windFarm }
  })
}