<!--
 * @Description: 
 * @Author: 幺五六
 * @Date: 2020-08-03 16:01:32
 * @LastEditors: 幺五六
 * @LastEditTime: 2020-09-10 16:39:30
--> 
<template>
  <div>
    <div
      v-if="text === ''"
      class="rounded-full"
      :class="[classColor]"
      :style="{'height': size, 'width': size, 'background-color': backgroundColor, 'border-radius': radius}"
      ></div>
    <div
      v-else
      class="wm-circle rounded-full px-2 text-center flex items-cener"
      :class="[classColor]"
      :style="{'color': textColor, 'background-color': backgroundColor, 'font-size': fontSize, 'border-radius': radius}"
      >
      <feather-icon class="mr-1" v-if="icon !== ''" :icon="icon" :svgClasses="['h-5 w-5']"></feather-icon>
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CircleStatus',
  data() {
    return {
      defaultColors: {
        'primary': 'rgba(var(--vs-primary), 1)',
        'success': 'rgba(var(--vs-success), 1)',
        'danger': 'rgba(var(--vs-danger), 1)',
        'warning': 'rgba(var(--vs-warning), 1)',
        'dark': 'rgba(var(--vs-dark), 1)',
        'blue': 'rgb(0, 131, 255)',

        'turbine1': 'rgb(38, 187, 174)',
        'turbine2': '#2ecc71',
        'turbine3': '#e74c3c',
        'turbine4': '#ff9f43',
        'turbine5': '#c28b6e',
        'turbine6': '#5c7996'
      }
    }
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    textColor: {
      type: String,
      default: '#fff'
    },
    icon: {
      type: String,
      default: ''
    },
    fontSize: {
      type: String,
      default: '1rem'
    },
    color: {
      type: String,
      default: 'primary'
    },
    classColor: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '12px'
    },
    borderRadius: {
      type: String,
      default: ''
    }
  },
  computed: {
    backgroundColor() {
      return this.defaultColors[this.color] || this.color
    },
    radius() {
      return `${this.borderRadius}!important`
    }
  }
}
</script>

<style lang="scss" scoped>
.wm-circle {
  width: max-content;
}
</style>