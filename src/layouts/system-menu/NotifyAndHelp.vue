<!--
 * @Description: 消息通知 和 帮助中心
 * @Author: 幺五六
 * @Date: 2021-01-13 16:42:48
 * @LastEditors: 幺五六
 * @LastEditTime: 2021-03-15 10:05:54
-->

<template>
  <div class="p-4">
    <div v-if="verticalNavMenuItemsMin" class="flex flex-col items-left">
      <div style="padding: 10px 15px;">
        <feather-icon
          icon="BellIcon"
          class="text-white"
          :badgeClass="stateAlertMessage | alertColorFilter"
          :badge="stateAlertMessage.count"
          />
      </div>
      <div style="padding: 10px 15px;">
        <feather-icon
          icon="Volume2Icon"
          class="text-white"
          :badgeClass="'bg-primary'"
          :badge="12"
          />
      </div>
      <div style="padding: 10px 15px;">
        <feather-icon
          icon="HelpCircleIcon"
          class="text-white"
          />
      </div>
    </div>

    <div v-else class="flex items-center">
      <div
        class="cursor-pointer flex items-center hover:text-primary"
        @click="handleGoAlert"
        >
        <feather-icon
          icon="BellIcon"
          class="text-white"
          :badgeClass="stateAlertMessage | alertColorFilter"
          :badge="stateAlertMessage.count"
          />
        <p class="text-base -ml-2">告警</p>
      </div>
      <div class="bg-gray-700 w-px h-5 mx-2"></div>

      <div
        class="cursor-pointer flex items-center hover:text-primary"
        @click="handleViewMessage"
        >
        <feather-icon
          icon="Volume2Icon"
          class="text-white"
          :badgeClass="'bg-primary'"
          :badge="12"
          />
        <p class="text-base -ml-2">通知</p>
      </div>
      <div class="bg-gray-700 w-px h-5 mx-2"></div>

      <div
        class="cursor-pointer flex items-center hover:text-primary"
        @click="handleViewHelpDoc"
        >
        <feather-icon
          icon="HelpCircleIcon"
          class="text-white"
          />
        <p class="text-base -ml-2">帮助</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      stateAlertMessage: {
        count: 12,
        type: 'fault'
      }
    }
  },
  computed: {
    verticalNavMenuItemsMin() { return this.$store.state.app.verticalNavMenuItemsMin }
  },
  methods: {
    handleViewHelpDoc() {
    },
    handleViewMessage() {
    },
    handleGoAlert() {
    }
  },
  filters: {
    alertColorFilter(data) {
      const map = {
        fault: 'bg-danger',
        defect: 'bg-warning',
        alert: 'bg-primary'
      }
      return map[data.type];
    }
  }
}
</script>