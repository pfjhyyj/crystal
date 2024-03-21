<template>
  <div class="wrapper">
    <div class="title">登录 Crystal</div>
    <div class="sub-title">登录 Crystal</div>
    <a-form
        ref="loginForm"
        :model="userInfo"
        class="login-form"
        layout="vertical"
        @submit="handleSubmit"
    >
      <a-form-item
          field="username"
          :rules="[{ required: true, message: '用户名不能为空' }]"
          :validate-trigger="['change', 'blur']"
          hide-label
      >
        <a-input
            v-model="userInfo.username"
            placeholder="请输入用户名"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
          field="password"
          :rules="[{ required: true, message: '密码不能为空' }]"
          :validate-trigger="['change', 'blur']"
          hide-label
      >
        <a-input-password
            v-model="userInfo.password"
            placeholder="请输入密码"
            allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <div class="password-actions">
          <a-checkbox
              checked="rememberPassword"
              :model-value="loginConfig.rememberPassword"
              @change="setRememberPassword as any"
          >
            记住密码
          </a-checkbox>
          <a-link>忘记密码</a-link>
        </div>
        <a-button type="primary" html-type="submit" long :loading="loading">
          登陆
        </a-button>
        <a-button type="text" long class="register-btn" @click="handleRegister">
          注册
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'
import { type ValidatedError } from '@arco-design/web-vue/es/form/interface'
import { useStorage } from '@vueuse/core'
import { useUserStore } from '@/store'
import useLoading from '@/hooks/loading'
import type { LoginData } from '@/api/auth'

const router = useRouter()
const { loading, setLoading } = useLoading()
const userStore = useUserStore()

const loginConfig = useStorage('login_backup-config', {
  rememberPassword: true,
  username: 'admin', // 演示默认值
  password: 'admin' // demo default value
})
const userInfo = reactive({
  username: loginConfig.value.username,
  password: loginConfig.value.password
})

const handleSubmit = async ({
  errors,
  values
}: {
  errors: Record<string, ValidatedError> | undefined
  values: Record<string, any>
}): Promise<void> => {
  if (loading.value) return
  if (errors !== undefined) {
    return
  }
  setLoading(true)
  try {
    await userStore.login(values as LoginData)
    const { redirect, ...othersQuery } = router.currentRoute.value.query
    void router.push({
      name: redirect as string ?? 'Workplace',
      query: {
        ...othersQuery
      }
    })
    Message.success('欢迎使用')
    const { rememberPassword } = loginConfig.value
    const { username, password } = values
    // 实际生产环境需要进行加密存储。
    // The actual production environment requires encrypted storage.
    loginConfig.value.username = rememberPassword ? username : ''
    loginConfig.value.password = rememberPassword ? password : ''
  } catch (err) {
    console.error(err)
  } finally {
    setLoading(false)
  }
}
const setRememberPassword = (value: boolean): void => {
  loginConfig.value.rememberPassword = value
}

const handleRegister = (): void => {
  void router.push({
    name: 'Register'
  })
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 320px;

  .title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  .sub-title {
    color: var(--color-text-3);
    font-size: 16px;
    line-height: 24px;
  }

  .error-msg {
    height: 32px;
    color: rgb(var(--red-6));
    line-height: 32px;
  }

  .password-actions {
    display: flex;
    justify-content: space-between;
  }

  .register-btn {
    color: var(--color-text-3) !important;
  }
}
</style>
@/api/auth@/api/tenant
