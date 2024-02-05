<template>
  <div class="container">
    <a-row style="margin-bottom: 16px">
      <a-col :span="24">
        <UserCard />
      </a-col>
    </a-row>
    <a-row class="wrapper">
      <a-col :span="24">
        <a-tabs default-active-key="2" type="rounded">
          <!-- <a-tab-pane key="1" title="基础信息">
            <BasicInformation />
          </a-tab-pane> -->
          <a-tab-pane key="2" title="安全设置">
            <SecurityTab />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import SecurityTab from './components/SecurityTab.vue'
import UserCard from './components/UserCard.vue'
</script>

<script lang="ts">
export default {
  name: 'MySetting'
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
