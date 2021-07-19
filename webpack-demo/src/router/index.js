import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../view/detail.vue')
  }
]
const router = new VueRouter({
  routes,
})

export default router