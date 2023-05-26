import { server } from 'process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      title: 'Produtiva XML'
    }
  },
  appConfig: { nuxt: { port: '1010' } },
  css: [
    'normalize.css',
    '@cataline.io/darpi/dist/style.css',
    '@/assets/scss/main.scss',
    'bumi-components-new/dist/style.css',
    'tippy.js/dist/tippy.css'
  ],
  build: {
    transpile: ['@cataline.io/darpi']
  },
  modules: ['@pinia/nuxt'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/breakpoints.scss";`
        }
      }
    }
  },

  components: [{ path: '@/components', pathPrefix: false }],
  dir: {
    pages: 'components/pages/'
  }
})
