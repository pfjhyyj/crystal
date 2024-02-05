import request from '@/utils/request'
import { type PageResponse, type PageRequest } from './type'

export interface Permission {
  permissionId: number
  name: string
  target: string
  action: string
  description: string
}

interface createPermissionReq {
  action: string
  description?: string
  name: string
  target: string
}

export async function createPermission (data: createPermissionReq) {
  return await request.post('/api/permissions', data)
}

interface updatePermissionReq {
  action: string
  description?: string
  name: string
  target: string
}

export async function updatePermission (permissionId: number, data: updatePermissionReq) {
  return await request.put(`/api/permissions/${permissionId}`, data)
}

export async function deletePermission (permissionId: number) {
  return await request.delete(`/api/permissions/${permissionId}`)
}

interface PermissionPageReq extends PageRequest {
  target?: string
}

export interface PermissionPageResp {
  permissionId: number
  name: string
  target: string
  action: string
  description: string
}

export async function getPermissionList (params: PermissionPageReq) {
  return await request.get<PageResponse<PermissionPageResp>>('/api/permissions', params)
}
