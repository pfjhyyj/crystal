<template>
  <div class="container">
    <a-card class="general-card">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="name" label="目标资源">
                  <a-input v-model="formModel.object" @press-enter="search" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space class="form-functions" direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              搜索
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              重置
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary" @click="handleAdd">
              <template #icon>
                <icon-plus />
              </template>
              新建权限
            </a-button>
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="
            display: flex;
            align-items: center;
            justify-content: end;
            height: 32px;
          "
        >
          <a-tooltip content="刷新">
            <div class="action-icon" @click="search">
              <icon-refresh size="18" />
            </div>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="columns"
        :data="renderData"
        :bordered="false"
        size="medium"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #operations="{ record }">
          <a-button type="text" size="small" @click="handleEdit(record)">
            编辑
          </a-button>
          <a-button
            type="text"
            size="small"
            @click="handleDeleteTenant(record)"
          >
            删除
          </a-button>
        </template>
      </a-table>
    </a-card>
    <PermissionSaveDialog ref="saveDialog" @refresh="fetchData" />
  </div>
</template>

<script setup lang="ts">
import PermissionSaveDialog from '../components/PermissionSaveDialog.vue'
import useLoading from '@/hooks/loading.ts'
import { reactive, ref, computed } from 'vue'
import { type TableColumnData } from '@arco-design/web-vue'
import { Message, Modal } from '@arco-design/web-vue'
import {
  deletePermission,
  listPermission,
  type Permission,
  type PermissionPageResp,
} from '@/api/permission'

const saveDialog = ref<typeof PermissionSaveDialog>()

const { loading, setLoading } = useLoading(true)
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
})
const renderData = ref<PermissionPageResp[]>([])
const columns = computed<TableColumnData[]>(() => [
  {
    title: '序号',
    dataIndex: 'index',
    slotName: 'index',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '目标资源',
    dataIndex: 'object',
  },
  {
    title: '权限动作',
    dataIndex: 'action',
  },
  {
    title: '操作',
    dataIndex: 'operations',
    slotName: 'operations',
  },
])

const generateFormModel = () => {
  return {
    object: '',
  }
}
const formModel = ref(generateFormModel())

const fetchData = async (params = { page: 1, size: 20 }) => {
  setLoading(true)
  try {
    const data = await listPermission({
      ...params,
      ...formModel.value,
    })
    renderData.value = data.data
    pagination.current = data.page
    pagination.total = data.total
  } catch (err) {
    console.log(err)
  } finally {
    setLoading(false)
  }
}

const onPageChange = (current: number) => {
  void fetchData({
    page: current,
    size: pagination.pageSize,
  })
}

const search = () => {
  void fetchData()
}

const reset = () => {
  formModel.value = generateFormModel()
}

const handleAdd = () => {
  saveDialog.value?.open()
}

const handleEdit = (data: Permission) => {
  saveDialog.value?.open(data)
}

const handleDeleteTenant = (data: Permission) => {
  Modal.warning({
    title: '警告',
    content: `你正在删除${data.name}，删除后不可恢复，是否继续？`,
    hideCancel: false,
    onOk() {
      void deletePermission(data.permissionId)
        .then(() => {
          Message.success('删除成功')
          void fetchData()
        })
        .catch(() => {
          Message.error('删除失败')
        })
    },
  })
}

void fetchData()
</script>

<script lang="ts">
export default {
  name: 'PermissionManage',
}
</script>

<style scoped lang="scss">
.container {
  padding: 20px;
}
.action-icon {
  margin-left: 12px;
  cursor: pointer;
}
.form-functions {
  padding-bottom: 16px;
}
.setting {
  display: flex;
  align-items: center;
  width: 200px;
  .title {
    margin-left: 12px;
    cursor: pointer;
  }
}
</style>
