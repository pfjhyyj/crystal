import axios from 'axios'
import { Message } from '@arco-design/web-vue'

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
  const data = response.data
  if (response.status !== 200) {
    return Promise.reject(data)
  }
  if (data.baseResp != null) {
    Message.error({
      content: data.baseResp.msg
    })
    return Promise.reject(data.baseResp.msg)
  }
  return response.data
})

export default request
