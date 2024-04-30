import { CLOTHING_TYPE, CLOTHING_TYPES, COLORS, PRICES, SIZES } from '@/config'
import { ProdVectorCreationPayload } from '@/types'
import { PrismaClient, Product } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { nanoid } from 'nanoid'

dotenv.config()

const db = new PrismaClient()

const generateRandomPrice = () => PRICES[Math.floor(Math.random() * PRICES.length)]

async function seed() {
  console.log('[INFO]: Seeding process started...')

  const products: Product[] = []

  try {
    await db.product.deleteMany()

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
    
    console.log('[SUCCESS]: Seeding process completed successfully...')
  } catch (error) {
    console.log('[ERROR]:', (error as Error).message)
  }
}

seed()
