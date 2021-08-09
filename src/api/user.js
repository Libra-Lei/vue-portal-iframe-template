/*
 * @Description: 个人中心
 * @Author: 幺五六
 * @Date: 2020-09-08 13:35:28
 * @LastEditors: 幺五六
 * @LastEditTime: 2020-12-03 10:43:53
 */

import service from './service'
import { user as userUrl } from './url'

/**
 * 请求系统管理中心，获取用户基本信息
 */
export function getUserInfo() {
  return service({
    url: userUrl.getUserInfo,
    method: 'GET'
  })
}

/**
 * 请求系统管理中心，获取用户登录历史记录
 * @param {number} current 
 * @param {number} size 
 * @param {string} loginCode 
 * @param {string} tecantId 租户id
 */
export function getLoginHistory({ current, size, loginCode, tecantId }) {
  return service({
    url: userUrl.getLoginHistory,
    method: 'GET',
    params: { current, size, loginCode, tecantId }
  })
}

/**
 * 更新个人资料
 * @param {object} params 
 */
export function updateUser(params) {
  return service({
    url: userUrl.updateUser,
    method: 'PUT',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    params
  })
}

/**
 * 修改密码
 * @param {object} params 
 */
export function updatePassword(params) {
  return service({
    url: userUrl.updatePassword,
    method: 'PUT',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    params
  })
}

/**
 * 上传头像
 * @param {formdata} data 
 */
export function updateAvatar(data) {
  return service({
    url: userUrl.updateAvatar,
    headers: { 'content-type': 'multipart/form-data;charset=UTF-8' },
    method: 'post',
    data
  })
}

/**
 * 查询所有租户列表
 */
export function getTenantAll() {
  return service({
    url: userUrl.getTenantAll,
    method: 'GET'
  })
}

/**
 * 获取指定租户的 所有风场列表
 * @param {string} tenantId 租户ID
 */
export function getWindFarmByTenant({ tenantId }) {
  return service({
    url: userUrl.getWindFarmByTenant,
    method: 'GET',
    params: { tenantId }
  })
}

/**
 * 获取场站统计，跟据省份
 * @param {*} param0 
 */
export function getStationByProvince({ tenantId }) {
  return service({
    url: userUrl.getStationByProvince,
    method: 'GET',
    params: { tenantId  }
  })
}