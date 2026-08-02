import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

const signatureSummary = v.object({
  signedAt: v.number(),
  name: v.optional(v.string()),
  email: v.optional(v.string()),
  locale: v.union(v.literal('fr'), v.literal('en')),
  charterVersion: v.string(),
})

export const getMine = query({
  args: {},
  returns: v.union(v.null(), signatureSummary),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      return null
    }

    const signature = await ctx.db
      .query('signatures')
      .withIndex('by_tokenIdentifier', (q) =>
        q.eq('tokenIdentifier', identity.tokenIdentifier),
      )
      .unique()

    if (!signature) {
      return null
    }

    return {
      signedAt: signature.signedAt,
      name: signature.name,
      email: signature.email,
      locale: signature.locale,
      charterVersion: signature.charterVersion,
    }
  },
})

export const count = query({
  args: {},
  returns: v.number(),
  handler: async (ctx) => {
    const signatures = await ctx.db.query('signatures').collect()
    return signatures.length
  },
})

export const signCharter = mutation({
  args: {
    locale: v.union(v.literal('fr'), v.literal('en')),
    charterVersion: v.string(),
  },
  returns: v.object({
    alreadySigned: v.boolean(),
    signedAt: v.number(),
  }),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Not authenticated')
    }

    const existing = await ctx.db
      .query('signatures')
      .withIndex('by_tokenIdentifier', (q) =>
        q.eq('tokenIdentifier', identity.tokenIdentifier),
      )
      .unique()

    if (existing) {
      return {
        alreadySigned: true,
        signedAt: existing.signedAt,
      }
    }

    const signedAt = Date.now()

    await ctx.db.insert('signatures', {
      tokenIdentifier: identity.tokenIdentifier,
      clerkSubject: identity.subject,
      email: identity.email,
      name: identity.name,
      imageUrl: identity.pictureUrl,
      locale: args.locale,
      charterVersion: args.charterVersion,
      signedAt,
    })

    return {
      alreadySigned: false,
      signedAt,
    }
  },
})
