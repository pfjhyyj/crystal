import request from '@/utils/request'
import { numberic, PageResponse } from './type';

export interface CreateArticleRequest {
  category?: null | string;
  content?: null | string;
  status: number;
  tag?: null | string;
  title: string;
}

export async function createArticle(data: CreateArticleRequest): Promise<number> {
  return await request.post('/api/v1/articles', data)
}

export interface UpdateArticleRequest {
  category?: null | string;
  content?: null | string;
  status: number;
  tag?: null | string;
  title: string;
}

export async function updateArticle(articleId: numberic, data: UpdateArticleRequest): Promise<boolean> {
  return await request.put(`/api/v1/articles/${articleId}`, data)
}

export async function deleteArticle(articleId: numberic): Promise<boolean> {
  return await request.delete(`/api/v1/articles/${articleId}`)
}

export interface GetArticleDetailResponse {
  articleId: number;
  category?: null | string;
  content?: null | string;
  status: number;
  tag?: null | string;
  title: string;
}

export async function getArticleDetail(articleId: numberic): Promise<GetArticleDetailResponse> {
  return await request.get(`/api/v1/articles/${articleId}`)
}

export interface PageArticleRequest {
  page: number;
  size: number;
}

export interface PageArticleItem {
  articleId: number;
    category?: null | string;
    content?: null | string;
    createdAt: number;
    status: number;
    tag?: null | string;
    title: string;
    updatedAt: number;
}

export interface PageArticleResponse extends PageResponse<PageArticleItem> {}

export async function pageArticle(req: PageArticleRequest): Promise<PageArticleResponse> {
  return await request.get('/api/v1/articles', req)
}

