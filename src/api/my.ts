import request from '@/utils/request'
import { type Menu } from './menu'

export interface GetCurrentUserResponse {
  userId: number
  username: string
  nickname: string
  avatar: string
}

export async function getUserInfo() {
  return await request.get<GetCurrentUserResponse>('/api/v1/auth/current')
}

interface updateUserInfoReq {
  avatar?: string
}

export async function updateUserInfo(data: updateUserInfoReq) {
  return await request.put('/api/v1/my', data)
}

interface updatePasswordReq {
  newPassword: string
  oldPassword: string
  repeatPassword: string
}

export async function updatePassword(data: updatePasswordReq) {
  return await request.put('/api/v1/my/password', data)
}

export interface GetMyMenuResponse {
  menus: Menu[]
}

export async function getMenuList(): Promise<GetMyMenuResponse> {
  return await request.get('/api/v1/my/menus')
}
