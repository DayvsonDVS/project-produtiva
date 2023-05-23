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

      return state.companies.filter((company) => {
        if (
          !listBatchCompanies.includes(company.id) &&
          company.status !== 'inactive'
        ) {
          return company
        }
      })
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
    async create(payload: Omit<Company, 'id' | 'created_at' | 'updated_at'>) {
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

      if (this.company.cpf === null) {
        this.company.cpf = ''
      }
      if (this.company.cnpj === null) {
        this.company.cnpj = ''
      }
    },
    async update(payload: Omit<Company, 'id' | 'created_at' | 'updated_at'>) {
      const { id } = await useRequest(`/companies/${this.company.id}`, {
        method: 'put',
        body: payload
      })
      return id as number
    },
    async updateCompanyCPF(
      payload: Omit<Company, 'id' | 'created_at' | 'updated_at'>
    ) {
      payload.cpf = null
      const { id } = await useRequest(`/companies/${this.company.id}`, {
        method: 'put',
        body: payload
      })
      return id as number
    },
    async updateCompanyCNPJ(
      payload: Omit<Company, 'id' | 'created_at' | 'updated_at'>
    ) {
      payload.cnpj = null
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
