import request from '@/utils/request'

interface getUploadUrlRequest {
  ext: string
}

export interface GetUploadUrlResponse {
  bucket: string
  host: string
  key: string
  policy: string
  xAmzAlgorithm: string
  xAmzCredential: string
  xAmzDate: string
  xAmzSignature: string
}

export async function getUploadUrl(
  data: getUploadUrlRequest,
): Promise<GetUploadUrlResponse> {
  return await request.post(`/api/v1/files`, data)
}

interface getDownloadUrlRequest {
  path: string
}

export interface GetDownloadUrlResponse {
  url: string
}

export async function getDownloadUrl(
  data: getDownloadUrlRequest,
): Promise<GetDownloadUrlResponse> {
  return await request.post(`/api/v1/files`, data)
}
