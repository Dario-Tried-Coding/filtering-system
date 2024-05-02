import { FilterChange_Event } from '@/machines/filter/types'

export type FilterMachine_Events = { type: 'loading.success' } | { type: 'loading.error' } | { type: 'loading.retry' } | FilterChange_Event
