import { computed } from 'vue'
import { type RouteRecordRaw, type RouteRecordNormalized } from 'vue-router'
import { useAppStore } from '@/store'
import appClientMenus from '@/router/app-menus'
import { cloneDeep } from 'lodash'

export default function useMenuTree () {
  const appStore = useAppStore()
  const appRoute = computed(() => {
    return appClientMenus
  })
  const menuTree = computed(() => {
    const copyRouter = cloneDeep(appRoute.value) as RouteRecordNormalized[]
    copyRouter.sort((a: RouteRecordNormalized, b: RouteRecordNormalized) => {
      return (a.meta.weight ?? 0) - (b.meta.weight ?? 0)
    })
    function travel (routes: RouteRecordRaw[], layer: number) {
      if (routes == null) return null

      const collector: any = routes.map((element) => {
        // check if the route is in the appAsyncMenus
        if (appStore.menuFromServer) {
          const result = appStore.appAsyncMenus.findIndex((x) => x.name === element.name)
          if (result === -1) return null
        }

        // leaf node
        if (((element.meta?.hideChildrenInMenu) === true) || (element.children == null)) {
          element.children = []
          return element
        }

        // route filter hideInMenu true
        element.children = element.children.filter(
          (x) => x.meta?.hideInMenu !== true
        )

        // Associated child node
        const subItem = travel(element.children, layer + 1)

        if (subItem.length > 0) {
          element.children = subItem
          return element
        }
        // the else logic
        if (layer > 1) {
          element.children = subItem
          return element
        }

        if (element.meta?.hideInMenu === false) {
          return element
        }

        return null
      })
      return collector.filter(Boolean)
    }
    return travel(copyRouter, 0)
  })

  return {
    menuTree
  }
}
