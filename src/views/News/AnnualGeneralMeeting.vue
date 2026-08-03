<template>
  <Banner selected-nav="111003" title="News Releases" />
  <NavText />
  <div class="event-calendar">
    <PdfList :dataList="dataList" :pdfUrl="pdfUrl" />
  </div>
</template>

<script setup lang='ts'>

import { ref, onMounted } from 'vue';
import { getArticle } from '@/api/user'
import Banner from '@/components/Banner.vue'
import NavText from '@/components/NavText.vue'
const pdfUrl = import.meta.env.VITE_BASE_PDFEVENT
import PdfList from '@/components/PdfList.vue'

interface dataListF {
  c_time: string
  title: string
  names: string[]
}

const dataList = ref<dataListF[]>([])

const fetchUsers = async () => {
  try {
    const [articleRes] = await Promise.all([
      getArticle({ nav_no: '111004' })
    ]);
    dataList.value = articleRes.data
  } catch (error) {
    // Error handling
  }
}

onMounted(fetchUsers)
</script>
<style lang='scss' scoped>
.event-calendar {
  margin: 40px 0 50px 0;
}
</style>
