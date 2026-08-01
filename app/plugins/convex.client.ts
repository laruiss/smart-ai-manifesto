import { convexVue } from 'convex-vue'

export default defineNuxtPlugin((nuxtApp) => {
  const options = useRuntimeConfig().public.convex

  if (!options?.url) {
    return
  }

  nuxtApp.vueApp.use(convexVue, options)
})
