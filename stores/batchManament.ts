import { defineStore } from 'pinia'
import { useRequest } from '@/composables/useRequest'
import {
  BatchManagement,
  BatchCompanies,
  BatchManagementCompanies
} from '@/models/BatchManagement'
export const useBatchManagement = defineStore('BatchManagement', {
  state: () => ({
    batchManagement: [] as BatchManagement[],
    batchCompanies: [] as BatchCompanies[],
    batchManagementCompanies: [] as BatchManagementCompanies[],
    pending: 0,
    done: 0
  }),

  // getters: {
  //   overview: (state) => {
  //     state.batchManagementCompanies.map(({ status }) => {
  //       if (status === 'pending') {
  //         state.pending++
  //       } else {
  //         state.done++
  //       }
  //     })
  //   }
  // },
  actions: {
    async fetchBatchManagement() {
      this.batchManagement = await useRequest('/BatchManagement', {
        method: 'get'
      })
    },

    async show(payload: Pick<BatchManagement, 'id'>) {
      const { companiesBatch, companiesBatchManagement } = await useRequest(
        `/batchManagement/${payload.id}`,
        {
          method: 'get'
        }
      )
      this.batchCompanies = companiesBatch
      this.batchManagementCompanies = companiesBatchManagement

      this.overview()
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
    },
    overview() {
      let countPending = 0
      let countDone = 0
      this.batchManagementCompanies.map(({ status }) => {
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
