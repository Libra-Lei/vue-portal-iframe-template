/*
 * @Description: 
 * @Author: 幺五六
 * @Date: 2020-08-03 16:13:21
 * @LastEditors: 幺五六
 * @LastEditTime: 2020-08-03 16:13:30
 */ 
import { debounce } from '@/utils'

export default {
  data() {
    return {}
  },
  mounted() {
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.__resizeHandler)
  }
}
