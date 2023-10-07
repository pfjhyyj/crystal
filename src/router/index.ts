import { createRouter, createWebHistory, type Router } from 'vue-router'
import NProgress from 'nprogress'

// import { appRoutes } from './routes'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: async () => await import('@/views/login/index.vue'),
      meta: {
        requiresAuth: false
      }
    }
    // ...appRoutes
  ]
})

export default router
