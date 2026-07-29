export default defineNuxtConfig({
  compatibilityDate: '2026-07-29',
  modules: ['@nuxt/content'],
  nitro: {
    prerender: {
      routes: ['/', '/principes', '/charte', '/en', '/en/principles', '/en/charter']
    }
  },
  content: {
    experimental: {
      nativeSqlite: true
    }
  },
  css: ['~/assets/css/main.css'],
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: {
        lang: 'fr'
      },
      title: "Pour une utilisation intelligente de l'IA",
      meta: [
        {
          name: 'description',
          content: 'Manifesto and principles for using AI wisely in software development.'
        }
      ]
    }
  }
})
