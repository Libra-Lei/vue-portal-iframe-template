/*
 * @Description: 
 * @Author: 幺五六
 * @Date: 2020-11-30 15:27:49
 * @LastEditors: 幺五六
 * @LastEditTime: 2020-12-09 15:18:02
 */
import store from '@/store'
import { permit, aclKeyMap } from './permit-config'

const RESOURCE_ID = 'urn:oasis:names:tc:xacml:1.0:resource:resource-id';
const ACTION_ID = 'urn:oasis:names:tc:xacml:1.0:action:action-id';

/**
 * 查询权限
 * @param {string} action 动作
 * @param {array} aclKeys 本地资源key
 */
export function hasPermit(action, aclKeys) {
  aclKeys = aclKeys || [];
  for (let i = 0; i < aclKeys.length; i++) {
    const resourceKey = aclKeyMap[aclKeys[i]];
    const pass = permit[resourceKey][action];
    if (pass) {
      return true;
    }
  }
  return false;
}

/**
 * 刷新权限表
 * @param {*} res 
 */
export function refreshPermit(response) {
  response = response.Response || [];
  response.forEach(permission => {
    const resourceKey = permission.Resource.Attribute.find(x => x.AttributeId === RESOURCE_ID).Value;
    const actionKey = permission.Action.Attribute.find(x => x.AttributeId === ACTION_ID).Value;
    const result = permission.Decision === 'Permit'? true : false;
    const hasAction = Object.keys(permit[resourceKey]).findIndex(x => x === actionKey) > -1;
    if (hasAction) {
      permit[resourceKey][actionKey] = result;
    }
  });
}

/**
 * 拼装请求体
 * @param {string} routeName 当前路由名称
 */
export function packageRequest(aclKeys) {
  aclKeys = aclKeys || [];
  const resource = [], action = [];
  aclKeys.forEach(key => {
    const resourceKey = aclKeyMap[key];
    const actionKeys = Object.keys(permit[resourceKey]);
    resource.push({
      'Attribute': [
        {
          'AttributeId': RESOURCE_ID,
          'Value': resourceKey,
          'IncludeInResult': true
        }
      ]
    });
    actionKeys.forEach(ac => {
      const index = action.findIndex(x => x.Attribute[0].Value === ac);
      if (index < 0) {
        action.push({
          'Attribute': [
            {
              'AttributeId': ACTION_ID,
              'Value': ac,
              'IncludeInResult': true
            }
          ]
        });
      }
    });
  });

  return {
    'Request': {
      'AccessSubject': {
        'Attribute': [
          {
            'AttributeId': 'subject-id',
            'Value': store.getters.AppActiveUser.loginCode,
            'IncludeInResult': false,
            'DataType': 'string'
          }
        ]
      },
      'Resource': resource,
      'Action': action
    }
  }
}

