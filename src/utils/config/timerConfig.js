/*
 * @Description: 定时配置 --> 基础单位 毫秒
 * @Author: 幺五六
 * @Date: 2020-10-16 16:35:35
 * @LastEditors: 幺五六
 * @LastEditTime: 2020-11-02 15:07:12
 */

const oneMinute = 60000; // 一分钟
const oneSecond = 1000; // 一秒

export const BASE_INTERVAL = 30 * oneSecond; // 毫秒

export const WEATHER_CAROUSEL = 3 * oneSecond; // 天气轮播表时间间隔
export const WEATHER_REFRESH = 10 * oneMinute; // 天气预报 刷新时间间隔

export const USER_REFRESH = 2 * oneMinute; // 人员统计 刷新时间间隔

export const FAULT_REFRESH = 2 * oneMinute; // 故障处理统计 刷新时间间隔
export const FAULT_CAROUSEL = 3 * oneSecond; // 故障处理 轮播时间间隔

export const TURBINE_REFRESH = 3 * oneMinute; // 风机状态统计 刷新时间间隔

export const ALERT_NOTIFY_REFRESH = 5 * oneSecond; // 故障、缺陷、警告通知 刷新时间间隔