import request from '@/utils/request'
import { type PageRequest, type PageResponse, type numberic } from './type'

export interface ListUserRoleReq extends PageRequest {
  userId: numberic
}

export interface UserRolePageResp {
  roleId: number
  roleName: string
}

export interface ListUserRoleResp extends PageResponse<UserRolePageResp> {
}

export async function listUserRoles (req: ListUserRoleReq): Promise<ListUserRoleResp> {
  return await request.get(`/api/users/${req.userId}/roles`, req)
}

export interface AddUserRoleReq {
  roleIds: numberic[]
  userId: numberic
}

export async function addUserRole (req: AddUserRoleReq) {
  return await request.post(`/api/users/${req.userId}/roles/add`, req)
}

export interface DeleteUserRoleReq {
  roleIds: number[]
  userId: numberic
}

export async function deleteUserRole (req: DeleteUserRoleReq) {
  return await request.post(`/api/users/${req.userId}/roles/delete`, req)
}

export interface ListRolePageReq extends PageRequest {
  roleName?: string
}

export interface RolePageResp {
  description?: string
  roleCode?: string
  roleId?: number
  roleName?: string
}

export interface ListRolePageResp extends PageResponse<RolePageResp> {}

export async function listRole (req: ListRolePageReq): Promise<ListRolePageResp> {
  return await request.get('/api/roles', req)
}

interface createRoleReq {
  description?: string
  roleCode: string
  roleName: string
}

export async function createRole (req: createRoleReq) {
  return await request.post('/api/roles', req)
}

interface updateRoleReq {
  description?: string
  roleCode: string
  roleName: string
}

export async function updateRole (roleId: numberic, req: updateRoleReq) {
  return await request.put(`/api/roles/${roleId}`, req)
}

export async function deleteRole (roleId: numberic) {
  return await request.delete(`/api/roles/${roleId}`)
}

export interface Role {
  description?: string
  roleCode?: string
  roleId?: number
  roleName?: string
}

export async function getRole (roleId: numberic): Promise<Role> {
  return await request.get(`/api/roles/${roleId}`)
}

export interface RolePermissionReq extends PageRequest {
}

export interface RolePermission {
  permissionId: number
  permissionName: string
}

export interface RolePermissionResp extends PageResponse<RolePermission> {}

export async function listRolePermission (roleId: numberic, req: RolePermissionReq): Promise<RolePermissionResp> {
  return await request.get(`/api/roles/${roleId}/permissions`, req)
}

export interface AddRolePermissionReq {
  permissionIds: number[]
}

export async function addRolePermission (roleId: numberic, req: AddRolePermissionReq) {
  return await request.post(`/api/roles/${roleId}/permissions/add`, req)
}

export interface DeleteRolePermissionReq {
  permissionIds: number[]
}

export async function deleteRolePermission (roleId: numberic, req: DeleteRolePermissionReq) {
  return await request.post(`/api/roles/${roleId}/permissions/delete`, req)
}

export interface ListRoleMenuResponse {
  menuIds: number[]
}

export async function listRoleMenu (roleId: numberic): Promise<ListRoleMenuResponse> {
  return await request.get(`/api/roles/${roleId}/menus`)
}

export interface SetRoleMenuReq {
  menuIds: numberic[]
}

export async function setRoleMenu (roleId: numberic, req: SetRoleMenuReq) {
  return await request.post(`/api/roles/${roleId}/menus/set`, req)
}
