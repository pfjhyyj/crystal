import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@/assets/style/index.scss'

import '@arco-design/web-vue/dist/arco.css'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import router from '@/router'
import directive from '@/directive'

import './mock'

const app = createApp(App)
const pinia = createPinia()
app.use(ArcoVue, {})
app.use(ArcoVueIcon)

app.use(pinia)
app.use(router)
app.use(directive)

app.mount('#app')
