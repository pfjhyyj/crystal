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
  return await request<MessageListType>({
    url: '/api/v1/sys/menu',
    method: 'get'
  })
}

interface MessageStatus {
  ids: number[]
}

export async function setMessageStatus (data: MessageStatus) {
  return await request<MessageListType>({
    url: '/api/message/read',
    method: 'post',
    data
  })
}
