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

export async function queryMessageList (): Promise<MessageListType> {
  return await request({
    url: '/api/message/list',
    method: 'get'
  })
}

interface MessageStatus {
  ids: number[]
}

export async function setMessageStatus (data: MessageStatus): Promise<MessageListType> {
  return await request({
    url: '/api/message/read',
    method: 'post',
    data
  })
}
