/*
 * @Description: 监视中心 API
 * @Author: 幺五六
 * @Date: 2020-09-25 21:14:30
 * @LastEditors: 幺五六
 * @LastEditTime: 2020-09-25 21:17:25
 */
import service from './service'
import { monitor as url } from './url'

/**
 * 获取风场状态分类统计
 * @param {string} wfIds 风场 id, 多个风场 , 隔开
 */
export function getTurbineStateCount(wfIds) {
  return service({
    url: url.getTurbineStateCount,
    method: 'GET',
    params: { wfIds }
  })
}