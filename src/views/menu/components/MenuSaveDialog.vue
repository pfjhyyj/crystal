<template>
  <div class="dialog">
    <a-modal v-model:visible="visible" :title="editMode ? '编辑菜单' : '新建菜单'" @cancel="handleCancel" :on-before-ok="handleSubmit">
      <a-form ref="formRef" :model="form">
        <a-form-item
          field="name"
          label="菜单名称"
          :rules="[{required:true,message:'请输入菜单名称'}]"
          :validate-trigger="['change','input']"
        >
          <a-input v-model="form.name" :max-length="20" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Message, type FormInstance } from '@arco-design/web-vue'
import { type MenuPageResponse, MenuType, createMenu, updateMenu } from '@/api/menu'

const emit = defineEmits(['refresh'])

const formRef = ref<FormInstance>()
const visible = ref(false)
const editMode = ref(false)

const initForm = () => {
  return {
    menuId: 0,
    name: ''
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
  return await createMenu({
    name: form.value.name,
    parentId: 0,
    menuType: MenuType.MENU_CATEGORY
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
  return await updateMenu(form.value.menuId, {
    name: form.value.name
  }).then(() => {
    Message.success('更新成功')
    emit('refresh')
    return true
  }).catch(() => {
    Message.error('更新失败')
    return false
  })
}

const open = (data?: MenuPageResponse) => {
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
