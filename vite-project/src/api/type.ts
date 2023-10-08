import request from '@/request'
import { ELN_PREFIX } from '@/api/constant'
import { SearchTypeParams } from '@/interfaces/type'

// 获取分类信息
export function getExperimentClassification(params: SearchTypeParams) {
    return request({
      url: ELN_PREFIX + `/experiment/sort/page/${params.pageNum}/${params.pageSize}`,
      method: 'post',
      params: params
    })
  }