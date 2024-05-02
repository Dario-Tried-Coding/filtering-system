import { Config } from '@/config'

export type Filter = {
  type: Config['types']
  colors: Config['colors'][]
  sizes: Config['sizes'][]
  price: [number, number]
  sorting: Config['sorting'] | null
}

type FilterFields = keyof Filter
export type FilterValue<T extends FilterFields> = Filter[T] extends string[] ? Filter[T][number] : Filter[T]

type FilterChange_Payload<T extends FilterFields> = {
  field: T
  value: FilterValue<T>
}

type FilterChange_Payloads = {
  [K in FilterFields]: FilterChange_Payload<K>
}[FilterFields]

export type FilterChange_Event = FilterChange_Payloads & {
  type: 'filter.change'
}