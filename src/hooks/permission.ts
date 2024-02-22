import { type RouteLocationNormalized, type RouteRecordRaw } from 'vue-router'
import { useAppStore } from '@/store'
import { WHITE_LIST } from '@/router/constants'

export default function usePermission () {
  const appStore = useAppStore()
  return {
    accessRouter (route: RouteLocationNormalized | RouteRecordRaw) {
      if (appStore.menuFromServer) {
        const serverMenuConfig = [...appStore.appAsyncMenus, ...WHITE_LIST]
        const result = serverMenuConfig.findIndex((x) => x.name === route.name)
        if (result === -1) return false
      }
      return true
    }
  }
}
