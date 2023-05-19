export default defineNuxtRouteMiddleware(() => {
  const { profile } = useCookie('token').value as any

  if (profile !== 'admin') {
    return navigateTo('/')
  }
})
