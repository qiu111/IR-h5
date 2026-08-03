<template>
  <div class="app-head">
    <div class="logo-container">
      <a href="/"><img src="@/assets/vue.svg" alt="Demo Project Logo" /></a>
    </div>
    <van-icon class="logo-nav" name="bars" size="28" @click="showPopup" />
  </div>
  <van-popup v-model:show="show" position="right" :style="{ height: '100%', width: '70%' }">
    <div class="menu-item" v-for="menu in menus" :key="menu.id">
      <div class="menu-item-title" @click.stop="toggleSubMenu(menu)">
        <router-link
          v-if="menu.children.length === 0 && menu.type !== '1'"
          :to="menu.path"
          :class="{ 'active-link': isActive1(menu) }"
        >
          {{ menu.title }}
        </router-link>
        <a
          v-else-if="menu.children.length === 0 && menu.type === '1'"
          :href="menu.path"
          :class="{ 'active-link': isActive1(menu) }"
        >
          {{ menu.title }}
        </a>
        <span v-else :class="{ 'active-link': isActive1(menu) }">
          {{ menu.title }}
        </span>
        <van-icon
          v-if="menu.children.length !== 0"
          :name="menu.isOpen ? 'arrow-up' : 'arrow-down'"
          :class="{ rotate: menu.isOpen }"
          :size="20"
          @click.stop="toggleIcon(menu)"
        />
      </div>
      <transition-group name="menu-item">
        <ul v-show="menu.isOpen && menu.children.length > 0" :key="'submenu-' + menu.id">
          <li class="sub-menu" v-for="sub in menu.children" :key="sub.id">
            <router-link
              v-if="sub.type !== '1'"
              :to="sub.path"
              :class="{ 'active-link': isActive(sub) }"
            >
              {{ sub.title }}
            </router-link>
            <a
              v-else
              :href="sub.path"
              target="_blank"
              :class="{ 'active-link': isActive(sub) }"
            >
              {{ sub.title }}
            </a>
          </li>
        </ul>
      </transition-group>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useNav } from '@/composables/useNav'

const show = ref(false)
const showPopup = () => {
  show.value = true
}

interface SubMenu {
  id: number
  title: string
  path: string
  type: string
  children: SubMenu[]
  isOpen: boolean
}

interface MainMenu {
  id: number
  title: string
  children: SubMenu[]
  path: string
  type: string
  isOpen: boolean
}

type MenuItem = MainMenu | SubMenu

const menus = ref<MainMenu[]>([])
const route = useRoute()
const { loadNav } = useNav()

const activePath = ref(route.path)

onMounted(async () => {
  try {
    const data = await loadNav()
    menus.value = data.map((menu: any) => ({ ...menu, isOpen: false }))
  } catch (error) {
    console.error('Failed to load navigation:', error)
  }
})

watch(
  () => route.path,
  (newPath) => {
    activePath.value = newPath
  },
  { immediate: true }
)

const isActive1 = (item: MenuItem) => {
  if (item.children.length === 0) {
    return item.path === activePath.value
  }
  return false
}

const isActive = (item: MenuItem) => {
  return item.path === activePath.value
}

const toggleSubMenu = (item: MainMenu) => {
  item.isOpen = !item.isOpen
}

const toggleIcon = (menu: MenuItem) => {
  menu.isOpen = !menu.isOpen
}
</script>

<style>
.app-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  background-color: #ffffff;
  padding: 0 15px;
  box-sizing: border-box;
}

.app-head .logo-container {
  height: 56px;
  display: flex;
  align-items: center;
}

.app-head .logo-container img {
  height: 56px;
  width: auto;
  display: block;
}

.logo-nav {
  margin: 0;
}

.van-icon {
  transition: transform 0.3s ease;
  padding-right: 10px;
}

.van-icon.rotate {
  transform: rotate(360deg);
}

.menu-item .menu-item-title {
  border-bottom: 1px solid #e6e6e6;
  padding: 10px 0 15px 10px;
  display: flex;
  justify-content: space-between;
}

.menu-item ul li {
  border-bottom: 1px solid #e6e6e6;
  padding: 15px;
  margin: 0 20px;
}

.menu-item-title a {
  display: block;
}

.menu-item-title i {
  display: block;
  padding-right: 10px;
}

.active-link {
  color: #1989fa !important;
  font-weight: 500;
}
</style>
