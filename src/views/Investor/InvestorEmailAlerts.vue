<template>
  <Banner selected-nav="114003" :title="bannerTitle" />
  <div class="container">
    <div class="ir-contact">
      <h2>{{ title }}</h2>
      <div class="module_container">
        <p v-html="content"></p>
      </div>
    </div>
  </div>

</template>

<script setup lang='ts'>
import Banner from '@/components/Banner.vue'
import { ref, computed, onMounted } from 'vue'

type ValidId = '1' | '2' | '3';

const id = ref<ValidId>('1');
// const nav_no = ref('114002');

// 映射对象
const titleMap = {
  '1': 'Email Alert Sign Up Confirmation',
  '2': 'Email Alert Sign Up Confirmation',
  '3': 'Email Alert Sign Up Unconfirmation'
} as const;

const bannerTitleMap = {
  '1': 'Email Alert Confirmation',
  '2': 'Email Alert Confirmation',
  '3': 'Email Alert Confirmation'
} as const;

const contentMap = {
  '1': 'Thank you for subscribing to our email alerts. We\'ve sent an activation email to the address you provided—please check your inbox and click the activation link to complete your subscription.',
  '2': 'Thank you. Your subscription preferences have been successfully activated.',
  '3': 'You have successfully been removed from all Company email alert lists.',
} as const;

// 初始化
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const paramId = urlParams.get('id');

  if (paramId === '1' || paramId === '2' || paramId === '3') {
    id.value = paramId;
  }
});

// 计算属性
const title = computed(() => titleMap[id.value]);
const bannerTitle = computed(() => bannerTitleMap[id.value]);
const content = computed(() => contentMap[id.value]);
</script>
<style lang='scss' scoped>
.ir-contact {
  margin: 40px 0 50px 0;
}

.ir-contact h2 {
  font-size: 24px;
  font-weight: normal;
  color: #2b2d42;
}

.module_container p {
  font-size: 18px;
  margin: 16px 0;
  color: #15610f;
  font-weight: 600;
  line-height: 30px;
}
</style>