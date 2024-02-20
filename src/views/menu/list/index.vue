<template>
  <div class="container">
    <a-card class="general-card" >
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
          row-key="menuId"
          :loading="loading"
          :pagination="pagination"
          :columns="(columns as TableColumnData[])"
          :data="renderData"
          :bordered="false"
          size="medium"
          @page-change="onPageChange"
      >
        <template #operations="{record}">
          <a-button v-if="record.menuType == MenuType.MENU_CATEGORY" type="text" size="small" @click="handleEdit(record)">
            编辑
          </a-button>
          <a-button v-if="record.menuType == MenuType.MENU_ITEM" type="text" size="small" @click="handleEditItem(record)">
            编辑
          </a-button>
          <a-button v-if="record.menuType == MenuType.MENU_BUTTON" type="text" size="small" @click="handleEditButton(record)">
            编辑
          </a-button>
          <a-button v-if="record.menuType == MenuType.MENU_CATEGORY" type="text" size="small" @click="handleAddItem(record)">
            添加菜单
          </a-button>
          <a-button v-if="record.menuType == MenuType.MENU_ITEM" type="text" size="small" @click="handleAddButton(record)">
            添加按钮
          </a-button>
          <a-button type="text" size="small" @click="handleDelete(record)">
            删除
          </a-button>
        </template>
      </a-table>
    </a-card>
    <menu-save-dialog ref="saveDialog" @refresh="fetchData"/>
    <menu-item-save-dialog ref="saveItemDialog" :menus="renderData" @refresh="fetchData"/>
    <menu-button-save-dialog ref="saveButtonDialog" :menus="renderData" @refresh="fetchData"/>
  </div>
</template>

<script setup lang="ts">
import useLoading from '@/hooks/loading.ts'
import { reactive, ref, computed } from 'vue'
import { Message, Modal, type TableColumnData } from '@arco-design/web-vue'
import MenuSaveDialog from '../components/MenuSaveDialog.vue'
import { deleteMenu, listMenu, MenuType, type MenuPageResponse, type Menu } from '@/api/menu'
import { parseListToTree } from '@/utils/tree'
import MenuItemSaveDialog from '../components/MenuItemSaveDialog.vue'
import MenuButtonSaveDialog from '../components/MenuButtonSaveDialog.vue'

const { loading, setLoading } = useLoading(true)
const saveDialog = ref<typeof MenuSaveDialog>()
const saveItemDialog = ref<typeof MenuItemSaveDialog>()
const saveButtonDialog = ref<typeof MenuButtonSaveDialog>()
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0
})
const renderData = ref<Menu[]>([])
const columns = computed<TableColumnData[]>(() => [
  {
    title: '菜单名',
    dataIndex: 'locale'
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
    const data = await listMenu({
      pageSize: params.pageSize,
      current: params.current
    })
    if (!Array.isArray(data)) {
      renderData.value = []
      pagination.current = 1
      pagination.total = 0
      return
    }
    const menus = parseListToTree(data, 0, 'menuId', 'parentId')
    renderData.value = menus
    console.log(renderData.value)
    pagination.current = 1
    pagination.total = data.length
  } catch (err) {
    console.log(err)
  } finally {
    setLoading(false)
  }
}

const handleAdd = () => {
  saveDialog.value?.open()
}

const handleAddItem = (record: Menu) => {
  saveItemDialog.value?.open({
    parentId: record.menuId
  })
}

const handleAddButton = (record: Menu) => {
  saveButtonDialog.value?.open({
    parentId: record.menuId
  })
}

const handleEdit = (record: Menu) => {
  saveDialog.value?.open(record)
}

const handleEditItem = (record: Menu) => {
  saveItemDialog.value?.open(record)
}

const handleEditButton = (record: Menu) => {
  saveButtonDialog.value?.open(record)
}

const handleDelete = (record: MenuPageResponse) => {
  Modal.warning({
    title: '警告',
    content: `你正在删除菜单项${record.locale}，删除后不可恢复，是否继续？`,
    hideCancel: false,
    onOk () {
      void deleteMenu(record.menuId).then(() => {
        Message.success('删除菜单成功')
        search()
      }).catch(() => {
        Message.error('删除菜单失败')
      })
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
