import { defineStore } from 'pinia'

export const appStore = defineStore({
    id: 'app-store',
    state: () => ({
        newVersion: false
    }),
    actions: {
        setNewVersion(flag: boolean) {
            this.newVersion = flag
        }
    }
})