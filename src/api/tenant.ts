import request from '@/utils/request'
import { type PageRequest, type PageResponse, type numberic } from './type'

export interface Tenant {
  id: numberic
  name: string
  code: string
  description?: string
  status: TenantStatus
}

export enum TenantStatus {
  DISABLE = 0,
  ENABLE = 1
}

export interface TenantCreateReq {
  name: string
  code: string
  description?: string
  status: TenantStatus
}

export interface TenantCreateResp {
  id: number
}

export async function createTenant (data: TenantCreateReq): Promise<TenantCreateResp> {
  return await request.post<TenantCreateResp>('/api/tenants', data)
}

export async function getTenant (id: numberic): Promise<Tenant> {
  return await request.get<Tenant>(`/api/tenants/${id}`)
}

export interface TenantUpdateReq {
  id: number
  name: string
  code: string
  description?: string
  status: TenantStatus
}

export async function updateTenant (id: numberic, data: TenantUpdateReq): Promise<void> {
  await request.put(`/api/tenants/${id}`, data)
}

export async function deleteTenant (id: numberic): Promise<void> {
  await request.delete(`/api/tenants/${id}`)
}

export interface TenantListReq extends PageRequest {
  name?: string
  code?: string
  status?: TenantStatus
}

export interface TenantListResp extends PageResponse<Tenant> {
}

export async function getTenantList (data?: TenantListReq): Promise<TenantListResp> {
  return await request.get<TenantListResp>('/api/tenants', data)
}
