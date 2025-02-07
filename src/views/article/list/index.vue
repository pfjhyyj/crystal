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
                  field="title"
                  label="文章标题"
                >
                  <a-input
                    v-model="formModel.title"
                    placeholder="文章标题"
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
          <a-button type="primary" @click="handleAdd">
            <template #icon>
              <icon-plus />
            </template>
            新建文章
          </a-button>
        </template>
        <template #column-status="{ record }">
          <!-- <a-tag
            :color="record.status === TenantStatus.ENABLE ? 'green' : 'red'"
          >
            {{
              record.status === TenantStatus.ENABLE ? '启用' : '禁用'
            }}
          </a-tag> -->
        </template>
        <template #column-operations="{ record }">
          <a-button type="text" size="small" @click="handleEdit(record)">
            编辑
          </a-button>
          <a-button type="text" size="small" @click="handleDelete(record)">
            删除
          </a-button>
        </template>
      </FilterableTable>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { type TableColumnData } from '@arco-design/web-vue'
import { Message, Modal } from '@arco-design/web-vue'
import FilterableTable from '@/components/filterable-table/index.vue'
import { deleteArticle, pageArticle, PageArticleItem } from '@/api/article'
import { useRouter } from 'vue-router'

const router = useRouter()
const table = ref<typeof FilterableTable | null>(null)

const columns = computed<TableColumnData[]>(() => [
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '分类',
    dataIndex: 'category'
  },
  {
    title: '标签',
    dataIndex: 'tag'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime'
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
    title: ''
  }
}
const formModel = ref(generateFormModel())

const fetchData = async (current: number, pageSize: number) => {
  return await pageArticle({
    page: current,
    size: pageSize,
  })
}

const search = () => {
  void table.value?.loadData()
}

const reset = () => {
  formModel.value = generateFormModel()
}

const handleAdd = () => {
  void router.push({
    name: 'ArticleDetail',
  })
}

const handleEdit = (data: PageArticleItem) => {
  void router.push({
    name: 'ArticleDetail',
    query: {
      id: data.articleId
    }
  })
}

const handleDelete = (data: PageArticleItem) => {
  Modal.warning({
    title: '警告',
    content: `你正在删除，删除后不可恢复，是否继续？`,
    hideCancel: false,
    onOk () {
      void deleteArticle(data.articleId).then(() => {
        Message.success('删除成功')
        search()
      }).catch(() => {
        Message.error('删除失败')
      })
    }
  })
}
</script>

<script lang="ts">
export default {
  name: 'ArticleManage'
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
