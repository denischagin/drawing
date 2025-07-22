export type TWebsocketTypes = 'update' | 'join'

export type TWebsocketData = {
  type: TWebsocketTypes
  roomID: string
  content?: string[]
}
