<template>
  <div class="tab">
    <a-spin :loading="loading" tip="This may take a while...">
      <a-tree
        v-if="!loading"
        :checkable="true"
        v-model:checked-keys="checkedKeys"
        :data="menus"
        @check="handleCheck"
      />
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import useLoading from '@/hooks/loading.ts'
import { ref } from 'vue'
import { useQuery } from '@/hooks/query'
import { listMenu } from '@/api/menu'
import { parseListToTree } from '@/utils/tree'
import { type numberic } from '@/api/type'
import { setRoleMenu, listRoleMenu } from '@/api/role'
import { Message, type TreeNodeData } from '@arco-design/web-vue'

const { loading, setLoading } = useLoading(true)

const query = useQuery<{
  id: string
}>()

const menus = ref<TreeNodeData[]>([])

const checkedKeys = ref<numberic[]>([])

const fetchData = async () => {
  setLoading(true)
  const fetchMenu = async () => {
    await listMenu().then((res) => {
      const menuList = res.map((item) => {
        return {
          key: item.menuId,
          title: item.locale,
          menuId: item.menuId,
          parentId: item.parentId
        }
      })
      menus.value = parseListToTree(menuList, 0, 'menuId', 'parentId')
    }).catch((err) => {
      console.log(err)
    })
  }

  const fetchMenuRole = async () => {
    await listRoleMenu(query.value.id).then((res) => {
      checkedKeys.value = res.menuIds
    }).catch((err) => {
      console.log(err)
    })
  }

  await Promise.all([fetchMenu(), fetchMenuRole()]).finally(() => {
    setLoading(false)
  })
}

const handleCheck = (newCheckedKeys: Array<string | number>) => {
  setRoleMenu(query.value.id, {
    menuIds: newCheckedKeys
  }).then(() => {
    checkedKeys.value = newCheckedKeys
    Message.success('更新成功')
  }).catch((err) => {
    console.log(err)
    Message.error('更新失败, 请重试')
    void fetchData()
  })
}

void fetchData()
</script>

<style scoped lang="scss">
.tab {
  padding: 16px 0;
}
</style>
