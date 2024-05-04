import { Config } from '@/config'

export type Filter = {
  clothing: Config['clothings']
  colors: Config['colors'][]
  sizes: Config['sizes'][]
  price: {
    range: [number, number]
    customRange: [number, number]
    isCustom: boolean
  }
  sorting: Config['sorting'] | null
}

export type FilterFields = keyof Filter
export type FilterValue<T extends FilterFields> = Filter[T] extends string[] ? Filter[T][number] : Filter[T]

export type FilterChange_Payloads = {
  [K in FilterFields]: {
    field: K
    value: FilterValue<K>
  }
}[FilterFields]