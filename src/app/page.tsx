'use client'

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/DropdownMenu'
import { sortingOptions } from '@/constants'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

export default function Home() {

  return (
    <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <header className='flex items-baseline justify-between border-b pb-6 pt-24'>
        <h1 className='text-4xl font-bold tracking-tight'>Selezione di cotone di alta qualità</h1>
        <DropdownMenu>
          <DropdownMenuTrigger className='group inline-flex justify-center text-sm font-medium text-slate-700 outline-offset-2 hover:text-slate-900'>
            Ordine
            <ChevronDown className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-slate-400 group-hover:text-slate-500' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem className={cn('py-2 text-sm text-slate-500', { 'bg-accent text-accent-foreground': false })}>
              Nessuno
            </DropdownMenuCheckboxItem>
            {sortingOptions.map((opt) => (
              <DropdownMenuCheckboxItem key={opt.value} className={cn('py-2 text-sm text-slate-500', { 'bg-accent text-accent-foreground': false })}>
                {opt.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </main>
  )
}
