import request from '@/request'
import { LoginParam } from '@/interfaces/login'
import { BASE_PREFIX } from './constant'
import { SearchProjectParams } from '@/interfaces/project'
import { GetUserParams } from '@/interfaces/user'

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

export function getUserListByFuzzyKw(oParams: SearchProjectParams) {
    return request({
      url: BASE_PREFIX + `/user/list/fuzzy/${oParams.pageIndex}/${oParams.pageSize}`,
      method: 'post',
      data: oParams
    })
}

// 获取用户列表
export function getUserList(oParams: GetUserParams) {
  if (!oParams.needCheckAll) {
    oParams.status = 0 // 过滤冻结状态的用户
  }
  return request({
    url: BASE_PREFIX + `/user/list/${oParams.pageIndex}/${oParams.pageSize}`,
    method: 'post',
    data: oParams
  })
}