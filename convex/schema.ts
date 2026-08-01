import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  signatures: defineTable({
    tokenIdentifier: v.string(),
    clerkSubject: v.string(),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    locale: v.union(v.literal('fr'), v.literal('en')),
    charterVersion: v.string(),
    signedAt: v.number(),
  })
    .index('by_tokenIdentifier', ['tokenIdentifier'])
    .index('by_signedAt', ['signedAt']),
})
