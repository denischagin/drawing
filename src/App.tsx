import { Field, Panel } from '@/components'
import { RootProvider } from '@/providers/RootProvider'
import { Box } from '@chakra-ui/react'
import cellImg from '@/assets/cell.png'
import { usePanelState } from '@/store/panel'
import { Settings } from '@/components/Settings'

const App: React.FC = () => {
  const { selectedFigureId } = usePanelState()

  return (
    <RootProvider>
      <Box
        backgroundImage={cellImg}
        width="100vw"
        cursor={selectedFigureId !== null ? 'cell' : 'default'}
      >
        <Field />
        <Panel />
        <Settings />
      </Box>
    </RootProvider>
  )
}

export default App
