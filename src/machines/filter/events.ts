import { FilterChangeEvent, FilterFields } from '@/machines/filter/types'

export type FilterMachine_Events = { type: 'loading.success' } | { type: 'loading.error' } | { type: 'loading.retry' } | FilterChangeEvent<'type'> | FilterChangeEvent<'color'> | FilterChangeEvent<'size'> | FilterChangeEvent<'price'>
