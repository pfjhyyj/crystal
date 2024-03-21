<template>
  <div class="dialog">
    <a-modal
      v-model:visible="visible"
      :title="editMode ? '编辑员工' : '新建员工'"
      @cancel="handleCancel"
      @before-ok="handleBeforeOk"
    >
      <a-form :model="form">
        <a-form-item
          field="tenantId"
          label="所属租户"
          :rules="[{ required: true, message: '请选择所属租户' }]"
        >
          <a-select v-model="form.tenantId" placeholder="请选择所属租户">
            <a-option
              v-for="tenant in tenants"
              :key="tenant.tenantId"
              :value="tenant.tenantId"
              >{{ tenant.name }}</a-option
            >
          </a-select>
        </a-form-item>
        <a-form-item
          field="nickname"
          label="用户昵称"
          :rules="[{ required: true, message: '请输入用户昵称' }]"
          :validate-trigger="['change', 'input']"
        >
          <a-input v-model="form.nickname" :max-length="20" />
        </a-form-item>
        <a-form-item
          field="username"
          label="用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
          :validate-trigger="['change', 'input']"
        >
          <a-input v-model="form.username" :max-length="20" />
        </a-form-item>
        <a-form-item
          field="email"
          label="电子邮箱"
          :rules="[{ type: 'email', message: '请输入正确的电子邮箱' }]"
          :validate-trigger="['change', 'input']"
        >
          <a-input v-model="form.email" :max-length="20" />
        </a-form-item>
        <a-form-item
          field="phone"
          label="手机号"
          :rules="[
            { required: true, message: '请输入手机号' },
            { match: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' },
          ]"
          :validate-trigger="['change', 'input']"
        >
          <a-input v-model="form.phone" :max-length="11" />
        </a-form-item>
        <a-form-item field="status" label="状态">
          <a-select v-model="form.status">
            <a-option :value="UserStatus.ENABLE">启用</a-option>
            <a-option :value="UserStatus.DISABLE">禁用</a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Message } from '@arco-design/web-vue'
import { getTenantList, type Tenant } from '@/api/tenant'
import { UserStatus, type User, createUser, updateUser } from '@/api/user'

export interface StaffSaveDialogProps {
  open: (data?: User) => void
}

const emit = defineEmits(['refresh'])

const visible = ref(false)
const editMode = ref(false)
const form = reactive<User>({
  id: '',
  tenantId: '',
  nickname: '',
  username: '',
  password: '',
  avatar: '',
  email: '',
  phone: '',
  status: UserStatus.ENABLE,
})

const tenants = ref<Tenant[]>([])

void getTenantList().then((res) => {
  tenants.value = res.list
})

const handleCancel = () => {
  visible.value = false
}

const handleBeforeOk = async () => {
  if (editMode.value) {
    return await handleUpdate()
  } else {
    return await handleCreate()
  }
}

const handleCreate = async () => {
  return await createUser({
    tenantId: form.tenantId,
    nickname: form.nickname,
    username: form.username,
    password: form.password,
    avatar: form.avatar,
    email: form.email,
    phone: form.phone,
    status: form.status,
  })
    .then(() => {
      Message.success('创建用户成功')
      emit('refresh')
      return true
    })
    .catch(() => {
      Message.error('创建用户失败')
      return false
    })
}

const handleUpdate = async () => {
  return await updateUser(form.id, {
    tenantId: form.tenantId,
    nickname: form.nickname,
    username: form.username,
    password: form.password,
    avatar: form.avatar,
    email: form.email,
    phone: form.phone,
    status: form.status,
  })
    .then(() => {
      Message.success('更新员工信息成功')
      emit('refresh')
      return true
    })
    .catch(() => {
      Message.error('更新员工信息失败')
      return false
    })
}

const open = (data?: User) => {
  if (data != null) {
    editMode.value = true
    form.id = data.id
    form.tenantId = data.tenantId
    form.nickname = data.nickname
    form.username = data.username
    form.password = data.password
    form.avatar = data.avatar
    form.email = data.email
    form.phone = data.phone
    form.status = data.status
  } else {
    editMode.value = false
    form.id = ''
    form.tenantId = ''
    form.nickname = ''
    form.username = ''
    form.password = ''
    form.avatar = ''
    form.email = ''
    form.phone = ''
    form.status = UserStatus.ENABLE
  }
  visible.value = true
}

defineExpose({
  open,
})
</script>

<script lang="ts">
export default {
  name: 'StaffSaveDialog',
}
</script>

<style lang="scss" scoped></style>
