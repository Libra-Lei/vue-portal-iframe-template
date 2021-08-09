/**
 * @Description: 
 * @Author: Libra
 * @GitHub: https://github.com/Libra-Lei
 * @Date: 2020-11-10 11:40:02
 * @LastEditors: Libra
 * @LastEditTime: 2021-08-09 10:21:56
 */
/*
 * @Description: 
 * @Author: 幺五六
 * @Date: 2019-12-25 17:09:49
 * @LastEditors: 幺五六
 * @LastEditTime: 2020-11-10 11:39:18
 */ 
import Cookies from 'js-cookie'
import { logout as logoutLocal } from '@/api/auth'
import { getUserInfo } from '@/api/user'
import store from '@/store'

const TokenKey = process.env.VUE_APP_COOKIE_NAME

/**
 * 本地 token 取
 */
export function getToken() {
  return Cookies.get(TokenKey)
}

/**
 * 本地 token 存
 */
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

/**
 * 本地 token 删
 */
export function removeToken() {
  return Cookies.remove(TokenKey)
}
