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
  /** @xstate-layout N4IgpgJg5mDOIC5QDMCWAbALmATgWQEMBjAC1QDswBidAewIgqgDocxMcBPAbQAYBdRKAAOtWKkypa5ISAAeiAEwAWRc2XLeADlUBmRQE5FirYoCsAGhCdEAWgCMWgGzMz2xU95OtAdj-KDZQBfIKs0LFxCUgpqcOwcZlICchg+QSQQUXFJaVkFBFtA5gN7Xl0DT3sze3NdKxsCxV4DZkVdZVNnfV5DAx8QsIx4qLJKZjoGJgAFHFoIAFciTFgaekYU5lhFojhYNNksiSkZDPyHbVanewreL3sq3TMnesR7XXtmJx9eH31DDvMTjMAxAcUixFGYHGa2mswWSxWE3WLFwsxw+wyhxyJ1A+RUaiaTmUTneWlK3kUPheCDeHy+Pz+gVMT10ILB+AhMWYEDAACNaPNyEQmAAlMBIqhyWCYAjYZgEZDxAAUbl4AEoqOyRlyefzBcKUmKkRiRGIjrlTogvsxdLovk4DGYzPojLbqbZlB8yd8tG52oZ3sEQeQ5nBZFrOZQDmbsXk7FUXB5rp47g8nu72h82h1bYGtFpdD4nGyhuDomNYCRaAB3GZzRbLaPZY5xgoGFoaQI+ZRF241AzUpotJ5PAy8e7OZxGEsRDnlqGVmsAURwaKb5px8iUzs+vA6vqcTmMlJMg+ariBDvHjm8DsUM+GkahSNh9YR69jloQR9czh81V+MxlDtVRqUPZgfECfQe2JT1THsB8y0hbk+QFIVRXFNYPxbL8gOYCdx2UMwKnzIkgPdUoPg6ICex8AsdBUVkQiCIA */
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

    debouncingReload: {
      after: {
        "500": {
          target: "loadingProducts",
          actions: "reloadProducts"
        }
      }
    }
  },
  on: {
    'loading.retry': {
      target: '.debouncingReload',
    },

    'filter.change': {
      target: ".debouncingReload",
      actions: [{
        type: 'updateFilter',
        params: ({ event: { field, value } }) => ({ field, value }),
      }],
    },
  },
})
