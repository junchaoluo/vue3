import { defineStore } from 'pinia'
import { LoginParam, UserInfo } from '@/interfaces/login'
import { baseUlr } from '@/request'
import { login } from '@/api/user'
import { fingerpring } from '@/utils/device'

interface UserState {
    token: string,
    roles: Array<any>,
    userInfo: UserInfo
}

export const userStore = defineStore({
    id: 'user-store',
    state: (): UserState => {
        return {
            token: sessionStorage.getItem('token') || '',
            roles: [],
            userInfo: JSON.parse(sessionStorage.getItem('userInfo'))
        }
    },
    actions: {
        handleLogOut() {
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('userInfo')
            this.token = ''
            this.userInfo = {}
            window.location.href = `http://127.0.0.1:5173/#/login`
        },
        async handleLogin(param: LoginParam) {
            const { code, result } = await login(param)
            let userInfo: UserInfo = {}
            if(code === 0) {
                userInfo = {
                    id: result.id,
                    admin: param.account === 'admin' ? true : false,
                    sysAdmin: result.sysAdmin,
                    token: result.token,
                    account: result.account,
                    avator: result.avatar,
                    status: result.status,
                    nickname: result.realName,
                    logintime: new Date().getTime(),
                    uuid: 'uuid' + (await fingerpring()),
                    researchRooms: result.researchRooms,
                    location: result.location ? result.location : '',
                    departmentList: result.department,
                    departmentName: result.departmentName,
                    pwdExpirationTime: result.pwdExpirationTime,
                    remindDay: result.remindDay,
                    hasReminded: false
                }
            }
            this.loginSuccess(userInfo)
        },
        loginSuccess(userInfo: UserInfo) {
            this.userInfo = userInfo
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
            sessionStorage.setItem("token", userInfo.token || '')
            const arr = JSON.parse(localStorage.getItem('historyUserName')) || []
            if (!arr.includes(userInfo.account)) {
                arr.push(userInfo.account)
            }

            localStorage.setItem('historyUserName', JSON.stringify(arr))
            const redirectURL = sessionStorage.getItem('redirectURL')
            if (redirectURL) {
                window.open(redirectURL, '')
			    sessionStorage.removeItem('redirectURL')
            } else {
                // 登录成功默认到首页
                window.location.href=`${baseUlr}/#/`
            }
        }
    }
})