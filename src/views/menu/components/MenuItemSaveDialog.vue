<template>
  <div class="dialog">
    <a-modal v-model:visible="visible" :title="editMode ? '编辑菜单' : '新建菜单'" @cancel="handleCancel" :on-before-ok="handleSubmit">
      <a-form ref="formRef" :model="form">
        <a-form-item
          v-if="form.parentId != 0"
          field="parentId"
          label="上级菜单"
          :rules="[{required:true,message:'请选择上级菜单'}]"
          :validate-trigger="['change','input']"
        >
          <a-tree-select
            v-model="form.parentId"
            :placeholder="'请选择上级菜单'"
            :data="props.menus"
            :fieldNames="{
              key: 'menuId',
              title: 'locale',
            }"
            disabled
          ></a-tree-select>
        </a-form-item>
        <a-form-item
          field="locale"
          label="菜单名称"
          :rules="[{required:true,message:'请输入菜单名称'}]"
          :validate-trigger="['change','input']"
        >
          <a-input v-model="form.locale" :max-length="20" />
        </a-form-item>
        <a-form-item
          field="name"
          label="菜单编码"
          :rules="[{required:true,message:'请输入菜单编码'}]"
          :validate-trigger="['change','input']"
        >
          <a-input v-model="form.name" :max-length="20" />
        </a-form-item>
        <a-form-item
          field="icon"
          label="菜单图标"
          :validate-trigger="['change','input']"
        >
          <a-input v-model="form.icon" :max-length="20" />
        </a-form-item>
        <a-form-item field="description" label="描述">
          <a-textarea v-model="form.description" :auto-size="{minRows: 2}"/>
        </a-form-item>
        <a-form-item
          field="weight"
          label="权重"
          :validate-trigger="['change','input']"
        >
          <a-input-number v-model="form.weight" :default-value="0" mode="button" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Message, type FormInstance, type CascaderOption } from '@arco-design/web-vue'
import { MenuType, createMenu, updateMenu, type Menu } from '@/api/menu'

const emit = defineEmits(['refresh'])

const props = defineProps<{
  menus: CascaderOption[]
}>()

const formRef = ref<FormInstance>()
const visible = ref(false)
const editMode = ref(false)

const initForm = () => {
  return {
    menuId: 0,
    parentId: 0,
    name: '',
    menuType: MenuType.MENU_ITEM,
    icon: '',
    locale: '',
    description: '',
    weight: 0
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
    ...form.value
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
    ...form.value
  }).then(() => {
    Message.success('更新成功')
    emit('refresh')
    return true
  }).catch(() => {
    Message.error('更新失败')
    return false
  })
}

const open = (data?: Menu) => {
  if (data?.menuId != null) {
    editMode.value = true
    form.value = {
      ...form.value,
      ...data
    }
  } else {
    editMode.value = false
    form.value = {
      ...initForm(),
      ...data
    }
  }
  visible.value = true
}

defineExpose({
  open
})
</script>

<style lang="scss" scoped>
</style>
