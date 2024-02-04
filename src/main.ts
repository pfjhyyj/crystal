import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@/assets/style/index.scss'

import '@arco-design/web-vue/dist/arco.css'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import router from '@/router'
import directive from '@/directive'

const app = createApp(App)
app.config.errorHandler = function (err: any, _vm: any, info: any) {
  console.error(`Error: ${err.toString()}\nStack: ${err.stack}\nInfo: ${info}`)
}

const pinia = createPinia()
app.use(ArcoVue, {})
app.use(ArcoVueIcon)

app.use(pinia)
app.use(router)
app.use(directive)

app.mount('#app')
