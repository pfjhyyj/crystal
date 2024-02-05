import { DEFAULT_LAYOUT } from '../base'
import { type AppRouteRecordRaw } from '../types'

const PERMISSION: AppRouteRecordRaw = {
  path: '/permission',
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
      path: 'manage',
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
