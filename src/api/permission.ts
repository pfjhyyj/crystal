import request from '@/utils/request'
import { type PageResponse, type PageRequest } from './type'

export interface Permission {
  permissionId: number
  name: string
  object: string
  action: string
  description: string
}

interface createPermissionReq {
  action: string
  description?: string
  name: string
  object: string
}

export async function createPermission(data: createPermissionReq) {
  return await request.post('/api/v1/permissions', data)
}

interface updatePermissionReq {
  action: string
  description?: string
  name: string
  object: string
}

export async function updatePermission(
  permissionId: number,
  data: updatePermissionReq,
) {
  return await request.put(`/api/v1/permissions/${permissionId}`, data)
}

export async function deletePermission(permissionId: number) {
  return await request.delete(`/api/v1/permissions/${permissionId}`)
}

interface PermissionPageReq extends PageRequest {
  object?: string
  name?: string
}

export interface PermissionPageResp {
  permissionId: number
  name: string
  object: string
  action: string
  description: string
}

export async function listPermission(params: PermissionPageReq) {
  return await request.get<PageResponse<PermissionPageResp>>(
    '/api/v1/permissions',
    params,
  )
}
