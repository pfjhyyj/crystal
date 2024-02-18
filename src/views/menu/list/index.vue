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
                <!-- <a-form-item
                  field="name"
                  label="角色名称"
                >
                  <a-input
                    v-model="formModel.roleName"
                    placeholder="角色名称"
                  />
                </a-form-item> -->
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
              新建菜单
            </a-button>
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end; height: 32px;"
        >
          <a-tooltip content="刷新">
            <div class="action-icon" @click="search"
              ><icon-refresh size="18"
            /></div>
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
        <template #operations="{record}">
          <a-button type="text" size="small" @click="handleEdit(record)">
            编辑
          </a-button>
        </template>
      </a-table>
    </a-card>
    <menu-save-dialog ref="saveDialog" @refresh="fetchData"/>
  </div>
</template>

<script setup lang="ts">
import useLoading from '@/hooks/loading.ts'
import { reactive, ref, computed } from 'vue'
import { type TableColumnData } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import MenuSaveDialog from '../components/MenuSaveDialog.vue'
import { listMenu, type MenuPageResponse } from '@/api/menu'

const router = useRouter()
const { loading, setLoading } = useLoading(true)
const saveDialog = ref<typeof MenuSaveDialog>()
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0
})
const renderData = ref<MenuPageResponse[]>([])
const columns = computed<TableColumnData[]>(() => [
  {
    title: '序号',
    dataIndex: 'index',
    slotName: 'index'
  },
  {
    title: '菜单名',
    dataIndex: 'name'
  },
  {
    title: '操作',
    dataIndex: 'operations',
    slotName: 'operations'
  }
])

const generateFormModel = () => {
  return {
    roleName: ''
  }
}
const formModel = ref(generateFormModel())

const fetchData = async (
  params = { current: 1, pageSize: 20 }
) => {
  setLoading(true)
  try {
    const data = await listMenu({
      pageSize: params.pageSize,
      current: params.current
    })
    renderData.value = data.list
    pagination.current = data.current
    pagination.total = data.total
  } catch (err) {
    console.log(err)
  } finally {
    setLoading(false)
  }
}

const handleAdd = () => {
  saveDialog.value?.open()
}

const handleEdit = (record: MenuPageResponse) => {
  void router.push({
    name: 'MenuDetail',
    query: {
      id: record.menuId
    }
  })
}

const onPageChange = (current: number) => {
  void fetchData({
    current,
    pageSize: pagination.pageSize
  })
}

const search = () => {
  void fetchData()
}

const reset = () => {
  formModel.value = generateFormModel()
}

void fetchData()
</script>

<script lang="ts">
export default {
  name: 'UserManage'
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
