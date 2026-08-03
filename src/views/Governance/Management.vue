<template>
  <Banner selected-nav="109001" title="Management" />
  <NavText />
  <div class="management-content">
    <ArticlePub nav_no="109001" />
  </div>

</template>

<script setup lang='ts'>
import Banner from '@/components/Banner.vue'
import NavText from '@/components/NavText.vue'
import ArticlePub from '@/components/ArticlePub.vue'


</script>
<style>
.management-content{
  margin: 40px 0 50px 0;
}
</style>
