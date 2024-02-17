<template>
  <div class="dialog">
    <a-modal v-model:visible="visible" :title="editMode ? '编辑角色' : '新建角色'" @cancel="handleCancel" :on-before-ok="handleSubmit">
      <a-form ref="formRef" :model="form">
        <a-form-item
          field="roleName"
          label="角色名称"
          :rules="[{required:true,message:'请输入角色名称'}]"
          :validate-trigger="['change','input']"
        >
          <a-input v-model="form.roleName" :max-length="20" />
        </a-form-item>
        <a-form-item
          field="roleCode"
          label="角色编码"
          :rules="[{required:true,message:'请输入角色编码'}]"
          :validate-trigger="['change','input']"
        >
          <a-input v-model="form.roleCode" :max-length="20" />
        </a-form-item>
        <a-form-item field="description" label="描述">
          <a-textarea v-model="form.description" :auto-size="{minRows: 2}"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Message, type FormInstance } from '@arco-design/web-vue'
import { type RolePageResp, createRole, updateRole } from '@/api/role'

const emit = defineEmits(['refresh'])

const formRef = ref<FormInstance>()
const visible = ref(false)
const editMode = ref(false)

const initForm = () => {
  return {
    roleId: 0,
    roleName: '',
    roleCode: '',
    description: ''
  }
}
const form = ref(initForm())

const handleCancel = () => {
  visible.value = false
}

const handleSubmit = async () => {
  return await formRef.value?.validate().then(async (err) => {
    if (err != null) return false
    if (editMode.value) {
      return await handleUpdate()
    } else {
      return await handleCreate()
    }
  }).catch(() => {
    return false
  })
}

const handleCreate = async () => {
  return await createRole({
    roleCode: form.value.roleCode,
    roleName: form.value.roleName,
    description: form.value.description
  }).then(() => {
    Message.success('创建成功')
    emit('refresh')
    return true
  }).catch(() => {
    Message.error('创建失败')
    return false
  })
}

const handleUpdate = async () => {
  return await updateRole(form.value.roleId, {
    roleCode: form.value.roleCode,
    roleName: form.value.roleName,
    description: form.value.description
  }).then(() => {
    Message.success('更新成功')
    emit('refresh')
    return true
  }).catch(() => {
    Message.error('更新失败')
    return false
  })
}

const open = (data?: RolePageResp) => {
  if (data != null) {
    editMode.value = true
    form.value = {
      ...form.value,
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

<style lang="scss" scoped>
</style>
