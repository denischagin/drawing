import { Field } from '@/components'
import { RootProvider } from '@/providers/RootProvider'

const App: React.FC = () => {
  return (
    <RootProvider>
      <Field />
    </RootProvider>
  )
}

export default App
