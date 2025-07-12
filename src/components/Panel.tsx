import { usePanelEvents, usePanelState } from '@/store/panel'
import { Button, Box } from '@chakra-ui/react'
import type { MouseEvent } from 'react'
import type { IconType } from 'react-icons'
import { RiRectangleLine, RiCircleLine } from 'react-icons/ri'

type TPanelItem = { id: string; icon: IconType }

const panelItems: TPanelItem[] = [
  { id: 'rect', icon: RiRectangleLine },
  { id: 'circle', icon: RiCircleLine },
]

export const Panel = () => {
  const { selectedFigureId } = usePanelState()
  const { selectFigure } = usePanelEvents()

  const handleItemClick = (
    e: MouseEvent<HTMLButtonElement>,
    panelItem: TPanelItem,
  ) => {
    e.stopPropagation()
    selectFigure(panelItem.id)
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
    >
      <Box
        background="white"
        boxShadow="md"
        width="96"
        padding="1"
        display="flex"
        gap="2px"
        borderRadius="lg"
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
