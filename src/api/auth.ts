import request from '@/utils/request'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  expireTime: number
}

export async function login(data: LoginRequest) {
  return await request.post<LoginResponse>('/api/v1/auth/login', data)
}

export async function logout() {
  return await request.post<LoginResponse>('/api/v1/auth/logout')
}

interface registerByEmailRequest {
  email: string
  password: string
  username: string
}

export async function registerByEmail(data: registerByEmailRequest) {
  return await request.post('/api/v1/auth/registerByEmail', data)
}

interface updatePasswordRequest {
  newPassword: string
  oldPassword: string
  repeatPassword: string
}

export async function updatePassword(data: updatePasswordRequest) {
  return await request.post('/api/v1/my/password', data)
}
