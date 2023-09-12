import request from '@/request'
import { SearchProjectParams } from '@/interfaces/project'
import { ELN_PREFIX } from '@/api/constant'

export function getProjectListByPage(params:SearchProjectParams) {
    return request({
        url: ELN_PREFIX + `/project/list/${params.pageNum}/${params.pageSize}`,
        method: 'post',
        params: params
    })
}

export function getArchiveProjectListByPage(params:SearchProjectParams) {
    return request({
        url: ELN_PREFIX + `/project/list/archive/${params.pageNum}/${params.pageSize}`,
        method: 'post',
        params: params
      })
}