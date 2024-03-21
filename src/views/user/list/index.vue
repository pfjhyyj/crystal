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
              <!-- <a-col :span="8">
                <a-form-item
                  field="name"
                  label="租户名称"
                >
                  <a-input
                    v-model="formModel.name"
                    placeholder="租户名称"
                  />
                </a-form-item>
              </a-col> -->
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
            <!-- <a-button type="primary" @click="handleAdd">
              <template #icon>
                <icon-plus />
              </template>
              新建租户
            </a-button> -->
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
        :columns="columns as TableColumnData[]"
        :data="renderData"
        :bordered="false"
        size="medium"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #status="{ record }">
          <a-tag
            :color="
              record.status === UserStatusEnum.StatusEnabled ? 'green' : 'red'
            "
          >
            {{
              record.status === UserStatusEnum.StatusEnabled ? '启用' : '禁用'
            }}
          </a-tag>
        </template>
        <template #operations="{ record }">
          <a-button
            type="text"
            size="small"
            @click="
              $router.push({ name: 'UserDetail', query: { id: record.userId } })
            "
          >
            编辑
          </a-button>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import useLoading from '@/hooks/loading.ts'
import { reactive, ref, computed } from 'vue'
import { type TableColumnData } from '@arco-design/web-vue'
import {
  getUserList,
  type DefineListUserPageResponse,
  UserStatusEnum,
} from '@/api/user'

const { loading, setLoading } = useLoading(true)
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
})
const renderData = ref<DefineListUserPageResponse[]>([])
const columns = computed<TableColumnData[]>(() => [
  {
    title: '序号',
    dataIndex: 'index',
    slotName: 'index',
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
  },
  {
    title: '状态',
    dataIndex: 'status',
    slotName: 'status',
  },
  {
    title: '操作',
    dataIndex: 'operations',
    slotName: 'operations',
  },
])

const generateFormModel = () => {
  return {
    name: '',
    status: '',
  }
}
const formModel = ref(generateFormModel())

const fetchData = async (params = { current: 1, pageSize: 20 }) => {
  setLoading(true)
  try {
    const data = await getUserList({
      pageSize: params.pageSize,
      current: params.current,
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

const onPageChange = (current: number) => {
  void fetchData({
    current,
    pageSize: pagination.pageSize,
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
  name: 'UserManage',
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
