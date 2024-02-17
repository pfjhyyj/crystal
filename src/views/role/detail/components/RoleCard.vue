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
import { type RolePageResp } from '@/api/role'
import { type DescData } from '@arco-design/web-vue'
import { computed } from 'vue'
import { type PropType } from 'vue'

const props = defineProps({
  data: {
    type: Object as PropType<RolePageResp>,
    required: false
  }
})

const renderData = computed(() => {
  if (props.data == null) return [] as DescData[]
  return [
    {
      label: '角色名',
      value: props.data.roleName ?? ''
    },
    {
      label: '角色编码',
      value: props.data.roleCode ?? ''
    },
    {
      label: '角色描述',
      value: props.data.description ?? ''
    }
  ] as DescData[]
})
</script>

<style lang="scss" scoped>
</style>
