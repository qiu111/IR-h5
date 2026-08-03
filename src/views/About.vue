<template>
  <Banner selected-nav="115" title="ABOUT US" />
  <div class="about-content">
    <ArticleList :list="dataList" />
    <div
      class="about-content"
      v-for="(data, index) in dataList"
      :key="index"
      v-show="data.floor == '2'"
    >
      <div class="about-content-title">{{ data.title }}</div>
      <div class="about-details">
        <p v-html="data.content"></p>
        <div class="about-photo">
          <template v-for="(item, index) in data.names" :key="index">
            <!-- PDF 文件显示为链接 -->
            <a v-if="isPdfFile(item)" :href="item" class="file-link" target="_blank">{{ item }}</a>
            <!-- 图片文件使用占位符 -->
            <div v-else class="image-placeholder">{{ item }}</div>
          </template>
        </div>
      </div>
    </div>
    <div class="content-block" v-if="images.length !== 0">
      <div style="width: 100%">
        <div class="gundongBox">
          <div class="gundong">
            <div class="topgun">
              <div class="scroll-container">
                <!-- 初始图片 -->
                <div class="smallbox" v-for="(item, index) in images" :key="index">
                  <div class="carousel-placeholder">{{ item.bname }}</div>
                </div>
                <!-- 复制图片以实现无限滚动 -->
                <div class="smallbox" v-for="(item, index) in images" :key="'copy-' + index">
                  <div class="carousel-placeholder">{{ item.bname }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getArticle, getFooterPic } from '@/api/user'
import { decodeHtmlEntities } from '@/Utils/htmlUtils'
import Banner from '@/components/Banner.vue'
import ArticleList from '@/components/Article.vue'

// 判断是否为 PDF 文件
const isPdfFile = (filename: string) => {
  return filename.toLowerCase().endsWith('.pdf')
}

interface dataListF {
  title: string
  floor: string
  content: string
  names: string[]
}

const dataList = ref<dataListF[]>([])

const fetchUsers = async () => {
  try {
    const [articleRes] = await Promise.all([getArticle({ nav_no: '115' })])
    dataList.value = articleRes.data
    dataList.value.forEach((item) => {
      item.content = decodeHtmlEntities(item.content)
    })
  } catch (error) {
    // Error handling
  }
}

fetchUsers()

// 底部图片无缝滚动
interface imgList {
  bname: string
  c_time: string
  id: string
  navno: string
}
const images = ref<imgList[]>([])

const FooterPic = async () => {
  try {
    const dataR = await getFooterPic()
    images.value = dataR.data
  } catch (error) {
    // Error handling
  }
}

onMounted(FooterPic)
</script>
<style>
.about-content {
  width: 100%;
}

.about-content-title {
  padding: 90px 20px 20px 20px;
  font-size: 16px;
  font-weight: bold;
}

.about-details {
  padding: 20px;
}

.about-details p {
  color: #2b2d42;
  line-height: 25px;
}

.about-details p p {
  margin-bottom: 30px;
}

.about-details p p:last-child {
  margin-bottom: 0;
}

.about-photo {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 0;
}

/* 文件链接样式 */
.file-link {
  display: inline-block;
  padding: 8px 16px;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
}

.file-link:hover {
  background: #5568d3;
}

/* 图片占位符样式 */
.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
  background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
  border-radius: 8px;
  font-size: 12px;
  color: #999;
  text-align: center;
  padding: 10px;
  word-break: break-all;
}

/* 实现图片无限滚动start  */
.gundongBox {
  margin-top: 10px;
}

.gundongBox .gundong {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.gundongBox .gundong .topgun {
  height: 293px;
  display: flex;
  overflow: hidden;
}

.gundongBox .gundong .topgun .scroll-container {
  display: flex;
  animation: slide 30s linear infinite;
}

.gundongBox .gundong .topgun .scroll-container .smallbox {
  width: 400px;
  display: flex;
  margin-right: 15px;
}

/* 轮播占位符 */
.carousel-placeholder {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 14px;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  word-break: break-all;
}

.gundongBox .gundong .topgun .scroll-container:hover {
  cursor: pointer;
  animation-play-state: paused;
}

@keyframes slide {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-50%);
  }
}

@keyframes moves {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(0%);
  }
}

/* 实现图片无限滚动end  */
</style>
