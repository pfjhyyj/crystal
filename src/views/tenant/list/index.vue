<template>
  <div class="container">
    <a-card class="general-card" >
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
                <a-form-item
                  field="name"
                  label="租户名称"
                >
                  <a-input
                    v-model="formModel.name"
                    placeholder="租户名称"
                  />
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
      <FilterableTable
        ref="table"
        :columns="columns"
        size="medium"
        :fetch-data="fetchData"
      >
        <template #functions>
          <a-button type="primary" @click="handleAddTenant">
            <template #icon>
              <icon-plus />
            </template>
            新建租户
          </a-button>
        </template>
        <template #column-status="{ record }">
          <a-tag
            :color="record.status === TenantStatus.ENABLE ? 'green' : 'red'"
          >
            {{
              record.status === TenantStatus.ENABLE ? '启用' : '禁用'
            }}
          </a-tag>
        </template>
        <template #column-operations="{ record }">
          <a-button type="text" size="small" @click="handleEditTenant(record)">
            编辑
          </a-button>
          <a-button type="text" size="small" @click="handleDeleteTenant(record)">
            删除
          </a-button>
        </template>
      </FilterableTable>
    </a-card>
    <TenantSaveDialog ref="saveDialog" @refresh="fetchData" />
  </div>
</template>

<script setup lang="ts">
import TenantSaveDialog from '../components/TenantSaveDialog.vue'
import { ref, computed } from 'vue'
import { type TableColumnData } from '@arco-design/web-vue'
import { deleteTenant, getTenantList, TenantStatus, type Tenant } from '@/api/tenant'
import { Message, Modal } from '@arco-design/web-vue'
import FilterableTable from '@/components/filterable-table/index.vue'

const saveDialog = ref<typeof TenantSaveDialog | null>(null)

const table = ref<typeof FilterableTable | null>(null)

const columns = computed<TableColumnData[]>(() => [
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '域名',
    dataIndex: 'domain'
  },
  {
    title: '状态',
    dataIndex: 'status',
    slotName: 'status'
  },
  {
    title: '操作',
    dataIndex: 'operations',
    slotName: 'operations'
  }
])

const generateFormModel = () => {
  return {
    name: '',
    status: ''
  }
}
const formModel = ref(generateFormModel())

const fetchData = async (current: number, pageSize: number) => {
  return await getTenantList({
    pageSize,
    current
  })
}

const search = () => {
  void table.value?.loadData()
}

const reset = () => {
  formModel.value = generateFormModel()
}

const handleAddTenant = () => {
  saveDialog.value?.open()
}

const handleEditTenant = (data: Tenant) => {
  saveDialog.value?.open(data)
}

const handleDeleteTenant = (data: {
  tenantId: string
  name: string
}) => {
  Modal.warning({
    title: '警告',
    content: `你正在删除租户${data.name}，删除后不可恢复，是否继续？`,
    hideCancel: false,
    onOk () {
      void deleteTenant(data.tenantId).then(() => {
        Message.success('删除租户成功')
        search()
      }).catch(() => {
        Message.error('删除租户失败')
      })
    }
  })
}
</script>

<script lang="ts">
export default {
  name: 'TenantManage'
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
