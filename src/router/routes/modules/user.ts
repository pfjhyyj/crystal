import { type AppRouteRecordRaw } from '@/router/routes/types.ts'
import { DEFAULT_LAYOUT } from '@/router/routes/base.ts'

const DASHBOARD: AppRouteRecordRaw = {
  path: '/users',
  name: 'Users',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '用户管理',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0
  },
  children: [
    {
      path: 'workplace',
      name: 'UserManage',
      component: async () => await import('@/views/dashboard/workplace/index.vue'),
      meta: {
        locale: '用户管理',
        requiresAuth: true
      }
    }
  ]

}

export default DASHBOARD
