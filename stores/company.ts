import { defineStore } from 'pinia'
import { useRequest } from '@/composables/useRequest'
import { Company } from '@/models/Company'

export const useCompany = defineStore('company', {
  state: () => ({
    company: [] as Company[],
    searchable: ''
  }),
  getters: {
    filteredCompanies: (state) => {
      if (state.searchable === '') return state.company

      return state.company.filter(({ name, cnpj }) => {
        const totalText = `${name} ${cnpj}`.toLowerCase()

        return totalText.includes(state.searchable.toLowerCase())
      })
    }
  },
  actions: {
    async fetchCompanies() {
      this.company = await useRequest('/companies', { method: 'get' })
    },
    async create(payload: Omit<Company, 'id'>) {
      const { id } = await useRequest('/companies', {
        method: 'post',
        body: payload
      })
      return id as number
    }
  }
})
