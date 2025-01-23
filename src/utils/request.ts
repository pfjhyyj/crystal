import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { Message } from '@arco-design/web-vue'
import { type ApiResponse } from '@/api/type'
import { getToken } from '@/utils/auth.ts'
import router from '@/router'

class Request {
  private readonly axiosInstance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config)
    this.axiosInstance.interceptors.request.use((config) => {
      const token = getToken()
      if (token != null) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    this.axiosInstance.interceptors.response.use(
      (response) => {
        const data: ApiResponse<any> = response.data
        if (response.status !== 200) {
          Message.error({
            content: '服务器连接失败',
          })
          return Promise.reject(data)
        }
        if (data.code !== 0) {
          if (data.code === 20002) {
            Message.error({
              content: '登录已过期，请重新登录',
            })
            setTimeout(() => {
              router.replace('/login')
            }, 2000)
            return Promise.reject(data.message)
          }

          Message.error({
            content: data.message,
          })
          return Promise.reject(data.message)
        }
        return data.data
      },
      (error) => {
        console.error('Request error:', error)
        Message.error({
          content: '服务器连接失败',
        })
        return Promise.reject(error)
      },
    )
  }

  async request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return await this.axiosInstance(config)
  }

  async get<T = any>(url: string, params?: any): Promise<T> {
    return await this.axiosInstance({
      url,
      method: 'get',
      params,
    })
  }

  async post<T = any>(url: string, data?: any): Promise<T> {
    return await this.axiosInstance({
      url,
      method: 'post',
      data,
    })
  }

  async put<T = any>(url: string, data?: any): Promise<T> {
    return await this.axiosInstance({
      url,
      method: 'put',
      data,
    })
  }

  async patch<T = any>(url: string, data?: any): Promise<T> {
    return await this.axiosInstance({
      url,
      method: 'patch',
      data,
    })
  }

  async delete<T = any>(url: string, data?: any): Promise<T> {
    return await this.axiosInstance({
      url,
      method: 'delete',
      data,
    })
  }
}

export default new Request({})
