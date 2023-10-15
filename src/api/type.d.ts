export interface ApiResponse<T> {
  code: number
  data: T
  msg: string
}

export interface PageResponse<T> extends ApiResponse<T> {
  current: number
  pageSize: number
  total: number
}
