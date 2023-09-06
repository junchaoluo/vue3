import axios from 'axios'
import { ElMessage } from 'element-plus'
import { userStore } from '@/store/user'
import { appStore } from '@/store/app'

const baseURL: string = 'https://test.pharmaoryx.tech:9000'
const token: string = sessionStorage.getItem('token') || ''
const vsersionEln: string = localStorage.getItem('VERSION_ELN') || ''
const SUCCESS_CODE: number = 0
let isResrLogin: boolean = true

const service = axios.create({
    timeout: 6000,
    withCredentials: false,
    baseURL: baseURL
})

service.interceptors.request.use(config => {
    if(token) {
        config.headers['Authorization'] = token
        config.headers['Version'] = vsersionEln
    }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        if (!response.data && response.status === 200) {
            return response
        }
        const { code, result, description } = response.data
        if (response.headers['content-type']?.indexOf('application/octet-stream') > -1) {
            return response
        }
        if (response.headers['content-type']?.indexOf('application/vnd.ms-excel') > -1) {
            return response
        }
        if (code === SUCCESS_CODE) {
            return response.data
          } else if (code === 401 || code === 1002) {
            ElMessage({
                message: '登录过期，请重新登录',
                type: 'error'
            })
            if (isResrLogin) {
              localStorage.removeItem('proJectKeywords')
              sessionStorage.clear()
              userStore().handleLogOut()
              setTimeout(() => {
                isResrLogin = false
              }, 3000)
            }
          } else if (code === 1314) {
            appStore().setNewVersion(true)
          } else {
            if (response.config.url.includes('tracking/sendMsg')) return Promise.reject(response.data)
            if (description !== '未知异常') {
              if (result && result.indexOf('JSON parse error: Cannot deserialize value of type') > -1) {
                ElMessage({
                  message: '数据格式错误，请填写数字',
                  type: 'error'
                })
              } else {
                if (!(response.data instanceof Blob))
                  ElMessage({
                    message: description,
                    type: 'error'
                  })
              }
            }
            return Promise.reject(response.data)
          }
    },
    error => {
        return Promise.reject(error)
    }
)