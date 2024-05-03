import { Product } from "@prisma/client"
import { PromiseActorLogic } from "xstate"

export type FilterMachine_Actors = {
  loadProducts: PromiseActorLogic<void>
}