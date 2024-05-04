'use client'

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/DropdownMenu'
import { Slider } from '@/components/ui/Slider'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CLOTHING_OPTIONS, COLOR_OPTIONS, PRICE_OPTIONS, SIZE_OPTIONS, SORTING_OPTIONS } from '@/constants'
import { useFilter } from '@/hooks/use-fIlter'
import { cn } from '@/lib/utils'
import { isEqual } from 'lodash'
import { ChevronDown } from 'lucide-react'

export default function Home() {
  const {
    query: { error },
    filterReducer: [filter, send],
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
            {SORTING_OPTIONS.options.map((opt) => (
              <DropdownMenuCheckboxItem
                key={opt.value}
                checked={filter.sorting === opt.value}
                onSelect={() => send({ field: 'sorting', value: opt.value })}
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
          <AccordionItem value={CLOTHING_OPTIONS.id}>
            <AccordionTrigger className='py-3 text-sm text-slate-400 hover:text-slate-500'>
              <span className='font-medium text-slate-900'>{CLOTHING_OPTIONS.name}</span>
            </AccordionTrigger>
            <AccordionContent className='animate-none pt-6'>
              <ul className='space-y-4'>
                {CLOTHING_OPTIONS.options.map((opt) => (
                  <li key={opt.value} className='flex items-center'>
                    <input
                      type='radio'
                      name={CLOTHING_OPTIONS.id}
                      id={`${CLOTHING_OPTIONS.id}-${opt.value}`}
                      checked={filter.clothing === opt.value}
                      disabled={opt.disabled}
                      onChange={() => send({ field: CLOTHING_OPTIONS.id, value: opt.value })}
                      className={cn('h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500', { 'opacity-50': opt.disabled })}
                    />
                    <label
                      htmlFor={`${CLOTHING_OPTIONS.id}-${opt.value}`}
                      className={cn('ml-3 text-sm text-slate-600', { 'opacity-50': opt.disabled })}
                    >
                      {opt.label}
                    </label>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value={COLOR_OPTIONS.id}>
            <AccordionTrigger className='py-3 text-sm text-slate-400 hover:text-slate-500'>
              <span className='font-medium text-slate-900'>{COLOR_OPTIONS.name}</span>
            </AccordionTrigger>
            <AccordionContent className='animate-none pt-6'>
              <ul className='space-y-4'>
                {COLOR_OPTIONS.options.map((opt) => (
                  <li key={opt.value} className='flex items-center'>
                    <input
                      type='checkbox'
                      id={`${COLOR_OPTIONS.id}-${opt.value}`}
                      onChange={() => {
                        send({ field: COLOR_OPTIONS.id, value: opt.value })
                      }}
                      checked={filter.colors.includes(opt.value)}
                      className='h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500'
                    />
                    <label htmlFor={`${COLOR_OPTIONS.id}-${opt.value}`} className='ml-3 text-sm text-slate-600'>
                      {opt.label}
                    </label>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value={SIZE_OPTIONS.id}>
            <AccordionTrigger className='py-3 text-sm text-slate-400 hover:text-slate-500'>
              <span className='font-medium text-slate-900'>{SIZE_OPTIONS.name}</span>
            </AccordionTrigger>
            <AccordionContent className='animate-none pt-6'>
              <ul className='space-y-4'>
                {SIZE_OPTIONS.options.map((opt) => (
                  <li key={opt.value} className='flex items-center'>
                    <input
                      type='checkbox'
                      id={`${SIZE_OPTIONS.id}-${opt.value}`}
                      onChange={() => {
                        send({ field: SIZE_OPTIONS.id, value: opt.value })
                      }}
                      checked={filter.sizes.includes(opt.value)}
                      className='h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500'
                    />
                    <label htmlFor={`${SIZE_OPTIONS.id}-${opt.value}`} className='ml-3 text-sm text-slate-600'>
                      {opt.label}
                    </label>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value={PRICE_OPTIONS.id}>
            <AccordionTrigger className='py-3 text-sm text-slate-400 hover:text-slate-500'>
              <span className='font-medium text-slate-900'>{PRICE_OPTIONS.name}</span>
            </AccordionTrigger>
            <AccordionContent className='animate-none pt-6'>
              <ul className='space-y-4'>
                {PRICE_OPTIONS.options.map((opt) =>
                  opt.value === 'custom' ? (
                    <li key={`${PRICE_OPTIONS.id}-${opt.value}`}  className='flex flex-col justify-center gap-2'>
                      <div>
                        <input
                          type='radio'
                          id={`${PRICE_OPTIONS.id}-${opt.value}`}
                          onChange={() => {
                            send({ field: PRICE_OPTIONS.id, value: { ...filter.price, isCustom: true } })
                          }}
                          checked={filter.price.isCustom}
                          className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                        />
                        <label htmlFor={`${PRICE_OPTIONS.id}-${opt.value}`} className='ml-3 text-sm text-gray-600'>
                          {PRICE_OPTIONS.name}
                        </label>
                      </div>
                      <div className='flex justify-between'>
                        <p className='font-medium'>{PRICE_OPTIONS.name}</p>
                        <div>
                          {filter.price.range[0].toFixed(0)} € - {filter.price.range[1].toFixed(0)} €
                        </div>
                      </div>
                      <Slider
                        className={cn({
                          'opacity-50': !filter.price.isCustom,
                        })}
                        disabled={!filter.price.isCustom}
                        onValueChange={(range: [number, number]) =>
                          send({
                            field: PRICE_OPTIONS.id,
                            value: { range, customRange: range, isCustom: true },
                          })
                        }
                        value={filter.price.customRange}
                        min={0}
                        max={100}
                        step={5}
                      />
                    </li>
                  ) : (
                    <li key={`${PRICE_OPTIONS.id}-${opt.value[0]}-${opt.value[1]}`} className='flex items-center'>
                      <input
                        type='radio'
                        id={`${PRICE_OPTIONS.id}-${opt.value[0]}-${opt.value[1]}`}
                        name={PRICE_OPTIONS.id}
                        onChange={() => {
                          send({ field: PRICE_OPTIONS.id, value: { ...filter.price, range: opt.value as [number, number], isCustom: false } })
                        }}
                        checked={isEqual(filter.price.range, opt.value) && !filter.price.isCustom}
                        className='h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500'
                      />
                      <label htmlFor={`${PRICE_OPTIONS.id}-${opt.value[0]}-${opt.value[1]}`} className='ml-3 text-sm text-slate-600'>
                        {opt.label}
                      </label>
                    </li>
                  )
                )}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div>
          <pre>{JSON.stringify(filter, null, 2)}</pre>
        </div>
      </section>
    </main>
  )
}
