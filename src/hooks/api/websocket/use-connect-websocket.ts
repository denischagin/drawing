import { WebsocketService } from '@/services'
import { useQuery } from '@tanstack/react-query'

export const useConnectWebsocket = (enabled = true) =>
  useQuery({
    initialData: undefined,
    queryKey: ['websocket'],
    queryFn: WebsocketService.connect,
    retry: false,
    enabled,
  })
