<template>
    <div class="article-list">
        <div class="home-content" v-for="(item, index) in propList" :key="index" v-show="item.floor == '1'">
            <div class="home-content-title">{{ item.title }}</div>
            <div class="about-details">
                <p v-html="decodedContent(item.content)"></p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed, type PropType } from 'vue'
import { decodeHtmlEntities } from '@/Utils/htmlUtils'

// 定义组件props
const props = defineProps({
    list: {
        type: Array as PropType<Array<{
            title: string
            floor: string
            content: string
            names: string[]
        }>>,
        required: true
    }
})

// 提供解码方法给插槽使用
const emit = defineEmits(['contentDecoded'])
const decodedContent = (content: string) => {
    const decoded = decodeHtmlEntities(content)
    emit('contentDecoded', { content: decoded, original: content })
    return decoded
}

// 提供过滤后的列表给插槽
const propList = computed(() => props.list.filter(item => item.floor))

</script>

<style scoped>
.home-content {
    padding: 50px 0;
}

.home-content-title {
    text-align: center;
    margin-bottom: 30px;
    color: #ef233c;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: bold;
    font-size: 13px;
}

.about-details {
    text-align: center;
    font-size: 17px;
    padding: 0 15px;
}

.about-details p {
    color: #666 !important;
    line-height: 25px;
    margin-bottom: 30px;
}
</style>