import type { Router } from 'vue-router'
import NProgress from 'nprogress' // progress bar

import usePermission from '@/hooks/permission'
import { useAppStore } from '@/store'
import { NOT_FOUND } from '../constants'

export default function setupPermissionGuard (router: Router) {
  router.beforeEach(async (to, _from, next) => {
    const appStore = useAppStore()
    if (appStore.menuFromServer) {
      if (
        (appStore.appAsyncMenus.length === 0)
      ) {
        await appStore.fetchServerMenuConfig()
      }
      const Permission = usePermission()
      const permissionsAllow = Permission.accessRouter(to)
      if (permissionsAllow) {
        next()
      } else next(NOT_FOUND)
    } else {
      next()
    }
    NProgress.done()
  })
}
