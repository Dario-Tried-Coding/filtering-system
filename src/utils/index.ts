import { config } from "@/config"
import { Filter } from "@/types"

type FilterMap = { [key in keyof Filter]: number }
type ColorsMap = { [key in Filter['colors'][number]]: number }
type SizesMap = { [key in Filter['sizes'][number]]: number }
type CustomPriceRangeMap = { [key in keyof Filter['price']]: number }

const filterMap: FilterMap = {
  clothing: 0,
  colors: 1,
  sizes: 2,
  price: 3,
  sorting: 4,
}
const colorsMap: ColorsMap= {
  WHITE: 0,
  BEIGE: 1,
  BLUE: 2,
  GREEN: 3,
  PURPLE: 4,
}
const sizesMap: SizesMap = {
  S: 0,
  M: 1,
  L: 2,
}
const customPriceRangeMap: CustomPriceRangeMap = {
  range: 0,
  customRange: 1,
  isCustom: 2,
}

export function stringifyFilter(obj: Filter | any): string {
  if (Array.isArray(obj)) {
    if (obj.every((item) => typeof item === 'string')) {
      let indexMap: { [key: string]: number }
      
      if (config.colors.some(c => c.includes(c))) indexMap = colorsMap
      else if (config.sizes.some((c) => c.includes(c))) indexMap = sizesMap

      const sortedStrings = obj.slice().sort((a, b) => indexMap[a] - indexMap[b])
      return `[${sortedStrings.map((item) => JSON.stringify(item)).join(',')}]`
    } else {
      const orderedArray = obj.map((item) => stringifyFilter(item))
      return `[${orderedArray.join(',')}]`
    }
  }

  if (typeof obj === 'object' && obj !== null) {
    let indexMap: { [key: string]: number }

    if (Object.keys(obj).every(k => Object.keys(filterMap).includes(k))) indexMap = filterMap
    else if (Object.keys(obj).every(k => Object.keys(customPriceRangeMap).includes(k))) indexMap = customPriceRangeMap

    const orderedKeys = Object.keys(obj).sort((a, b) => indexMap[a] - indexMap[b])

    const orderedObj: { [key: string]: any } = {}
    orderedKeys.forEach((key) => {
      orderedObj[key] = stringifyFilter(obj[key])
    })

    return `{${Object.entries(orderedObj)
      .map(([key, value]) => `"${key}":${value}`)
      .join(',')}}`
  }

  // Se l'oggetto non è né un array né un oggetto, restituiamo il valore serializzato direttamente
  return JSON.stringify(obj)
}
