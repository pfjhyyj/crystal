import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { Message } from '@arco-design/web-vue'
import { type ApiResponse } from '@/api/type'

// const request = axios.create({
//   // timeout: 5000
// })
//
// request.interceptors.request.use(config => {
//   const token = localStorage.getItem('token')
//   if (token != null) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })
//
// request.interceptors.response.use(response => {
//   const data: ApiResponse<any> = response.data
//   if (response.status !== 200) {
//     return Promise.reject(data)
//   }
//   if (data.code !== 20000) {
//     Message.error({
//       content: data.msg
//     })
//     return Promise.reject(data.msg)
//   }
//   return data.data
// })

class Request {
  private readonly axiosInstance: AxiosInstance

  constructor (config: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config)
    this.axiosInstance.interceptors.request.use(config => {
      const token = localStorage.getItem('token')
      if (token != null) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    this.axiosInstance.interceptors.response.use(response => {
      const data: ApiResponse<any> = response.data
      if (response.status !== 200) {
        return Promise.reject(data)
      }
      if (data.code !== 20000) {
        Message.error({
          content: data.msg
        })
        return Promise.reject(data.msg)
      }
      return data.data
    })
  }

  async request<T = any> (config: AxiosRequestConfig): Promise<T> {
    return await this.axiosInstance(config)
  }

  async get<T = any> (url: string, params?: any): Promise<T> {
    return await this.axiosInstance({
      url,
      method: 'get',
      params
    })
  }

  async post<T = any> (url: string, data?: any): Promise<T> {
    return await this.axiosInstance({
      url,
      method: 'post',
      data
    })
  }

  async put<T = any> (url: string, data?: any): Promise<T> {
    return await this.axiosInstance({
      url,
      method: 'put',
      data
    })
  }

  async patch<T = any> (url: string, data?: any): Promise<T> {
    return await this.axiosInstance({
      url,
      method: 'patch',
      data
    })
  }

  async delete<T = any> (url: string, data?: any): Promise<T> {
    return await this.axiosInstance({
      url,
      method: 'delete',
      data
    })
  }
}

export default new Request({})
