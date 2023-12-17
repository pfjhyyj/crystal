<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import { TenantStatus, createTenant, updateTenant, type Tenant } from '@/api/tenant'
import { type numberic } from '@/api/type'

const emit = defineEmits(['refresh'])

const visible = ref(false)
const editMode = ref(false)
const initForm = () => {
  return {
    tenantId: '' as numberic,
    name: '',
    code: '',
    description: '',
    status: TenantStatus.ENABLE
  }
}
const form = ref(initForm())

const handleCancel = () => {
  visible.value = false
}

const handleBeforeOk = async () => {
  if (editMode.value) {
    return await handleUpdateTenant()
  } else {
    return await handleCreateTenant()
  }
}

const handleCreateTenant = async () => {
  return await createTenant({
    name: form.value.name,
    code: form.value.code,
    description: form.value.description,
    status: form.value.status
  }).then(() => {
    Message.success('创建租户成功')
    emit('refresh')
    return true
  }).catch(() => {
    Message.error('创建租户失败')
    return false
  })
}

const handleUpdateTenant = async () => {
  return await updateTenant(form.value.tenantId, {
    name: form.value.name,
    code: form.value.code,
    description: form.value.description,
    status: form.value.status
  }).then(() => {
    Message.success('更新租户成功')
    emit('refresh')
    return true
  }).catch(() => {
    Message.error('更新租户失败')
    return false
  })
}

const open = (data?: Tenant) => {
  if (data != null) {
    editMode.value = true
    form.value = {
      ...data
    }
  } else {
    editMode.value = false
    form.value = initForm()
  }
  visible.value = true
}

defineExpose({
  open
})
</script>

<template>
  <div class="dialog">
    <a-modal v-model:visible="visible" :title="editMode ? '编辑租户' : '新建租户'" @cancel="handleCancel" @submit-success="handleBeforeOk">
      <a-form :model="form">
        <a-form-item
          field="name"
          label="租户名称"
          :rules="[{required:true,message:'请输入租户名称'}]"
          :validate-trigger="['change','input']"
        >
          <a-input v-model="form.name" :max-length="20" />
        </a-form-item>
        <a-form-item
          field="code"
          label="租户编码"
          :rules="[{required:true,message:'请输入租户编码'}]"
          :validate-trigger="['change','input']"
        >
          <a-input v-model="form.code" />
        </a-form-item>
        <a-form-item field="description" label="描述">
          <a-textarea v-model="form.description" :auto-size="{minRows: 2}"/>
        </a-form-item>
        <a-form-item field="status" label="状态">
          <a-select v-model="form.status">
            <a-option :value="TenantStatus.ENABLE">启用</a-option>
            <a-option :value="TenantStatus.DISABLE">禁用</a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style lang="scss" scoped>
</style>
