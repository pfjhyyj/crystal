import request from '@/utils/request'
export interface MessageRecord {
  id: number
  type: string
  title: string
  subTitle: string
  avatar?: string
  content: string
  time: string
  status: 0 | 1
  messageType?: number
}
export type MessageListType = MessageRecord[]

export async function queryMessageList () {
  return await request.get<MessageListType>('/api/message/list')
}

interface MessageStatus {
  ids: number[]
}

export async function setMessageStatus (data: MessageStatus) {
  return await request.post<MessageListType>('/api/message/status', data)
}
