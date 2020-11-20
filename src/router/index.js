import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/Home')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('@/views/my/My')
  },
  {
    path: '/qa',
    name: 'Qa',
    component: () => import('@/views/qa/Qa')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
