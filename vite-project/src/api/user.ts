import request from '@/request'
import { LoginParam } from '@/interfaces/login'

export function login(params:LoginParam) {
    return request({
        url: '/base/account/login',
        method: 'post',
        data: params
    })
}