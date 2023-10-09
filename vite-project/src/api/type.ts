import request from '@/request'
import { ELN_PREFIX } from '@/api/constant'
import { SearchTypeParams, TypeParams } from '@/interfaces/type'

// 获取分类信息
export function getExperimentClassification(params: SearchTypeParams) {
  return request({
    url: ELN_PREFIX + `/experiment/sort/page/${params.pageNum}/${params.pageSize}`,
    method: 'post',
    params: params
  })
}
// 新增分类信息  /experiment/sort/add
export function addExperimentClassification(oParams: TypeParams) {
  return request({
    url: ELN_PREFIX + `/experiment/sort/add`,
    method: 'post',
    data: oParams
  })
}
// 修改分类信息   /experiment/sort/modify
export function reviseExperimentClassification(oParams: TypeParams) {
  return request({
    url: ELN_PREFIX + `/experiment/sort/modify`,
    method: 'put',
    data: oParams
  })
}
// 删除分类信息  /experiment/sort/delete
export function deleteExperimentClassification(oParams: {
  list: Array<string>
}) {
  return request({
    url: ELN_PREFIX + `/experiment/sort/delete`,
    method: 'delete',
    data: oParams
  })
}