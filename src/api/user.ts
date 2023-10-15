import request from '@/utils/request'
import { type RouteRecordNormalized } from 'vue-router'

export async function getMenuList () {
  return await request<RouteRecordNormalized[]>({
    url: '/api/v1/sys/menu',
    method: 'get'
  })
}
