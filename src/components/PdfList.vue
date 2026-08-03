<template>
    <div class="event-list-container">
        <div class="event-list" v-for="item in dataList">
            <div class="news-date-time">{{ item.c_time }}</div>
            <div class="event-title">{{ item.title }}</div>
            <div class="news-date-content">
                <div class="file-link" v-for="file in item.names">
                    <a :href="`${pdfUrl}` + file" target="_blank">
                        <van-icon name="comment" style="color: red; font-size: 18px;" />
                        {{ file }}</a>
                </div>
            </div>
            <van-divider :margin="12" :style="{ color: '#dee2e6', borderColor: '#dee2e6' }" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
// 定义组件props
const props = defineProps({
    dataList: {
        type: Array as () => Array<{
            c_time: string
            title: string
            names: string[]
        }>,
        required: true
    },
    pdfUrl: {
        type: String,
        default: ''
    }
})
// 提供过滤后的列表给插槽
const dataList = computed(() => props.dataList)
const pdfUrl = computed(() => props.pdfUrl)
</script>

<style scoped>
.event-list{
    display: flex;
    justify-content: start;
}
.event-title{
    margin: 0 5%;
}
.event-list,
.news-date-time,
.event-title {
    margin-bottom: 20px;
}

.event-list .file-link a {
    font-weight: bold;
    color: #8d8989;
}

.event-list .file-link a:hover {
    color: #ef233c;
}
</style>