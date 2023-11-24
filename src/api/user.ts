import request from '@/utils/request'
import { type PageRequest, type PageResponse, type numberic } from './type'

export interface User {
  id: numberic
  tenantId: numberic
  nickname: string
  username: string
  password: string
  avatar: string
  email: string
  phone: string
  status: UserStatus
}

export enum UserStatus {
  DISABLE = 0,
  ENABLE = 1
}

export interface UserCreateReq {
  tenantId: numberic
  nickname: string
  username: string
  password: string
  avatar?: string
  email: string
  phone: string
  status: UserStatus
}

export interface UserCreateResp {
  id: number
}

export async function createUser (data: UserCreateReq): Promise<UserCreateResp> {
  return await request.post<UserCreateResp>('/api/users', data)
}

export async function getUser (id: number): Promise<User> {
  return await request.get<User>(`/api/users/${id}`)
}

export interface UserUpdateReq {
  tenantId?: numberic
  nickname?: string
  username?: string
  password?: string
  avatar?: string
  email?: string
  phone?: string
  status?: UserStatus
}

export async function updateUser (id: numberic, data: UserUpdateReq): Promise<void> {
  await request.put(`/api/users/${id}`, data)
}

export async function deleteUser (id: number): Promise<void> {
  await request.delete(`/api/users/${id}`)
}

export interface UserListReq extends PageRequest {
  nickname?: string
  username?: string
  status?: UserStatus
}

export interface UserListResp extends PageResponse<User> {
}

export async function getUserList (data: UserListReq): Promise<UserListResp> {
  return await request.get<UserListResp>('/api/users', data)
}
