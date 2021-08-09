<!--
 * @Description: 
 * @Author: Libra
 * @GitHub: https://github.com/Libra-Lei
 * @Date: 2020-11-05 18:46:28
 * @LastEditors: Libra
 * @LastEditTime: 2020-11-05 18:49:51
-->
<template>
  <div class="main-container" :style="mainContainerStyle">
    <iframe
      v-if="iframeUrl"
      id="sub-container"
      :src="iframeUrl"
      style="border: none;"
      @load="iframeLoaded"
    />
    <div
      v-else
      class="dashboard-container h-full w-full"
      >
      <test />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Test from './home/Test.vue'

export default {
  name: 'Home',
  components: { Test },
  data() {
    return {
      iframeUrl: 'http://www.youdao.com/'
    }
  },
  computed: {
    ...mapGetters(['navbarType', 'mainLayoutType']),
    
    mainContainerStyle: function() {
      // static / sticky / hidden
      if (this.navbarType == 'static') {
        return this.mainLayoutType === 'vertical'
          ? { height: 'calc(100vh - 62px)', paddingTop: '0' }
          : { height: 'calc(100vh - 125px)', paddingTop: '0' };
      } else if (this.navbarType == 'sticky') {
        return this.mainLayoutType === 'vertical'
          ? { height: 'calc(100vh)', paddingTop: '63px' }
          : { height: 'calc(100vh)', paddingTop: '126px' };
      } else {
        return { paddingTop: '0px' };
      }
    }
  },
  methods: {
    iframeLoaded() {
      // ...后续处理
    }
  }
};
</script>

<style lang="scss" scoped>
.main-container {
  height: calc(100vh - 5px);
}
iframe {
  height: 100%;
  width: 100%;
}
</style>
