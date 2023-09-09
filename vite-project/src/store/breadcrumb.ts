import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'

export const breadcrumbStore = defineStore({
    id: 'breadcrumb-store',
    state: () => {
        return {
            currentRoute: <RouteRecordRaw>{}
        }
    },
    actions: {
        setCurrentRoute(currentRoute: RouteRecordRaw) {
            this.currentRoute = currentRoute
        }
    }
})