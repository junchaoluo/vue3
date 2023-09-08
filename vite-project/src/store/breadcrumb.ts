import { defineStore } from 'pinia'
import {} from 'vue-router'

export const breadcrumbStore = defineStore({
    id: 'breadcrumb-store',
    state: () => {
        return {
            currentRoute: {}
        }
    },
    actions: {
        setCurrentRoute(currentRoute) {
            this.currentRoute = currentRoute
        }
    }
})