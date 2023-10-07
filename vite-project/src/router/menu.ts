import { RouteRecordRaw } from 'vue-router'

export const menuRoutes: Array<RouteRecordRaw> = [
    {
        path: '/project',
        name: '项目',
        meta: {
            isMenu: true,
            isNav: true
        },
        component: () => import('@/pages/project/index.vue')
    },
    {
        path: '/project/add',
        name: '新增项目',
        meta: {
            isMenu: false,
            isNav: false,
        },
        component: () => import('@/pages/project/add-project/index.vue')
    },
    {
        path: '/project/view',
        name: '查看项目',
        meta: {
            isMenu: false,
            isNav: false,
        },
        component: () => import('@/pages/project/view-project/index.vue')
    },
    {
        path: '/set',
        name: '设置',
        meta: {
            isMenu: false,
            isNav: true
        },
        children: [
            {
                path: '/set/type',
                name: '实验类型',
                meta: {
                    isMenu: true
                },
                component: () => import('@/pages/set/type/index.vue')
            },
            {
                path: '/set/purpose',
                name: '实验目的',
                meta: {
                    isMenu: true
                },
                component: () => import('@/pages/set/purpose/index.vue')
            }
        ]
    }
]