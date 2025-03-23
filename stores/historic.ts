import { defineStore } from 'pinia'
import { useRequest } from '@/composables/useRequest'
import { Historic } from '@/models/Historic'

export const useHistoric = defineStore('historic', {
  state: () => ({
    historic: [] as Historic[],
    idCompany: 0,
    iconSearch: ``
  }),
  getters: {
    getNameCompany: (state) => {
      const sortList = state.historic.sort((a, b) => b.batch_id - a.batch_id)
      return sortList.find((company) => {
        return company
      })
    },
    getFollow: (state) => {
      // function isCurrentMonth(dateStr: string): boolean {
      //   // Extrair apenas a parte da data antes do espaço (ignora horário)
      //   const datePart = dateStr.split(' ')[0]
      //   const [year, month, day] = datePart.split('-').map(Number)

      //   const date = new Date(year, month - 1, day)
      //   const currentMonth = new Date().getMonth() // Mês atual (0-11)
      //   const currentYear = new Date().getFullYear() // Ano atual

      //   // Comparar mês e ano

      //   if (
      //     date.getMonth() === currentMonth &&
      //     date.getFullYear() === currentYear
      //   ) {
      //     return true
      //   }
      //   return false
      // }
      return state.historic.some(({ company_id, follow }) => {
        if (company_id === state.idCompany && follow === 'S') {
          state.iconSearch = `/svg/search-alert.svg`
          return true
        } else {
          state.iconSearch = `/svg/search.svg`
        }
      })
    }
  },
  actions: {
    async show(payload: Pick<Historic, 'company_id'>) {
      this.historic = await useRequest(`/historic/${payload.company_id}`, {
        method: 'get'
      })
      this.historic.map((historic) => {
        if (historic.follow === null) {
          historic.follow = 'N'
        }
      })
    }
  }
})
