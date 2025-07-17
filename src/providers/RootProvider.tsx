import { ChakraProvider } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppRouter } from '@/providers/AppRouter'

const queryClient = new QueryClient()

export const RootProvider: FC<{}> = ({}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AppRouter />
      </ChakraProvider>
    </QueryClientProvider>
  )
}
