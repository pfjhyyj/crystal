import request from '@/utils/request'
import { numberic, PageResponse } from './type'

interface createOperationRequest {
  code: string
  name: string
  status?: number
}

export async function createOperation(
  data: createOperationRequest,
): Promise<number> {
  return await request.post('/api/v1/operations', data)
}

interface updateOperationRequest {
  code: string
  name: string
  status: number
}

export async function updateOperation(
  operationId: number,
  data: updateOperationRequest,
): Promise<boolean> {
  return await request.put(`/api/v1/operations/${operationId}`, data)
}

export async function deleteOperation(operationId: number): Promise<boolean> {
  return await request.delete(`/api/v1/operations/${operationId}`)
}

export interface Operation {
  operationId: number
  code: string
  name: string
  status: number
}

export async function getOperationDetail(
  operationId: numberic,
): Promise<Operation> {
  return await request.get(`/api/v1/operations/${operationId}`)
}

interface pageOperationRequest {
  page: number
  size: number
}

export interface PageOperationResponse extends PageResponse<Operation> {}

export async function pageOperation(
  req: pageOperationRequest,
): Promise<PageOperationResponse> {
  return await request.get('/api/v1/operations', req)
}

interface createBannerRequest {
  imagePath: string
  linkType: number
  linkUrl: string
  status: number
  weight: number
}

export async function createBanner(
  operationId: numberic,
  data: createBannerRequest,
): Promise<number> {
  return await request.post(`/api/v1/operations/${operationId}/banners`, data)
}

interface updateBannerRequest {
  imagePath: string
  linkType: number
  linkUrl: string
  status: number
  weight: number
}

export async function updateBanner(
  operationId: number,
  bannerId: number,
  data: updateBannerRequest,
): Promise<boolean> {
  return await request.put(
    `/api/v1/operations/${operationId}/banners/${bannerId}`,
    data,
  )
}

export async function deleteBanner(
  operationId: number,
  bannerId: number,
): Promise<boolean> {
  return await request.delete(
    `/api/v1/operations/${operationId}/banners/${bannerId}`,
  )
}

export interface Banner {
  operationBannerId: number
  operationId: number
  imagePath: string
  imageUrl: string
  linkType: number
  linkUrl: string
  status: number
  weight: number
}

export async function getBannerDetail(
  operationId: number,
  bannerId: number,
): Promise<Banner> {
  return await request.get(
    `/api/v1/operations/${operationId}/banners/${bannerId}`,
  )
}

export interface ListBannerResponse {
  bannerList: Banner[]
}

export async function listBanners(
  operationId: numberic,
): Promise<ListBannerResponse> {
  return await request.get(`/api/v1/operations/${operationId}/banners`)
}

export enum OperationStatus {
  Unpublished = 1,
  Published = 2,
  Offline = 3,
}

export enum BannerStatus {
  Unpublished = 1,
  TestingPublished = 2,
  ProductionPublished = 3,
  Offline = 4,
}

export enum LinkType {
  None = 1,
  MiniProgram = 2,
  H5 = 3,
}
