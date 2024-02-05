import request from '@/utils/request'
import { type RouteRecordNormalized } from 'vue-router'

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

export interface MyInfoResponse {
  avatar: string
  email: string
  mobile: string
  userId: number
  username: string
}

export async function getUserInfo () {
  return await request.get<MyInfoResponse>('/api/my')
}

interface updateUserInfoReq {
  avatar?: string
}

export async function updateUserInfo (data: updateUserInfoReq) {
  return await request.put('/api/my', data)
}

interface updatePasswordReq {
  newPassword: string
  oldPassword: string
  repeatPassword: string
}

export async function updatePassword (data: updatePasswordReq) {
  return await request.put('/api/my/password', data)
}

export async function getMenuList () {
  return await request.get<RouteRecordNormalized[]>('/api/user/menu')
}
