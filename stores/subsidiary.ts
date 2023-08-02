import { defineStore } from 'pinia'
import { useRequest } from '@/composables/useRequest'
import { Subsidiary, CompanySubsidiary } from '@/models/Subsidiary'

export const useSubsidiary = defineStore('subsidiaries', {
  state: () => ({
    subsidiaries: [] as Subsidiary[],
    companySubsidiaries: [] as CompanySubsidiary[],
    subsidiary: {} as Subsidiary,
    searchable: ''
  }),
  getters: {
    filteredSubsidiaries: (state) => {
      if (state.searchable === '') return state.subsidiaries

      return state.subsidiaries.filter(({ name, cnpj }) => {
        const totalText = `${name} ${cnpj}`.toLowerCase()

        return totalText.includes(state.searchable.toLowerCase())
      })
    }
  },

  actions: {
    async fetchSubsidiaries() {
      this.companySubsidiaries = await useRequest('/subsidiaries', {
        method: 'get'
      })
    },
    async create(
      payload: Omit<Subsidiary, 'id' | 'created_at' | 'updated_at'>
    ) {
      const { id } = await useRequest('/subsidiaries', {
        method: 'post',
        body: payload
      })
      return id as number
    },
    async show(payload: Pick<Subsidiary, 'company_id'>) {
      this.subsidiaries = (await useRequest(
        `/subsidiaries/${payload.company_id}`,
        {
          method: 'get'
        }
      )) as Subsidiary[]
    },
    async destroy(id: Subsidiary['id']) {
      await useRequest(`/subsidiaries/${id}`, {
        method: 'delete'
      })

      this.subsidiaries = this.subsidiaries.filter(
        (subsidiary) => subsidiary.id !== id
      )
    }
  }
})
