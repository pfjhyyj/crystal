import { type AppRouteRecordRaw } from '@/router/routes/types.ts'
import { DEFAULT_LAYOUT } from '@/router/routes/base.ts'

const DASHBOARD: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '工作台',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0
  },
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: async () => await import('@/views/dashboard/workplace/index.vue'),
      meta: {
        locale: '工作台',
        requiresAuth: true
      }
    }
  ]

}

export default DASHBOARD
