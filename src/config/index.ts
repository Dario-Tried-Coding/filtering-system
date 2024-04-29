export const COLORS = ['WHITE', 'BEIGE', 'BLUE', 'GREEN', 'PURPLE'] as const
export const SIZES = ['S', 'M', 'L'] as const
export const PRICES = [9.99, 19.99, 29.99, 39.99, 49.99, 59.99] as const
export const CLOTHING_TYPES = ['SHIRT'] as const

export type COLOR = typeof COLORS[number]
export type SIZE = typeof SIZES[number]
export type PRICE = typeof PRICES[number]
export type CLOTHING_TYPE = typeof CLOTHING_TYPES[number]