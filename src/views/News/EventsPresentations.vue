<template>
  <Banner selected-nav="111003" title="News Releases" />
  <div class="container">
    <NavText />
    <div class="event-calendar">
      <div class="custom-table">
        <div class="table-header">
          <div class="header-cell">Date</div>
          <div class="header-cell">Title And Summary</div>
          <div class="header-cell">Presentation</div>
        </div>
        <div class="table-body" v-if="tableData.length > 0">
          <div v-for="(item, index) in tableData" :key="index" class="table-row">
            <div class="body-cell">{{ item.c_time }}</div>
            <div class="body-cell">{{ item.title }}</div>
            <div class="body-cell" v-for="file in item.names" :key="file"><a :href="`${pdfUrl}` + file" target="_blank">{{ file }}</a></div>
          </div>
        </div>
        <div class="table-body" v-else>
          <van-empty description="No data" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>

import { ref, onMounted } from 'vue';
import { getArticle } from '@/api/user'
import Banner from '@/components/Banner.vue'
import NavText from '@/components/NavText.vue'
const pdfUrl = import.meta.env.VITE_BASE_PDFEVENT
// import PdfList from '@/components/PdfList.vue'

interface dataListF {
  c_time: string
  title: string
  names: string[]
}

const tableData = ref<dataListF[]>([])

const fetchUsers = async () => {
  try {
    const [articleRes] = await Promise.all([
      getArticle({ nav_no: '111003' })
    ]);
    tableData.value = articleRes.data
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

.table-header,
.table-row {
  display: flex;
  justify-content: start;
  border-bottom: 1px solid #ebeef5;
  padding: 15px 0;
  color: #909399;
}

.header-cell,
.body-cell {
  width: 33.3%;
  text-align: center;

}
</style>
