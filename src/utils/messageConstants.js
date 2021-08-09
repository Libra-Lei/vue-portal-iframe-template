/*
 * @Description: 消息中心状态常量
 * @Author: 幺五六
 * @Date: 2021-01-18 14:57:17
 * @LastEditors: 幺五六
 * @LastEditTime: 2021-03-30 15:57:44
 */

/**
* 消息来源
*/
export const messageSource = [
  { name: '生产中心', value: 1, localValue: 'product' },
  { name: '健康中心', value: 2, localValue: 'health' },
  { name: '系统中心', value: 3, localValue: 'system' }
]

/**
 * 消息所属模块
 */
export const messageModule = [
  { name: '工单', desc: '生产中心工单管理', value: '1_1', localValue: 'order' },
  { name: '计划', desc: '生产中心计划管理', value: '1_2', localValue: 'plan' },
  { name: '故障', desc: '健康中心故障管理', value: '2_1', localValue: 'fault' },
  { name: '警告', desc: '健康中心警告管理', value: '2_2', localValue: 'alert' },
  { name: '缺陷', desc: '健康中心缺陷管理', value: '2_3', localValue: 'defects' }
]

/**
 * 消息状态
 */
export const messageStatus = [
  { name: '未读', value: 1, localValue: 'unread', bgColor: 'bg-red-600' },
  { name: '已读', value: 2, localValue: 'read', bgColor: 'bg-green-600' }
]

/**
 * 消息级别
 */
export const messageLevel = [
  { name: '高', value: 1 },
  { name: '中', value: 2 },
  { name: '低', value: 3 }
]

/**
 * 工单状态
 */
export const orderStatus = [
  {
    name: '待签发', value: '9', icon: 'create', color: 'purple-700', colorOpacity: '15',
    localValue: 'waitSign'
  },
  {
    name: '待审核', value: '1', icon: 'assignment_ind', color: 'orange-700', colorOpacity: '15',
    localValue: 'waitCheck'
  },
  {
    name: '待完善', value: '10', icon: 'assignment_late', color: 'yellow-600', colorOpacity: '15',
    localValue: 'waitAssign'
  },
  {
    name: '待开工', value: '11', icon: 'settings_suggest', color: 'green-600', colorOpacity: '15',
    localValue: 'waitWorking'
  },
  {
    name: '执行中', value: '3', icon: 'construction', color: 'teal-600', colorOpacity: '15',
    localValue: 'disposing'
  },
  {
    name: '待验收', value: '4', icon: 'content_paste', color: 'red-500', colorOpacity: '15',
    localValue: 'waitAccept'
  },
  {
    name: '待总结', value: '12', icon: 'assignment', color: 'yellow-500', colorOpacity: '15',
    localValue: 'waitSummary'
  },
  {
    name: '已完结', value: '13', icon: 'assignment_turned_in', color: 'green-700', colorOpacity: '15',
    localValue: 'finish'
  },
  {
    name: '已拒绝', value: '6', icon: 'pan_tool', color: 'red-700', colorOpacity: '15',
    localValue: 'reject'
  },
  {
    name: '草稿箱', value: '7', icon: 'drafts', color: 'blue-600', colorOpacity: '15',
    localValue: 'draft'
  },
  {
    name: '回收站', value: '8', icon: 'delete', color: 'gray-600', colorOpacity: '15',
    localValue: 'trash'
  }
]

/**
 * 计划-状态
 */
export const planStatus = [
  {
    name: '待审核', colorValue: '#ED64A6', color: 'pink-500', icon: 'AlertOctagonIcon', value: '1',
    localValue: 'waitCheck'
  },
  {
    name: '未开始', colorValue: '#ECC94B', color: 'yellow-500', icon: 'LoaderIcon', value: '2'
  },
  {
    name: '进行中', colorValue: '#4299E1', color: 'blue-500', icon: 'ClockIcon', value: '3'
  },
  {
    name: '已完成', colorValue: '#48BB78', color: 'green-500', icon: 'CheckIcon', value: '5'
  },
  {
    name: '已拒绝', colorValue: '#F56565', color: 'red-500', icon: 'XOctagonIcon', value: '6'
  },
  {
    name: '草稿箱', colorValue: '', color: '', icon: 'FileTextIcon', value: '7',
    localValue: 'draft'
  },
  {
    name: '回收站', colorValue: '', color: '', icon: 'Trash2Icon', value: '8',
    localValue: 'trash'
  }
]

/**
 * 故障管理状态
 */
export const faultStatus = [
  {
    name: '未处理', showMenu: true, color: 'purple-700', colorOpacity: '15', icon: 'AlertCircleIcon', value: '0',
    localValue: 'notDispose'
  },
  {
    name: '处理中', showMenu: true, color: 'yellow-500', colorOpacity: '15', icon: 'ClockIcon', value: '2',
    localValue: 'onDispose'
  },
  {
    name: '已处理', showMenu: true, color: 'green-600', colorOpacity: '15', icon: 'CheckCircleIcon', value: '3',
    localValue: 'hadDispose'
  },
  {
    name: '已关闭', showMenu: true, color: 'gray-600', colorOpacity: '15', icon: 'XOctagonIcon', value: '4',
    localValue: 'hadClose'
  }
]

/**
 * 警告管理状态
 */
export const alertStatus = [
  {
    name: '未处理', showMenu: true, color: 'purple-700', colorOpacity: '15', icon: 'AlertCircleIcon', value: '0',
    localValue: 'notDispose'
  },
  {
    name: '处理中', showMenu: true, color: 'yellow-500', colorOpacity: '15', icon: 'ClockIcon', value: '2',
    localValue: 'onDispose'
  },
  {
    name: '已处理', showMenu: true, color: 'green-600', colorOpacity: '15', icon: 'CheckCircleIcon', value: '3',
    localValue: 'hadDispose'
  },
  {
    name: '已关闭', showMenu: true, color: 'gray-600', colorOpacity: '15', icon: 'XOctagonIcon', value: '4',
    localValue: 'hadClose'
  }
]

/**
 * 缺陷管理状态
 */
export const defectsStatus = [
  {
    name: '未处理', showMenu: true, color: 'purple-700', colorOpacity: '15', icon: 'AlertCircleIcon', value: '0',
    localValue: 'notDispose'
  },
  {
    name: '处理中', showMenu: true, color: 'yellow-500', colorOpacity: '15', icon: 'ClockIcon', value: '2',
    localValue: 'onDispose'
  },
  {
    name: '已处理', showMenu: true, color: 'green-600', colorOpacity: '15', icon: 'CheckCircleIcon', value: '3',
    localValue: 'hadDispose'
  },
  {
    name: '已关闭', showMenu: true, color: 'gray-600', colorOpacity: '15', icon: 'XOctagonIcon', value: '4',
    localValue: 'hadClose'
  }
]