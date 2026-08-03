<template>
  <Banner selected-nav="114002" title="IR Contact" />
  <div class="container">
    <NavText />
    <div class="ir-contact">
      <div v-for="(info, index) in dataList" :key="index" class="contact-info">
        <h4>{{ info.title }}</h4>
        <p v-html="info.content"></p>
      </div>
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
  content: string
  title: string
}

const dataList = ref<dataListF[]>([])

const fetchUsers = async () => {
  try {
    const [articleRes] = await Promise.all([
      getArticle({ nav_no: '114002' })
    ]);
    dataList.value = articleRes.data
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
.ir-contact {
  margin: 40px 0 50px 0;
}
.contact-info h4,
.contact-info p {
  font-size: 16px;
  color: #2b2d42;
  line-height: 30px;
}
</style>