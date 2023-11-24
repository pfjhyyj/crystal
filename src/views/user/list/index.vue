<template>
  <div class="container">
    <Breadcrumb :items="['用户管理', '用户列表']" />
    <div class="content">
      <a-card>
        <div class="table-actions">
          <a-button type="primary">添加用户</a-button>
        </div>
        <a-table
          :columns="columns"
          :data-source="dataSource"
          :pagination="pagination"
          :loading="loading"
          rowKey="id"
        >
          <template #action="{ record }">
            <a-space>
              <a-button type="link">编辑</a-button>
              <a-button type="link">删除</a-button>
            </a-space>
          </template>
        </a-table>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.container {
  padding: 0 20px 20px 20px;
}
</style>
