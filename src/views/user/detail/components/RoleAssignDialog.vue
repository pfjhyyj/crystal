<template>
  <div class="dialog">
    <a-modal v-model:visible="visible" title="添加角色" @cancel="handleCancel" :on-before-ok="handleBeforeOk">
      <a-form ref="formRef" :model="form">
        <a-form-item
          field="username"
          label="用户名"
        >
          <a-input v-model="form.username" disabled />
        </a-form-item>
        <a-form-item field="newRoleId" label="新角色">
          <a-select v-model="form.newRoleId">
            <a-option v-for="item in roles" :key="item.roleId" :value="item.roleId">{{`${item.tenantName} - ${item.roleName}`}}</a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Message, type FormInstance } from '@arco-design/web-vue'
import { type Role, listRole, assignRole } from '@/api/role'
import { type User } from '@/api/user'

const emit = defineEmits(['refresh'])

const formRef = ref<FormInstance>()
const visible = ref(false)
const roles = ref<Role[]>()

void listRole().then((res) => {
  roles.value = res.roles
})

const initForm = () => {
  return {
    userId: '',
    username: '',
    newRoleId: ''
  }
}
const form = ref<ReturnType<typeof initForm>>(initForm())

const handleCancel = () => {
  visible.value = false
}

const handleBeforeOk = async () => {
  return await formRef.value?.validate().then(async (err) => {
    if (err != null) return false
    return await handleUpdate()
  }).catch(() => {
    return false
  })
}

const handleUpdate = async () => {
  return await assignRole({
    userId: form.value.userId,
    newRoleId: form.value.newRoleId
  }).then(() => {
    Message.success('更新成功')
    emit('refresh')
    return true
  }).catch(() => {
    Message.error('更新失败')
    return false
  })
}

const open = (data: User) => {
  form.value = {
    ...form.value,
    userId: data.userId as string,
    username: data.username as string
  }
  visible.value = true
}

defineExpose({
  open
})
</script>

<style lang="scss" scoped>
</style>
