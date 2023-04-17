import { defineStore } from 'pinia'
import { useRequest } from '@/composables/useRequest'

interface LoginPayload {
  email: string
  password: string
}

export const useAuth = defineStore('auth', {
  state: () => ({
    isAuthenticated: false
  }),
  actions: {
    async login(payload: LoginPayload) {
      const token = useCookie('token', {
        maxAge: 60 * 60 * 24 * 30 // 30 days
      })

      const data = await useRequest('/logins', {
        method: 'post',
        body: payload
      })

      token.value = data.token

      this.isAuthenticated = true
    }
  }
})
