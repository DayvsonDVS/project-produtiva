import { useAuth } from '@/stores/auth'

export default defineNuxtPlugin(() => {
  const auth = useAuth()
  const token = useCookie('token')

  if (token.value) {
    auth.isAuthenticated = true
  }
})
