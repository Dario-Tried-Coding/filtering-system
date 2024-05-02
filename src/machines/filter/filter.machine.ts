import { FilterMachine_Actors as Actors } from '@/machines/filter/actors'
import { FilterMachine_Context as Context } from '@/machines/filter/context'
import { FilterMachine_Events as Events } from '@/machines/filter/events'
import { FilterMachine_Input as Input } from '@/machines/filter/input'
import { FilterChange_Event, FilterValue } from '@/machines/filter/types'
import { assign, setup, stateIn } from 'xstate'

export const filterMachine = setup({
  types: {
    context: {} as Context,
    input: {} as Input,
    events: {} as Events,
  },
  actions: {
    reloadProducts: () => {},
    updateFilter: assign(({ context: filter }, { field, value }: Omit<FilterChange_Event, 'type'>) => {
      switch (field) {
        case 'price':
          return { price: value as [number, number] }

        case 'type':
          return { type: value as FilterValue<'type'> }

        case 'sorting':
          return { sorting: value as FilterValue<'sorting'> }

        case 'colors':
          const updatedColor = filter.colors.includes(value as FilterValue<'colors'>)
            ? filter.colors.filter((c) => c !== value)
            : [...filter.colors, value as FilterValue<'colors'>]
          return { colors: updatedColor }

        case 'sizes':
          const updatedSize = filter.sizes.includes(value as FilterValue<'sizes'>)
            ? filter.sizes.filter((s) => s !== value)
            : [...filter.sizes, value as FilterValue<'sizes'>]
          return { sizes: updatedSize }

        default:
          throw new Error('Invalid field')
      }
    }),
  },
  actors: {} as Actors,
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDMCWAbALmATgWQEMBjAC1QDswBidAewIgqgDocxMcBPAbQAYBdRKAAOtWKkypa5ISAAeiALQAOZQBoQnJauYBWAL76NaLLkKkK1E9hzNSBcjD6CkIUeMnTZChIoDMGlq+AIzKwcwA7ABMAGy6MVEGRiDWZsRklDT0jI7MsACuRERwsM6y7hJSMq4+UYmRfgAsfhG6gUrBURF6jTHKAJy8icoRA7wxhsYYNuYZ1HQMTMy4OLQ4Za4VntWgPsGNEe0hrcy8Z7zBusOjgxPJqfjplswQYABGtPnkREwASmALCBUOSwTAEbDMAjIGwACkSvAAlFQHrNnq8Pl8fo5-oCNiIxJUvDUlE1ImMEm1NIhGuFgoNlI1lFF9lFlLpooZkuRaK94K4UU9KOUCdtvB0-DEjv5gn5IrF4olJilpmkLJQ8iRaAB3AAKqwghUwfPxHiqYoQUVJul6Y2u5KO4Uauj8wV4-QiNOZbpaSSmpkearAGu1AFEcKscMLTUTdohLspmH5+gyrq0Rvaqb4YrwlQLA8xAUw9TzDca3CKzcTfBF+om-Lp+qndOnbg7eN0DnEKbmVQG5i93p9vn8Adko4SdvIlDFGomGz6pXVTpbmq1OfogA */
  id: 'filterMachine',

  description: 'A state machine to manage the filtering of products',
  context: ({ input: filter }) => filter,

  states: {
    showProducts: {},
    showError: {},

    loadingProducts: {
      entry: ['reloadProducts']
    },

    debouncingReload: {
      after: {
        "250": "loadingProducts"
      }
    }
  },

  on: {
    'loading.retry': {
      target: '.debouncingReload',
    },

    'filter.change': {
      target: '.debouncingReload',
      actions: [
        {
          type: 'updateFilter',
          params: ({ event: { field, value } }) => ({ field, value }),
        },
      ],
    },
    'loading.success': '.showProducts',
    "loading.error": ".showError"
  },

  initial: 'loadingProducts',
})
