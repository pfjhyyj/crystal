import { type AppRouteRecordRaw } from '@/router/routes/types.ts'
import { DEFAULT_LAYOUT } from '@/router/routes/base.ts'

const ARTICLE: AppRouteRecordRaw = {
  path: '/articles',
  name: 'articles',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '博客管理',
    icon: 'icon-file',
    order: 100
  },
  children: [
    {
      path: '',
      name: 'ArticleManage',
      component: async () => await import('@/views/article/list/index.vue'),
      meta: {
        locale: '文章管理'
      }
    },
    {
      path: 'articleDetail',
      name: 'ArticleDetail',
      component: async () => await import('@/views/article/detail/index.vue'),
      meta: {
        locale: '文章详情',
        hideInMenu: true
      }
    }
  ]

}

export default ARTICLE
