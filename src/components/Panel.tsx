import { DEFAULT_FIGURE } from '@/constants'
import { useFieldEvents } from '@/store/field'
import { useFiguresEvents } from '@/store/figures'
import { usePanelEvents, usePanelState } from '@/store/panel'
import { Button, Box } from '@chakra-ui/react'
import { useEffect, type MouseEvent as MouseEventReact } from 'react'
import type { IconType } from 'react-icons'
import { RiRectangleLine, RiCircleLine } from 'react-icons/ri'

type TPanelItem = { id: string; icon: IconType }

const panelItems: TPanelItem[] = [
  { id: 'rect', icon: RiRectangleLine },
  { id: 'circle', icon: RiCircleLine },
]

export const Panel = () => {
  const { selectedFigureId } = usePanelState()
  const { selectFigure: selectPanelFigure, setSelectedFigure } =
    usePanelEvents()

  const { addFigure } = useFiguresEvents()
  const { selectFigure } = useFieldEvents()

  useEffect(() => {
    const handleAddFigure = (e: MouseEvent) => {
      const addedFigure = {
        id: Date.now(),
        ...DEFAULT_FIGURE,
        x: e.clientX,
        y: e.clientY,
        cornerRadius:
          selectedFigureId === 'circle'
            ? 999999999
            : DEFAULT_FIGURE.cornerRadius,
      }
      addFigure(addedFigure)
      selectFigure(addedFigure.id)
      setSelectedFigure(null)
    }

    if (selectedFigureId) {
      document.addEventListener('click', handleAddFigure)
    } else {
      document.removeEventListener('click', handleAddFigure)
    }

    return () => document.removeEventListener('click', handleAddFigure)
  }, [selectedFigureId])
  const handleItemClick = (
    e: MouseEventReact<HTMLButtonElement>,
    panelItem: TPanelItem,
  ) => {
    e.stopPropagation()
    selectPanelFigure(panelItem.id)
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      position="fixed"
      top="0"
      left="0"
      width="100%"
      padding="6px 50px"
      pointerEvents="none"
    >
      <Box
        background="white"
        boxShadow="md"
        width="96"
        padding="1"
        display="flex"
        gap="2px"
        borderRadius="lg"
        pointerEvents="all"
      >
        {panelItems.map((panelItem) => {
          const IconComponent = panelItem.icon
          return (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => handleItemClick(e, panelItem)}
              isActive={selectedFigureId === panelItem.id}
            >
              <IconComponent />
            </Button>
          )
        })}
      </Box>
    </Box>
  )
}
