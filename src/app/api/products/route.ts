import { db } from "@/lib/prisma";
import { filterValidator } from "@/lib/validators/filter";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const filter = filterValidator.parse(body)

    const products = await db.product.findMany({
      where: {
        type: filter.clothing,
        color: { in: filter.color },
        size: { in: filter.size },
        price: { gte: filter.price[0], lte: filter.price[1] }
      }
    })

    return new Response(JSON.stringify(products))
  } catch (error) {
    if (error instanceof ZodError) return new Response(error.message, { status: 400 })
  }
  const products = await db.product.findMany()
  return new Response(JSON.stringify(products))
}