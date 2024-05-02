export const config = {
  types: ['SHIRT', 'JEANS'],
  colors: ['WHITE', 'BEIGE', 'BLUE', 'GREEN', 'PURPLE'],
  sizes: ['S', 'M', 'L'],
  prices: [9.99, 19.99, 29.99, 39.99, 49.99, 59.99],
  sorting: ['PRICE_ASC', 'PRICE_DESC'],
} as const

export type Config = {
  [key in keyof typeof config]: (typeof config)[key][number]
}