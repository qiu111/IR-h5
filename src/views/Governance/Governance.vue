<template>
    <Banner selected-nav="109003" title="Governance Documents" />
    <NavText />
    <div class="Governance-content">
        <div class="Governance-widget" v-for="item in dataList">
            <h5>{{ item.title }}</h5>
            <div class="Governance-widget-content">
                <div class="Governance-widget-item" v-for="file in item.names">
                    <a :href="`${pdfUrl}` + file" type="application/pdf">
                        <van-icon name="comment" style="color: red; font-size: 18px;" />
                        <span>{{ file }}</span></a>
                </div>
            </div>
            <van-divider :margin="12" :style="{ color: '#dee2e6', borderColor: '#dee2e6' }" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import Banner from '@/components/Banner.vue'
import NavText from '@/components/NavText.vue'
import { getArticle } from '@/api/user'
const pdfUrl = import.meta.env.VITE_BASE_PDF

interface dataListF {
    title: string
    floor: string
    content: string
    names: string[]
}

const dataList = ref<dataListF[]>([])

const fetchUsers = async () => {
    try {
        const [articleRes] = await Promise.all([
            getArticle({ nav_no: '109003' })
        ]);
        dataList.value = articleRes.data
    } catch (error) {
        // Error handling
      }
}

onMounted(fetchUsers)

</script>
<style lang='scss' scoped>
.Governance-content {
    margin: 40px 20px 50px 20px;
}

.Governance-widget h5 {
    font-size: 16px;
    font-weight: bold;
}

.Governance-widget-item a {
    display: block;
    margin-bottom: 20px;
}
</style>