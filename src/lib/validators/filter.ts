import { CLOTHING_TYPES as TYPES, COLORS, SIZES } from '@/config'
import { z } from 'zod'

export const filterValidator = z.object({
  type: z.enum(TYPES),
  color: z.array(z.enum(COLORS)),
  size: z.array(z.enum(SIZES)),
  price: z.tuple([z.number(), z.number()])
})
export type FilterPayload = z.infer<typeof filterValidator>