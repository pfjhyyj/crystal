import request from '@/utils/request'

export interface LoginData {
  username: string
  password: string
}

export interface LoginRes {
  accessToken: string
  expireTime: number
}

export async function login (data: LoginData) {
  return await request.post<LoginRes>('/api/auth/loginByUsername', data)
}

export async function logout () {
  return await request.post<LoginRes>('/api/auth/logout')
}

interface registerByEmailRequest {
  email: string
  password: string
  username: string
}

export async function registerByEmail (data: registerByEmailRequest) {
  return await request.post('/api/auth/registerByEmail', data)
}
