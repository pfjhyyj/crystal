import request from '@/utils/request'
import { type PageResponse, type PageRequest, type numberic } from './type'

export interface Message {
  messageId: number
  category: string
  title: string
  content: string
  isRead: boolean
  createdAt: string
}

interface GetMessagesRequest extends PageRequest {
  isRead?: boolean
  category?: number
}

export interface GetMessagesResponse extends PageResponse<Message> {}

export async function getMessages (data: GetMessagesRequest): Promise<GetMessagesResponse> {
  return await request.get<GetMessagesResponse>('/api/messages', data)
}

export async function readMessage (messageId: numberic) {
  return await request.put(`/api/messages/${messageId}/read`)
}

interface BatchReadMessageRequest {
  messageIds: number[]
}

export async function batchReadMessage (data: BatchReadMessageRequest) {
  return await request.put('/api/messages/batchRead', data)
}

export interface GetMyMessagesResponse {
  unreadMessageCount: number
}

export async function getMyMessages (): Promise<GetMyMessagesResponse> {
  return await request.get('/api/my/messages')
}
