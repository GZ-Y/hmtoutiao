import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/',
    component: () => import('@/views/layout/Layout'),
    children:[
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/Home'),
        keepAlive: true
      },
      {
        path: '/qa',
        name: 'Qa',
        component: () => import('@/views/qa/Qa')
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('@/views/my/My')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login')
  },
  
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search/Search')
  },
  {
    path: '/articles/:article_id',
    name: 'Articles',
    component: () => import('@/views/articles/Articles'),
    props:true,
  },
  {
    path: '/info',
    name: 'Info',
    component: () => import('@/views/info/Info')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
