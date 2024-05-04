import { Product as TProduct } from '@prisma/client'
import { FC } from 'react'

interface ProductProps {
  product: TProduct
}

const Product: FC<ProductProps> = ({product}) => {
  return (
    <div className='group relative'>
      <div className='aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-slate-200 group-hover:opacity-75 lg:h-80'>
        <img
          src={`/images/${product.type.toLowerCase()}s/${product.name.toLowerCase().replace(/-/g, '_')}.png`}
          alt='product image'
          className='h-full w-full object-cover object-center'
        />
      </div>
      <div className='mt-4 flex justify-between'>
        <div>
          <h3 className='text-sm text-slate-700'>{product.name}</h3>
          <p className='mt-1 text-sm text-slate-500'>
            Size {product.size.toUpperCase()}, {product.color}
          </p>
        </div>

        <p className='text-sm font-medium text-gray-900'>{product.price}</p>
      </div>
    </div>
  )
}

export default Product