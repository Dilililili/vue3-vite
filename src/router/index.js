import {createRouter, createWebHistory} from "vue-router"

const routes = [
  {path: '/', component: () => import("@view/index.vue")},
  {path: '/index', name: 'index', component: () => import("@view/index.vue")},
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  return true
})

export default router