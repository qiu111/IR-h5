<template>
  <div class="about-banner"
    :style="{
      backgroundImage: bannerImg
        ? `url(${bannerImg})`
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }"
  >
    <p>{{ title }}</p>
  </div>
</template>

<script setup>
import { useBanner } from '@/composables/useBanner'

const props = defineProps({
  selectedNav: {
    type: String
  },
  title: {
    type: String
  }
})

const { bannerImg } = useBanner(props.selectedNav || '')
</script>

<style scoped>
.about-banner {
  height: 120px;
  width: 100%;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
}

.about-banner p {
  font-size: 34px;
  color: #ffffff;
  text-align: center;
  font-weight: bold;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
