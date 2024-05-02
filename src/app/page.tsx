'use client'

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/DropdownMenu'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { colorOptions, priceOptions, sizeOptions, sortingOptions, typeOptions } from '@/constants'
import { useFilter } from '@/hooks/use-fIlter'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { isEqual } from 'lodash'

export default function Home() {
  const {
    query: { error },
    machine: [state, send],
    debouncedSend,
  } = useFilter()

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
            <DropdownMenuCheckboxItem
              checked={state.context.sorting === null}
              onSelect={() => send({ type: 'filter.change', field: 'sorting', value: null })}
              className={cn('py-2 text-sm text-slate-500', { 'bg-accent text-accent-foreground': false })}
            >
              Nessuno
            </DropdownMenuCheckboxItem>
            {sortingOptions.map((opt) => (
              <DropdownMenuCheckboxItem
                key={opt.value}
                checked={state.context.sorting === opt.value}
                onSelect={() => send({ type: 'filter.change', field: 'sorting', value: opt.value })}
                className={cn('py-2 text-sm text-slate-500', { 'bg-accent text-accent-foreground': false })}
              >
                {opt.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <section className='grid grid-cols-1 gap-x-8 gap-y-10 pb-24 pt-6 lg:grid-cols-4'>
        <Accordion type='multiple' className='animate-none'>
          <AccordionItem value='type'>
            <AccordionTrigger className='py-3 text-sm text-slate-400 hover:text-slate-500'>
              <span className='font-medium text-slate-900'>Indumento</span>
            </AccordionTrigger>
            <AccordionContent className='animate-none pt-6'>
              <ul className='space-y-4'>
                {typeOptions.map((opt) => (
                  <li key={opt.value} className='flex items-center'>
                    <input
                      type='radio'
                      name='type'
                      id={`type-${opt.value}`}
                      checked={state.context.type === opt.value}
                      disabled={opt.disabled}
                      onChange={() => send({ type: 'filter.change', field: 'type', value: opt.value })}
                      className={cn('h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500', { 'opacity-50': opt.disabled })}
                    />
                    <label htmlFor={`type-${opt.value}`} className={cn('ml-3 text-sm text-slate-600', { 'opacity-50': opt.disabled })}>
                      {opt.label}
                    </label>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='color'>
            <AccordionTrigger className='py-3 text-sm text-slate-400 hover:text-slate-500'>
              <span className='font-medium text-slate-900'>Colore</span>
            </AccordionTrigger>
            <AccordionContent className='animate-none pt-6'>
              <ul className='space-y-4'>
                {colorOptions.map((opt) => (
                  <li key={opt.value} className='flex items-center'>
                    <input
                      type='checkbox'
                      id={`color-${opt.value}`}
                      onChange={() => {
                        send({ type: 'filter.change', field: 'colors', value: opt.value })
                      }}
                      checked={state.context.colors.includes(opt.value)}
                      className='h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500'
                    />
                    <label htmlFor={`color-${opt.value}`} className='ml-3 text-sm text-slate-600'>
                      {opt.label}
                    </label>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='size'>
            <AccordionTrigger className='py-3 text-sm text-slate-400 hover:text-slate-500'>
              <span className='font-medium text-slate-900'>Taglia</span>
            </AccordionTrigger>
            <AccordionContent className='animate-none pt-6'>
              <ul className='space-y-4'>
                {sizeOptions.map((opt) => (
                  <li key={opt.value} className='flex items-center'>
                    <input
                      type='checkbox'
                      id={`size-${opt.value}`}
                      onChange={() => {
                        send({ type: 'filter.change', field: 'sizes', value: opt.value })
                      }}
                      checked={state.context.sizes.includes(opt.value)}
                      className='h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500'
                    />
                    <label htmlFor={`size-${opt.value}`} className='ml-3 text-sm text-slate-600'>
                      {opt.label}
                    </label>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='price'>
            <AccordionTrigger className='py-3 text-sm text-slate-400 hover:text-slate-500'>
              <span className='font-medium text-slate-900'>Prezzo</span>
            </AccordionTrigger>
            <AccordionContent className='animate-none pt-6'>
              <ul className='space-y-4'>
                {priceOptions.map((opt) => (
                  <li key={`price-${opt.value[0]}-${opt.value[1]}`} className='flex items-center'>
                    <input
                      type='radio'
                      id={`price-${opt.value[0]}-${opt.value[1]}`}
                      name='price'
                      onChange={() => {
                        send({ type: 'filter.change', field: 'price', value: opt.value })
                      }}
                      checked={isEqual(state.context.price, opt.value)}
                      className='h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500'
                    />
                    <label htmlFor={`price-${opt.value[0]}-${opt.value[1]}`} className='ml-3 text-sm text-slate-600'>
                      {opt.label}
                    </label>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div>
          {state.value} - <pre>{JSON.stringify(state.context, null, 2)}</pre>
        </div>
      </section>
    </main>
  )
}
