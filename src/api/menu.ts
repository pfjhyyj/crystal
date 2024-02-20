import request from '@/utils/request'
import { type numberic, type PageRequest } from './type'

export enum MenuType {
  MENU_CATEGORY = 1,
  MENU_ITEM = 2,
  MENU_BUTTON = 3
}

interface ListMenuRequest extends PageRequest {}

export interface MenuPageResponse {
  menuId: number
  locale: string
}

export async function listMenu (params: ListMenuRequest): Promise<Menu[]> {
  return await request.get('/api/menus', params)
}

interface CreateMenuRequest {
  icon?: string
  locale?: string
  menuType?: number
  name?: string
  weight?: number
  parentId?: number
  path?: string
}

export async function createMenu (data: CreateMenuRequest) {
  return await request.post('/api/menus', data)
}

interface UpdateMenuRequest {
  icon?: string
  locale?: string
  menuType?: number
  name?: string
  weight?: number
  parentId?: number
  path?: string
}

export async function updateMenu (menuId: number, data: UpdateMenuRequest) {
  return await request.put(`/api/menus/${menuId}`, data)
}

export async function deleteMenu (menuId: number) {
  return await request.delete(`/api/menus/${menuId}`)
}

export interface Menu {
  icon: string
  menuId: number
  name: string
  weight?: number
  parentId: number
  path: string
  locale: string
  menuType: MenuType
  children?: Menu[]
}

export interface GetMenuTreeResponse {
  menus: Menu[]
}

export async function getMenuTree (menuId: numberic): Promise<GetMenuTreeResponse> {
  return await request.get(`/api/menus/${menuId}/tree`)
}
