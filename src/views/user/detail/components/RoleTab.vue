<template>
  <div class="tab">
    <a-row style="margin-bottom: 16px">
      <a-col :span="12">
        <a-space>
          <a-button type="primary" @click="handleAdd">
            <template #icon>
              <icon-plus />
            </template>
            添加角色
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
      <template #index="{ rowIndex }">
        {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
      </template>
      <template #operations="{ record }">
        <a-button type="text" size="small" @click="handleDelete(record)">
          删除
        </a-button>
      </template>
    </a-table>
    <role-assign-dialog ref="saveDialog" @refresh="fetchData" />
  </div>
</template>

<script setup lang="ts">
import useLoading from '@/hooks/loading.ts'
import { reactive, ref, computed } from 'vue'
import { type TableColumnData, Modal, Message } from '@arco-design/web-vue'
import { type User, getUserInfo } from '@/api/user'
import { revokeRole, type Role } from '@/api/role'
import { useQuery } from '@/hooks/query'
import RoleAssignDialog from './RoleAssignDialog.vue'

const { loading, setLoading } = useLoading(true)

const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0
})

const query = useQuery<{
  id: string
}>()

const saveDialog = ref<typeof RoleAssignDialog>()
const data = ref<User>()
const renderData = ref<Role[]>([])
const columns = computed<TableColumnData[]>(() => [
  {
    title: '序号',
    dataIndex: 'index',
    slotName: 'index'
  },
  {
    title: '角色名',
    dataIndex: 'roleName'
  },
  {
    title: '租户名',
    dataIndex: 'tenantName'
  },
  {
    title: '操作',
    dataIndex: 'operations',
    slotName: 'operations'
  }
])

const fetchData = async (
  _params = { current: 1, pageSize: 20 }
) => {
  setLoading(true)
  try {
    const res = await getUserInfo({
      userId: query.value.id
    })
    data.value = res.user
    renderData.value = res.user.roles
    pagination.current = 1
    pagination.total = res.user.roles.length
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
    userId: query.value.id,
    username: data.value?.username
  })
}

const handleDelete = (record: Role) => {
  Modal.warning({
    title: '警告',
    content: `你正在删除角色${record.roleName}，是否继续？`,
    hideCancel: false,
    onOk () {
      void revokeRole({
        userId: query.value.id,
        revokedRoleId: record.roleId as string
      }).then(() => {
        Message.success('删除角色成功')
        void fetchData()
      }).catch(() => {
        Message.error('删除角色失败')
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
