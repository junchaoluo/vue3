import axios from 'axios'

const baseURL = 'https://test.pharmaoryx.tech:9000'
const service = axios.create({
    timeout: 6000,
    withCredentials: false,
    baseURL: baseURL
})

service.interceptors.request.use(config => {

})

service.interceptors.response.use(config => {
    
})