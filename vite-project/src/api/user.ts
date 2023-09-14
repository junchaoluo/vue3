import request from '@/request'
import { LoginParam } from '@/interfaces/login'
import { BASE_PREFIX } from './constant'

export function login(params:LoginParam) {
    return request({
        url: BASE_PREFIX + '/account/login',
        method: 'post',
        data: params
    })
}

// 获取部门树
export function getDeptTree() {
    return request({
      url: BASE_PREFIX + '/department/tree',
      method: 'get'
    })
}