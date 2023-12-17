import { type AppRouteRecordRaw } from '@/router/routes/types.ts'
import { DEFAULT_LAYOUT } from '@/router/routes/base.ts'

const TENANT: AppRouteRecordRaw = {
  path: '/tenants',
  name: 'Tenants',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '租户管理',
    requiresAuth: true,
    icon: 'icon-user',
    order: 0
  },
  children: [
    {
      path: 'manage',
      name: 'TenantManage',
      component: async () => await import('@/views/tenant/list/index.vue'),
      meta: {
        locale: '租户管理',
        requiresAuth: true
      }
    }
  ]

}

export default TENANT
