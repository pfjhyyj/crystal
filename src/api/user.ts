import request from '@/utils/request'
import { type numberic, type PageRequest, type PageResponse } from './type'

export interface DefineListUserPageResponse {
  createdAt?: string
  email?: string
  mobile?: string
  updatedAt?: string
  userId?: number
  username?: string
}

export enum UserStatusEnum {
  StatusEnabled = 1,
  StatusDisabled = 2,
}

export interface UserListReq extends PageRequest {
  nickname?: string
  username?: string
  status?: UserStatusEnum
}

export interface UserListResp
  extends PageResponse<DefineListUserPageResponse> {}

export async function getUserList(data: UserListReq): Promise<UserListResp> {
  return await request.get<UserListResp>('/api/v1/users', data)
}

export interface UserDetailResp {
  createdAt?: string
  email?: string
  mobile?: string
  updatedAt?: string
  userId?: number
  username?: string
}

export async function getUserDetail(userId: numberic): Promise<UserDetailResp> {
  return await request.get<UserDetailResp>(`/api/v1/users/${userId}`)
}
