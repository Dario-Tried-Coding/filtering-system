import { Filter, FilterFields } from '@/types'

type FilterOptions<Field extends FilterFields> = {
  id: Field
  name: string
  options: {
    value: Field extends 'price' ? [number, number] | 'custom' : Filter[Field] extends string[] ? Filter[Field][number] : Filter[Field]
    label: string
    disabled?: boolean
  }[]
}

export const SORTING_OPTIONS: FilterOptions<'sorting'> = {
  id: 'sorting',
  name: 'Ordina',
  options: [
    { value: null, label: 'Nessuno' },
    { value: 'PRICE_ASC', label: 'Prezzo: Basso ad Alto' },
    { value: 'PRICE_DESC', label: 'Prezzo: Alto a Basso' },
  ],
} as const

export const COLOR_OPTIONS: FilterOptions<'colors'> = {
  id: 'colors',
  name: 'Colore',
  options: [
    { value: 'WHITE', label: 'Bianco' },
    { value: 'BEIGE', label: 'Beige' },
    { value: 'BLUE', label: 'Blu' },
    { value: 'GREEN', label: 'Verde' },
    { value: 'PURPLE', label: 'Viola' },
  ],
} as const

export const SIZE_OPTIONS: FilterOptions<'sizes'> = {
  id: 'sizes',
  name: 'Taglia',
  options: [
    { value: 'S', label: 'S (small)' },
    { value: 'M', label: 'M (medium)' },
    { value: 'L', label: 'L (large)' },
  ],
} as const

export const CLOTHING_OPTIONS: FilterOptions<'clothing'> = {
  id: 'clothing',
  name: 'Indumento',
  options: [
    { value: 'SHIRT', label: 'Camicia' },
    { value: 'JEANS', label: 'Jeans', disabled: true },
  ],
} as const

export const PRICE_OPTIONS: FilterOptions<'price'> = {
  id: 'price',
  name: 'Prezzo',
  options: [
    { value: [0, 100], label: 'Tutti i prezzi' },
    { value: [0, 20], label: 'Sotto i 20€' },
    { value: [0, 40], label: 'Sotto i 40€' },
    { value: 'custom', label: 'Personalizzato' },
  ],
} as const
