import { defineStore } from 'pinia'
import { useRequest } from '@/composables/useRequest'
import { Batch } from '@/models/Batch'
import { useCompany } from '@/stores/company'
import { BatchManagementCompanies } from '@/models/BatchManagement'

export const useBatch = defineStore('batch', {
  state: () => ({
    lots: [] as Batch[],
    batch: {} as Batch,
    searchable: ''
  }),
  getters: {
    filteredBatch: (state) => {
      if (state.searchable === '') return state.lots

      return state.lots.filter(({ name }) => {
        const totalText = `${name} `.toLowerCase()

        return totalText.includes(state.searchable.toLowerCase())
      })
    }
  },
  actions: {
    async fetchLots() {
      this.lots = await useRequest('/lots', { method: 'get' })
    },
    async create(payload: Omit<Batch, 'id'>) {
      const companies = useCompany()
      const id = await useRequest('/lots', {
        method: 'post',
        body: payload
      })

      const listBatchManagement = [] as BatchManagementCompanies[]

      companies.companies.map((company) => {
        listBatchManagement.push({
          id: undefined,
          batch_id: id,
          company_id: company.id,
          historic: '',
          receipt: '',
          status: 'pending'
        })
      })

      await useRequest('/batchManagement', {
        method: 'post',
        body: listBatchManagement
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
