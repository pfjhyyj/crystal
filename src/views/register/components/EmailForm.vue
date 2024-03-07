<template>
  <div class="wrapper">
    <div class="title">注册</div>
    <div class="error-msg">{{ errorMessage }}</div>
    <a-form ref="formRef" :model="form" class="form" layout="vertical" @submit="handleSubmit">
      <a-form-item
        field="email"
        :rules="[{ required: true, message: '邮箱不能为空' }, { match: /^\w+(-+.\w+)*@\w+(-.\w+)*.\w+(-.\w+)*$/, message: '手邮箱格式不正确' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input v-model="form.email" placeholder="请输入邮箱">
          <template #prefix>
            <icon-email />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="username"
        :rules="[{ required: true, message: '用户名不能为空' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input v-model="form.username" placeholder="请输入用户名">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: '密码不能为空' }, {match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/, message: '密码至少8位字符，支持数字、字母和除空格外的特殊字符，且必须同时包含数字和大小写字母。'}]"
        :validate-trigger="['change', 'blur']" hide-label
      >
        <a-input-password v-model="form.password" autocomplete="new-password" placeholder="请输入密码" allow-clear :max-length="20">
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
          field="repeatPassword"
          :rules="[{required:true,message:'请重新输入新密码'}, {validator: (value, cb) => {
            if (value !== form.password) {
              cb('两次输入的密码不一致')
            }
          }}]"
          :validate-trigger="['input']"
          hide-label
        >
          <a-input-password v-model="form.repeatPassword" :max-length="20" autocomplete="new-password" placeholder="请再次输入密码">
            <template #prefix>
              <icon-lock />
            </template>
          </a-input-password>
        </a-form-item>
      <a-space :size="16" direction="vertical">
        <a-button type="primary" html-type="submit" long :loading="loading">
          注册
        </a-button>
        <a-button type="text" long class="register-btn" @click="handleLogin">
          前往登陆
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Message, type FormInstance } from '@arco-design/web-vue'
import { type ValidatedError } from '@arco-design/web-vue/es/form/interface'
import useLoading from '@/hooks/loading'
import { registerByEmail } from '@/api/auth'

const router = useRouter()
const errorMessage = ref('')
const { loading, setLoading } = useLoading()

const formRef = ref<FormInstance>()

const form = reactive({
  username: '',
  password: '',
  repeatPassword: '',
  email: ''
})

const handleLogin = (): void => {
  void router.replace({
    name: 'Login'
  })
}

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
    void registerByEmail({
      username: values.username,
      password: values.password,
      email: values.email
    }).then(() => {
      Message.success('注册成功！正在返回登陆界面')
      setTimeout(() => {
        void router.replace({
          name: 'Login'
        })
      }, 3000)
    })
  } catch (err) {
    errorMessage.value = (err as Error).message
  } finally {
    setLoading(false)
  }
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
