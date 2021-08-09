/*
 * @Description: WebSocket 封装
 * @Author: 幺五六
 * @Date: 2020-11-24 10:25:50
 * @LastEditors: 幺五六
 * @LastEditTime: 2021-07-12 17:28:58
 */
import store from '@/store'

class websocket {
  constructor({ url }) {
    this.__baseUrl = process.env.VUE_APP_WS_PREFIX;
    this.__url = url || '';

    this.__socket = null;
  }

  create() {
    if (typeof (WebSocket) === 'undefined') {
      return false;
    }
    const sessionid = store.getters.token? store.getters.token.localToken : '';
    let userid = '', roleEnName = '';
    if (store.getters.AppActiveUser) {
      userid = store.getters.AppActiveUser.id;
      roleEnName = Array.isArray(store.getters.AppActiveUser.roleList)? store.getters.AppActiveUser.roleList.map(x => x.engName).join(',') : '';
    }

    const params = `?sessionid=${sessionid}&userId=${userid}&roleEnName=${roleEnName}&siteId=${store.state.user.currSelectWindFarmId || null}`;

    this.__socket = new WebSocket(`${process.env.VUE_APP_WS_DOMAIN}${this.__baseUrl}${this.__url}${params}`);
    // this.__socket = new WebSocket(`ws://192.168.1.151:8081${this.__baseUrl}${this.__url}${params}`);
    this.__socket.addEventListener('error', this.__onError);
    this.__socket.addEventListener('close', this.__onClose);
    this.__socket.addEventListener('open', this.__onOpen);

    this.__socket.sendMessage = this.__sendMessage.bind(this);
    this.__socket.closeSocket = this.__closeSocket.bind(this);
    return this.__socket;
  }

  __sendMessage(msg) {
    this.__socket.send(msg);
  }

  __closeSocket() {
    this.__socket.close();
  }

  __onOpen(evt) {
    console.info('ws 连接成功', evt);
  }

  __onError(evt) {
    console.error('ws 连接错误', evt);
  }

  __onClose(evt) {
    console.info('ws 连接关闭', evt);
  }

}

export default websocket;
