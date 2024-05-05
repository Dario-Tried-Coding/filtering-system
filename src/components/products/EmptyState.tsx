import { XCircle } from 'lucide-react'
import { FC } from 'react'

interface EmptyStateProps {}

const EmptyState: FC<EmptyStateProps> = ({}) => {
  return (
    <div className='relative col-span-full flex h-80 w-full flex-col items-center justify-center bg-slate-50 p-12'>
      <XCircle className='h-8 w-8 text-red-500' />
      <h3 className='text-xl font-semibold'>Nessun prodotto trovato</h3>
      <p className='text-sm text-slate-500'>Non abbiamo trovato nessun risultato per il filtro fornito.</p>
    </div>
  )
}

export default EmptyState
