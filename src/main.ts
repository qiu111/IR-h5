import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { RequestPlugin } from '@/plugins/request'
import { MockPlugin } from '@/plugins/mock'

import Vant from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(router)
app.use(Vant)
app.use(RequestPlugin)
app.use(MockPlugin)

// Mobile adaptation
const rootValue = 16
const rootWidth = 390
const deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = deviceWidth * rootValue / rootWidth + 'px'

app.mount('#app')
