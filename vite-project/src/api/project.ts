import request from '@/request'
import { SearchProjectParams, SearchProductListParams } from '@/interfaces/project'
import { ELN_PREFIX, CHEM_PREFIX } from '@/api/constant'

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