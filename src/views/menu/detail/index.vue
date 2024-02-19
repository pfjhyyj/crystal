<template>
  <div class="container">
    <a-row class="wrapper">
      <a-col :span="16">
        <a-tree
          v-if="treeData.length > 0"
          block-node
          :data="treeData"
        >
          <template #extra="nodeData">
            <a-space>
              <a-button type="text" size="small" @click="handleEdit(nodeData)">
                编辑
              </a-button>
              <a-button type="text" size="small" @click="handleAdd(nodeData)">
                新增子菜单
              </a-button>
            </a-space>
          </template>
        </a-tree>
      </a-col>
    </a-row>
    <MenuItemSaveDialog ref="saveDialog" @refresh="fetchData" :menus="treeData"/>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@/hooks/query'
import { ref } from 'vue'
import { getMenuTree, type MenuPageResponse } from '@/api/menu'
import { parseListToTree, type GenericNode } from '@/utils/tree'
import MenuItemSaveDialog from './components/MenuItemSaveDialog.vue'

const query = useQuery<{
  id: string
}>()
const saveDialog = ref<typeof MenuItemSaveDialog | null>(null)
const treeData = ref<GenericNode[]>([])

const fetchData = async () => {
  const treeRes = await getMenuTree(query.value.id)
  const menuList = treeRes.menus.map((item) => {
    return {
      ...item,
      key: item.menuId,
      title: item.locale,
      icon: undefined
    }
  })
  const tree = parseListToTree(menuList, 0, 'menuId', 'parentId')
  treeData.value = tree
}

const handleAdd = (record: {
  menuId: number
}) => {
  saveDialog.value?.open({
    parentId: record.menuId
  })
}

const handleEdit = (record: MenuPageResponse) => {
  saveDialog.value?.open(record)
}

void fetchData()
</script>

<script lang="ts">
export default {
  name: 'MenuDetail'
}
</script>

<style scoped lang="scss">
.container {
  padding: 20px;
}
.wrapper {
  padding: 20px;
  min-height: 580px;
  background-color: var(--color-bg-2);
  border-radius: 4px;
}
</style>
