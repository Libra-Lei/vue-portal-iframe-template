/**
 * @Description: 
 * @Author: Libra
 * @GitHub: https://github.com/Libra-Lei
 * @Date: 2021-08-06 16:10:43
 * @LastEditors: Libra
 * @LastEditTime: 2021-08-06 17:26:14
 */
/*
 * @Description: 
 * @Author: 幺五六
 * @Date: 2020-05-25 09:08:04
 * @LastEditors: 幺五六
 * @LastEditTime: 2021-07-21 16:39:43
 */ 
import { convertFileAddress } from '@/utils/requestHelper'

const userDefaults = {
  id: null, // 用户id
  tenantId: null, // 租户id
  tenantCode: null, // 租户编码
  tenantDomain: null, // 租户域 - 租户唯一标识
  tenantName: null, // 租户名称
  userCode: null, // 用户编码
  userName: null, // 用户名称
  sex: null, // 性别
  email: null, // 邮箱
  mobile: null, // 手机
  phone: null, // 电弧
  address: null, // 地址
  remark: null, // 备注
  loginCode: null,
  avatar: require("@/assets/images/portrait/small/avatar.png"),
  roleList: [] // 角色
}

const state = {
  AppActiveUser: userDefaults,
}

const mutations = {
  // 更新用户信息 （state 和 localStorage）
  UPDATE_USER_INFO(state, payload) {
    // 获取用户信息
    let userInfo = state.AppActiveUser;
    for (const key of Object.keys(userInfo)) {
      if (payload[key]) {
        if (key === 'avatar') {
          state.AppActiveUser[key] = convertFileAddress(payload[key]);
          userInfo[key] = convertFileAddress(payload[key]);
        } else {
          state.AppActiveUser[key] = payload[key];
          userInfo[key] = payload[key];
        }
      }
    }
    // 把用户信息在 localStorage 里面存一份
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  }
}

const actions = {
  updateUserInfo({ commit }, payload) {
    commit('UPDATE_USER_INFO', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}