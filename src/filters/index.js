/*
 * @Description: 
 * @Author: 幺五六
 * @Date: 2021-01-18 15:15:56
 * @LastEditors: 幺五六
 * @LastEditTime: 2021-03-31 14:44:58
 */
import * as dayjs from 'dayjs'
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

/**
 * 日期 -> 年-日
 * @param {string} date 
 */
export function date2Day(date) {
  if (!dayjs(date).isValid()) return '--';
  return dayjs.utc(date).format('YYYY-MM-DD');
}

/**
 * 日期 -> 年-月
 * @param {string} date 
 */
export function date2Month(date) {
  if (!dayjs(date).isValid()) return '--';
  return dayjs.utc(date).format('YYYY-MM');
}

/**
 * 日期 -> 年-分钟
 * @param {string} date 
 */
export function date2Minute(date) {
  if (!dayjs(date).isValid()) return '--';
  return dayjs.utc(date).format('YYYY-MM-DD HH:mm');
}

/**
 * 日期 -> 小时-分钟
 * @param {string} date 
 */
export function date2HourMinute(date) {
  if (!dayjs(date).isValid()) return '--';
  return dayjs.utc(date).format('HH:mm');
}

/**
 * 时间戳（毫秒） -> 年-分钟
 * @param {string} date 
 */
export function time2Minute(time) {
  return dayjs(time).format('YYYY-MM-DD HH:mm');
}

/**
 * 时间戳（秒） -> 年-分钟
 * @param {string} date 
 */
export function timeUnix2Minute(time) {
  return dayjs.unix(time).format('YYYY-MM-DD HH:mm');
}

/**
 * 时间戳（秒） -> 年-秒
 * @param {string} date 
 */
 export function timeUnix2Second(time) {
  return dayjs.unix(time).format('YYYY-MM-DD HH:mm:ss');
}
