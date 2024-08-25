import { $fetch } from 'ohmyfetch'
import { useAuth } from '@/stores/auth'

export const useRequest = $fetch.create({
  baseURL: 'http://produtiva.kinghost.net:21079/api',
  async onRequest({ options }) {
    const token = useCookie('token')

    options.headers = {
      ...options.headers,
      authorization: `bearer ${token.value}`
    }
  },
  async onResponseError({ response }) {
    if (response.status === 401) {
      const token = useCookie<string | null>('token')
      const auth = useAuth()

      token.value = null
      auth.isAuthenticated = false

      navigateTo('/login')
    }
  }
})
