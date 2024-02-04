import request from '@/utils/request'
import { type RouteRecordNormalized } from 'vue-router'
import { type UserState } from '@/store/modules/user/types.ts'

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

export async function getUserInfo () {
  return await request.post<UserState>('/api/my')
}

export async function getMenuList () {
  return await request.get<RouteRecordNormalized[]>('/api/user/menu')
}
