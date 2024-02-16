export interface ApiResponse<T> {
  code: number
  data: T
  msg: string
}

export interface PageRequest {
  current: number
  pageSize: number
}

export interface PageResponse<T> {
  current: number
  pageSize: number
  total: number
  list: T[]
}

export type numberic = number | string
