'use client'

import { filterMachine } from '@/machines/filter/filter.machine'
import { Product } from '@prisma/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useMachine } from '@xstate/react'
import axios from 'axios'
import { useEffect } from 'react'
// import { createBrowserInspector } from '@statelyai/inspect'
import { useDebouncedCallback } from '@mantine/hooks'
import { FilterMachine_Events } from '@/machines/filter/events'
import { config } from '@/config'

// const { inspect } = createBrowserInspector()

export function useFilter() {
  const machine = useMachine(
    filterMachine.provide({
      actions: {
        reloadProducts: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
      },
    }),
    {
      input: {
        type: config.types[0],
        colors: config.colors.map((c) => c),
        sizes: config.sizes.map((s) => s),
        price: [0, config.prices[config.prices.length - 1]],
        sorting: null,
      },
      // inspect
    }
  )

  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.post<Product[]>('/api/products')
      return data
    },
  })

  useEffect(() => query.dataUpdatedAt ? machine[1]({ type: 'loading.success' }) : undefined, [query.dataUpdatedAt])
  useEffect(() => query.errorUpdatedAt ? machine[1]({ type: 'loading.error' }) : undefined, [query.errorUpdatedAt])

  const debouncedSend = useDebouncedCallback((event: FilterMachine_Events) => machine[1](event), 500)

  return { query, machine, debouncedSend }
}
