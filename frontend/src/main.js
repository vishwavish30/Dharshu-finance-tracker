import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './assets/styles.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import VueApexCharts from 'vue3-apexcharts'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Toast, {
  position: 'top-right',
  timeout: 3000,
  maxToasts: 3,
  newestOnTop: true,
})

app.use(VueApexCharts)

app.mount('#app')
