import { defineStore } from 'pinia'
import { useRequest } from '@/composables/useRequest'
import { Historic } from '@/models/Historic'

export const useHistoric = defineStore('historic', {
  state: () => ({
    historic: [] as Historic[]
  }),
  getters: {
    getNameCompany: (state) => {
      const sortList = state.historic.sort((a, b) => b.batch_id - a.batch_id)
      return sortList.find((company) => {
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
