<template>
  <div class="dialog">
    <a-modal
      v-model:visible="visible"
      title="修改密码"
      :on-before-ok="handleBeforeOk"
      @cancel="handleCancel"
    >
      <a-form ref="formRef" :model="form" auto-label-width>
        <a-form-item class="hidden" label="用户名">
          <a-input autocomplete="username" />
        </a-form-item>
        <a-form-item
          field="oldPassword"
          label="旧密码"
          :rules="[{ required: true, message: '请输入新密码' }]"
          :validate-trigger="['change', 'input']"
        >
          <a-input-password
            v-model="form.oldPassword"
            :max-length="20"
            autocomplete="old-password"
          />
        </a-form-item>
        <a-form-item
          field="newPassword"
          label="新密码"
          :rules="[
            { required: true, message: '请输入新密码' },
            {
              match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/,
              message:
                '密码至少8位字符，支持数字、字母和除空格外的特殊字符，且必须同时包含数字和大小写字母。',
            },
          ]"
          :validate-trigger="['change', 'input']"
        >
          <a-input-password
            v-model="form.newPassword"
            :max-length="20"
            autocomplete="new-password"
          />
        </a-form-item>
        <a-form-item
          field="repeatPassword"
          label="重新输入新密码"
          :rules="[
            { required: true, message: '请重新输入新密码' },
            {
              validator: (value, cb) => {
                if (value !== form.newPassword) {
                  cb('两次输入的密码不一致')
                }
              },
            },
          ]"
          :validate-trigger="['input']"
        >
          <a-input-password
            v-model="form.repeatPassword"
            :max-length="20"
            autocomplete="new-password"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Message, type FormInstance } from '@arco-design/web-vue'
import { updatePassword } from '@/api/auth'

const formRef = ref<FormInstance>()
const visible = ref(false)

const initForm = () => {
  return {
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
  }
}

const form = ref(initForm())

const handleCancel = () => {
  visible.value = false
}

const handleBeforeOk = async () => {
  return await formRef.value
    ?.validate()
    .then(async (res) => {
      if (res != null) return false
      return await handleUpdate()
    })
    .catch(() => {
      return false
    })
}

const handleUpdate = async () => {
  return await updatePassword({
    repeatPassword: form.value.repeatPassword,
    oldPassword: form.value.oldPassword,
    newPassword: form.value.newPassword,
  })
    .then(() => {
      Message.success('更新成功')
      return true
    })
    .catch(() => {
      Message.error('更新失败')
      return false
    })
}

const open = () => {
  form.value = {
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
  }
  visible.value = true
}

defineExpose({
  open,
})
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}
</style>
