<template>
  <a-menu
    :mode="topMenu ? 'horizontal' : 'vertical'"
    v-model:collapsed="collapsed"
    v-model:open-keys="openKeys"
    :show-collapse-button="device !== 'mobile'"
    :auto-open="false"
    v-model:selected-keys="selectedKey"
    :auto-open-selected="true"
    :level-indent="34"
    style="height: 100%;width:100%;"
    :onCollapse="setCollapse"
  >
    <a-sub-menu
        v-for="item in menuTree"
        :key="item.name"
    >
      <template #icon>
        <component :is="item.meta.icon" />
      </template>
      <template #title>{{item.meta.locale}}</template>
      <a-menu-item
          v-for="element in item.children"
          :key="element.name"
          @click="() => goto(element)"
      >
        <template #icon>
          <component :is="element.meta.icon" />
        </template>
        {{element.meta.locale}}
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRoute, useRouter, type RouteRecordRaw, type RouteMeta } from 'vue-router'
import { useAppStore } from '@/store'
import { listenerRouteChange } from '@/utils/route-listener'
import { openWindow, regexUrl } from '@/utils'
import useMenuTree from './use-menu-tree'

export default defineComponent({
  emit: ['collapse'],
  setup () {
    const appStore = useAppStore()
    const router = useRouter()
    const route = useRoute()
    const { menuTree } = useMenuTree()
    console.log(menuTree.value)

    const collapsed = computed({
      get () {
        if (appStore.device === 'desktop') return appStore.menuCollapse
        return false
      },
      set (value: boolean) {
        appStore.updateSettings({ menuCollapse: value })
      }
    })

    const topMenu = computed(() => appStore.topMenu)
    const openKeys = ref<string[]>([])
    const selectedKey = ref<string[]>([])

    const goto = (item: RouteRecordRaw) => {
      // Open external link
      if (regexUrl.test(item.path)) {
        openWindow(item.path)
        selectedKey.value = [item.name as string]
        return
      }
      // Eliminate external link side effects
      const { hideInMenu, activeMenu } = item.meta as RouteMeta
      if (route.name === item.name && !(hideInMenu ?? false) && (activeMenu ?? '') === '') {
        selectedKey.value = [item.name as string]
        return
      }
      // Trigger router change
      void router.push({
        name: item.name
      })
    }
    const findMenuOpenKeys = (target: string) => {
      const result: string[] = []
      let isFind = false
      const backtrack = (item: RouteRecordRaw, keys: string[]) => {
        if (item.name === target) {
          isFind = true
          result.push(...keys)
          return
        }
        if ((item.children?.length) != null && item.children.length > 0) {
          item.children.forEach((el) => {
            backtrack(el, [...keys, el.name as string])
          })
        }
      }
      menuTree.value.forEach((el: RouteRecordRaw) => {
        if (isFind) return // Performance optimization
        backtrack(el, [el.name as string])
      })
      return result
    }
    listenerRouteChange((newRoute) => {
      const { requiresAuth, activeMenu, hideInMenu } = newRoute.meta
      if (requiresAuth && (!(hideInMenu ?? false) || (activeMenu ?? '') !== '')) {
        const menuOpenKeys = findMenuOpenKeys(
          (activeMenu ?? newRoute.name) as string
        )

        const keySet = new Set([...menuOpenKeys, ...openKeys.value])
        openKeys.value = [...keySet]

        selectedKey.value = [
          activeMenu ?? menuOpenKeys[menuOpenKeys.length - 1]
        ]
      }
    }, true)
    const setCollapse = (val: boolean) => {
      if (appStore.device === 'desktop') { appStore.updateSettings({ menuCollapse: val }) }
    }

    const device = appStore.device
    return {
      device,
      collapsed,
      topMenu,
      openKeys,
      selectedKey,
      menuTree,
      goto,
      setCollapse
    }
  }
})
</script>

<style lang="scss" scoped>
:deep(.arco-menu-inner) {
  .arco-menu-inline-header {
    display: flex;
    align-items: center;
  }
  .arco-icon {
    &:not(.arco-icon-down) {
      font-size: 18px;
    }
  }
}
</style>
