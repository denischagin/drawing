import { Field, Panel } from '@/components'
import { Box } from '@chakra-ui/react'
import cellImg from '@/assets/cell.png'
import { usePanelState } from '@/store/panel'
import { Settings } from '@/components/Settings'
import { useConnectWebsocket } from '@/hooks/api/websocket'
import { useCreateRoom } from '@/hooks/api/room'
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { useFiguresEvents, useFiguresState } from '@/store/figures'
import type { TWebsocketData } from '@/types'
import { useWebsocket } from '@/hooks/use-websocket'

export const RoomPage = () => {
  const { selectedFigureId } = usePanelState()

  const { roomId } = useParams()
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useConnectWebsocket(!roomId)
  const { mutate: createRoom } = useCreateRoom()

  useEffect(() => {
    if (roomId) return
    createRoom()
  }, [])

  const { figuresList } = useFiguresState()

  const ws = useWebsocket('ws://localhost:9999/api/v1/ws', {
    onOpen: (wsCtx) => {
      console.log('ws open', wsCtx)
      if (!roomId || !wsCtx) return

      const dataJoin: TWebsocketData = {
        type: 'join',
        room_id: roomId,
      }
      wsCtx.send(JSON.stringify(dataJoin))
    },
    onClose: () => console.log('ws closed'),
    onError: () => console.log('ws error'),
    onMessage: () => console.log('ws message'),
  })

  useEffect(() => {
    if (!roomId || !ws) return
    if (ws.readyState !== WebSocket.OPEN) return

    const dataUpdate: TWebsocketData = {
      type: 'update',
      room_id: roomId,
      content: figuresList.map((figure) => JSON.stringify(figure)),
    }

    clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      ws.send(JSON.stringify(dataUpdate))
    }, 500)
  }, [figuresList])

  return (
    <Box
      backgroundImage={cellImg}
      width="100vw"
      cursor={selectedFigureId !== null ? 'cell' : 'default'}
    >
      <Field />
      <Panel />
      <Settings />
    </Box>
  )
}
