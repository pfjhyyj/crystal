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

export async function login (data: LoginData) {
  return await request<LoginRes>({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export async function logout () {
  return await request<LoginRes>({
    url: '/api/user/logout',
    method: 'post'
  })
}

export async function getUserInfo () {
  return await request<UserState>({
    url: '/api/user/info',
    method: 'post'
  })
}

export async function getMenuList () {
  return await request<RouteRecordNormalized[]>({
    url: '/api/v1/sys/menu',
    method: 'get'
  })
}
