# 项目简介
此项目是智慧风场的门户系统，主要作用为用户登录、用户资料编辑、各子系统整合。

> 子系统整合基于iframe

> 子系统通讯基于postMessage

> 登录基于SSO

# 门户<-->子系统通讯
## 一、门户
### 1. 配置门户发布地址（.env.*）：
  ```yarm
  
  # 门户发布地址 --> 校验通讯安全
  VUE_APP_PORTAL_DOMAIN = 'http://192.168.1.151:8100'
  ```
### 2. 通知子系统创建消息通道（Home.vue）：
  ```javascript
  iframeLoaded() {
    notifySubSystem(
      this,
      document.getElementById('sub-container')
    );
  }
  ```
### 3. 监听 message：
> 详见： @/mixins/communication.js

## 二、子系统
> 子系统流程： 接收门户首次发送消息 --> 验证 --> 存储回信对象 --> 使用回信对象发消息给门户
### 1. 配置门户和本系统发布地址（.env.*）：
  ```yarm
  # 以下用于校验 跨域通讯
  # 本系统发布域名
  VUE_APP_MINE_DOMAIN = 'http://192.168.3.30:9103'
  # 门户域名
  VUE_APP_PORTAL_DOMAIN = 'http://192.168.3.30:9100'
  ```
### 2. 监听 message：
> @/mixins/communication.js
```javascript
// 门户<-->子系统, 跨域通讯（基于iframe）

/**
 * 跨域通讯，子系统接收的key值白名单;
 */
const whiteKeys = ['wm-update-user'];

/**
 * 门户接收的key,
 */
const portalKey = {
  logout: 'wm-logout', // 用户注销登录
  userInfo: 'wm-user'  // 查看用户详情
}

/**
 * 门户接收消息, mixin
 */
export const receiveMixin = {
  mounted() {
    window.addEventListener('message', this.receive, false);
  },
  methods: {
    receive(event) {
      // 我们能信任信息来源吗？
      if (
        process.env.VUE_APP_MINE_DOMAIN === event.origin ||
        event.origin !== process.env.VUE_APP_PORTAL_DOMAIN ||
        !event.data.key ||
        whiteKeys.findIndex(x => x === event.data.key) < 0
      ) {
        return;
      }
      console.log('生产中心收到消息：', event.data);
      switch (event.data.key) {
        case whiteKeys[0]:
          // 更新用户信息
          this.$store.dispatch('user/updateUserInfo', { openid: event.data.value.openid, sub: event.data.value.sub });
          /**
            * event.source作为回信的对象，并且把event.origin作为targetOrigin
            * 存储全局变量 msgChannel
            */
          this.$store.dispatch('app/setMsgChannel', event);
          break;
      }
    }
  }
}

/**
 * 通知门户注销登录
 * @param {Vuex} store this.$store
 */
export function logout(store) {
  store.getters.msgChannel.source.postMessage({ key: portalKey.logout }, store.getters.msgChannel.origin);
}

/**
 * 通知门户，查看用户详情
 * @param {Vuex} store this.$store
 */
export function userInfo(store) {
  store.getters.msgChannel.source.postMessage({ key: portalKey.userInfo }, store.getters.msgChannel.origin);
}
```
### 3. 存储跨域通讯对象：
> vuex -> store
  ```javascript
  const state = {
    // 跨域通讯对象
    msgChannel: {}
  }
  const mutations = {
    SET_MSGCHANNEL: (state, msg) => {
      state.msgChannel = msg
    }
  }
  const actions = {
    setMsgChannel({ commit }, msg) {
      commit('SET_MSGCHANNEL', msg)
    }
  }
  ```