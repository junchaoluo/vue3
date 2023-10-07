import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from '@/router/index'
import vueResizeObserver from 'vue-resize-observer'
import 'element-plus/dist/index.css'

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(vueResizeObserver)
app.mount('#app')
