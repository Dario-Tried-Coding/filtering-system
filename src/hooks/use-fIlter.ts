'use client'

import { COLORS, PRICES, SIZES } from '@/config'
import { filterMachine } from '@/machines/filter/filter.machine'
import { Product } from '@prisma/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useMachine } from '@xstate/react'
import axios from 'axios'
import { useEffect } from 'react'
import { createBrowserInspector } from '@statelyai/inspect'
import { useDebouncedCallback } from '@mantine/hooks'
import { FilterMachine_Events } from '@/machines/filter/events'

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
        type: 'SHIRT',
        color: COLORS.map((color) => color),
        size: SIZES.map((size) => size),
        price: [PRICES[0], PRICES[PRICES.length - 1]],
      },
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

  useEffect(() => machine[1]({ type: 'loading.success' }), [query.dataUpdatedAt])
  useEffect(() => machine[1]({ type: 'loading.error' }), [query.errorUpdatedAt])

  const debouncedSend = useDebouncedCallback((event:FilterMachine_Events) => machine[1](event), 500)

  return { query, machine, debouncedSend }
}
