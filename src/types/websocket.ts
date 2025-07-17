export type TWebsocketTypes = 'update' | 'join'

export type TWebsocketData = {
  type: TWebsocketTypes
  room_id: string
  content?: string[]
}
