<!--
 * @Description: 版权信息
 * @Author: 幺五六
 * @Date: 2021-01-13 16:38:31
 * @LastEditors: 幺五六
 * @LastEditTime: 2021-01-13 16:39:41
-->

<template>
  <div>
    <div v-if="!verticalNavMenuItemsMin" class="flex flex-col items-start p-4">
      <h1 class="text-primary text-base mb-2">新能源智慧资管平台</h1>
      <span class="text-xs -ml-5" style="transform: scale(0.85);">© COPYRIGHT 2020 ALL RIGHTS RESERVED</span>
      <span class="text-xs -ml-2" style="transform: scale(0.85);">鄂ICP备10018818号</span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    verticalNavMenuItemsMin() { return this.$store.state.app.verticalNavMenuItemsMin }
  }
}
</script>