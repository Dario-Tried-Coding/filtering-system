import { CLOTHING_TYPE, CLOTHING_TYPES, COLORS, PRICES, SIZES } from '@/config'
import { ProdVectorCreationPayload } from '@/types'
import { PrismaClient, Product } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { nanoid } from 'nanoid'

dotenv.config()

const db = new PrismaClient()

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)

const generateRandomPrice = () => PRICES[Math.floor(Math.random() * PRICES.length)]

async function seed() {
  console.log('[INFO]: Seeding process started...')

  const products: Product[] = []

  try {
    await db.product.deleteMany()
    const { error: deletionError } = await supabase.from('product_vector').delete().neq('id', 0)
    if (deletionError) throw new Error(deletionError.message)

    console.log('[INFO]: db reset completed...')

    for (let typeIdx = 0; typeIdx < CLOTHING_TYPES.length; typeIdx++) {
      for (let colorIdx = 0; colorIdx < COLORS.length; colorIdx++) {
        for (let sizeIdx = 0; sizeIdx < SIZES.length; sizeIdx++) {
          const type = CLOTHING_TYPES[typeIdx]
          const color = COLORS[colorIdx]
          const size = SIZES[sizeIdx]

          products.push({
            id: nanoid(),
            name: `${type}-${color}-${size}`,
            type,
            color,
            size,
            price: generateRandomPrice(),
          })
        }
      }
    }

    await db.product.createMany({ data: products })
    console.log('[INFO]: "Product" table seeded successfully...')

    const CLOTHING_TYPE_MAP = new Map<CLOTHING_TYPE, number>([['SHIRT', 0]])
    const COLOR_MAP = new Map(COLORS.map((color, idx) => [color, idx]))
    const SIZE_MAP = new Map(SIZES.map((size, idx) => [size, idx]))

    const { error: creationError } = await supabase.from('product_vector').insert<ProdVectorCreationPayload[]>(
      products.map((p) => ({
        id: p.id,
        metadata: p,
        embedding: [CLOTHING_TYPE_MAP.get(p.type)!, COLOR_MAP.get(p.color)!, SIZE_MAP.get(p.size)!, generateRandomPrice()],
      }))
    )
    if (creationError) throw new Error(creationError.message)
    
    console.log('[INFO]: "Product_Vector" table seeded successfully...')
    console.log('[SUCCESS]: Seeding process completed successfully...')
  } catch (error) {
    console.log('[ERROR]:', (error as Error).message)
  }
}

seed()
