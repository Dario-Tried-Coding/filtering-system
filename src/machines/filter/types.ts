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

export type FilterChangeEvent<T extends FilterFields> = {
  type: 'filter.change'
  field: T
  value: FilterFieldValue<T>
}
