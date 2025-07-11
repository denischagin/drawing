import { ChakraProvider } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'

export type RootProviderProps = {
  children: ReactNode
}

export const RootProvider: FC<RootProviderProps> = (props) => {
  const { children } = props

  return <ChakraProvider>{children}</ChakraProvider>
}
