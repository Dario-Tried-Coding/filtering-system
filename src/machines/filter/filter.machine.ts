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
  /** @xstate-layout N4IgpgJg5mDOIC5QDMCWAbALmATgWQEMBjAC1QDswBidAewIgqgDocxMcBPAbQAYBdRKAAOtWKkypa5ISAAeiALQAOZQBoQnJauYBWAL76NaLLkKkK1E9hzNSBcjD6CkIUeMnTZChIoDMGlq+AIzKwcwA7ABMAGy6MVEGRiDWZsRklDT0jI7MsACuRERwsM6y7hJSMq4+UVEALJF+9X4RuoFK9VF69THKAJy8icoRA7wxhsYYNuYZ1HQMTMy4OLQ4Za4VntWgPsG9Hb6DzLynvMG6w6ODE8mp+OmWzBBgAEa0+eRETABKYAsQKhyWCYAjYZgEZA2AAUiV4AEoqPdZk8Xu9Pt9HH8ARsRGJKl4akpmpExgl2ppEPVwsFBsp6soovsospdNFDMlyLQXvBXMjHpRyvjtt4lME-DFDv5xZFYvFEpMUtM0hZKHkSLQAO4ABVWEEKmF5eI8VVFCCifj8PT6gyuZMOyhizHquj8wV4-Qi1KZHvqiv5qrA6q1AFEcKscEKTYTdogLhFmH5+vTLm0RvbKeaklNTA9A8wAUxddyDUa3MLTUTfBF+om-Lp+qndOmbod3Qn6hE4uT-cq83Nnm8Pl9fv9slGCTt5EoYo16-1WhSgoo6icLS02hz9EA */
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
