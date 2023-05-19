import { defineStore } from 'pinia'
import { useRequest } from '@/composables/useRequest'
import { Company } from '@/models/Company'
import { BatchManagement } from '@/models/BatchManagement'

export const useCompany = defineStore('company', {
  state: () => ({
    companies: [] as Company[],
    company: {} as Company,
    searchable: '',
    batchCompanies: [] as BatchManagement[]
  }),
  getters: {
    filteredCompanies: (state) => {
      if (state.searchable === '') return state.companies

      return state.companies.filter(({ name, cnpj }) => {
        const totalText = `${name} ${cnpj}`.toLowerCase()

        return totalText.includes(state.searchable.toLowerCase())
      })
    },
    filterBatchCompanies: (state) => {
      const listBatchCompanies = state.batchCompanies.map(
        (company) => company.company_id
      )

      return state.companies.filter(
        (company) => !listBatchCompanies.includes(company.id)
      )
    }
  },
  actions: {
    async fetchCompanies() {
      this.companies = (await useRequest('/companies', {
        method: 'get'
      })) as Company[]
    },
    async fetchBatchCompaniesShow(payload: Pick<BatchManagement, 'id'>) {
      this.batchCompanies = await useRequest(`/batchManagement/${payload.id}`, {
        method: 'get'
      })
    },
    async create(payload: Omit<Company, 'id'>) {
      const { id } = await useRequest('/companies', {
        method: 'post',
        body: payload
      })
      return id as number
    },
    async show(payload: Pick<Company, 'id'>) {
      this.company = (await useRequest(`/companies/${payload.id}`, {
        method: 'get'
      })) as Company
      if (this.company.contract_date === null) {
        this.company.contract_date = ''
      }
    },
    async update(payload: Omit<Company, 'id'>) {
      const { id } = await useRequest(`/companies/${this.company.id}`, {
        method: 'put',
        body: payload
      })
      return id as number
    },
    async destroy(id: Company['id']) {
      await useRequest(`/companies/${id}`, {
        method: 'delete'
      })

      await this.fetchCompanies()

      this.companies = this.companies.filter((company) => company.id !== id)
    }
  }
})
