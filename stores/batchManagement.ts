import { defineStore } from 'pinia'
import { useRequest } from '@/composables/useRequest'
import { BatchManagement, CreatePayload } from '@/models/BatchManagement'
import { Company } from '@/models/Company'

export const useBatchManagement = defineStore('BatchManagement', {
  state: () => ({
    batchManagements: [] as BatchManagement[],
    pending: 0,
    done: 0,
    removeBatchCompanies: [] as number[],
    addBatchCompanies: [] as Company[],
    idCompany: 0,
    statusCompany: 'all',
    filterReceipt: false,
    filterRocket: false
  }),

  getters: {
    getCompany: (state) => {
      return state.batchManagements.find(({ company_id }) => {
        return company_id === state.idCompany
      })
    },
    filterCompany: (state) => {
      if (state.filterReceipt === true) {
        return state.batchManagements.filter(({ company_receipt }) => {
          return company_receipt === 's'
        })
      }
      if (state.filterRocket === true) {
        const filtered = state.batchManagements.filter(({ user, status }) => {
          return user !== null && status === 'pending'
        })
        const remaining = state.batchManagements.filter(({ user, status }) => {
          return user === null || status !== 'pending'
        })
        return [...filtered, ...remaining]
      }
      if (state.statusCompany !== 'all') {
        return state.batchManagements.filter(({ status }) => {
          return status === state.statusCompany
        })
      }
      return state.batchManagements.sort((a, b) => a.name.localeCompare(b.name))
    },
    filterProduction: (state) => {
      const distinctUsers: { user: string; total: number }[] = []
      const undefinedUserString = 'Vazio'

      state.batchManagements.forEach((user) => {
        const username = user.user !== null ? user.user : undefinedUserString
        const existingUser = distinctUsers.find((u) => u.user === username)
        if (existingUser) {
          existingUser.total++
        } else {
          distinctUsers.push({ user: username, total: 1 })
        }
      })

      return distinctUsers.sort((a, b) => a.user.localeCompare(b.user))
    }
  },

  actions: {
    async fetchBatchManagement() {
      this.batchManagements = await useRequest('/BatchManagement', {
        method: 'get'
      })
    },

    async create(payload: Omit<CreatePayload, 'id'>[]) {
      const id = await useRequest('/batchManagement', {
        method: 'post',
        body: payload
      })

      return id as number
    },

    async show(payload: Pick<BatchManagement, 'id'>) {
      this.batchManagements = await useRequest(
        `/batchManagement/${payload.id}`,
        {
          method: 'get'
        }
      )
      this.batchManagements.map((batch) => {
        if (batch.follow === null) {
          batch.follow = 'N'
        }
      })
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

    async updateFollow(payload: Pick<BatchManagement, 'id' | 'follow'>) {
      await useRequest(`/batchManagement/${payload.id}`, {
        method: 'put',
        body: { payload }
      })
    },

    async updateEditCompany(edit_user: string | null) {
      const { id } = await useRequest(
        `/batchManagement/${this.getCompany?.id}`,
        {
          method: 'put',
          body: { edit_user }
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
