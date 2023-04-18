import { defineStore } from 'pinia'
import { useRequest } from '@/composables/useRequest'
import { Company } from '@/models/Company'

export const useCompany = defineStore('company', {
  state: () => ({
    companies: [] as Company[],
    company: {} as Company,
    searchable: ''
  }),
  getters: {
    filteredCompanies: (state) => {
      if (state.searchable === '') return state.companies

      return state.companies.filter(({ name, cnpj }) => {
        const totalText = `${name} ${cnpj}`.toLowerCase()

        return totalText.includes(state.searchable.toLowerCase())
      })
    }
  },
  actions: {
    async fetchCompanies() {
      this.companies = (await useRequest('/companies', {
        method: 'get'
      })) as Company[]
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
