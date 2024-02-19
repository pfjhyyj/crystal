import type { Router, LocationQueryRaw } from 'vue-router'
import NProgress from 'nprogress' // progress bar

import { useUserStore } from '@/store'
import { isLogin } from '@/utils/auth'

export default function setupUserLoginInfoGuard (router: Router) {
  router.beforeEach(async (to, _from, next) => {
    NProgress.start()
    const userStore = useUserStore()
    if (isLogin()) {
      try {
        await userStore.info()
        if (to.name === 'login') {
          next({
            name: 'dashboard'
          })
          return
        }
        next()
      } catch (error) {
        await userStore.logout()
        const query: LocationQueryRaw = {
          redirect: to.name as string,
          ...to.query
        }
        next({
          name: 'login',
          query
        })
      }
    } else {
      if (to.name === 'login') {
        next()
        return
      }
      const query: LocationQueryRaw = {
        redirect: to.name as string,
        ...to.query
      }
      next({
        name: 'login',
        query
      })
    }
  })
}
