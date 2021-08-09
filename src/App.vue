<!--
 * @Description: 
 * @Author: Libra
 * @GitHub: https://github.com/Libra-Lei
 * @Date: 2019-12-25 17:09:49
 * @LastEditors: Libra
 * @LastEditTime: 2020-07-27 11:06:25
-->
<template>
	<div id="app" style="overflow: hidden;">
		<router-view></router-view>
	</div>
</template>

<script>
import themeConfig from '@/../themeConfig.js'

export default {
  watch: {
    '$store.state.app.theme'(val) {
      this.toggleClassInBody(val)
    }
  },
  methods: {
    toggleClassInBody(className) {
      if (className == 'dark') {
        if (document.body.className.match('theme-semi-dark')) document.body.classList.remove('theme-semi-dark')
        document.body.classList.add('theme-dark')
      }
      else if (className == 'semi-dark') {
        if (document.body.className.match('theme-dark')) document.body.classList.remove('theme-dark')
        document.body.classList.add('theme-semi-dark')
      }
      else {
        if (document.body.className.match('theme-dark'))      document.body.classList.remove('theme-dark')
        if (document.body.className.match('theme-semi-dark')) document.body.classList.remove('theme-semi-dark')
      }
    },
    handleWindowResize() {
      this.$store.commit('app/UPDATE_WINDOW_WIDTH', window.innerWidth)
    },
    handleScroll() {
      this.$store.commit('app/UPDATE_WINDOW_SCROLL_Y', window.scrollY)
    }
  },
  mounted() {
    this.toggleClassInBody(themeConfig.theme)
    this.$store.commit('app/UPDATE_WINDOW_WIDTH', window.innerWidth)
  },
  async created() {
    window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleWindowResize)
    window.removeEventListener('scroll', this.handleScroll)
  },
}

</script>
