import request from '@/request'
import { SearchProjectParams, SearchProductListParams } from '@/interfaces/project'
import { ELN_PREFIX, CHEM_PREFIX, BASE_PREFIX } from '@/api/constant'

export function getProjectListByPage(params:SearchProjectParams) {
    return request({
        url: ELN_PREFIX + `/project/list/${params.pageIndex}/${params.pageSize}`,
        method: 'post',
        params: params
    })
}

export function getArchiveProjectListByPage(params:SearchProjectParams) {
    return request({
        url: ELN_PREFIX + `/project/list/archive/${params.pageIndex}/${params.pageSize}`,
        method: 'post',
        params: params
      })
}

/**
 * 获取产品list(新增记录本)
 * @return {Promise}
 */
 export function getProducts(params: SearchProductListParams) {
  return request({
    url: CHEM_PREFIX + `/v1/product/product/findProductList/${params.pageNum}/${params.pageSize}`,
    method: 'get',
    params: {
      pdNo: params.pdNo
    }
  })
}

/**
 * 获取项目角色列表
 * @return {Promise}
 */
 export function getProjectRoleList() {
  return request({
    url: BASE_PREFIX + '/role/project/query',
    method: 'get'
  })
}

/**
 * 创建项目
 * @param {Object} oParams 参数
 * @return {Promise}
 */
 export function createProject(oParams) {
  return request({
    url: ELN_PREFIX + '/project/add',
    method: 'post',
    data: oParams
  })
}

/**
 * 通过项目id获取项目详情
 * @param {String} sProjectId 项目id
 * @return {Promise}
 */
 export function getProjectDetailById(sProjectId:string) {
  return request({
    url: ELN_PREFIX + `/project/${sProjectId}`,
    method: 'get'
  })
}
/**
 * 通过项目id获取项目成员（以角色为维度）
 * @param {String} sProject 项目id
 * @return {Promise}
 */
 export function getProjectRoleUserListById(sProjectId:string) {
  return request({
    url: ELN_PREFIX + `/project/member/${sProjectId}`,
    method: 'get'
  })
}
/**
 * 修改项目
 * @param {Object} oParams 参数
 * @return {Promise}
 */
 export function updateProject(oParams) {
  return request({
    url: ELN_PREFIX + '/project/modify',
    method: 'post',
    data: oParams
  })
}
/**
 * ELN基础项目管理   完成并存档项目
 * @param {Array} aParams 参数
 * @return {Promise}
 */
 export function archiveAndProject(aParams: {
  id: string
 }) {
  return request({
    url: ELN_PREFIX + '/project/archive',
    method: 'put',
    data: [aParams]
  })
}
/**
 * ELN基础项目管理   恢复项目
 * @param {Array} aParams 参数
 * @return {Promise}
 */
 export function renewAndProject(aParams: {
  id: string
 }) {
  return request({
    url: ELN_PREFIX + '/project/renew',
    method: 'put',
    data: [aParams]
  })
}