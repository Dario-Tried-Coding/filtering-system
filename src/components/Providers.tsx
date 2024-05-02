'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, PropsWithChildren } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface ProvidersProps extends PropsWithChildren {}

const client = new QueryClient()

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  )
}

export default Providers
