import { FilterMachine_Context as Context } from '@/machines/filter/context'
import { FilterMachine_Events as Events } from '@/machines/filter/events'
import { FilterMachine_Input as Input } from '@/machines/filter/input'
import { FilterChangeEvent, FilterFieldValue, FilterFields } from '@/machines/filter/types'
import { assign, setup } from 'xstate'

export const filterMachine = setup({
  types: {
    context: {} as Context,
    input: {} as Input,
    events: {} as Events,
  },
  actions: {
    updateFilter: assign(({ context: { filter } }, { field, value }: Omit<FilterChangeEvent<FilterFields>, 'type'>) => {
      switch (field) {
        case 'price':
          return { filter: { ...filter, price: value as [number, number] } }

        case 'type':
          return { filter: { ...filter, type: value as FilterFieldValue<'type'> } }

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
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDMCWAbALmATgWQEMBjAC1QDswA6WEgewHcAFHOiAVyM1gGI0tcVUgXIwA2gAYAuolAAHOrFSZUdcrJAAPRAHYAjFT0A2ACwSjAJgCsAGhABPRAForOgL4e75NnA39s+MRklBoKSipqGtoIFnaOCE56ABxJniD+uISkFNS0jCxsnNyhisqq6khaiFYScYgAzGkZgdmUVDhgTshgmK1QJeHlUYgWplQSViZGSTq2Dg0eHkA */
  id: 'filterMachine',
  description: 'A state machine to manage the filtering of products',
  context: ({ input: filter }) => ({ filter }),
  states: {
    showProducts: {
      on: {
        'filter.change': {
          target: 're-fetching',
          actions: [],
        },
      },
    },
    're-fetching': {},
  },

  initial: 'showProducts',
})
