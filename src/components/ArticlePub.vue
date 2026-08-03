<template>
  <div class="pub-content">
    <div v-for="(data, index) in articles" :key="index">
      <div class="pub-content-title">{{ data.title }}</div>
      <div class="pub-details">
        <a>{{ data.sub_title }}</a>
        <p v-html="data.content"></p>
      </div>
      <van-divider :margin="12" :style="{ color: '#dee2e6', borderColor: '#dee2e6' }" />
    </div>
    <div v-if="loading" class="loading-state">Loading...</div>
    <van-empty v-else-if="articles.length === 0" description="No data" />
  </div>
</template>

<script setup lang="ts">
import { useArticle } from '@/composables/useArticle'

const props = defineProps({
  nav_no: {
    type: String,
    required: true
  }
})

const { articles, loading } = useArticle(props.nav_no)
</script>

<style scoped>
.pub-content {
  padding: 20px 20px 0 20px;
}

.pub-content-title {
  padding-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
}

.pub-details p {
  color: #2b2d42;
  line-height: 25px;
}

.pub-details p p {
  margin-bottom: 30px;
}

.pub-details p p:last-child {
  margin-bottom: 0;
}

.loading-state {
  text-align: center;
  padding: 40px;
  color: #999;
}
</style>
