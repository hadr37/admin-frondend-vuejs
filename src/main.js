import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'  // default CoreUI icons

import DocsComponents from '@/components/DocsComponents'
import DocsExample from '@/components/DocsExample'
import DocsIcons from '@/components/DocsIcons'

// buat app
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(CoreuiVue)

// sediakan semua ikon ke CoreUI
app.provide('icons', icons)

// daftar komponen global
app.component('CIcon', CIcon)
app.component('DocsComponents', DocsComponents)
app.component('DocsExample', DocsExample)
app.component('DocsIcons', DocsIcons)

// mount app
app.mount('#app')
