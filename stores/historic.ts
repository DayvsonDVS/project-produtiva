import { defineStore } from 'pinia'
import { useRequest } from '@/composables/useRequest'
import { Historic } from '@/models/Historic'

export const useHistoric = defineStore('historic', {
  state: () => ({
    historic: [] as Historic[]
  }),
  getters: {
    getNameCompany: (state) => {
      return state.historic.find((company) => {
        return company
      })
    }
  },
  actions: {
    async show(payload: Pick<Historic, 'company_id'>) {
      this.historic = await useRequest(`/historic/${payload.company_id}`, {
        method: 'get'
      })
    }
  }
})
