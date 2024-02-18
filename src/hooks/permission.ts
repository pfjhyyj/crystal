import { type RouteLocationNormalized, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/store'

export default function usePermission () {
  const userStore = useUserStore()
  return {
    accessRouter (route: RouteLocationNormalized | RouteRecordRaw) {
      return (
        ((route.meta?.anonymous) === true) ||
        ((route.meta?.roles) == null) ||
        route.meta?.roles?.includes('*') ||
        route.meta?.roles?.includes(userStore.role)
      )
    },
    findFirstPermissionRoute (_routers: any, role = 'admin') {
      const cloneRouters = [..._routers]
      while (cloneRouters.length > 0) {
        const firstElement = cloneRouters.shift()
        if (
          firstElement?.meta?.roles?.find((el: string[]) => {
            return el.includes('*') || el.includes(role)
          }) !== undefined
        ) { return { name: firstElement.name } }
        if (firstElement?.children !== undefined) {
          cloneRouters.push(...firstElement.children)
        }
      }
      return null
    }
  }
}
