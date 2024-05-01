import { CLOTHING_TYPE, COLOR, SIZE } from '@/config'

export interface Filter {
  type: CLOTHING_TYPE
  color: COLOR[]
  size: SIZE[]
  price: [number, number]
}

export type FilterFields = keyof Filter
export type FilterFieldValue<T extends FilterFields> = T extends 'type'
  ? CLOTHING_TYPE
  : T extends 'color'
    ? COLOR
    : T extends 'size'
      ? SIZE
      : T extends 'price'
        ? [number, number]
        : never

type FilterChangePayload<T extends FilterFields> = {
  field: T
  value: FilterFieldValue<T>
}
export type FilterChangePayloads = FilterChangePayload<'type'> | FilterChangePayload<'color'> | FilterChangePayload<'size'> | FilterChangePayload<'price'>

export type FilterChangeEvent<T extends FilterFields> = FilterChangePayload<T> & {
  type: 'filter.change'
}