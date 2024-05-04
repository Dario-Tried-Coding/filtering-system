import { config } from '@/config'
import { z } from 'zod'

export const filterValidator = z.object({
  clothing: z.enum(config.clothings),
  color: z.array(z.enum(config.colors)),
  size: z.array(z.enum(config.sizes)),
  price: z.tuple([z.number(), z.number()]),
  sorting: z.nullable(z.enum(config.sorting))
})
export type FilterPayload = z.infer<typeof filterValidator>