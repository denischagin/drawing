import { Field, Panel } from '@/components'
import { Box } from '@chakra-ui/react'
import cellImg from '@/assets/cell.png'
import { usePanelState } from '@/store/panel'
import { Settings } from '@/components/Settings'
import { useCreateRoom } from '@/hooks/api/room'
import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useFiguresEvents, useFiguresState } from '@/store/figures'
import type { TWebsocketData } from '@/types'
import { useWebsocket } from '@/hooks/use-websocket'
import { parseAndValidateFiguresList } from '@/helpers/figure'
import { useAdmin } from '@/hooks'
import { STORAGE_KEYS } from '@/constants'

export const RoomPage = () => {
  const navigate = useNavigate()

  const { selectedFigureId } = usePanelState()
  const { setFigures } = useFiguresEvents()

  const { roomId } = useParams()
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const { mutate: createRoom } = useCreateRoom()

  const isAdmin = useAdmin()

  const { ws, open: openWs } = useWebsocket('ws://localhost:9999/api/v1/ws', {
    onOpen: (wsCtx) => {
      console.log('ws opened')
      if (!wsCtx || !roomId) return

      const dataJoin: TWebsocketData = {
        type: 'join',
        roomID: roomId,
      }
      console.log('join room')
      wsCtx.send(JSON.stringify(dataJoin))
    },
    onClose: () => {
      console.log('ws closed')
      openWs()
    },
    onError: () => console.log('ws error'),
    onMessage: (_ws, e) => {
      const parsedFigures = parseAndValidateFiguresList(e.data)

      if (!parsedFigures) return
      console.log(parsedFigures)
      setFigures(parsedFigures)
    },
  })

  useEffect(() => {
    if (roomId) {
      openWs()
      return
    }

    createRoom(undefined, {
      onSuccess: (newRoomId) => {
        openWs()
        navigate(newRoomId)
        sessionStorage.setItem('roomId', newRoomId)
        console.log('navigate to room')
        console.log('after create room')
      },
    })
  }, [])

  const { figuresList } = useFiguresState()

  useEffect(() => {
    if (!roomId || !ws) return
    if (!isAdmin) return

    const dataUpdate: TWebsocketData = {
      type: 'update',
      roomID: roomId,
      content: figuresList.map((figure) => JSON.stringify(figure)),
    }

    clearTimeout(timeoutRef.current)

    sessionStorage.setItem(STORAGE_KEYS.figures, JSON.stringify(figuresList))

    timeoutRef.current = setTimeout(() => {
      ws.send(JSON.stringify(dataUpdate))
    }, 100)
  }, [figuresList])

  return (
    <Box
      backgroundImage={cellImg}
      width="100vw"
      cursor={selectedFigureId !== null ? 'cell' : 'default'}
    >
      <Field locked={!isAdmin} />
      <Panel />
      <Settings />
    </Box>
  )
}
