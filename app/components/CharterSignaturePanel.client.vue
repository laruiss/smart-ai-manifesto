<script setup lang="ts">
import { SignInButton, UserButton, useAuth } from '@clerk/vue'
import { useConvexMutation, useConvexQuery } from 'convex-vue'
import { api } from '../../convex/_generated/api'

type Language = 'fr' | 'en'

const props = defineProps<{
  language: Language
}>()

const runtimeConfig = useRuntimeConfig()
const clerkEnabled = Boolean(runtimeConfig.public.clerk?.publishableKey)
const auth = clerkEnabled ? useAuth() : null
const clerkIsLoaded = computed(() => auth?.isLoaded.value ?? true)
const isSignedIn = computed(() => auth?.isSignedIn.value ?? false)

const charterVersion = '2026-08-01'
const pendingSignature = ref(false)
const signatureError = ref('')

const ui = computed(() =>
  props.language === 'fr'
    ? {
        signTitle: 'Signer la charte',
        signCopy:
          'Connectez-vous avec Google ou GitHub pour ajouter votre signature à cette charte.',
        signButton: 'Signer',
        signingButton: 'Signature...',
        signedPrefix: 'Charte signée le',
        signIn: 'Se connecter pour signer',
        signCount: 'signature | signatures',
        authLoading: 'Chargement...',
        authUnavailable: 'Signature indisponible: Clerk n’est pas configure.'
      }
    : {
        signTitle: 'Sign the charter',
        signCopy: 'Sign in with Google or GitHub to add your signature to this charter.',
        signButton: 'Sign',
        signingButton: 'Signing...',
        signedPrefix: 'Charter signed on',
        signIn: 'Sign in to sign',
        signCount: 'signature | signatures',
        authLoading: 'Loading...',
        authUnavailable: 'Signing unavailable: Clerk is not configured.'
      }
)

const { data: signatureCount } = useConvexQuery(api.signatures.count, {}, { server: false })
const { data: currentSignature } = useConvexQuery(api.signatures.getMine, {}, { server: false })
const { mutate: signCharter } = useConvexMutation(api.signatures.signCharter)

const signatureCountLabel = computed(() => {
  const count = signatureCount.value ?? 0
  const [singular, plural] = ui.value.signCount.split(' | ')

  return `${count} ${count === 1 ? singular : plural}`
})

const signedAtLabel = computed(() => {
  if (!currentSignature.value) {
    return ''
  }

  return new Intl.DateTimeFormat(props.language === 'fr' ? 'fr-FR' : 'en-US', {
    dateStyle: 'long'
  }).format(new Date(currentSignature.value.signedAt))
})

const handleSignCharter = async () => {
  signatureError.value = ''
  pendingSignature.value = true

  try {
    await signCharter({
      locale: props.language,
      charterVersion
    })
  }
  catch (error) {
    signatureError.value =
      error instanceof Error ? error.message : 'Unable to sign the charter'
  }
  finally {
    pendingSignature.value = false
  }
}
</script>

<template>
  <section
    class="signature-panel"
    :lang="language"
    aria-live="polite"
  >
    <div>
      <h2>{{ ui.signTitle }}</h2>
      <p>{{ ui.signCopy }}</p>
      <p class="signature-count">{{ signatureCountLabel }}</p>
    </div>

    <div class="signature-actions">
      <template v-if="!clerkIsLoaded">
        <span class="signature-muted">{{ ui.authLoading }}</span>
      </template>
      <template v-else-if="!clerkEnabled">
        <span class="signature-muted">{{ ui.authUnavailable }}</span>
      </template>
      <template v-else-if="isSignedIn && currentSignature">
        <span class="signature-signed">
          {{ ui.signedPrefix }} {{ signedAtLabel }}
        </span>
        <UserButton />
      </template>
      <template v-else-if="isSignedIn">
        <button
          type="button"
          class="signature-button"
          :disabled="pendingSignature"
          @click="handleSignCharter"
        >
          {{ pendingSignature ? ui.signingButton : ui.signButton }}
        </button>
        <UserButton />
      </template>
      <template v-else>
        <SignInButton mode="modal">
          <button type="button" class="signature-button">
            {{ ui.signIn }}
          </button>
        </SignInButton>
      </template>
      <p v-if="signatureError" class="signature-error">{{ signatureError }}</p>
    </div>
  </section>
</template>
