import request from '@/utils/request'
import { type RouteRecordNormalized } from 'vue-router'
import { type UserState } from '@/store/modules/user/types.ts'

export interface LoginData {
  username: string
  password: string
}

export interface LoginRes {
  token: string
}

export async function login (data: LoginData): Promise<LoginRes> {
  return await request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export async function logout (): Promise<LoginRes> {
  return await request({
    url: '/api/user/logout',
    method: 'post'
  })
}

export async function getUserInfo (): Promise<UserState> {
  return await request({
    url: '/api/user/info',
    method: 'post'
  })
}

export async function getMenuList (): Promise<RouteRecordNormalized[]> {
  return await request({
    url: '/api/v1/sys/menu',
    method: 'get'
  })
}
