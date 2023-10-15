import axios from 'axios'
import { Message } from '@arco-design/web-vue'
import { type ApiResponse } from '@/api/type'

const request = axios.create({
  // timeout: 5000
})

request.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token != null) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

request.interceptors.response.use(response => {
  const data: ApiResponse<any> = response.data
  if (response.status !== 200) {
    return Promise.reject(data)
  }
  if (data.msg !== '') {
    Message.error({
      content: data.msg
    })
    return Promise.reject(data.msg)
  }
  return data.data
})

export default request
