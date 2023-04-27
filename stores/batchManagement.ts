import { defineStore } from 'pinia'
import { useRequest } from '@/composables/useRequest'
import {
  BatchManagement,
  BatchManagementCompanies
} from '@/models/BatchManagement'

export const useBatchManagement = defineStore('BatchManagement', {
  state: () => ({
    batchManagements: [] as BatchManagement[],
    batchManagement: {} as BatchManagementCompanies,
    pending: 0,
    done: 0,
    removeBatchCompanies: [] as number[]
  }),

  actions: {
    async fetchBatchManagement() {
      this.batchManagements = await useRequest('/BatchManagement', {
        method: 'get'
      })
    },

    async show(payload: Pick<BatchManagement, 'id'>) {
      const { BatchManagement } = await useRequest(
        `/batchManagement/${payload.id}`,
        {
          method: 'get'
        }
      )
      this.batchManagements = BatchManagement

      this.overview()
    },

    async update(
      payload: Omit<BatchManagementCompanies, 'id' | 'batch_id' | 'company_id'>
    ) {
      const { id } = await useRequest(
        `/batchManagement/${this.batchManagement.id}`,
        {
          method: 'put',
          body: payload
        }
      )
      return id as number
    },

    async destroyCompanies(id: number, payload: number[]) {
      await useRequest(`/batchManagement/${id}`, {
        method: 'delete',
        body: payload
      })
    },

    overview() {
      let countPending = 0
      let countDone = 0
      this.batchManagements.map(({ status }) => {
        if (status === 'pending') {
          countPending++
        } else {
          countDone++
        }
        this.done = countDone
        this.pending = countPending
      })
    }
  }
})
