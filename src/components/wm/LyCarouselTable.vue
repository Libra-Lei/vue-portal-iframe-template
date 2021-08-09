<!--
 * @Description: 轮播表
 * @Author: 幺五六
 * @Date: 2020-08-24 14:19:55
 * @LastEditors: 幺五六
 * @LastEditTime: 2020-12-19 14:43:22
-->
<template>
  <div class="relative">
    <transition-group name="list-complete" tag="div">
      <div
        class="alpha-bg flex items-center justify-between p-2 my-2 list-complete-item"
        v-for="item in list"
        :key="item.id">
        <div>
          <div class="flex items-center">
            <img
              v-if="item.icon"
              class="w-6 mr-2"
              v-lazy="item.icon">
            <h1 class="text-base">{{ item.title }}</h1>
          </div>
          <span class="text-sm">{{ item.sub }}</span>
          <p class="text-sm">{{ item.tertiary }}</p>
        </div>
        <LyCircleStatus
          v-show="item.status"
          class="mr-8"
          :text="item.status? item.status.text : ''"
          :icon="item.status? item.status.icon : ''"
          :classColor="`${item.status? item.status.color : ''} bg-opacity-15`"
          />
      </div>
    </transition-group>
  </div>
</template>

<script>
import LyCircleStatus from '@/components/wm/LyCircleStatus'

export default {
  components: { LyCircleStatus },
  props: {
    list: {
      type: Array,
      default: () => { return [] }
    }
  }
}
</script>

<style lang="scss" scoped>
.alpha-bg {
  background-color: rgba(21, 40, 78, .2);
}
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  width: 100%;
  margin-right: 10px;
}
.list-complete-enter
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>