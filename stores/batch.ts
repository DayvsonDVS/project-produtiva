import { defineStore } from 'pinia'
import { useRequest } from '@/composables/useRequest'
import { Batch } from '@/models/Batch'

export const useBatch = defineStore('batch', {
  state: () => ({
    lots: [] as Batch[]
  }),
  actions: {
    async fetchLots() {
      this.lots = await useRequest('/lots', { method: 'get' })
    }
  }
})
