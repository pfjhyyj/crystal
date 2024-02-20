import request from '@/utils/request'
import { type RouteRecordNormalized } from 'vue-router'
import { type Menu } from './menu'

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

export interface GetMyMenuResponse {
  menus: Menu[]
}

export async function getMenuList (): Promise<GetMyMenuResponse> {
  return await request.get('/api/my/menus')
}
