<template>
  <div class="tab">
    <a-row style="margin-bottom: 16px">
      <a-col :span="12">
        <a-space>
          <a-button type="primary" @click="handleAdd">
            <template #icon>
              <icon-plus />
            </template>
            添加权限
          </a-button>
        </a-space>
      </a-col>
      <a-col
        :span="12"
        style="display: flex; align-items: center; justify-content: end; height: 32px;"
      >
        <a-tooltip content="刷新">
          <div class="action-icon" @click="fetchData()">
            <icon-refresh size="18" />
          </div>
        </a-tooltip>
      </a-col>
    </a-row>
    <a-table
      row-key="id"
      :loading="loading"
      :pagination="pagination"
      :columns="(columns as TableColumnData[])"
      :data="renderData"
      :bordered="false"
      size="medium"
      @page-change="onPageChange"
    >
      <template #operations="{ record }">
        <a-button type="text" size="small" @click="handleDelete(record)">
          删除
        </a-button>
      </template>
    </a-table>
    <PermissionAssignDialog ref="saveDialog" @refresh="fetchData" />
  </div>
</template>

<script setup lang="ts">
import useLoading from '@/hooks/loading.ts'
import { reactive, ref, computed } from 'vue'
import { type TableColumnData, Modal, Message } from '@arco-design/web-vue'
import { useQuery } from '@/hooks/query'
import { listRolePermission, type RolePermission, deleteRolePermission } from '@/api/role'
import PermissionAssignDialog from './PermissionAssignDialog.vue'

const { loading, setLoading } = useLoading(true)

const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0
})

const query = useQuery<{
  id: string
}>()

const saveDialog = ref<typeof PermissionAssignDialog>()
const renderData = ref<RolePermission[]>([])
const columns = computed<TableColumnData[]>(() => [
  {
    title: '权限',
    dataIndex: 'permissionName'
  },
  {
    title: '操作',
    dataIndex: 'operations',
    slotName: 'operations'
  }
])

const fetchData = async (
  params = { current: 1, pageSize: 20 }
) => {
  setLoading(true)
  try {
    const res = await listRolePermission(query.value.id, {
      current: params.current,
      pageSize: params.pageSize
    })
    renderData.value = res.list
    pagination.current = res.current
    pagination.total = res.total
  } catch (err) {
    console.log(err)
  } finally {
    setLoading(false)
  }
}

const onPageChange = (current: number) => {
  void fetchData({
    current,
    pageSize: pagination.pageSize
  })
}

const handleAdd = () => {
  saveDialog.value?.open({
    roleId: query.value.id
  })
}

const handleDelete = (record: RolePermission) => {
  Modal.warning({
    title: '警告',
    content: `你正在删除权限${record.permissionName}，是否继续？`,
    hideCancel: false,
    onOk () {
      void deleteRolePermission(
        query.value.id,
        {
          permissionIds: [record.permissionId]
        }).then(() => {
        Message.success('删除权限成功')
        void fetchData()
      }).catch(() => {
        Message.error('删除权限失败')
      })
    }
  })
}

void fetchData()
</script>

<style scoped lang="scss">
.tab {
  padding: 16px 0;
}
</style>
