/*
 * @Description: 消息中心
 * @Author: 幺五六
 * @Date: 2021-01-18 13:46:42
 * @LastEditors: 幺五六
 * @LastEditTime: 2021-01-20 10:47:42
 */

import service from './service'
import { message as url } from './url'

/**
 * 查询消息中心分页列表
 * @param {number} pageNum 偏移量
 * @param {number} pageSize 页码
 * @param {number} messageState 消息状态 1: 未读 2: 已读
 * @param {string} subSystem 来自哪个系统 1：生产中心 2：健康中心 3: 系统中心
 * @param {string} systemModule 来自哪个模块 1_1 生产中心工单管理, 1_2 生产中心计划管理, 2_1健康中心故障管理 , 2_2健康中心警告管理, 2_3 健康中心缺陷
 */
export function getMsgPage({ pageNum, pageSize, messageState, subSystem, systemModule, content }) {
  return service({
    url: url.getMsgPage,
    method: 'GET',
    params: { pageNum, pageSize, messageState, subSystem, systemModule, content }
  })
}

/**
 * 查询消息详情
 * @param {string} uuid 消息主键
 */
export function getMsgById(uuid) {
  return service({
    url: url.getMsgById,
    method: 'GET',
    params: { uuid }
  })
}

/**
 * 更新消息
 * @param {string} ids id 逗号 隔开
 */
export function updateMsg(ids) {
  return service({
    url: url.updateMsg,
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    params: { ids }
  })
}