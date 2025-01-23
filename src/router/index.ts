import { createRouter, createWebHistory, type Router } from 'vue-router'
import NProgress from 'nprogress'

import { appRoutes } from './routes'
import createRouteGuard from '@/router/guard'
import { NOT_FOUND_ROUTE, REDIRECT_MAIN } from '@/router/routes/base.ts'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'Login',
    },
    {
      path: '/login',
      name: 'Login',
      component: async () => await import('@/views/login/index.vue'),
      meta: {
        anonymous: true,
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: async () => await import('@/views/register/index.vue'),
      meta: {
        anonymous: true,
      },
    },
    ...appRoutes,
    REDIRECT_MAIN,
    NOT_FOUND_ROUTE,
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

createRouteGuard(router)

export default router
