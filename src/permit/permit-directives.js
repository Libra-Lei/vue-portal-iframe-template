/*
 * @Description: 访问控制指令
 * @Author: 幺五六
 * @Date: 2020-11-25 14:56:47
 * @LastEditors: 幺五六
 * @LastEditTime: 2020-12-09 15:17:23
 */

import Vue from 'vue'
import { hasPermit } from './permit-utils'

// 访问控制 - 元素 disabled
Vue.directive('permit-disabled', {
  inserted: function (el, binding) {
    // { action: '资源id', width: '其他判断条件' }
    const { value, arg } = binding;
    if (value.width || !hasPermit(value.action, arg)) {
      el.disabled = true;
      el.style.pointerEvents = 'none';
      el.style.color = '#969696';
    } else {
      el.disabled = false;
      el.style.pointerEvents = '';
      el.style.color = '';
    }
  },
  update: function (el, binding) {
    // { action: '资源id', width: '其他判断条件' }
    const { value, arg } = binding;
    if (value.width || !hasPermit(value.action, arg)) {
      el.disabled = true;
      el.style.pointerEvents = 'none';
      el.style.color = '#969696';
    } else {
      el.disabled = false;
      el.style.pointerEvents = '';
      el.style.color = '';
    }
  }
})

// 访问控制 - 元素 hidden
Vue.directive('permit-hidden', {
  inserted: function (el, binding) {
    const { value, arg } = binding;
    if (value.width || !hasPermit(value.action, arg)) {
      el.style.display = 'none';
    } else {
      el.style.display = '';
    }
  },
  update: function (el, binding) {
    const { value, arg } = binding;
    if (value.width || !hasPermit(value.action, arg)) {
      el.style.display = 'none';
    } else {
      el.style.display = '';
    }
  }
})

// 访问控制 - 元素 invisible
Vue.directive('permit-invisible', {
  inserted: function (el, binding) {
    const { value, arg } = binding;
    if (value.width || !hasPermit(value.action, arg)) {
      el.style.visibility = 'hidden';
    } else {
      el.style.visibility = 'visible';
    }
  },
  update: function (el, binding) {
    const { value, arg } = binding;
    if (value.width || !hasPermit(value.action, arg)) {
      el.style.visibility = 'hidden';
    } else {
      el.style.visibility = 'visible';
    }
  }
})
