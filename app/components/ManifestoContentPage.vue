<script setup lang="ts">
type Language = 'fr' | 'en'
type Section = 'manifesto' | 'principles' | 'charter'

const route = useRoute()
const router = useRouter()

const sectionConfig: Record<
  Section,
  {
    paths: Record<Language, string>
    labels: Record<Language, string>
  }
> = {
  manifesto: {
    paths: { fr: '/', en: '/en' },
    labels: { fr: 'Manifeste', en: 'Manifesto' }
  },
  principles: {
    paths: { fr: '/principes', en: '/en/principles' },
    labels: { fr: 'Principes', en: 'Principles' }
  },
  charter: {
    paths: { fr: '/charte', en: '/en/charter' },
    labels: { fr: 'Charte', en: 'Charter' }
  }
}

const routeSectionMap: Record<string, Section> = {
  principes: 'principles',
  principles: 'principles',
  charte: 'charter',
  charter: 'charter'
}

const activeSection = computed<Section>(() => {
  const slug = Array.isArray(route.params.section)
    ? route.params.section[0]
    : route.params.section

  return slug ? routeSectionMap[slug] ?? 'manifesto' : 'manifesto'
})
const activeLanguage = computed<Language>(() => {
  const slug = Array.isArray(route.params.section)
    ? route.params.section[0]
    : route.params.section

  if (route.query.lang === 'en' || route.path.startsWith('/en') || slug === 'principles' || slug === 'charter') {
    return 'en'
  }

  return 'fr'
})
const documentPath = computed(() => `/${activeLanguage.value}/${activeSection.value}`)

const { data: page } = await useAsyncData(
  () => `content-${documentPath.value}`,
  () => queryCollection('content').path(documentPath.value).first(),
  {
    watch: [documentPath]
  }
)

const alternateLanguage = computed<Language>(() => (activeLanguage.value === 'fr' ? 'en' : 'fr'))
const toggleLabel = computed(() =>
  activeLanguage.value === 'fr' ? 'Voir en anglais' : 'Voir en français'
)
const navigationItems = computed(() =>
  (Object.entries(sectionConfig) as Array<[Section, (typeof sectionConfig)[Section]]>).map(
    ([section, config]) => ({
      section,
      href: config.paths[activeLanguage.value],
      label: config.labels[activeLanguage.value]
    })
  )
)

const toggleLanguage = () => {
  const language = alternateLanguage.value

  router.push({
    path: sectionConfig[activeSection.value].paths[language]
  })
}

useHead(() => ({
  htmlAttrs: {
    lang: activeLanguage.value
  }
}))

useSeoMeta(() => ({
  title: page.value?.title ?? "Pour une utilisation intelligente de l'IA",
  description:
    page.value?.description ??
    'Manifesto and principles for using AI wisely in software development.'
}))
</script>

<template>
  <main class="page">
    <div class="top-actions">
      <nav class="section-nav" aria-label="Navigation principale">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.section"
          :to="item.href"
          :class="{ active: item.section === activeSection }"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
      <button
        id="lang-toggle"
        type="button"
        aria-live="polite"
        @click="toggleLanguage"
      >
        {{ toggleLabel }}
      </button>
      <a
        class="github-link"
        href="https://github.com/laruiss/smart-ai-manifesto"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Voir le dépôt GitHub"
        title="Voir le dépôt GitHub"
      >
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.65 7.65 0 0 1 8 4.63c.68 0 1.37.09 2.01.27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
        </svg>
      </a>
    </div>

    <article class="markdown-preview" :lang="activeLanguage">
      <ContentRenderer v-if="page" :value="page" />
      <p v-else>Document introuvable.</p>
    </article>
  </main>
</template>
