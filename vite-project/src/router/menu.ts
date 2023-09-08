import { RouteRecordRaw } from 'vue-router'

export const menuRoutes: Array<RouteRecordRaw> = [
    {
        path: '/project',
        name: '项目',
        component: () => import('@/pages/project/index.vue')
    },
    {
        path: '/set',
        name: '设置',
        children: [
            {
            path: '/type',
            name: '实验类型',
            component: () => import('@/pages/set/type/index.vue')
            },
            {
            path: '/purpose',
            name: '实验目的',
            component: () => import('@/pages/set/purpose/index.vue')
            }
        ]
    }
]