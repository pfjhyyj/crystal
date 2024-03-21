<template>
  <div class="card">
    <a-card :bordered="false">
      <a-space :size="54">
        <a-descriptions
          :data="renderData"
          :column="2"
          align="right"
          layout="inline-horizontal"
          :label-style="{
            width: '140px',
            fontWeight: 'normal',
            color: 'rgb(var(--gray-8))',
          }"
          :value-style="{
            width: '200px',
            paddingLeft: '8px',
            textAlign: 'left',
          }"
        >
        </a-descriptions>
      </a-space>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { type UserDetailResp } from '@/api/user'
import { type DescData } from '@arco-design/web-vue'
import { computed } from 'vue'
import { type PropType } from 'vue'

const props = defineProps({
  data: {
    type: Object as PropType<UserDetailResp>,
    required: false,
  },
})

const renderData = computed(() => {
  if (props.data == null) return [] as DescData[]
  return [
    {
      label: '用户名',
      value: props.data.username ?? '未设置',
    },
    {
      label: '邮箱',
      value: props.data.email ?? '未设置',
    },
    {
      label: '手机号',
      value: props.data.mobile ?? '未设置',
    },
  ] as DescData[]
})
</script>

<style lang="scss" scoped></style>
