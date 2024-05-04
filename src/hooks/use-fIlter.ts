'use client'

import { config } from '@/config'
import { Filter, FilterChange_Payloads } from '@/types'
import { Product } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useCallback, useEffect, useReducer } from 'react'
import { useDebouncedCallback, useDebouncedState, useDebouncedValue } from '@mantine/hooks'
import { stringifyFilter } from '@/utils'

const reducer = (state: Filter, payload: FilterChange_Payloads): Filter => {
  switch (payload.field) {
    case 'clothing':
      return { ...state, clothing: payload.value }
    case 'sorting':
      return { ...state, sorting: payload.value }
    case 'price':
      return { ...state, price: payload.value }
    case 'colors':
      const updatedColor = state.colors.includes(payload.value) ? state.colors.filter((c) => c !== payload.value) : [...state.colors, payload.value]
      return { ...state, colors: updatedColor }
    case 'sizes':
      const updatedSize = state.sizes.includes(payload.value) ? state.sizes.filter((s) => s !== payload.value) : [...state.sizes, payload.value]
      return { ...state, sizes: updatedSize }
  }
}

export function useFilter() {
  const filterReducer = useReducer<(state: Filter, action: FilterChange_Payloads) => Filter, Filter>(
    reducer,
    {
      clothing: config.clothings[0],
      colors: [...config.colors],
      sizes: [...config.sizes],
      price: { range: [0, 100], customRange: [0, 100], isCustom: false },
      sorting: null,
    },
    (filter) => filter
  )

  const debouncedFilter = useDebouncedValue(filterReducer[0], 300)

  const query = useQuery({
    queryKey: ['products', stringifyFilter(filterReducer[0].price.isCustom ? debouncedFilter : filterReducer[0])],
    queryFn: async () => {
      const { data } = await axios.post<Product[]>('/api/products')
      return data
    },
  })

  return { query, filterReducer }
}
