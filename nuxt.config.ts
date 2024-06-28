// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  experimental: { typedPages: true },
  nitro: {
    routeRules: {
      '/': { static: true },
    },
  },
  modules: ['@nuxt/ui'],
  future: {
    compatibilityVersion: 4,
  },
  runtimeConfig: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
    },
  },
})
