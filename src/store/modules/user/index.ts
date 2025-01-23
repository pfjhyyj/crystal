import { defineStore } from 'pinia'
import {
  login as userLogin,
  logout as userLogout,
  type LoginRequest,
} from '@/api/auth'
import { getUserInfo } from '@/api/my'
import { setToken, clearToken } from '@/utils/auth'
import { removeRouteListener } from '@/utils/route-listener'
import { type UserState } from './types'
import useAppStore from '../app'
import { getMyMessages } from '@/api/msg'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userId: undefined,
    username: undefined,
    avatar: undefined,
    unreadMessageCount: 0,
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    },
  },

  actions: {
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },

    // Reset user's information
    resetInfo() {
      this.$reset()
    },

    // Get user's information
    async info() {
      const res = await getUserInfo()

      this.setInfo({
        userId: res.userId,
        username: res.username,
        avatar: res.avatar,
      })
      // void this.getUnreadMessagesCount()
    },

    async getUnreadMessagesCount() {
      const res = await getMyMessages()
      this.setInfo({
        unreadMessageCount: res.unreadMessageCount,
      })
    },

    // Login
    async login(loginForm: LoginRequest) {
      try {
        const res = await userLogin(loginForm)
        setToken(res.accessToken)
      } catch (err) {
        clearToken()
        throw err
      }
    },
    logoutCallBack() {
      const appStore = useAppStore()
      this.resetInfo()
      clearToken()
      removeRouteListener()
      appStore.clearServerMenu()
    },
    // Logout
    async logout() {
      try {
        await userLogout()
      } finally {
        this.logoutCallBack()
      }
    },
  },
})

export default useUserStore
