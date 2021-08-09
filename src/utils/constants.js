/*
 * @Description: 常量
 * @Author: 幺五六
 * @Date: 2020-09-09 15:02:38
 * @LastEditors: 幺五六
 * @LastEditTime: 2021-01-18 14:55:20
 */

/**
 * 性别
 */
export const sexArr = [
  { key: '女', value: 0 },
  { key: '男', value: 1 },
  { key: '其他', value: 2 }
];

/**
 * 风机状态 -- 真实
 */
export const turbineStatus = [
  {
    name: '正常', value: 1,
    children: [
      { name: '正常运行', value: 1 },
      { name: '天气停机', value: 2 },
      { name: '限功率运行', value: 3 },
      { name: '限功率停机', value: 4 }
    ]
  },
  {
    name: '警告', value: 2,
    children: [
      { name: '风机维护', value: 5 },
      { name: '其他限电', value: 6 },
      { name: '远程停机', value: 7 },
      { name: '技术待命', value: 8 },
      { name: '警告', value: 9 }
    ]
  },
  {
    name: '故障', value: 3,
    children: [
      { name: '保护停机', value: 10 },
      { name: '电网故障', value: 11 },
      { name: '故障停机', value: 12 },
      { name: '通信中断', value: 13 },
      { name: '就地停机', value: 14 }
    ]
  }
]

/**
 * 风机状态 - 转换后
 */
export const turbineStatusTransition = [
  { name: '发电', value: 'running' },
  { name: '待机', value: 'standby' },
  { name: '故障', value: 'fault' },
  { name: '维护', value: 'maintain' },
  { name: '限电', value: 'limit' },
  { name: '离线', value: 'offline' }
]

/**
 * 预警信息状态
 */
export const alarmStatus = [
  {
    zh: '未处理', color: 'red-500', icon: 'AlertCircleIcon', value: '0', localValue: 'notDispose'
  },
  {
    zh: '处理中', color: 'indigo-500', icon: 'ClockIcon', value: '2', localValue: 'onDispose'
  },
  {
    zh: '已处理', color: 'green-500', icon: 'CheckCircleIcon', value: '3', localValue: 'hadDispose'
  },
  {
    zh: '已关闭', color: 'orange-500', icon: 'XOctagonIcon', value: '4', localValue: 'hadClose',
  }
]
