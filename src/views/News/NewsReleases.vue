<template>
  <Banner selected-nav="111001" title="News Releases" />
  <div class="container">
    <NavText />
    <div class="news-releases">
      <div class="widget-container">
        <div class="client_class">
          <!-- <h3>More News Releases are coming soon.</h3> -->
          <div class="wd_widget" data-wd_widget-id="testId" data-wd_widget-host="//example.test">
            <van-loading size="38px" class="vant-icon"/>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang='ts'>
import Banner from '@/components/Banner.vue'
import NavText from '@/components/NavText.vue'

</script>
<style>
.news-releases {
  margin: 40px 0 50px 0;
}

.wd_layout-carousel .wd_item {
  width: 100% !important;
  border-bottom: 1px solid #d4d4d4;
  border-left: 0 !important;
  height: 130px;
}

.wd_widget-theme-light .wd_layout-carousel {
  border: 0 !important;
  background-color: transparent;
}

.client_class .wd_widget .wd_layout-carousel .wd_item .wd_modal_link .wd_item_info .wd_item_title {
  font-size: 16px;
  font-weight: bold;
}

.wd_layout-carousel .wd_item_image {
  padding: 0 10px 0 0;
  border: 0;
  width: 120px;
  height: 120px;
  box-sizing: border-box;
}

.wd_widget-theme-light .wd_layout-carousel .wd_item_image img {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.wd_layout-carousel .wd_item_info {
  margin: 0 0 0 10px !important;
  height: auto;
}

.vant-icon {
  display: block;
  margin: 0 auto;
  width: 15%;
}
</style>
