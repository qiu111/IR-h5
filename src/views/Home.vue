<template>
  <div
    class="home-banner"
    :style="
      bannerImg
        ? { backgroundImage: `url(${bannerImg})` }
        : { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }
    "
  >
    <span v-if="!bannerImg" class="home-banner-title">Demo Project</span>
  </div>
  <div class="container">
    <ArticleList :list="articles" />
    <router-link to="/about?nav_no=115" class="home-btn">MORE ABOUT US</router-link>
  </div>

  <div class="content-tips">
    <div class="row">
      <div class="client_class stock-mini">
        <div class="wd_widget" data-wd_widget-id=" " data-wd_widget-host="//example.test">
          <van-loading size="38px" class="vant-icon" />
        </div>
        <a href="/StockQuoteChart">STOCK INFO</a>
      </div>
    </div>
  </div>

  <div class="content">
    <div class="row client_class">
      <div v-if="upcoming.length > 0 || past.length > 0">
        <EventCalendar :lastMonthData="upcoming.length ? [upcoming[0] as any] : []" :priorMonthsData="past.length ? [past[0] as any] : []" />
      </div>
      <div v-else class="h-style">
        <h3>Past Events</h3>
        <p>More Events are coming soon.</p>
      </div>
      <a href="/eventCalendar" class="rows-btn">
        <van-icon name="share-o" />
        View all
      </a>
    </div>
  </div>

  <div class="content content-tips">
    <div class="row client_class">
      <div class="h-style">
        <h3>News Releases</h3>
        <p>More News Releases are coming soon.</p>
      </div>
      <div class="wd_widget" data-wd_widget-id="testId" data-wd_widget-host="//example.test">
        <van-loading size="38px" class="vant-icon" />
      </div>
      <a href="/newsReleases" class="rows-btn">
        <van-icon name="share-o" />
        View all
      </a>
    </div>
  </div>

  <div class="content">
    <div class="row client_class">
      <div class="h-style">
        <h3>Financial Reports</h3>
      </div>
      <div class="client_class">
        <p v-if="quarterlyReports.length === 0" class="h-style">Financial Reports are temporarily unavailable.</p>
        <template v-else>
          <a v-for="file in quarterlyReports[0].names" :href="`${pdfUrl}${file}`" target="_blank">
            <i class="el-icon-document" style="color: red; font-size: 18px"></i>
            {{ file }}
          </a>
        </template>
        <a href="/quarterlyResults" class="rows-btn">
          <van-icon name="share-o" />View all
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBanner } from '@/composables/useBanner'
import { useArticle } from '@/composables/useArticle'
import { useDateSeparator } from '@/composables/useDateSeparator'
import ArticleList from '@/components/Article.vue'
import EventCalendar from '@/components/PastEvents.vue'

const pdfUrl = import.meta.env.VITE_BASE_PDFEVENT || ''

const { bannerImg } = useBanner('110')

const { articles } = useArticle('110')

const { articles: quarterlyReports } = useArticle('112002')

const eventArticles = useArticle('111002').articles
const { upcoming, past } = useDateSeparator(eventArticles)
</script>

<style lang="scss">
.home-banner {
  width: 100%;
  height: 200px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-banner-title {
  color: #ffffff;
  font-size: 36px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.home-btn {
  background-color: #8d99ae;
  font-weight: 500;
  color: #fff;
  padding: 15px 10px;
  border: 0;
  display: block;
  letter-spacing: 1px;
  height: auto;
  margin: 0 auto;
  width: 40%;
  text-align: center;
}

.home-btn:hover {
  background-color: #ef233c;
  font-weight: bold;
}

.content-tips {
  background-color: #f7f7f7;
}

.row {
  width: 92%;
  margin: 20px auto;
  padding: 4%;
}

.stock-mini a {
  display: block;
  padding: 0px 40px;
  background-color: #ef233c;
  border-radius: 4px;
  color: #fff;
  height: 45px;
  line-height: 45px;
  text-align: center;
  margin-top: 50px;
}

.h-style {
  color: #2b2d42;
  font-size: 18px;
  padding-bottom: 20px;
}

.rows-btn {
  padding: 10px 15px;
  background-color: #f9f9f9;
  border: 2px solid #5F6464;
  box-sizing: border-box;
  border-radius: 4px;
  color: #666;
  margin-top: 20px;
  width: 100%;
  text-align: center;
  display: inline-block;
  font-size: 18px;
}

.rows-btn i {
  margin-left: 5px;
}

.rows-btn:hover {
  background-color: #ef233c;
  border: 2px solid #ef233c;
  color: #fff;
  font-weight: bold;
}

.content {
  padding: 20px 0;
}

/* API styles */
.wd_layout-carousel,
.wd_item {
  background-color: #f7f7f7 !important;
  border: 0 !important;
}

.wd_item {
  display: none !important;
}

.wd_item:nth-child(-n + 3) {
  display: block !important;
}

.wd_layout-carousel .wd_item,
.wd_item_info {
  height: auto !important;
  width: auto !important;
}

.wd_item_info {
  display: flex !important;
  justify-content: start !important;
  height: 43px !important;
  overflow: hidden !important;
  border-bottom: 1px solid #ebeef5 !important;
}

.wd_item_date {
  width: 30%;
}

.wd_item_title {
  width: 70%;
}

.stock-mini {
}

.stock-mini .wd_widget {
  width: 80%;
}

.client_class .wd_widget .wd_quote-wrapper {
  margin: 20px auto;
  max-width: none;
}

.wd_quote {
  background-color: #f7f7f7 !important;
  border: 0 !important;
}

.wd_item_link_block {
  font-size: 16px !important;
}
</style>
