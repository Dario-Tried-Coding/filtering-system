'use client'

import { config } from '@/config'
import { FilterPayload } from '@/lib/validators/filter'
import { Filter, FilterChange_Payloads } from '@/types'
import { useDebouncedValue } from '@mantine/hooks'
import { Product } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useReducer } from 'react'

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

  const [{ clothing, colors, price, sizes, sorting }] = useDebouncedValue(filterReducer[0], 300, { leading: true })

  const query = useQuery({
    queryKey: ['products', clothing, colors, sizes, price.range, sorting],
    queryFn: async ({ queryKey }) => {
      const payload: FilterPayload = {
        clothing: queryKey[1] as Filter['clothing'],
        color: queryKey[2] as Filter['colors'],
        size: queryKey[3] as Filter['sizes'],
        price: queryKey[4] as Filter['price']['range'],
        sorting: queryKey[5] as Filter['sorting'],
      }

      const { data } = await axios.post<Product[]>('/api/products', payload)
      return data
    },
  })

  return { query, filterReducer }
}
