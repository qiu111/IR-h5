<template>
  <Banner selected-nav="112003" title="Annual Reports" />
  <div class="container">
    <NavText />
    <div class="Annual_Reports">
      <PdfList :dataList="dataList" :pdfUrl="pdfUrl" />
    </div>
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
      getArticle({ nav_no: '112003' })
    ]);
    dataList.value = articleRes.data
  } catch (error) {
    // Error handling
  }
}

onMounted(fetchUsers)
</script>
<style lang='scss' scoped>
.Annual_Reports {
  margin: 40px 20px 50px 20px;
}
</style>
