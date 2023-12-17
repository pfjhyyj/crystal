import { type TableColumnData } from '@arco-design/web-vue'

export type Column = TableColumnData & { checked?: true }

export type SizeProps = 'mini' | 'small' | 'medium' | 'large'

export interface PageRequest {
  current: number
  pageSize: number
}
