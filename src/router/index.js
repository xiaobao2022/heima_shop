import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/Layout'


Vue.use(VueRouter)
const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/Home/index')
    }]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
