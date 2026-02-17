<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Heart, ArrowLeft, Sparkles } from 'lucide-vue-next'
import PersonalityCard from '@/components/PersonalityCard.vue'
import { getTypeById, getCategoryForType } from '@/data/personality-types'
import logoImage from '@/assets/nouveau logo compaatible.png'

// Avatar & Category Logo resolution (same pattern as ProfilView)
const avatarModules = import.meta.glob('@/assets/16 personnalités svg/*.svg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
const categoryLogoModules = import.meta.glob('@/assets/catégories svg/*.svg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>

const categoryLogoFiles: Record<string, string> = {
  architectes: 'architectes du coeur.svg',
  ames: 'ames lumineuses.svg',
  gardiens: 'gardiens du lien.svg',
  flammes: 'flammes libres.svg'
}

function getAvatarUrl(avatarFile: string): string {
  const key = Object.keys(avatarModules).find(k => k.includes(avatarFile))
  return key ? avatarModules[key] : ''
}

function getCategoryLogoUrl(categoryId: string): string {
  const filename = categoryLogoFiles[categoryId]
  if (!filename) return ''
  const key = Object.keys(categoryLogoModules).find(k => k.includes(filename))
  return key ? categoryLogoModules[key] : ''
}

interface DomainResult {
  score: number
  count: number
  result: string
  facets: Record<number, { score: number; count: number; result: string }>
}

interface Scores {
  O?: DomainResult
  C?: DomainResult
  E?: DomainResult
  A?: DomainResult
  N?: DomainResult
}

const route = useRoute()
const isLoading = ref(true)
const notFound = ref(false)

// Card data
const firstName = ref('')
const personalityTypeId = ref('')
const customTagline = ref('')
const rawScores = ref<Scores | null>(null)

const personalityType = computed(() => {
  if (!personalityTypeId.value) return null
  return getTypeById(personalityTypeId.value)
})

const category = computed(() => {
  if (!personalityTypeId.value) return null
  return getCategoryForType(personalityTypeId.value)
})

const avatarUrl = computed(() => {
  if (!personalityType.value) return ''
  return getAvatarUrl((personalityType.value as any).avatarFile)
})

const categoryLogoUrl = computed(() => {
  if (!category.value) return ''
  return getCategoryLogoUrl((category.value as any).id)
})

const actualScores = computed(() => {
  if (!rawScores.value) return undefined
  const getPercentage = (domain: DomainResult | undefined) => {
    if (!domain || domain.count === 0) return 0
    const avg = domain.score / domain.count
    return Math.round((avg / 5) * 100)
  }
  return {
    O: getPercentage(rawScores.value.O),
    C: getPercentage(rawScores.value.C),
    E: getPercentage(rawScores.value.E),
    A: getPercentage(rawScores.value.A),
    N: 100 - getPercentage(rawScores.value.N) // Inverted for Stabilité
  }
})

onMounted(async () => {
  const token = route.params.token as string
  if (!token) {
    notFound.value = true
    isLoading.value = false
    return
  }

  try {
    // Lazy-load supabase
    const { supabase } = await import('@/lib/supabase')
    const { data, error } = await supabase.rpc('get_public_card', { token })

    if (error || !data || !data.personality_type) {
      notFound.value = true
      isLoading.value = false
      return
    }

    firstName.value = data.first_name || 'Visiteur'
    personalityTypeId.value = data.personality_type
    customTagline.value = data.custom_tagline || ''
    rawScores.value = data.scores || null
  } catch {
    notFound.value = true
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-[#FBF9F7] flex flex-col relative overflow-hidden">

    <!-- Decorative Ambient Blurs -->
    <div class="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#8B2D4A]/5 blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 -right-24 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl pointer-events-none"></div>

    <!-- Minimal Header -->
    <header class="relative z-10 py-8 px-6 flex justify-center">
      <RouterLink to="/" class="group flex items-center gap-3 transition-opacity hover:opacity-80">
        <div class="h-8 w-8 relative overflow-hidden rounded-lg bg-[#8B2D4A]/10 flex items-center justify-center">
          <img :src="logoImage" alt="" class="h-5 w-5 object-contain" />
        </div>
        <span class="text-[11px] font-medium tracking-[0.25em] text-[#1A1A1A] uppercase">
          Compaatible
        </span>
      </RouterLink>
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">

      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center text-center space-y-4">
        <div class="relative">
          <div class="h-16 w-16 rounded-full border-2 border-[#8B2D4A]/10 border-t-[#8B2D4A] animate-spin"></div>
          <Heart class="absolute inset-0 m-auto h-5 w-5 text-[#8B2D4A] animate-pulse" fill="currentColor" />
        </div>
        <p class="font-serif italic text-slate-400 text-sm animate-pulse">
          Révélation de l'âme en cours...
        </p>
      </div>

      <!-- Not Found State -->
      <div v-else-if="notFound"
        class="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-sm text-center flex flex-col items-center">
        <div class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#8B2D4A]/5">
          <Sparkles class="h-7 w-7 text-[#8B2D4A]" stroke-width="1" />
        </div>
        <h2 class="font-serif text-2xl font-semibold text-[#1A1A1A] mb-4">
          Cette carte n'existe pas
        </h2>
        <p class="text-sm leading-relaxed text-slate-500 italic mb-8">
          Le lien semble être rompu, ou cette destinée n'a pas encore été tracée.
        </p>
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 rounded-full border border-slate-200 px-8 py-3 text-[11px] font-medium uppercase tracking-widest text-slate-900 transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white"
        >
          <ArrowLeft class="h-3 w-3" />
          Retour à l'accueil
        </RouterLink>
      </div>

      <!-- Loaded: Personality Card -->
      <div v-else-if="personalityType && category" class="w-full max-w-lg mx-auto carte-animate">
        <div class="mb-8 text-center">
          <div class="mb-4 inline-flex items-center gap-2 rounded-full bg-[#8B2D4A]/5 px-4 py-1 text-[11px] font-medium text-[#8B2D4A]">
            <Heart class="h-3 w-3" fill="currentColor" />
            PARTAGE DE PERSONNALITÉ
          </div>
        </div>

        <PersonalityCard
          :personality-type="personalityType"
          :category="category"
          :avatar-url="avatarUrl"
          :category-logo-url="categoryLogoUrl"
          :user-name="firstName"
          :custom-tagline="customTagline || undefined"
          :actual-scores="actualScores"
          variant="full"
        />
      </div>

    </main>

    <!-- Footer: Subtle CTA -->
    <footer class="relative z-10 py-12 px-6 text-center">
      <RouterLink
        to="/"
        class="group inline-flex flex-col items-center gap-2 text-slate-400 hover:text-[#8B2D4A] transition-colors"
      >
        <span class="text-[11px] font-medium uppercase tracking-[0.2em]">
          Découvre ta personnalité sur Compaatible
        </span>
        <div class="h-px w-8 bg-slate-200 group-hover:w-16 group-hover:bg-[#8B2D4A] transition-all duration-500"></div>
      </RouterLink>
    </footer>

  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.carte-animate {
  animation: fadeInUp 0.8s ease-out forwards;
}
</style>
