/*
 * @Description: 
 * @Author: 幺五六
 * @Date: 2020-05-25 09:08:04
 * @LastEditors: 幺五六
 * @LastEditTime: 2021-04-13 11:59:12
 */ 
import axios from 'axios'
import store from '@/store'

// SSO验证服务器地址
const idnetifyAddress = `${process.env.VUE_APP_IDENTIFY_SERVER}`;
const appid = process.env.VUE_APP_APP_ID
const redirectUrl = process.env.VUE_APP_REDIRECT_URL

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 180000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['Authorization'] =  `Bearer ${getToken()}`
    // }
    if (store.getters.token) {
      // sessionId 认证
      if (Number(process.env.VUE_APP_SSO_IS_OPEN)) { // 单点登录开关
        if (store.getters.token.localToken) config.headers['sessionId'] = store.getters.token.localToken;
      }

      // idToken 认证
      if (store.getters.token.idToken) {
        config.headers['Authorization'] = `Bearer ${store.getters.token.idToken}`;
      }
    }

    // 风场ID / 租户ID / 租户域
    if (store.getters.currSelectTenant.id && store.getters.currSelectTenant.id !== 'undefined') {
      config.headers['atTennentId'] = store.getters.currSelectTenant.id;
    }
    if (store.getters.currSelectTenant.domain && store.getters.currSelectTenant.domain !== 'undefined') {
      config.headers['atTennentDomain'] = store.getters.currSelectTenant.domain;
    }
    if (store.getters.currSelectWindFarmId && store.getters.currSelectWindFarmId !== 'undefined') {
      config.headers['atWindFarm'] = store.getters.currSelectWindFarmId;
    }

    return config;
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */
  response => {
    const res = response;
    if (res.status !== 200) {
      window.$wm_notify_danger('错误', res.message || 'Error')
      return Promise.reject(new Error(res.message || 'Error'))
    } else if (res.status === 403) {
      window.$wm_notify_danger('错误', '对不起，您没有权限。');
      return Promise.reject('No Authority');
    } else {
      return res.data
    }
  },
  error => {
    console.error('error: ', error);
    if (error.response.status === 401) {
      console.error('正常api请求401');
      // store.dispatch('user/setToken', { code: null, sessionState: null, localToken: null });
      store.commit('user/SET_TOKEN', { code: null, sessionState: null, localToken: null });
      // window.$wm_dialog_confirm('提示', '系统已退出登录，你可以点击“取消”继续留在当前页面，也可点击“重新登录”', () => {
      window.location.href = `${idnetifyAddress}/oauth2/authorize?client_id=${appid}&scope=openid&response_type=code&redirect_uri=${encodeURI(redirectUrl)}`  
      // });
    } else {
      console.error('service-error:::', error) // for debug
      window.$wm_notify_danger('服务器错误', error.response.data.msg || error.message);
      return Promise.reject(error)
    }
  }
)

export default service
