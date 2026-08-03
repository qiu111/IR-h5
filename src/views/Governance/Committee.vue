<template>
    <Banner selected-nav="109004" title="Committee Composition" />
    <NavText />
    <div class="h5-table">
        <ul v-for="(item, index) in dataList" :key="index">
            <li class="h5-table-title">
                {{ item.name }}
                <van-icon name="star" v-if="item.isfinancial == 1" class="star-sty"/>
            </li>
            <li v-if="item.independent == 1">
                <van-icon name="success" v-if="item.independent == 1" />
                <a>Independent Non-Executive Director </a>
            </li>
            <li v-if="item.audit == 'Chairperson'">
                <van-icon name="user-o" v-if="item.audit == 'Chairperson'" />
                <van-icon name="user" v-else />
                <a>Audit Committee </a>
            </li>
            <li v-if="item.compensation == 'Chairperson'">
                <van-icon name="user-o" v-if="item.compensation == 'Chairperson'" />
                <van-icon name="user" v-else />
                <a>Compensation Committee </a>
            </li>
            <li v-if="item.nc == 'Chairperson'">
                <van-icon name="user-o" v-if="item.nc == 'Chairperson'" />
                <van-icon name="user" v-else />
                <a>Nominating and Corporate Governance Committee </a>
            </li>
        </ul>
        <div class="commitee-key">

            <p>
                <van-icon name="success" />
                = Independent Non-Executive Director</p>
            <p>
                <van-icon name="user-o" />
                =Chairperson</p>
            <p>
                <van-icon name="user" />
                =Member</p>
            <p>
                <van-icon name="star" />
                =Member</p>

        </div>
    </div>


</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import Banner from '@/components/Banner.vue'
import NavText from '@/components/NavText.vue'
import { committPosition } from '@/api/user'

interface dataListF {
    independent: number
    isfinancial: number
    name: string
    audit: string
    compensation: string
    nc: string
}

const dataList = ref<dataListF[]>([])

const fetchUsers = async () => {
    try {
        const dataRes = await committPosition()
        dataList.value = dataRes.data
    } catch (error) {
        // Error handling
      }
}

onMounted(fetchUsers)

</script>
<style lang='scss' scoped>
.h5-table {
    margin: 40px 20px 50px 20px;
}

.h5-table ul {
    margin-bottom: 20px;
    background-color: #f5f5f5;
    padding: 10px;
}

.h5-table ul li {
    margin-bottom: 10px;
    display: flex;
    justify-content: start;
}

.h5-table-title {
    font-weight: bold;
    font-size: 16px;
}

.h5-table ul li i {
    display: block;
}

.h5-table ul li a {
    display: block;
}

.commitee-key {
    padding-top: 1em;
    padding-bottom: 1em;
    font-size: 0.9em;
    vertical-align: bottom;
}

.commitee-key p {
    margin-bottom: 10px;
}
.star-sty{
    margin-left: 10px;
}
</style>
