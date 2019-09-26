import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './routers'
import { createStore } from './store/store'

import { sync } from 'vuex-router-sync'
import MetaInfo from 'vue-meta-info'
import axios from 'axios'
import './assets/css/reset.css'
Vue.use(MetaInfo)
Object.defineProperty(Vue.prototype, '$axios', { value: axios })
export function createApp(context) {
  const router = createRouter()
  const store = createStore()

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
