<template>
  <Banner selected-nav="112002" title="Quarterly Results" />
  <div class="container">
    <NavText />
    <div class="Quarterly_Results client_class">
      <h3 v-if="!dataList || dataList.length === 0">Financial Reports are temporarily unavailable.</h3>
      <!-- <van-dropdown-menu>
        <van-dropdown-item v-model="searchYear" :options="yearList" />
      </van-dropdown-menu> -->
      <van-collapse v-model="activeNames" v-else>
        <van-collapse-item v-for="(item, index) in dataList" :title="item.title" :name="item.id" :key="index">
          <div class="file-link" v-for="file in item.names">
            <a :href="`${pdfUrl}` + file" target="_blank">
              <van-icon name="comment" style="color: red; font-size: 18px;" />
              {{ file }}</a>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script setup lang='ts'>
// import { ref, onMounted, computed } from 'vue';
import { ref, onMounted } from 'vue';
import { getArticle } from '@/api/user'
import Banner from '@/components/Banner.vue'
import NavText from '@/components/NavText.vue'
const pdfUrl = import.meta.env.VITE_BASE_PDFEVENT

interface dataListF {
  id: string
  title: string
  names: string[]
}

// interface YearItem {
//   text: string
//   value: string
// }

const dataList = ref<dataListF[]>([])
const activeNames = ref<string[]>([])

const fetchUsers = async () => {
  try {
    const [articleRes] = await Promise.all([
      getArticle({ nav_no: '112002' })
    ]);
    dataList.value = articleRes.data
    activeNames.value = [articleRes.data[0]?.id || ''] // 打开默认第一个折叠
  } catch (error) {
    // Error handling
  }
}

// const searchYear = ref<string>('')

// const yearList = computed(() => {
//   const currentYear = new Date().getFullYear()
//   const years: YearItem[] = []

//   // 从当前年份前推3年（包含当前年共4年）
//   for (let i = 0; i < 4; i++) { // 修改循环条件生成4个年份
//     years.push({
//       text: (currentYear - i).toString(),
//       value: (currentYear - i).toString()
//     })
//   }

//   if (years.length > 0) {
//     searchYear.value = years[0].value
//   }
//   return years
// })
// console.log(yearList.value);

onMounted(fetchUsers)
</script>
<style lang='scss' scoped>
.Quarterly_Results {
  margin: 40px 0 50px 0;
}
</style>
