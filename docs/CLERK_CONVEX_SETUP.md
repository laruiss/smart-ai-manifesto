# Configuration Clerk + Convex

Ce projet Nuxt utilise Clerk pour permettre a une personne connectee avec Google
ou GitHub de signer la charte. Convex valide ensuite le JWT Clerk et stocke une
signature par identite authentifiee.

## Variables d'environnement

Dans l'application Nuxt:

```env
NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CONVEX_URL=https://limitless-ibis-846.eu-west-1.convex.cloud
```

Dans Convex:

```env
CLERK_JWT_ISSUER_DOMAIN=https://your-clerk-instance.clerk.accounts.dev
```

Le domaine doit etre l'Issuer / Frontend API URL donne par l'integration Convex
dans le dashboard Clerk.

Pour l'instance Clerk de developpement actuellement configuree dans `.env.local`,
l'Issuer est:

```env
CLERK_JWT_ISSUER_DOMAIN=https://fun-reindeer-57.clerk.accounts.dev
```

Le deploiement Convex dev de ce projet est `limitless-ibis-846`, avec:

```env
CONVEX_URL=https://limitless-ibis-846.eu-west-1.convex.cloud
CONVEX_SITE_URL=https://limitless-ibis-846.eu-west-1.convex.site
```

## Configuration Clerk

1. Creer une application Clerk.
2. Activer les fournisseurs sociaux Google et GitHub.
3. Activer l'integration Convex dans Clerk:
   `https://dashboard.clerk.com/apps/setup/convex`.
4. Copier la Frontend API URL et la definir comme `CLERK_JWT_ISSUER_DOMAIN`
   dans Convex.

L'integration Convex de Clerk doit produire des tokens avec l'audience `convex`;
`convex/auth.config.ts` valide cette audience via `applicationID: 'convex'`.

## Fichiers du projet

- `nuxt.config.ts` charge `@clerk/nuxt` et `convex-nuxt`.
- `app/plugins/convexClerk.client.ts` fournit a Convex le session token Clerk.
- `convex/auth.config.ts` configure la validation JWT cote Convex.
- `convex/schema.ts` declare la table `signatures`.
- `convex/signatures.ts` expose `getMine`, `count`, et `signCharter`.
- `app/components/ManifestoContentPage.vue` affiche le bloc de signature sur la
  page charte seulement.

## Verification

1. Lancer `npx convex dev` apres avoir defini `CLERK_JWT_ISSUER_DOMAIN`.
2. Lancer `npm run dev`.
3. Ouvrir `/charte`.
4. Se connecter avec Google ou GitHub via Clerk.
5. Cliquer sur le bouton de signature.
6. Verifier que la page affiche la date de signature et que Convex contient une
   ligne dans la table `signatures`.

Si Convex retourne `Not authenticated`, se deconnecter completement de Clerk,
se reconnecter, puis verifier que l'integration Convex Clerk est active et que
`CLERK_JWT_ISSUER_DOMAIN` correspond exactement a l'Issuer Clerk.
