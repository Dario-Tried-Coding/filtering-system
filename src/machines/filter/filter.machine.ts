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
    updateFilter: assign(({ context: filter }, { field, value }: Omit<FilterChange_Event, 'type'>) => {
      switch (field) {
        case 'price':
          return { price: value as FilterValue<'price'> }

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
  /** @xstate-layout N4IgpgJg5mDOIC5QDMCWAbALmATgWQEMBjAC1QDswBidAewIgqgDocxMcBPAbQAYBdRKAAOtWKkypa5ISAAeiALQAOAMzMATGoCcqtQBYNqgOxqNAGhCcl2-c1XaArL2PGXG3huMBGAL6-LNCxcQlIKaiDsHGZSAnIYPkEkEFFxSWlZBQRvZh8ANl487zzHYzyNYuNtPMtrBEVvZWNmcuKHUo8vPwCQSJDiMkpmOgYmAAUcWggAVyJMWCoIaTBmCgA3WgBrFb78AfDh+kZ4ianZ+YR12iICdPJExNlUiSkZZKyGjUcW7V5G1VUjm0Rk8FisiAqGmYvEcyl4qg0eTy2n+an8gQwUVCgxWI2OUFOMzmC1wk2iwnQt2QtBwAFtmLtsQc8eNJkSLlcbncHgInmIXhl3og8sxvI5VGLjICqo5vI1jLUIaVoU4XMoURp9Lw-ujepj+mEhhAwAAjWjTchEJgAJTAeKoclgmFuKwIyCiAAovrwAJRURn7I2m82Wm12o6PZLPO6ZJSqXjQqXa3jKQwmMyKhCAzROVxywxfZRFPL+HrkKZwWQBw1gPlpV6x+reKU-P5qQHA+MaMF1RQS7QtCp5fSp-T6XRaXXVnHMWAkWgAd0J53gUf5MaFTblzG0PjHQJ8ri0jkzEuajlh8MRyNRqin+r2Ndn84XAFEcGS6wK3qAsqo7DCYraMocI+N4KbeKezbMBecIIkiKJqGiPTTsyRysmcxJfhuv5KMYdhFMBKLgXKeRSsomYkTByjeCOjiGFUxgaNo97BI+M7GmaFpWvEtp4thDabooQItPoALeACaamAimaKF4O6NLK+gdJ4PguKWvhAA */
  id: 'filterMachine',

  description: 'A state machine to manage the filtering of products',
  context: ({ input: filter }) => filter,

  states: {
    showProducts: {},
    showError: {},

    loadingProducts: {
      invoke: {
        src: 'loadProducts',
        onDone: 'showProducts',
        onError: 'showError',
      }
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
    }
  },

  initial: 'loadingProducts',
})
