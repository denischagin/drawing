import { Field, Panel } from '@/components'
import { RootProvider } from '@/providers/RootProvider'
import { Box } from '@chakra-ui/react'
import cellImg from '@/assets/cell.png'
import { usePanelEvents, usePanelState } from '@/store/panel'
import { useFiguresEvents } from '@/store/figures'
import { useEffect } from 'react'
import { DEFAULT_FIGURE } from '@/constants'
import { useFieldEvents } from '@/store/field'

const App: React.FC = () => {
  const { selectedFigureId } = usePanelState()
  const { addFigure } = useFiguresEvents()
  const { selectFigure } = useFieldEvents()
  const { setSelectedFigure } = usePanelEvents()

  useEffect(() => {
    const handleAddFigure = (e: MouseEvent) => {
      const addedFigure = {
        id: Date.now(),
        ...DEFAULT_FIGURE,
        x: e.clientX,
        y: e.clientY,
        cornerRadius:
          selectedFigureId === 'circle'
            ? Infinity
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

  return (
    <RootProvider>
      <Box
        backgroundImage={cellImg}
        width="100vw"
        cursor={selectedFigureId !== null ? 'cell' : 'default'}
      >
        <Field />
        <Panel />
      </Box>
    </RootProvider>
  )
}

export default App
