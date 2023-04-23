import { defineStore } from 'pinia'
import { useRequest } from '@/composables/useRequest'
import { BatchManagement, BatchCompanies } from '@/models/BatchManagement'

export const useBatchManagement = defineStore('BatchManagement', {
  state: () => ({
    batchManagement: [] as BatchManagement[],
    batchCompanies: [] as BatchCompanies[]
  }),
  actions: {
    async fetchBatchManagement() {
      this.batchManagement = await useRequest('/BatchManagement', {
        method: 'get'
      })
    },

    async show(payload: Pick<BatchManagement, 'id'>) {
      this.batchCompanies = await useRequest(`/batchManagement/${payload.id}`, {
        method: 'get'
      })
    },
    async update(payload: Omit<BatchManagement, 'id'>) {
      // const { id } = await useRequest(
      //   `/batchManagement/${this.batchManagement.id}`,
      //   {
      //     method: 'put',
      //     body: payload
      //   }
      // )
      // return id as number
    },
    async destroy(id: BatchManagement['id']) {
      await useRequest(`/batchManagement/${id}`, {
        method: 'delete'
      })
    }
  }
})
