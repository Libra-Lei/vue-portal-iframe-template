/*
 * @Description: 
 * @Author: 幺五六
 * @Date: 2020-11-25 15:42:25
 * @LastEditors: 幺五六
 * @LastEditTime: 2020-12-14 11:15:41
 */

/**
 * 本地资源key --> 授权资源 映射
 */
export const aclKeyMap = {
  'user': '/user/user/info',
  'site': '/user/user/site',
  'message': '/user/user/message'
}

/**
 * 访问控制 资源表
 */
export const permit = {
  '/user/user/info': {
    'view': false,
    'edit': false
  },
  '/user/user/site': {
    'view': false,
    'edit': false
  },
  '/user/user/message': {
    'view': false,
    'check': false
  }
}