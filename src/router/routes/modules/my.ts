import { type AppRouteRecordRaw } from '@/router/routes/types.ts'
import { DEFAULT_LAYOUT } from '@/router/routes/base.ts'

const MY: AppRouteRecordRaw = {
  path: '/my',
  name: 'My',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '个人中心',
    icon: 'icon-user',
    order: 0
  },
  children: [
    {
      path: 'setting',
      name: 'MySetting',
      component: async () => await import('@/views/user/my/index.vue'),
      meta: {
        locale: '用户设置',
        hideInMenu: true
      }
    }
  ]

}

export default MY
