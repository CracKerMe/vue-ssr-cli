import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('../views/Home.vue')

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [{ path: '/', component: Home },
    { path: '/singer/:id', component: () => import('../views/Singer.vue') }]
  })
}
