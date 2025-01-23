import type { RouteRecordRaw } from 'vue-router'
import { REDIRECT_ROUTE_NAME } from '@/router/constants'

export const DEFAULT_LAYOUT = async () =>
  await import('@/layout/default-layout.vue')

export const REDIRECT_MAIN: RouteRecordRaw = {
  path: '/redirect',
  name: 'redirectWrapper',
  component: DEFAULT_LAYOUT,
  meta: {
    hideInMenu: true,
  },
  children: [
    {
      path: '/redirect/:path',
      name: REDIRECT_ROUTE_NAME,
      component: async () => await import('@/views/redirect/index.vue'),
      meta: {
        hideInMenu: true,
      },
    },
  ],
}

export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: async () => await import('@/views/not-found/index.vue'),
}
