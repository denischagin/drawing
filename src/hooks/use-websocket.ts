import { useEffect, useRef } from 'react'

export type TUseWebsocketHandlers = {
  onClose: ((this: WebSocket, ws: WebSocket, ev: CloseEvent) => any) | null
  onError: ((this: WebSocket, ws: WebSocket, ev: Event) => any) | null
  onMessage: ((this: WebSocket, ws: WebSocket, ev: MessageEvent) => any) | null
  onOpen: ((this: WebSocket, ws: WebSocket, ev: Event) => any) | null
}

export const useWebsocket = (
  url: string,
  handlers?: TUseWebsocketHandlers,
): WebSocket | null => {
  const ws = useRef<WebSocket>(null)

  useEffect(() => {
    const wsConnect = new WebSocket(url)
    ws.current = wsConnect
    if (!handlers) return
    ws.current.onopen = (...args) =>
      handlers.onOpen?.call(wsConnect, wsConnect, ...args)
    ws.current.onclose = (...args) =>
      handlers.onClose?.call(wsConnect, wsConnect, ...args)
    ws.current.onerror = (...args) =>
      handlers.onError?.call(wsConnect, wsConnect, ...args)
    ws.current.onmessage = (...args) =>
      handlers.onMessage?.call(wsConnect, wsConnect, ...args)
  }, [])

  return ws.current
}
