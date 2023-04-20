import { defineStore } from 'pinia'
import { useRequest } from '@/composables/useRequest'
import { Batch } from '@/models/Batch'

export const useBatch = defineStore('batch', {
  state: () => ({
    lots: [] as Batch[],
    batch: {} as Batch
  }),
  actions: {
    async fetchLots() {
      this.lots = await useRequest('/lots', { method: 'get' })
    },
    async create(payload: Omit<Batch, 'id'>) {
      const { id } = await useRequest('/lots', {
        method: 'post',
        body: payload
      })
      return id as number
    },
    async show(payload: Pick<Batch, 'id'>) {
      this.batch = await useRequest(`/lots/${payload.id}`, {
        method: 'get'
      })
    },
    async update(payload: Omit<Batch, 'id'>) {
      const { id } = await useRequest(`/lots/${this.batch.id}`, {
        method: 'put',
        body: payload
      })
      return id as number
    },
    async destroy(id: Batch['id']) {
      await useRequest(`/lots/${id}`, {
        method: 'delete'
      })

      await this.fetchLots()

      this.lots = this.lots.filter((batch) => batch.id !== id)
    }
  }
})
