<template>
    <div class="nav-text">{{router.currentRoute.value.name}}</div>
</template>
  
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
  
<style scoped>
.nav-text{
  color: #606266;
  margin: 20px 10px;
}
</style>