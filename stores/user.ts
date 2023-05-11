import { defineStore } from 'pinia'
import { useRequest } from '@/composables/useRequest'
import { User } from '@/models/User'

export const useUser = defineStore('user', {
  state: () => ({
    users: [] as User[],
    user: {} as User,
    searchable: ''
  }),
  getters: {
    filteredUsers: (state) => {
      if (state.searchable === '') return state.users

      return state.users.filter(({ user, email }) => {
        const totalText = `${user} ${email}`.toLowerCase()

        return totalText.includes(state.searchable.toLowerCase())
      })
    }
  },
  actions: {
    async fetchUsers() {
      this.users = (await useRequest('/logins', {
        method: 'get'
      })) as User[]
    },
    async create(payload: Omit<User, 'id'>) {
      const { id } = await useRequest('/logins', {
        method: 'post',
        body: payload
      })
      return id as number
    },
    async show(payload: Pick<User, 'id'>) {
      this.user = (await useRequest(`/logins/${payload.id}`, {
        method: 'get'
      })) as User
    },
    async update(payload: Omit<User, 'id'>) {
      const { id } = await useRequest(`/logins/${this.user.id}`, {
        method: 'put',
        body: payload
      })
      return id as number
    },
    async destroy(id: User['id']) {
      await useRequest(`/logins/${id}`, {
        method: 'delete'
      })

      await this.fetchUsers()

      this.users = this.users.filter((user) => user.id !== id)
    }
  }
})
