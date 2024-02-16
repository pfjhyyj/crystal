import { type AppRouteRecordRaw } from '@/router/routes/types.ts'
import { DEFAULT_LAYOUT } from '@/router/routes/base.ts'

const DASHBOARD: AppRouteRecordRaw = {
  path: '/users',
  name: 'Users',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '用户管理',
    requiresAuth: true,
    icon: 'icon-user',
    order: 0
  },
  children: [
    {
      path: 'manage',
      name: 'UserManage',
      component: async () => await import('@/views/user/list/index.vue'),
      meta: {
        locale: '用户管理',
        requiresAuth: true
      }
    },
    {
      path: 'detail',
      name: 'UserDetail',
      component: async () => await import('@/views/user/detail/index.vue'),
      meta: {
        locale: '用户详情',
        requiresAuth: true,
        hideInMenu: true
      }
    }
  ]

}

export default DASHBOARD
