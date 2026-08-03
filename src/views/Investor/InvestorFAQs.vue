<template>
  <Banner selected-nav="114001" title="Investor FAQs" />
  <div class="container">
    <NavText />
    <div class="investor-FAQs">
      <van-collapse v-model="activeNames">
        <van-collapse-item v-for="(item, index) in dataList" :title="item.title" :name="item.id" :key="index">
          <div v-html="item.content"></div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>

</template>

<script setup lang='ts'>

import { ref, onMounted } from 'vue';
import { getArticle } from '@/api/user'
import Banner from '@/components/Banner.vue'
import NavText from '@/components/NavText.vue'
import { decodeHtmlEntities } from '@/Utils/htmlUtils'

interface dataListF {
  id: string
  content: string
  title: string
}

const dataList = ref<dataListF[]>([])
const activeNames = ref<string[]>([])

const fetchUsers = async () => {
  try {
    const [articleRes] = await Promise.all([
      getArticle({ nav_no: '114001' })
    ]);
    dataList.value = articleRes.data
    // activeNames.value = [articleRes.data[0]?.id || ''] // 打开默认第一个折叠
    dataList.value.forEach(item => {
      item.content = decodeHtmlEntities(item.content)
    })
  } catch (error) {
    // Error handling
  }
}

onMounted(fetchUsers)
</script>
<style lang='scss' scoped>
.investor-FAQs {
  margin: 40px 0 50px 0;
}
</style>