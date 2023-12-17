import request from '@/utils/request'
import { type PageRequest, type PageResponse, type numberic } from './type'

export interface Tenant {
  tenantId: numberic
  name: string
  code: string
  description: string
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
  tenantId: number
}

export async function createTenant (data: TenantCreateReq): Promise<TenantCreateResp> {
  return await request.post<TenantCreateResp>('/api/tenants', data)
}

export async function getTenant (tenantId: numberic): Promise<Tenant> {
  return await request.get<Tenant>(`/api/tenants/${tenantId}`)
}

export interface TenantUpdateReq {
  name: string
  code: string
  description?: string
  status: TenantStatus
}

export async function updateTenant (tenantId: numberic, data: TenantUpdateReq): Promise<void> {
  await request.put(`/api/tenants/${tenantId}`, data)
}

export async function deleteTenant (tenantId: numberic): Promise<void> {
  await request.delete(`/api/tenants/${tenantId}`)
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
