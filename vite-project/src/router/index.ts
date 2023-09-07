import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import Vue from 'vue'

export const routes: Array<RouteConfig> = [
    {
        path: '/login',
		name: 'login',
        component: () => import('@/pages/login/index.vue')
    },
    {
        path: '/home',
        name: 'home',
        redirect: '/home/index',
        component: Layout,
        children: [
          {
            path: 'index',
            name: 'homeIndex',
            meta: {
              title: '首页'
            },
            component: () => import('@/pages/home/index.vue')
          }
        ]
      },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    console.log(to, from, next)
    next()
})

export default router