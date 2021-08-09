/*
 * @Description: 生产中心 API
 * @Author: 幺五六
 * @Date: 2020-10-16 14:37:26
 * @LastEditors: 幺五六
 * @LastEditTime: 2020-10-22 15:33:15
 */
import service from './service'
import { pro as url } from './url'

/**
 * 查询指定时间段内的 排班
 * @param {string} startDate 开始时间
 * @param {string} endDate 结束时间
 * @param {number} aboutMe 是否只看 自己  0： 1
 */
export function getDutyCalendar({ startDate, endDate, aboutMe }) {
  return service({
    url: url.dutyCalendar,
    method: 'GET',
    params: { startDate, endDate, aboutMe }
  })
}

/**
 * 查询 人员统计信息
 * @param {string} farmId 风场id
 */
export function getUserStatistics({ farmId }) {
  return service({
    url: url.getUserStatistics,
    method: 'POST',
    params: { farmId }
  })
}