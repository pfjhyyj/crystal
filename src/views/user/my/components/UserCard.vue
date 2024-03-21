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
import { useUserStore } from '@/store'
import { type DescData } from '@arco-design/web-vue'

const userStore = useUserStore()
const renderData = [
  {
    label: '用户名',
    value: userStore.username ?? '未设置',
  },
] as DescData[]
</script>

<style lang="scss" scoped></style>
