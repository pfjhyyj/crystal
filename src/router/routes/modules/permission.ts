import { DEFAULT_LAYOUT } from '../base'
import { type AppRouteRecordRaw } from '../types'

const PERMISSION: AppRouteRecordRaw = {
  path: '/permissions',
  name: 'Permission',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '权限管理',
    requiresAuth: true,
    icon: 'icon-lock',
    order: 3
  },
  children: [
    {
      path: 'roles',
      name: 'RoleManage',
      component: async () => await import('@/views/role/list/index.vue'),
      meta: {
        locale: '角色管理',
        requiresAuth: true
      }
    },
    {
      path: 'roleDetail',
      name: 'RoleDetail',
      component: async () => await import('@/views/role/detail/index.vue'),
      meta: {
        locale: '角色详情',
        requiresAuth: true,
        hideInMenu: true
      }
    },
    {
      path: '',
      name: 'PermissionManage',
      component: async () => await import('@/views/permission/list/index.vue'),
      meta: {
        locale: '权限管理',
        requiresAuth: true
      }
    }
  ]
}

export default PERMISSION
