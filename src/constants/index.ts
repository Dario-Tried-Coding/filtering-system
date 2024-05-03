import { Config } from '@/config';

export const sortingOptions: { value: Config['sorting']; label: string }[] = [
  { value: 'PRICE_ASC', label: 'Prezzo: Basso ad Alto' },
  { value: 'PRICE_DESC', label: 'Prezzo: Alto a Basso' },
]

export const colorOptions: { value: Config['colors']; label: string }[] = [
  { value: 'WHITE', label: 'Bianco' },
  { value: 'BEIGE', label: 'Beige' },
  { value: 'BLUE', label: 'Blu' },
  { value: 'GREEN', label: 'Verde' },
  { value: 'PURPLE', label: 'Viola' },
]

export const sizeOptions: { value: Config['sizes']; label: string }[] = [
  { value: 'S', label: 'S (small)' },
  { value: 'M', label: 'M (medium)' },
  { value: 'L', label: 'L (large)' },
]

export const typeOptions: { value: Config['types']; label: string; disabled?: boolean }[] = [
  { value: 'SHIRT', label: 'Camicia' },
  { value: 'JEANS', label: 'Jeans', disabled: true },
]

export const priceOptions: { value: [number, number]; label: string }[] = [
  { value: [0, 100], label: 'Tutti i prezzi' },
  { value: [0, 20], label: 'Sotto i 20€' },
  { value: [0, 40], label: 'Sotto i 40€' },
]
