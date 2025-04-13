import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import './assets/main.css'

// Views
import HomeView from './views/HomeView.vue'
import ModelDetailsView from './views/ModelDetailsView.vue'
import UserModelsView from './views/UserModelsView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/model/:id', component: ModelDetailsView, props: true },
  { path: '/user/:userId', component: UserModelsView, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.use(PrimeVue, { ripple: false }) // Disable ripple for cleaner style
app.mount('#app')