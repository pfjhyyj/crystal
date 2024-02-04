import { DEFAULT_LAYOUT } from '../base'
import { type AppRouteRecordRaw } from '../types'

const EXCEPTION: AppRouteRecordRaw = {
  path: '/exception',
  name: 'exception',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '异常页',
    requiresAuth: true,
    icon: 'icon-exclamation-circle',
    order: 6,
    hideInMenu: true
  },
  children: [
    {
      path: '403',
      name: '403',
      component: async () => await import('@/views/exception/403/index.vue'),
      meta: {
        locale: '403',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: true
      }
    },
    {
      path: '404',
      name: '404',
      component: async () => await import('@/views/exception/404/index.vue'),
      meta: {
        locale: '404',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: true
      }
    },
    {
      path: '500',
      name: '500',
      component: async () => await import('@/views/exception/500/index.vue'),
      meta: {
        locale: '500',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: true
      }
    }
  ]
}

export default EXCEPTION
