import { config } from '@/config'
import { PrismaClient, Product } from '@prisma/client'
import { nanoid } from 'nanoid'

const db = new PrismaClient()

const generateRandomPrice = () => config.prices[Math.floor(Math.random() * config.prices.length)]

async function seed() {
  console.log('[INFO]: Seeding process started...')

  const products: Product[] = []

  try {
    await db.product.deleteMany()

    console.log('[INFO]: db reset completed!')

    for (let typeIdx = 0; typeIdx < config.clothings.length; typeIdx++) {
      for (let colorIdx = 0; colorIdx < config.colors.length; colorIdx++) {
        for (let sizeIdx = 0; sizeIdx < config.sizes.length; sizeIdx++) {
          const type = config.clothings[typeIdx]
          const color = config.colors[colorIdx]
          const size = config.sizes[sizeIdx]

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
    console.log('[INFO]: "Product" table seeded successfully!')

    console.log('[SUCCESS]: Seeding process completed successfully!')
  } catch (error) {
    console.log('[ERROR]:', (error as Error).message)
  }
}

seed()
