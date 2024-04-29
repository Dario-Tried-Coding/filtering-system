import { Product } from "@prisma/client"

export interface ProdVectorCreationPayload {
  id: string
  metadata: Exclude<Product, 'createdAt' | 'updatedAt'>
  embedding: number[]
}