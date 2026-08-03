<template>
  <Banner selected-nav="112001" title="SEC Filings" />
  <div class="container">
    <NavText />
    <div class="SEC_Filings">
      <div class="client_class">
        <!-- <h3>SEC filings are temporarily unavailable.</h3> -->
        <div class="wd_widget" data-wd_widget-id="testId" data-wd_widget-host="//example.test">
          <van-loading size="38px" class="vant-icon"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang='ts'>
import Banner from '@/components/Banner.vue'
import NavText from '@/components/NavText.vue'
</script>
<style lang='scss'>
.SEC_Filings {
  margin: 40px 0 50px 0;
}

.vant-icon {
  display: block;
  margin: 0 auto;
  width: 15%;
}

/* API styles */
.wd_widget-theme-light {
  font-size: 16px;
}

select {
  appearance: none;
  background-position: calc(100% - 25px) 50%;
  background-repeat: no-repeat;
  font-family: "Gordita";
  width: 83%;
  border: 0;
  background-color: #f7f7f7;
  line-height: 24px;
  font-weight: 300;
  height: 50px;
  padding: 10px 44px 10px 21px;
  color: #52565b;
  border-radius: 0;
  max-width: 500px;
}

.wd_filings_category {
  font-size: 16px !important;
}
.wd_document_format{
  display: flex;
}
</style>