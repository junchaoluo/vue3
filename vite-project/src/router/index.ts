import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import { userStore } from '@/store/user'
import { menuRoutes } from './menu'

export const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: '首页',
          component: () => import('@/pages/home/index.vue')
        },
        ...menuRoutes
      ]
    },
    {
        path: '/login',
		    name: '登录',
        component: () => import('@/pages/login/index.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    let token = userStore().token
    if(token) {
      next()
    }else{
      if(to.path !== '/login') {
        userStore().handleLogOut()
        next('/login')
      }else{
        next()
      }
    }
})

export default router