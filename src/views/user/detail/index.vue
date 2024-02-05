<template>
  <div class="container">
    <a-row style="margin-bottom: 16px">
      <a-col :span="24">
        <UserCard :data="data" />
      </a-col>
    </a-row>
    <a-row class="wrapper">
      <a-col :span="24">
        <a-tabs default-active-key="2" type="rounded">
          <a-tab-pane key="2" title="角色管理">
            <RoleTab />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import UserCard from './components/UserCard.vue'
import RoleTab from './components/RoleTab.vue'
import { getUserInfo, type User } from '@/api/user'
import { ref } from 'vue'
import { useQuery } from '@/hooks/query'

const query = useQuery<{
  id: string
}>()
const data = ref<User>()
const fetchData = async () => {
  const res = await getUserInfo({
    userId: query.value.id
  })
  data.value = res.user
}

void fetchData()
</script>

<script lang="ts">
export default {
  name: 'UserDetail'
}
</script>

<style scoped lang="scss">
.container {
  padding: 20px;
}
.wrapper {
  padding: 20px 0 0 20px;
  min-height: 580px;
  background-color: var(--color-bg-2);
  border-radius: 4px;
}
</style>
