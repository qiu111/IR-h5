<template>
  <div class="app-container">
    <header class="app-header"><Nav></Nav></header>
    <main class="main-content">
      <router-view></router-view>
    </main>
    <footer class="app-footer">
      <Footer></Footer>
    </footer>
    <van-back-top
      right="20px"
      bottom="60px"
      visibility-height="200"
    >
      <div class="custom-back-top">
        Top
      </div>
    </van-back-top>
  </div>
</template>

<script lang="ts">
import Nav from './views/Nav.vue';
import Footer from './views/Footer.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    Nav,
    Footer
  },
})
</script>

<style>
a {
  text-decoration: none;
  color: #333;
}

a,
img {
  border: 0;
}

dl,
dt,
dd {
  display: block;
  margin: 0;
}

body,
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  border: 0;
  font-size: 14px;
  font-family: PingFang SC, Lantinghei SC, Helvetica Neue, Helvetica, Arial, Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", STHeitiSC-Light, simsun, "\5B8B\4F53", WenQuanYi Zen Hei, WenQuanYi Micro Hei, "sans-serif";
}

p {
  margin: 0;
  padding: 0;
  list-style: none;
  border: 0;
}

img {
  display: block;
}

#app {
  width: 100%;
  margin: 0 auto;
}

.container {
  padding: 0 15px;
  margin: 0 auto;
}

.client_class h3 {
  font-size: 20px;
  font-weight: normal;
}
 /* Flex 布局 */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #fff;
}

.main-content {
  flex: 1;
  padding-top: 72px;
}

.app-footer {
  background-color: #f7f8fa;
  text-align: center;
}
.custom-back-top {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #ef233c;
  color: white;
  border-radius: 50%;
}
</style>