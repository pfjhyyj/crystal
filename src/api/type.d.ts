export interface ApiResponse<T> {
  code: number
  data: T
  message: string
}

export interface PageRequest {
  page: number
  size: number
}

export interface PageResponse<T> {
  page: number
  size: number
  total: number
  data: T[]
}

export type numberic = number | string
