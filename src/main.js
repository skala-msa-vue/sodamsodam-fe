import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import 'krds-vue/styles'
import '@/assets/styles/global.css'
import '@/assets/styles/home.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
