import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        description: z.string().optional(),
        language: z.enum(['fr', 'en']),
        section: z.enum(['manifesto', 'principles', 'charter'])
      })
    })
  }
})
