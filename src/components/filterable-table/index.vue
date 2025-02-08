<template>
  <div class="filterable-table">
    <a-row style="margin-bottom: 16px">
      <a-col :span="12">
        <a-space>
          <slot name="functions"></slot>
        </a-space>
      </a-col>
      <a-col
        :span="12"
        class="action"
      >
        <a-tooltip content="刷新">
          <div
            class="action-icon"
            @click="handleRefresh"
          ><icon-refresh size="18" /></div>
        </a-tooltip>
        <a-tooltip content="列设置">
          <a-popover
            trigger="click"
            position="bl"
            @popup-visible-change="popupVisibleChange"
          >
            <div class="action-icon"><icon-settings size="18" /></div>
            <template #content>
              <div id="tableSetting">
                <div
                  v-for="(item, index) in showColumns"
                  :key="item.dataIndex"
                  class="setting"
                >
                  <div style="margin-right: 4px; cursor: move">
                    <icon-drag-arrow />
                  </div>
                  <div>
                    <a-checkbox
                      v-model="item.checked"
                      @change="
                        handleChange($event, item as TableColumnData, index)
                        "
                    >
                    </a-checkbox>
                  </div>
                  <div class="title">
                    {{ item.title }}
                  </div>
                </div>
              </div>
            </template>
          </a-popover>
        </a-tooltip>
      </a-col>
    </a-row>
    <a-table
      row-key="id"
      :loading="loading"
      :pagination="pagination"
      :columns="(cloneColumns as TableColumnData[])"
      :data="renderData"
      :bordered="false"
      :size="size"
      @page-change="onPageChange"
    >
      <template
        v-for="(slotKey, slotIndex) in tableSlots"
        :key="slotIndex"
        v-slot:[slotKey]="slotProps"
      >
        <slot :name="slotKey" :record="slotProps.record"></slot>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, useSlots, watch, nextTick, reactive } from 'vue'
import { type TableColumnData } from '@arco-design/web-vue'
import { cloneDeep } from 'lodash'
import Sortable from 'sortablejs'
import { type Column, type SizeProps } from './types'
import useLoading from '@/hooks/loading'
import { type PageResponse } from '@/api/type'

defineSlots<{
  functions: (...args: any[]) => any
  [name: string]: (...args: any[]) => any
}>()
const slots = Object.keys(useSlots())
const tableSlots = ref<string[]>([])

for (const slot of slots) {
  if (slot.indexOf('column-') === 0) {
    tableSlots.value.push(slot)
  }
}

const props = defineProps<{
  columns: TableColumnData[]
  size: SizeProps
  fetchData: (current: number, pageSize: number) => Promise<PageResponse<any>>
}>()

const cloneColumns = ref<Column[]>([])
const showColumns = ref<Column[]>([])
const renderData = ref<any[]>([])
const { loading, setLoading } = useLoading()
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0
})

const exchangeArray = <T extends any[]>(
  array: T,
  beforeIdx: number,
  newIdx: number,
  isDeep = false
): T => {
  const newArray = isDeep ? cloneDeep(array) : array
  if (beforeIdx > -1 && newIdx > -1) {
    // 先替换后面的，然后拿到替换的结果替换前面的
    newArray.splice(
      beforeIdx,
      1,
      newArray.splice(newIdx, 1, newArray[beforeIdx]).pop()
    )
  }
  return newArray
}

const handleChange = (
  _checked: boolean | Array<string | boolean | number>,
  _column: Column,
  _index: number
) => {
  cloneColumns.value = showColumns.value.filter(
    (item) => item.checked
  )
}

const popupVisibleChange = (val: boolean) => {
  if (val) {
    void nextTick(() => {
      const el = document.getElementById('tableSetting') as HTMLElement
      void new Sortable(el, {
        onEnd (e: any) {
          const { oldIndex, newIndex } = e
          exchangeArray(cloneColumns.value, oldIndex, newIndex)
          exchangeArray(showColumns.value, oldIndex, newIndex)
        }
      })
    })
  }
}

const onPageChange = (current: number) => {
  void loadData(current, pagination.pageSize)
}

const handleRefresh = () => {
  void loadData(pagination.current, pagination.pageSize)
}

const loadData = async (current: number = 1, pageSize: number = 10) => {
  setLoading(true)
  try {
    const data = await props.fetchData(current, pageSize)
    renderData.value = data.data
    pagination.current = data.page
    pagination.total = data.total
  } catch (err) {
    console.log(err)
  } finally {
    setLoading(false)
  }
}

watch(
  () => props.columns,
  (val) => {
    cloneColumns.value = cloneDeep(val)
    cloneColumns.value.forEach((item, _index) => {
      item.checked = true
    })
    showColumns.value = cloneDeep(cloneColumns.value)
  },
  { deep: true, immediate: true }
)

void loadData()

defineExpose({
  loadData
})
</script>

<style lang="scss" scoped>
.filterable-table {
  .action {
    display: flex;
    align-items: center;
    justify-content: end;
    height: 32px;
    .action-icon {
      margin-left: 12px;
      cursor: pointer;
    }
  }
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
