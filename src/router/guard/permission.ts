import type { Router, RouteRecordNormalized } from 'vue-router'
import NProgress from 'nprogress' // progress bar

import usePermission from '@/hooks/permission'
import { useUserStore, useAppStore } from '@/store'
import { appRoutes } from '../routes'
import { WHITE_LIST, NOT_FOUND } from '../constants'

export default function setupPermissionGuard (router: Router) {
  router.beforeEach(async (to, _from, next) => {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const Permission = usePermission()
    const permissionsAllow = Permission.accessRouter(to)
    if (appStore.menuFromServer) {
      // 针对来自服务端的菜单配置进行处理
      // Handle routing configuration from the server

      // 根据需要自行完善来源于服务端的菜单配置的permission逻辑
      // Refine the permission logic from the server's menu configuration as needed
      if (
        (appStore.appAsyncMenus.length === 0) &&
        (WHITE_LIST.find((el) => el.name === to.name) == null)
      ) {
        await appStore.fetchServerMenuConfig()
      }
      const serverMenuConfig = [...appStore.appAsyncMenus, ...WHITE_LIST]

      let exist = false
      while ((serverMenuConfig.length > 0) && !exist) {
        const element = serverMenuConfig.shift()
        if (element?.name === to.name) exist = true

        if (element?.children !== undefined) {
          serverMenuConfig.push(
            ...(element.children as unknown as RouteRecordNormalized[])
          )
        }
      }
      if (exist && permissionsAllow) {
        next()
      } else next(NOT_FOUND)
    } else {
      // eslint-disable-next-line no-lonely-if
      if (permissionsAllow) next()
      else {
        const destination =
          Permission.findFirstPermissionRoute(appRoutes, userStore.role) ??
          NOT_FOUND
        next(destination)
      }
    }
    NProgress.done()
  })
}
