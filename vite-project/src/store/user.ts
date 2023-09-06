import { defineStore } from 'pinia'

export const userStore = defineStore({
    id: 'user-store',
    state: () => {
        return {
            token: sessionStorage.getItem('token'),
            roles: [],
            userInfo: sessionStorage.getItem('userInfo')
        }
    },
    actions: {
        handleLogOut() {
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('userInfo')
            this.token = ''
            this.userInfo = ''
            window.location.href = '/#/login'
        }
    }
})