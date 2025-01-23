<template>
  <div class="dialog">
    <a-modal
      v-model:visible="visible"
      :title="editMode ? '编辑权限' : '新建权限'"
      :on-before-ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-form ref="formRef" :model="form">
        <a-form-item
          field="name"
          label="权限名称"
          :rules="[{ required: true, message: '请输入权限名称' }]"
          :validate-trigger="['change', 'input']"
        >
          <a-input v-model="form.name" :max-length="20" />
        </a-form-item>
        <a-form-item
          field="object"
          label="目标资源"
          :rules="[{ required: true, message: '请输入目标资源编码' }]"
          :validate-trigger="['change', 'input']"
        >
          <a-input v-model="form.object" :max-length="20" />
        </a-form-item>
        <a-form-item
          field="action"
          label="权限动作"
          :rules="[{ required: true, message: '请输入权限动作编码' }]"
          :validate-trigger="['change', 'input']"
        >
          <a-input v-model="form.action" />
        </a-form-item>
        <a-form-item field="description" label="描述">
          <a-textarea v-model="form.description" :auto-size="{ minRows: 2 }" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Message, type FormInstance } from '@arco-design/web-vue'
import {
  createPermission,
  updatePermission,
  type Permission,
} from '@/api/permission'

const emit = defineEmits(['refresh'])

const formRef = ref<FormInstance>()
const visible = ref(false)
const editMode = ref(false)

const initForm = () => {
  return {
    permissionId: 0,
    name: '',
    object: '',
    action: '',
    description: '',
  }
}
const form = ref(initForm())

const handleCancel = () => {
  visible.value = false
}

const handleSubmit = async () => {
  return await formRef.value
    ?.validate()
    .then(async (err) => {
      if (err != null) return false
      if (editMode.value) {
        return await handleUpdate()
      } else {
        return await handleCreate()
      }
    })
    .catch(() => {
      return false
    })
}

const handleCreate = async () => {
  return await createPermission({
    name: form.value.name,
    object: form.value.object,
    action: form.value.action,
    description: form.value.description,
  })
    .then(() => {
      Message.success('创建成功')
      emit('refresh')
      return true
    })
    .catch(() => {
      Message.error('创建失败')
      return false
    })
}

const handleUpdate = async () => {
  return await updatePermission(form.value.permissionId, {
    name: form.value.name,
    object: form.value.object,
    action: form.value.action,
    description: form.value.description,
  })
    .then(() => {
      Message.success('更新成功')
      emit('refresh')
      return true
    })
    .catch(() => {
      Message.error('更新失败')
      return false
    })
}

const open = (data?: Permission) => {
  if (data != null) {
    editMode.value = true
    console.log(data)
    form.value = {
      ...form.value,
      ...data,
    }
  } else {
    editMode.value = false
    form.value = initForm()
  }
  visible.value = true
}

defineExpose({
  open,
})
</script>

<style lang="scss" scoped></style>
