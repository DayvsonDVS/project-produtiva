import { useAuth } from '@/stores/auth'

export default defineNuxtRouteMiddleware(() => {
  const auth = useAuth()

  if (auth.isAuthenticated) {
    return navigateTo('/')
  }
})
