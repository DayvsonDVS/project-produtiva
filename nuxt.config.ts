// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    'normalize.css',
    '@cataline.io/darpi/dist/style.css',
    '@/assets/scss/main.scss'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/breakpoints.scss";`
        }
      }
    }
  },

  build: {
    transpile: ['@cataline.io/darpi']
  },
  modules: ['@pinia/nuxt'],
  components: [{ path: '@/components', pathPrefix: false }],
  dir: {
    pages: 'components/pages'
  }
})
