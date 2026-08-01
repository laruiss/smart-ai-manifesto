# convex.instructions.md

## 🎯 Objectif
Ces instructions guident Copilot pour générer du code conforme aux bonnes pratiques de **Convex** (https://convex.dev).
Elles couvrent la structure des fonctions serveur, la gestion du typage, la sécurité, et l’organisation du code dans un projet Convex + TypeScript.

---

## Utilisation de Convex avec Vue ou Nuxt

Ce projet utilise Convex comme backend temps réel, avec des queries et mutations typées. Voici les bonnes pratiques à suivre pour l’intégration côté client avec Vue 3 + TypeScript :

### Utilisation de useQuery et useMutation

- Pour les lectures de données réactives, utiliser `useLiveConvexQuery` :
  ```ts
  const { data, isLoading, error } = useLiveConvexQuery(
    api.collectionName.queryFunction,
    computed(() => ({ param1: value1 }))
  )
  ```
- Pour les requêtes à la demande, utiliser `useManualConvexQuery` :
  ```ts
  const { data, isLoading, error, fetchData } = useManualConvexQuery(
    api.collectionName.queryFunction
  )
  ```
- Pour les écritures, utiliser `useManualConvexMutation` :
  ```ts
  const mutation = useManualConvexMutation(api.collectionName.mutationFunction)
  await mutation.mutate({ param1: value1 })
  ```

## Utilisation des MCP (Model Context Protocol)

- Utilise convex MCP pour faire des propositions de code correspondant aux dernières nouveautés de Convex.
- Utiliser aussi le MCP context7 pour bénéficier des améliorations de compréhension du contexte et faire des propositions correspondant aux bonnes pratiques actuelles de Vue, Resend et TypeScript.

## 🧩 Structure générale d’un projet Convex

- Toutes les fonctions serveur se trouvent dans le dossier `convex/`.
- Chaque fichier doit exporter des fonctions Convex via `query` ou `mutation` (importées depuis `./_generated/server`).
- Les fonctions ne sont pas exécutées directement : elles sont **appelées côté client** via le hook `useQuery` ou `useMutation`.
- Le typage entre client et serveur est **automatiquement généré** par Convex (`convex/_generated/*`).

---

## ⚙️ Bonnes pratiques serveur

### ✅ Organisation
- Grouper les fonctions par domaine logique :
  ```
  convex/
    users.ts
    promos.ts
    lessons.ts
  ```

- Toujours importer `query` et `mutation` depuis `./_generated/server`.
- Les fonctions doivent être **exportées nommément**, avec des noms clairs et explicites (`getUserById`, `createLesson`, etc.).
- Préférer la clarté et la pureté : **aucun effet de bord** non contrôlé.

### 🔒 Sécurité et validation

- Ne jamais faire confiance aux données client :
- Toujours valider les entrées (`args`) avec **Zod** ou une validation manuelle stricte.
- Vérifier les permissions avec `ctx.auth`.
- Éviter d’exposer des IDs bruts ou des champs sensibles (ex : tokens, e-mails non publics).
- Les mutations doivent **vérifier le contexte utilisateur** avant d’écrire dans la DB.

### 📦 Accès à la base de données

- Utiliser `ctx.db.query()` pour la lecture et `ctx.db.insert()`, `ctx.db.patch()`, `ctx.db.delete()` pour les écritures.
- Toujours spécifier la collection cible par son nom (`'users'`, `'posts'`, etc.).
- Éviter les requêtes coûteuses en boucle — préférer les filtres et index Convex.

### 🧠 Typage

- Toujours typer les entrées (`args`) avec précision :
  ```ts
  export const createPost = mutation({
    args: { title: v.string(), content: v.string() },
    handler: async (ctx, args) => { /* ... */ }
  })
  ```
- Utiliser le typage généré automatiquement (`import { Id } from "../_generated/dataModel"`) pour les références (`Id<'users'>`).
- Ne pas utiliser `any` ou des types implicites.

### ⚙️ Bonnes pratiques client
🧩 Utilisation dans React

Utiliser useQuery pour lire des données et useMutation pour les écrire :

### 🧰 Schémas et indexation

- Définir les collections et schémas dans convex/schema.ts :
  ```ts
  import { defineSchema, defineTable } from 'convex/schema'
  import { v } from 'convex/values'

  export default defineSchema({
    users: defineTable({
      name: v.string(),
      email: v.string(),
      createdAt: v.number(),
    }).index('by_email', ['email']),
  })
  ```
- Créer des index explicites pour les recherches fréquentes.
- Toujours garder schema.ts synchronisé avec le code applicatif.

### ⚙️ Accès DB & performances

- Préférer un seul accès DB bien filtré à plusieurs petites requêtes en boucle.
- Tirer parti des index pour les filtres/ordres fréquents.
- Utiliser des champs numériques/ISO time pour les ordres (`createdAt`) et paginer via cursor.

### 🧪 Tests et validation

- Tester les fonctions critiques directement avec Convex CLI (`npx convex test`) ou en mockant `ctx`.
- Pour les mutations, vérifier :
  - les conditions d’accès (`ctx.auth`),
  - la validation des args,
  - le comportement attendu sur la base.
- Préférer les tests unitaires indépendants des queries réelles.

### 🧭 Style et lisibilité

Favoriser les noms explicites (`getUserByEmail`, pas `fetchData`).

- Garder les fonctions courtes et pures.
- Documenter chaque fonction publique avec un JSDoc clair.
- Regrouper les constantes communes (COLLECTIONS, rôles, statuts) dans un fichier partagé (`convex/constants.ts`).

### 💬 Pour les agents IA

- Quand l’utilisateur demande :

  - “Crée une mutation Convex pour [action]” → générer une fonction mutation bien typée, avec validation et vérification d’accès.
  - “Ajoute une query pour [ressource]” → créer une query typée, simple et optimisée.
  - “Explique cette fonction Convex” → fournir une explication claire du rôle, du contexte, des types et des risques potentiels.
  - “Optimise cette fonction Convex” → suggérer l’ajout d’un index, une meilleure validation, ou un refactor plus lisible.
  - “Ajoute un test” → proposer un test de mutation simple avec ctx mocké.
