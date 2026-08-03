<template>
    <div class="event-calendar">
      <div v-if="lastMonthData.length > 0">
        <h3>Upcoming Events</h3>
        <div class="event-list" v-for="item in lastMonthData">
          <div class="news-date-time">{{ item.c_time }}</div>
          <div class="file-link" v-for="file in item.names">
            <div class="event-title"><a :href="`${pdfUrl}` + file" target="_blank">{{ item.title }}</a></div>
            <a :href="`${pdfUrl}` + file" target="_blank">
              <van-icon name="comment" style="color: red; font-size: 18px;" />
              {{ file }}</a>
          </div>
        </div>
      </div>
      <div class="past-event" v-if="priorMonthsData.length > 0">
        <h3 style="padding-top: 2rem;">Past Events</h3>
        <div class="event-list" v-for="item in priorMonthsData">
          <div class="news-date-time">{{ item.c_time }}</div>
          <div class="file-link" v-for="file in item.names">
            <div class="event-title"><a :href="`${pdfUrl}` + file" target="_blank">{{ item.title }}</a></div>
            <a :href="`${pdfUrl}` + file" target="_blank">
              <van-icon name="comment" style="color: red; font-size: 18px;" />
              {{ file }}</a>
          </div>
        </div>
      </div>
      <div v-else class="client_class">
        <h3>More Events are coming soon.</h3>
      </div>
    </div>
</template>
  
<script setup lang="ts">
import { defineProps, computed, type PropType } from 'vue'
const pdfUrl = import.meta.env.VITE_BASE_PDFEVENT
// 定义组件props
const props = defineProps({
    lastMonthData: {
        type: Array as PropType<Array<{
            c_time: string
            title: string
            names: string[]
        }>>,
        required: true
    },
    priorMonthsData: {
        type: Array as PropType<Array<{
            c_time: string
            title: string
            names: string[]
        }>>,
        required: true
    }
})
// 提供过滤后的列表给插槽
const lastMonthData = computed(() => props.lastMonthData)
const priorMonthsData = computed(() => props.priorMonthsData)
</script>
  
<style scoped>
.nav-text{
  color: #606266;
  margin: 20px 0 80px 0;
  font-size: 16px;
}
</style>