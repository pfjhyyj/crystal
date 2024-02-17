<template>
  <div class="container">
    <a-row style="margin-bottom: 16px">
      <a-col :span="24">
        <role-card :data="data" />
      </a-col>
    </a-row>
    <a-row class="wrapper">
      <a-col :span="24">
        <a-tabs default-active-key="2" type="rounded">
          <a-tab-pane key="2" title="权限管理">
            <permission-tab />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@/hooks/query'
import RoleCard from './components/RoleCard.vue'
import { ref } from 'vue'
import { getRole, type RolePageResp } from '@/api/role'
import PermissionTab from './components/PermissionTab.vue'

const query = useQuery<{
  id: string
}>()
const data = ref<RolePageResp>()
const fetchData = async () => {
  const res = await getRole(query.value.id)
  data.value = res
}

void fetchData()
</script>

<script lang="ts">
export default {
  name: 'RoleDetail'
}
</script>

<style scoped lang="scss">
.container {
  padding: 20px;
}
.wrapper {
  padding: 20px;
  min-height: 580px;
  background-color: var(--color-bg-2);
  border-radius: 4px;
}
</style>
