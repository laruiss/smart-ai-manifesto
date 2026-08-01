import { useAuth } from '@clerk/vue'
import { useConvexClient } from 'convex-vue'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  if (!config.public.clerk?.publishableKey) {
    return
  }

  const convex = useConvexClient()
  const { getToken } = useAuth()

  convex.setAuth(async () => {
    return await getToken.value() ?? undefined
  })
})
