import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/style/index.scss'

import '@arco-design/web-vue/dist/arco.css'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import router from '@/router'

const app = createApp(App)
app.use(ArcoVue, {})
app.use(ArcoVueIcon)

app.use(router)
app.mount('#app')
