'use client'

import { filterMachine } from '@/machines/filter/filter.machine'
import { Product } from '@prisma/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useMachine } from '@xstate/react'
import axios from 'axios'
import { useEffect } from 'react'
import { config } from '@/config'
import { FilterMachine_Events } from '@/machines/filter/events'
import { useDebouncedCallback } from '@mantine/hooks'
import { fromPromise } from 'xstate'

// import { createBrowserInspector } from '@statelyai/inspect'
// const { inspect } = createBrowserInspector()

export function useFilter() {
  const machine = useMachine(
    filterMachine.provide({
      actors: {
        loadProducts: fromPromise(async () => {
          await queryClient.invalidateQueries({ queryKey: ['products'] })
        }),
      },
    }),
    {
      input: {
        type: config.types[0],
        colors: config.colors.map((c) => c),
        sizes: config.sizes.map((s) => s),
        price: [0, 100, { isCustom: false, customRange: [0, 100] }],
        sorting: null,
      },
      // inspect
    }
  )

  const query = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.post<Product[]>('/api/products')
      return data
    },
  })

  const queryClient = useQueryClient()

  useEffect(() => (query.dataUpdatedAt ? machine[1]({ type: 'loading.success' }) : undefined), [query.dataUpdatedAt])
  useEffect(() => (query.errorUpdatedAt ? machine[1]({ type: 'loading.error' }) : undefined), [query.errorUpdatedAt])

  const debouncedSend = useDebouncedCallback((event: FilterMachine_Events) => machine[1](event), 400)

  return { query, machine, debouncedSend }
}
