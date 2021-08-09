/*
 * @Description: 
 * @Author: 幺五六
 * @Date: 2019-12-25 17:09:49
 * @LastEditors: 幺五六
 * @LastEditTime: 2021-07-02 14:00:12
 */

import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax)


// 主题配置
import '../themeConfig.js'


// 全局组件注册
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind css框架
import '@/assets/css/main.css'


// Vue Router
import router from '@/routes'


// Vuex Store
import store from './store'


// 移动设备指令包
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)


// PrismJS - 语法高亮库
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

// i18n
import i18n from './i18n/i18n'

// 路由守卫
import '@/permission'

// Feather font icon
require('@/assets/css/iconfont.css')

// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

// 注册全局过滤器
import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/loading_image_error.svg',
  loading: '/loading.gif',
  attempt: 1
})

Vue.config.productionTip = false

// 访问控制 - 指令
import '@/permit/permit-directives'

new Vue({
  router,
  store,
  i18n,
  mounted() {
    // console.log('mainjs-初始化')
    window.$wm_loading = () => {
      this.$vs.loading({
        type: 'sound',
        scale: 0.9
      })
    }
    window.$wm_loading_close = () => {
      this.$vs.loading.close()
    }
    window.$wm_notify_danger = (title, text) => {
      this.$vs.notify({
        color: 'danger',
        title: title,
        text: text,
        time: 3000
      })
    }
    window.$wm_dialog_confirm = (title, text, acceptText, cancelText, callback) => {
      this.$vs.dialog({
        type: 'confirm',
        color: 'warning',
        title: title,
        text: text,
        acceptText: acceptText || '确定',
        cancelText: cancelText || '取消',
        accept: callback
      })
    }
  },
  render: h => h(App)
}).$mount('#app')
