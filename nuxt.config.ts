const clerkPublishableKey =
  process.env.NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  process.env.VITE_CLERK_PUBLISHABLE_KEY

const convexUrl =
  process.env.NUXT_PUBLIC_CONVEX_URL ||
  process.env.CONVEX_URL ||
  process.env.VITE_CONVEX_URL

export default defineNuxtConfig({
  compatibilityDate: '2026-07-29',
  modules: [
    '@nuxt/content',
    ...(clerkPublishableKey ? ['@clerk/nuxt'] : [])
  ],
  runtimeConfig: {
    public: {
      convex: convexUrl ? { url: convexUrl } : {}
    }
  },
  clerk: {
    publishableKey: clerkPublishableKey
  },
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
