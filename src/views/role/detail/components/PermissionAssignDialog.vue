<template>
  <div class="dialog">
    <a-modal v-model:visible="visible" title="添加权限" @cancel="handleCancel" :on-before-ok="handleBeforeOk">
      <a-form ref="formRef" :model="form">
        <a-form-item field="newPermissionIds" label="新权限" :rules="[{required:true,message:'请选择权限'}]">
          <a-select v-model="form.newPermissionIds" multiple @search="handleSearch">
            <a-option v-for="item in permissions" :key="item.permissionId" :value="item.permissionId">{{`${item.name}`}}</a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Message, type FormInstance } from '@arco-design/web-vue'
import { addRolePermission } from '@/api/role'
import { type Permission, listPermission } from '@/api/permission'

const emit = defineEmits(['refresh'])

const formRef = ref<FormInstance>()
const visible = ref(false)
const permissions = ref<Permission[]>()

const handleSearch = (value: string) => {
  void listPermission({
    current: 1,
    pageSize: 20,
    name: value
  }).then((res) => {
    permissions.value = res.list
  })
}

const initForm = () => {
  return {
    roleId: '',
    newPermissionIds: []
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
  return await addRolePermission(form.value.roleId, {
    permissionIds: form.value.newPermissionIds
  }).then(() => {
    Message.success('添加成功')
    emit('refresh')
    return true
  }).catch(() => {
    Message.error('添加失败')
    return false
  })
}

const open = (data: {
  roleId: string
}) => {
  form.value = {
    ...form.value,
    roleId: data.roleId
  }
  visible.value = true
}

defineExpose({
  open
})
</script>

<style lang="scss" scoped>
</style>
