import { type RouteLocationNormalized, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/store'

export default function usePermission () {
  const userStore = useUserStore()
  return {
    accessRouter (route: RouteLocationNormalized | RouteRecordRaw) {
      return (
        ((route.meta?.requiresAuth) === false) ||
        ((route.meta?.roles) == null) ||
        route.meta?.roles?.includes('*') ||
        route.meta?.roles?.includes(userStore.role)
      )
    }
  }
}
