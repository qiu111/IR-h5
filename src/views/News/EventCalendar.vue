<template>
  <Banner selected-nav="111002" title="Event Calendar" />
  <div class="container">
    <NavText />
    <div class="event-calendar">
      <div v-if="upcoming.length > 0">
        <h3>Upcoming Events</h3>
        <div class="event-list" v-for="item in upcoming" :key="item.id || item.title">
          <div class="news-date-time">{{ item.c_time }}</div>
          <div class="file-link" v-for="file in item.names">
            <div class="event-title">
              <a :href="`${pdfUrl}${file}`" target="_blank">{{ item.title }}</a>
            </div>
            <a :href="`${pdfUrl}${file}`" target="_blank">
              <van-icon name="comment" style="color: red; font-size: 18px" />
              {{ file }}
            </a>
          </div>
        </div>
      </div>
      <div class="past-event" v-if="past.length > 0">
        <h3 style="padding-top: 2rem">Past Events</h3>
        <div class="event-list" v-for="item in past" :key="item.id || item.title">
          <div class="news-date-time">{{ item.c_time }}</div>
          <div class="file-link" v-for="file in item.names">
            <div class="event-title">
              <a :href="`${pdfUrl}${file}`" target="_blank">{{ item.title }}</a>
            </div>
            <a :href="`${pdfUrl}${file}`" target="_blank">
              <van-icon name="comment" style="color: red; font-size: 18px" />
              {{ file }}
            </a>
          </div>
        </div>
      </div>
      <div v-if="articles.length === 0 && !loading" class="client_class">
        <h3>More Events are coming soon.</h3>
      </div>
      <div v-if="loading" class="loading-state">Loading...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Banner from '@/components/Banner.vue'
import NavText from '@/components/NavText.vue'
import { useArticle } from '@/composables/useArticle'
import { useDateSeparator } from '@/composables/useDateSeparator'

const pdfUrl = import.meta.env.VITE_BASE_PDFEVENT || ''

const { articles, loading } = useArticle('111002')

const { upcoming, past } = useDateSeparator(articles)
</script>

<style lang="scss" scoped>
.event-calendar {
  margin: 40px 0 50px 0;
}

.loading-state {
  text-align: center;
  padding: 40px;
  color: #999;
}
</style>
