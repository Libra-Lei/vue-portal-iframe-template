/*
 * @Description: 健康中心 API
 * @Author: 幺五六
 * @Date: 2020-10-23 10:39:07
 * @LastEditors: 幺五六
 * @LastEditTime: 2020-11-25 11:34:07
 */
import service from './service'
import { health as url } from './url'

/**
 * 故障处理 统计
 * @param {string} tenantDomain 租户
 * @param {string} windFarm 风场id , 隔开
 * @param {number} current 
 * @param {number} size 
 */
export function getFaultStatistics({ tenantDomain, windFarm, current, size }) {
  return service({
    url: url.getFaultStatistics,
    method: 'POST',
    params: { tenantDomain, windFarm, current, size }
  })
}

/**
 * 获取故障、警告、缺陷 数量统计 通知
 * @param {string} tenantDomain 租户域
 * @param {string} windFarm 风场id
 */
export function getAlertNotify({ tenantDomain, windFarm }) {
  return service({
    url: url.getAlertNotify,
    method: 'POST',
    params: { tenantDomain, windFarm }
  })
}