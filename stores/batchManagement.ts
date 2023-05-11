import { defineStore } from 'pinia'
import { useRequest } from '@/composables/useRequest'
import { BatchManagement, CreatePayload } from '@/models/BatchManagement'

export const useBatchManagement = defineStore('BatchManagement', {
  state: () => ({
    batchManagements: [] as BatchManagement[],
    pending: 0,
    done: 0,
    removeBatchCompanies: [] as number[],
    idCompany: 0,
    statusCompany: 'all'
  }),

  getters: {
    getCompany: (state) => {
      return state.batchManagements.find(({ company_id }) => {
        return company_id === state.idCompany
      })
    },
    filterCompany: (state) => {
      if (state.statusCompany !== 'all') {
        return state.batchManagements.filter(({ status }) => {
          return status === state.statusCompany
        })
      }
      return state.batchManagements
    }
  },

  actions: {
    async fetchBatchManagement() {
      this.batchManagements = await useRequest('/BatchManagement', {
        method: 'get'
      })
    },

    async show(payload: Pick<BatchManagement, 'id'>) {
      this.batchManagements = await useRequest(
        `/batchManagement/${payload.id}`,
        {
          method: 'get'
        }
      )
      this.overview()
    },

    async update(
      payload: Omit<
        CreatePayload,
        'id' | 'batch_id' | 'company_id' | 'updated_at' | 'user'
      >
    ) {
      const { user } = useCookie('token').value as any

      const { id } = await useRequest(
        `/batchManagement/${this.getCompany?.id}`,
        {
          method: 'put',
          body: { payload, user }
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
    },

    async attachReceipt(payload: Pick<CreatePayload, 'receipt'>) {
      const formData = new FormData()

      if (payload.receipt) {
        formData.append('file', payload.receipt)

        await useRequest(`/batchManagement/${this.getCompany?.id}`, {
          method: 'put',
          body: formData
        })
      }
    }
  }
})
