<template>
    <Banner selected-nav="109002" title="Board of Directors" />
    <NavText />
    <div class="board-content">
        <ArticlePub nav_no="109002" />
    </div>
  
  </template>
  
  <script setup lang='ts'>
  import Banner from '@/components/Banner.vue'
  import NavText from '@/components/NavText.vue'
  import ArticlePub from '@/components/ArticlePub.vue'
  
  </script>
  <style>
  .board-content{
    margin: 40px 0 50px 0;
  }
  </style>
  