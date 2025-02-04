import { defineStore } from 'pinia'
import { Notification } from '@arco-design/web-vue'
import type { RouteRecordNormalized } from 'vue-router'
import { getMenuList } from '@/api/my'
import { type AppState } from './types'

const useAppStore = defineStore('app', {
  state: (): AppState => ({
    theme: 'light',
    colorWeak: false,
    navbar: true,
    menu: true,
    topMenu: false,
    hideMenu: false,
    menuCollapse: false,
    footer: true,
    themeColor: '#165DFF',
    menuWidth: 220,
    globalSettings: false,
    device: 'desktop',
    tabBar: true,
    menuFromServer: false,
    serverMenu: [],
  }),

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state }
    },
    appDevice(state: AppState) {
      return state.device
    },
    appAsyncMenus(state: AppState): RouteRecordNormalized[] {
      return state.serverMenu as unknown as RouteRecordNormalized[]
    },
  },

  actions: {
    // Update app settings
    updateSettings(partial: Partial<AppState>) {
      // @ts-expect-error-next-line
      this.$patch(partial)
    },

    // Change theme color
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark'
        document.body.setAttribute('arco-theme', 'dark')
      } else {
        this.theme = 'light'
        document.body.removeAttribute('arco-theme')
      }
    },
    toggleDevice(device: string) {
      this.device = device
    },
    toggleMenu(value: boolean) {
      this.hideMenu = value
    },
    async fetchServerMenuConfig() {
      try {
        const res = await getMenuList()
        this.serverMenu = res.menus
      } catch (error) {
        Notification.error({
          id: 'menuNotice',
          content: 'error',
          closable: true,
        })
      }
    },
    clearServerMenu() {
      this.serverMenu = []
    },
  },
})

export default useAppStore
