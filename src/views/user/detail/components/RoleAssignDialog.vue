<template>
  <div class="dialog">
    <a-modal
      v-model:visible="visible"
      title="添加角色"
      :on-before-ok="handleBeforeOk"
      @cancel="handleCancel"
    >
      <a-form ref="formRef" :model="form">
        <a-form-item
          field="newRoleId"
          label="新角色"
          :rules="[{ required: true, message: '请选择角色' }]"
        >
          <a-select v-model="form.newRoleId">
            <a-option
              v-for="item in roles"
              :key="item.roleId"
              :value="item.roleId"
              >{{ `${item.roleName}` }}</a-option
            >
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Message, type FormInstance } from '@arco-design/web-vue'
import { type RolePageResp, listRole, addUserRole } from '@/api/role'

const emit = defineEmits(['refresh'])

const formRef = ref<FormInstance>()
const visible = ref(false)
const roles = ref<RolePageResp[]>()

void listRole({
  current: 1,
  pageSize: 20,
}).then((res) => {
  roles.value = res.list
})

const initForm = () => {
  return {
    userId: '',
    newRoleId: '',
  }
}
const form = ref<ReturnType<typeof initForm>>(initForm())

const handleCancel = () => {
  visible.value = false
}

const handleBeforeOk = async () => {
  return await formRef.value
    ?.validate()
    .then(async (err) => {
      if (err != null) return false
      return await handleUpdate()
    })
    .catch(() => {
      return false
    })
}

const handleUpdate = async () => {
  return await addUserRole({
    userId: form.value.userId,
    roleIds: [form.value.newRoleId],
  })
    .then(() => {
      Message.success('添加成功')
      emit('refresh')
      return true
    })
    .catch(() => {
      Message.error('添加失败')
      return false
    })
}

const open = (data: { userId: string }) => {
  form.value = {
    ...form.value,
    userId: data.userId,
  }
  visible.value = true
}

defineExpose({
  open,
})
</script>

<style lang="scss" scoped></style>
