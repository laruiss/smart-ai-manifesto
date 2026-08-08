# Configuration Clerk + Convex

Ce projet Nuxt utilise Clerk pour permettre à une personne connectée avec Google
ou GitHub de signer la charte. Convex valide ensuite le JWT Clerk et stocke une
signature par identité authentifiée.

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

Le domaine doit être l'Issuer / Frontend API URL donné par l'intégration Convex
dans le dashboard Clerk.

Pour l'instance Clerk de développement actuellement configurée dans `.env.local`,
l'Issuer est:

```env
CLERK_JWT_ISSUER_DOMAIN=https://fun-reindeer-57.clerk.accounts.dev
```

Le déploiement Convex dev de ce projet est `limitless-ibis-846`, avec:

```env
CONVEX_URL=https://limitless-ibis-846.eu-west-1.convex.cloud
CONVEX_SITE_URL=https://limitless-ibis-846.eu-west-1.convex.site
```

## Configuration Clerk

1. Créer une application Clerk.
2. Activer les fournisseurs sociaux Google et GitHub.
3. Activer l'intégration Convex dans Clerk:
   `https://dashboard.clerk.com/apps/setup/convex`.
4. Copier la Frontend API URL et la définir comme `CLERK_JWT_ISSUER_DOMAIN`
   dans Convex.

L'intégration Convex de Clerk doit produire des tokens avec l'audience `convex`;
`convex/auth.config.ts` valide cette audience via `applicationID: 'convex'`.

## Fichiers du projet

- `nuxt.config.ts` charge `@clerk/nuxt` et `convex-nuxt`.
- `app/plugins/convexClerk.client.ts` fournit à Convex le session token Clerk.
- `convex/auth.config.ts` configure la validation JWT côté Convex.
- `convex/schema.ts` déclare la table `signatures`.
- `convex/signatures.ts` expose `getMine`, `count`, et `signCharter`.
- `app/components/ManifestoContentPage.vue` affiche le bloc de signature sur la
  page charte seulement.

## Vérification

1. Lancer `npx convex dev` après avoir défini `CLERK_JWT_ISSUER_DOMAIN`.
2. Lancer `npm run dev`.
3. Ouvrir `/charte`.
4. Se connecter avec Google ou GitHub via Clerk.
5. Cliquer sur le bouton de signature.
6. Vérifier que la page affiche la date de signature et que Convex contient une
   ligne dans la table `signatures`.

Si Convex retourne `Not authenticated`, se déconnecter complètement de Clerk,
se reconnecter, puis vérifier que l'intégration Convex Clerk est active et que
`CLERK_JWT_ISSUER_DOMAIN` correspond exactement à l'Issuer Clerk.
