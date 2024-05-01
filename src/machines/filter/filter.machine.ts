import { FilterMachine_Context as Context } from '@/machines/filter/context'
import { FilterMachine_Events as Events } from '@/machines/filter/events'
import { FilterMachine_Input as Input } from '@/machines/filter/input'
import { FilterMachine_Actors as Actors } from '@/machines/filter/actors'
import { FilterChangeEvent, FilterFieldValue, FilterFields } from '@/machines/filter/types'
import { assign, setup } from 'xstate'

export const filterMachine = setup({
  types: {
    context: {} as Context,
    input: {} as Input,
    events: {} as Events,
  },
  actions: {
    reloadProducts: () => {},
    updateFilter: assign(({ context: filter }, { field, value }: Omit<FilterChangeEvent<FilterFields>, 'type'>) => {
      switch (field) {
        case 'price':
          return { ...filter, price: value as [number, number] }

        case 'type':
          return { ...filter, type: value as FilterFieldValue<'type'> }

        case 'color':
          const updatedColor = filter.color.includes(value as FilterFieldValue<'color'>)
            ? filter.color.filter((c) => c !== value)
            : [...filter.color, value as FilterFieldValue<'color'>]
          return { ...filter, color: updatedColor }

        case 'size':
          const updatedSize = filter.size.includes(value as FilterFieldValue<'size'>)
            ? filter.size.filter((s) => s !== value)
            : [...filter.size, value as FilterFieldValue<'size'>]
          return { ...filter, size: updatedSize }

        default:
          throw new Error('Invalid field')
      }
    }),
  },
  actors: {} as Actors,
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDMCWAbALmATgWQEMBjAC1QDswBidAewIgqgDocxMcBPAbQAYBdRKAAOtWKkypa5ISAAeiAEwBmAGzMAjAHYArIo3LeB1Rp0BOLQBoQnRAFpVvZgBYzb51qNnlanQF8-azQsXEJSCmpg7BxmUgJyGD5BJBBRcUlpWQUEOw1eRWZ8rRNFMwAOZwMtN2tbHK1lZi1FVR1eXm8NVWUdboCgjGiwskpmOgYmAAUcWggAVyJMWBp6RgTmWAWiOFgk2TSJKRkU7NzeMuYWjTNHXhNTHtVaxAMNZlVPBsVS5zLFXv8gRAUVCxBGYDGqymM3mi2W4zWLFwMxwexSBwyx1A2UUzgKijuzm6GjKeVUfysNheyjeH14Xx+f16ygCQPIszgshB+DBEX2YkOmRO9lM6iuN3a9x0j2eOQJOiaLTavQ0zl+Zmc-WBg1B4VGsBItAA7tNZgslvz0kcsvY3C5XB4PLcNKVZQSzMwAaozEYSeTvYotdzhhENoajQBRHAoy2CrHyJTS968X5lXqqb6KZplN0dT2tb2+sr+syBoHB3mjBHQs1w2OYm0IDOe4u6bQ9ZxqPGy1Tqaqd3FaImVP4aVl+IA */
  id: 'filterMachine',

  description: 'A state machine to manage the filtering of products',
  context: ({ input: filter }) => filter,
  initial: 'loadingProducts',

  states: {
    showProducts: {},

    showError: {},

    loadingProducts: {
      on: {
        'loading.success': 'showProducts',
        'loading.error': 'showError',
      },
    },
  },
  on: {
    'loading.retry': {
      target: '.loadingProducts',
      actions: 'reloadProducts',
    },

    'filter.change': {
      target: '.loadingProducts',
      actions: [
        {
          type: 'updateFilter',
          params: ({ event: { field, value } }) => ({ field, value }),
        },
        'reloadProducts'
      ],
    },
  },
})
