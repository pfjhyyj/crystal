<template>
  <div class="container">
    <div class="wrapper">
      <a-form ref="formRef" :model="form" @submit="handleSubmit">
        <a-form-item field="title" hide-label>
          <a-input
            v-model="form.title"
            placeholder="Title"
          />
        </a-form-item>
        <a-form-item field="content" hide-label>
          <EditorClassic v-model="form.content" />
        </a-form-item>
        <a-form-item hide-label>
          <a-button html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createArticle, getArticleDetail, updateArticle } from '@/api/article';
import EditorClassic from '@/components/editor/EditorClassic.vue'
import { useQuery } from '@/hooks/query';
import { FormInstance, Message } from '@arco-design/web-vue';
import { ref, watch } from 'vue';

const query = useQuery<{
  id: string;
}>()

const initForm = () => {
  return {
    category: undefined,
    content: `
      <h2>Heading</h2>
      <p>Content</p>
    `,
    title: '',
    tag: undefined,
    status: 1
  }
}

const formRef = ref<FormInstance>()
const form = ref<{
  category?: null | string;
  content: string;
  status: number;
  tag?: null | string;
  title: string;
}>(initForm())

const handleSubmit = async () => {
  return await formRef.value
    ?.validate()
    .then(async (err) => {
      if (err != null) return false
      if (query.value.id) {
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
  return await createArticle({
    ...form.value
  })
    .then(() => {
      Message.success('创建成功')
      return true
    })
    .catch(() => {
      Message.error('创建失败')
      return false
    })
}

const handleUpdate = async () => {
  return await updateArticle(query.value.id, {
    ...form.value
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

watch(
  () => query.value.id,
  (val) => {
    if (val) {
      getArticleDetail(val).then((res) => {
        form.value = {
          ...res
        }
      })
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
}
.wrapper {
  padding: 20px;
  background-color: var(--color-bg-2);
  border-radius: 4px;
}
.editor {
  width: 100%;
}
</style>