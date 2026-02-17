<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Heart,
  Check
} from 'lucide-vue-next'
import logoImage from '@/assets/nouveau logo compaatible.png'
import { personalityPunchlines } from '@/data/personality-punchlines'

interface PersonalityTypeData {
  id: string
  name: string
  emoji: string
  tagline: string
  introduction: string
  code: string
  quote: { text: string; author: string }
  bigFive: { O: 'high' | 'low'; C: 'high' | 'low'; E: 'high' | 'low'; A: 'high' | 'low'; N: 'high' | 'low' }
}

interface CategoryData {
  name: string
  subtitle: string
  color: string
  colorLight: string
  bgColor: string
  description: string
}

interface ScoreData {
  O: number
  C: number
  E: number
  A: number
  N: number
}

const props = withDefaults(defineProps<{
  personalityType: PersonalityTypeData
  category: CategoryData
  userName: string
  resultId: string
  scores: ScoreData
  avatarUrl?: string
  categoryLogoUrl?: string
  navigateOnFinish?: boolean
}>(), {
  navigateOnFinish: true
})

const emit = defineEmits(['close', 'finish', 'tagline-selected'])
const router = useRouter()

const currentStep = ref(0)
const totalSteps = 4

// Punchline selection
const punchlines = computed(() => personalityPunchlines[props.personalityType.id] || [props.personalityType.tagline])
const selectedPunchlineIndex = ref(0)
const selectedPunchline = computed(() => punchlines.value[selectedPunchlineIndex.value] || props.personalityType.tagline)

function selectPunchline(index: number) {
  selectedPunchlineIndex.value = index
}

const nextStep = () => {
  if (currentStep.value < totalSteps - 1) {
    // When leaving step 2 (punchline), emit the selection
    if (currentStep.value === 2) {
      emit('tagline-selected', selectedPunchline.value)
    }
    currentStep.value++
  } else {
    emit('finish', props.resultId)
    if (props.navigateOnFinish) {
      router.push(`/resultats/${props.resultId}`)
    }
  }
}

const skip = () => {
  emit('close')
}

const traitLabels: Record<string, { label: string; desc: string }> = {
  O: { label: 'Ouverture', desc: 'Curiosité & Imagination' },
  C: { label: 'Conscience', desc: 'Organisation & Discipline' },
  E: { label: 'Extraversion', desc: 'Énergie sociale' },
  A: { label: 'Agréabilité', desc: 'Empathie & Coopération' },
  N: { label: 'Stabilité', desc: 'Stabilité émotionnelle' }
}

// Lock body scroll when this overlay is mounted
onMounted(() => {
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="fixed inset-0 z-[1000] flex flex-col items-center overflow-y-auto overflow-x-hidden bg-[#FBF9F7] font-sans selection:bg-[#8B2D4A]/10 personality-reveal-root">

    <!-- Ambient Background Elements -->
    <div
      class="absolute inset-0 transition-colors duration-1000 ease-in-out"
      :style="{ backgroundColor: currentStep === 0 ? category.bgColor : '#FBF9F7' }"
    >
      <div
        class="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-[100px] transition-all duration-1000 ambient-orb"
        :style="{ backgroundColor: currentStep === 0 ? category.color + '15' : '#8B2D4A08' }"
      ></div>
      <div
        class="absolute bottom-0 -right-24 h-96 w-96 rounded-full blur-[100px] transition-all duration-1000 ambient-orb"
        :style="{ backgroundColor: category.color + '10' }"
      ></div>
    </div>

    <!-- Header / Nav -->
    <div class="sticky top-0 left-0 right-0 w-full flex items-center justify-center px-6 py-3 md:justify-start md:px-12 md:py-6 z-20 shrink-0">
      <div class="flex items-center gap-2">
        <img :src="logoImage" alt="" class="h-6 w-6 md:h-8 md:w-8 object-contain" />
        <span class="text-[13px] md:text-[15px] font-bold tracking-widest text-[#1A1A1A] uppercase">Compaatible</span>
      </div>
    </div>

    <!-- Main Content Transition -->
    <div class="relative z-10 w-full max-w-2xl px-6 my-auto">
      <Transition
        mode="out-in"
        enter-active-class="transition duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
        enter-from-class="opacity-0 translate-x-8 blur-sm"
        enter-to-class="opacity-100 translate-x-0 blur-0"
        leave-active-class="transition duration-500 ease-in"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 -translate-x-8 blur-sm"
      >
        <!-- SCREEN 1: Category Reveal -->
        <div v-if="currentStep === 0" key="step0" class="relative flex flex-col items-center text-center">
          <!-- Ambient Glow Backgrounds -->
          <div class="absolute -top-24 h-64 w-64 rounded-full blur-3xl opacity-20 transition-all duration-1000" :style="{ backgroundColor: category.color }"></div>

          <div class="mb-8 inline-flex items-center gap-2 rounded-full bg-[#8B2D4A]/5 px-4 py-1 text-[11px] font-medium text-[#8B2D4A] uppercase tracking-widest">
            <Heart class="h-3 w-3" fill="currentColor" />
            Ta famille de personnalité
          </div>

          <!-- Dramatic Avatar Showcase -->
          <div class="relative mb-8 md:mb-12 group">
            <!-- Halo Glow Effect -->
            <div
              class="absolute inset-0 scale-125 rounded-full blur-3xl opacity-30 transition-all duration-1000 group-hover:scale-150"
              :style="{ backgroundColor: category.color }"
            ></div>

            <!-- Decorative Spinning Ring -->
            <div
              class="absolute -inset-4 md:-inset-6 rounded-full border border-dashed opacity-20 animate-[spin_30s_linear_infinite]"
              :style="{ borderColor: category.color }"
            ></div>

            <!-- Main Avatar Container -->
            <div
              class="relative h-32 w-32 md:h-52 md:w-52 overflow-hidden rounded-full bg-white p-2 shadow-2xl transition-all duration-700 group-hover:scale-105"
              :style="{ boxShadow: `0 20px 50px -12px ${category.color}4D` }"
            >
              <div class="flex h-full w-full items-center justify-center overflow-hidden rounded-full" :style="{ backgroundColor: category.color + '10' }">
                <img v-if="categoryLogoUrl" :src="categoryLogoUrl" :alt="category.name" class="h-16 w-16 md:h-28 md:w-28 object-contain transform transition-transform duration-700 group-hover:scale-110" />
                <span v-else class="text-4xl md:text-6xl">{{ personalityType.emoji }}</span>
              </div>
            </div>
          </div>

          <div class="max-w-2xl px-4">
            <h1 class="mb-3 font-serif text-3xl font-bold text-[#1A1A1A] md:mb-4 md:text-6xl">
              {{ category.name }}
            </h1>

            <p class="mb-4 font-serif text-base text-[#4A4A4A] italic md:mb-6 md:text-xl">
              "{{ category.subtitle }}"
            </p>

            <p class="mx-auto max-w-md text-sm leading-relaxed text-[#5C5C5C]">
              {{ category.description }}
            </p>
          </div>

          <div class="mt-12">
            <button
              @click="nextStep"
              class="group relative flex items-center gap-3 rounded-full bg-[#8B2D4A] px-12 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#A03558] hover:shadow-[#8B2D4A]/20 active:scale-95"
            >
              Découvrir mon type
              <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <!-- SCREEN 2: Personality Type Reveal -->
        <div v-else-if="currentStep === 1" key="step1" class="flex flex-col items-center text-center">
          <div class="mb-8 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-[#787878] uppercase">
            Ton type de personnalité
          </div>

          <!-- Dramatic Avatar Reveal -->
          <div class="group relative mb-10 h-48 w-48 animate-reveal">
            <div
              class="absolute inset-0 rounded-full blur-2xl opacity-20 transition-all duration-700 group-hover:opacity-40"
              :style="{ backgroundColor: category.color }"
            ></div>
            <div class="relative flex h-full w-full items-center justify-center rounded-full bg-white shadow-2xl border-4 border-[#FBF9F7]">
              <template v-if="avatarUrl">
                <img :src="avatarUrl" :alt="personalityType.name" class="h-32 w-32 object-contain" />
              </template>
              <template v-else>
                <span class="text-6xl">{{ personalityType.emoji }}</span>
              </template>

              <!-- Floating Sparkles -->
              <Sparkles
                class="absolute -top-2 -right-2 h-8 w-8 text-amber-400 animate-pulse"
                stroke-width="1.5"
              />
            </div>
          </div>

          <div class="mb-4">
            <span class="mb-2 block text-sm font-medium tracking-widest text-[#8B2D4A] uppercase">
              {{ personalityType.code }}
            </span>
            <h1 class="font-serif text-4xl font-bold text-[#1A1A1A] md:text-5xl">
              {{ personalityType.name }}
            </h1>
          </div>

          <p class="mb-8 font-quote text-lg text-[#5C5C5C] italic opacity-90">
            "{{ personalityType.tagline }}"
          </p>

          <div class="mx-auto max-w-sm rounded-2xl bg-white/50 p-6 backdrop-blur-sm border border-white">
            <p class="text-[15px] leading-relaxed text-slate-600">
              {{ personalityType.introduction.substring(0, 200) }}...
            </p>
          </div>

          <div class="mt-12">
            <button
              @click="nextStep"
              class="group relative flex items-center gap-3 rounded-full bg-[#8B2D4A] px-10 py-4 text-sm font-semibold text-white shadow-xl transition-all hover:scale-105 hover:bg-[#A03558]"
            >
              Choisir ma citation
              <ChevronRight class="h-4 w-4" />
            </button>
          </div>
        </div>

        <!-- SCREEN 3: Citation Selection -->
        <div v-else-if="currentStep === 2" key="step2" class="mx-auto w-full max-w-md">
          <div class="mb-8 text-center">
            <div class="mb-3 inline-flex items-center gap-2 rounded-full bg-[#8B2D4A]/5 px-4 py-1.5 text-[11px] font-medium text-[#8B2D4A] uppercase tracking-widest">
              <Heart class="h-3 w-3" fill="currentColor" />
              Ta citation
            </div>
            <h2 class="font-serif text-3xl font-bold text-[#1A1A1A]">
              Quelle phrase te représente le mieux ?
            </h2>
            <p class="mt-2 text-[13px] text-[#787878] italic">
              Elle apparaîtra sur ta carte de personnalité
            </p>
          </div>

          <!-- Citation Cards -->
          <div class="space-y-2.5">
            <button
              v-for="(punchline, index) in punchlines"
              :key="index"
              @click="selectPunchline(index)"
              class="group relative flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300"
              :class="[
                selectedPunchlineIndex === index
                  ? 'border-[#8B2D4A]/30 bg-[#8B2D4A]/[0.04] shadow-sm ring-1 ring-[#8B2D4A]/10'
                  : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50'
              ]"
            >
              <!-- Selection indicator -->
              <div
                class="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] transition-all duration-300"
                :class="[
                  selectedPunchlineIndex === index
                    ? 'border-[#8B2D4A] bg-[#8B2D4A]'
                    : 'border-slate-300'
                ]"
              >
                <Check
                  v-if="selectedPunchlineIndex === index"
                  class="h-2.5 w-2.5 text-white"
                  stroke-width="3"
                />
              </div>

              <!-- Citation text -->
              <p
                class="font-quote text-base leading-relaxed italic transition-colors duration-300"
                :class="[
                  selectedPunchlineIndex === index
                    ? 'text-[#1A1A1A]'
                    : 'text-[#787878]'
                ]"
              >
                « {{ punchline }} »
              </p>
            </button>
          </div>

          <!-- Confirm -->
          <div class="mt-10 flex justify-center">
            <button
              @click="nextStep"
              class="group flex items-center gap-3 rounded-full bg-[#8B2D4A] px-10 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#A03558] hover:shadow-[#8B2D4A]/20 active:scale-95"
            >
              Valider ma citation
              <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <!-- SCREEN 4: Profile Summary -->
        <div v-else-if="currentStep === 3" key="step3" class="mx-auto w-full max-w-lg">
          <div class="mb-5 text-center">
            <div class="mb-2 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-[#787878] uppercase">
              Ton profil Compaatible
            </div>
            <h2 class="font-serif text-3xl font-bold text-[#1A1A1A]">
              Prêt(e) à faire des rencontres, {{ userName }} ?
            </h2>
          </div>

          <!-- Summary Card -->
          <div class="overflow-hidden rounded-[2rem] bg-white px-8 py-7 shadow-sm ring-1 ring-black/5">
            <!-- Centered Avatar & Name -->
            <div class="mb-6 flex flex-col items-center text-center">
              <div
                class="mb-3 flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full"
                :style="{ backgroundColor: category.bgColor }"
              >
                <img v-if="avatarUrl" :src="avatarUrl" :alt="personalityType.name" class="h-[3.75rem] w-[3.75rem] object-contain" />
                <span v-else class="text-3xl">{{ personalityType.emoji }}</span>
              </div>
              <h3 class="mb-1 font-serif text-[1.4rem] font-bold text-[#1A1A1A]">{{ personalityType.name }}</h3>
              <span
                class="inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[10px] font-semibold tracking-widest uppercase"
                :style="{ backgroundColor: category.color + '10', color: category.color }"
              >
                <Heart class="h-2.5 w-2.5" fill="currentColor" />
                {{ category.name }}
              </span>
            </div>

            <!-- Selected Punchline -->
            <div class="mb-6 text-center">
              <p class="font-quote text-[15px] leading-relaxed text-[#5C5C5C] italic">
                "{{ selectedPunchline }}"
              </p>
            </div>

            <!-- Big Five Overview -->
            <div class="space-y-4">
              <div v-for="(score, key) in scores" :key="key">
                <div class="mb-1.5 flex items-center justify-between">
                  <span class="text-[13px] font-medium tracking-wide text-slate-600">{{ traitLabels[key as string]?.label || key }}</span>
                  <span class="text-[13px] font-semibold tabular-nums text-[#1A1A1A]">{{ score }}%</span>
                </div>
                <div class="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    class="h-full rounded-full transition-all duration-[1200ms] ease-out"
                    :style="{
                      width: `${score}%`,
                      backgroundColor: category.color
                    }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Quote -->
            <div class="mt-6 border-t border-slate-100 pt-5 text-center">
              <p class="font-quote text-[15px] leading-relaxed text-[#787878] italic">
                "{{ personalityType.quote.text }}"
              </p>
              <p class="mt-2 text-[10px] font-medium tracking-wide text-slate-300 uppercase">
                {{ personalityType.quote.author }}
              </p>
            </div>
          </div>

          <!-- Final Action -->
          <div class="mt-7 flex justify-center">
            <button
              @click="nextStep"
              class="group flex items-center gap-3 rounded-full bg-[#8B2D4A] px-10 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#A03558] hover:shadow-[#8B2D4A]/20 active:scale-95"
            >
              Voir mes résultats détaillés
              <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Footer Progress Dots -->
    <div class="py-6 flex items-center justify-center gap-2.5 z-20 shrink-0">
      <div
        v-for="i in totalSteps"
        :key="i"
        class="progress-dot rounded-full transition-all duration-500"
        :class="[
          currentStep === i - 1
            ? 'active'
            : 'inactive'
        ]"
      ></div>
    </div>

  </div>
</template>

<style scoped>
.font-quote {
  font-family: 'Cormorant Garamond', serif;
}

/* Custom bezier for reveal */
.animate-reveal {
  animation: reveal 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

@keyframes reveal {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0);
  }
}

/* Subtle pulse for background orbs */
.ambient-orb {
  animation: pulse-slow 8s infinite ease-in-out;
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.15; transform: scale(1.1); }
}

/* Progress dots - use exact pixel values to avoid sub-pixel rendering glitches */
.progress-dot {
  height: 8px;
  flex-shrink: 0;
}

.progress-dot.active {
  width: 28px;
  background-color: #8B2D4A;
}

.progress-dot.inactive {
  width: 8px;
  background-color: #E2E8F0;
}

/* Hide scrollbar but allow scrolling */
.personality-reveal-root {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.personality-reveal-root::-webkit-scrollbar {
  display: none;
}

/* Mobile responsive */
@media (max-width: 480px) {
  /* Step 0 - Category Reveal */
  :deep(.text-4xl) {
    font-size: 1.75rem !important;
  }

  /* Step 2 - Citation cards */
  :deep(.text-3xl) {
    font-size: 1.5rem !important;
  }

  /* Reduce button sizes */
  :deep(.px-12) {
    padding-left: 2rem !important;
    padding-right: 2rem !important;
  }

  :deep(.px-10) {
    padding-left: 1.75rem !important;
    padding-right: 1.75rem !important;
  }
}

@media (max-width: 360px) {
  :deep(.text-4xl) {
    font-size: 1.5rem !important;
  }

  :deep(.text-3xl) {
    font-size: 1.3rem !important;
  }

  :deep(.px-6) {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }

  :deep(.px-8) {
    padding-left: 1.25rem !important;
    padding-right: 1.25rem !important;
  }

  :deep(.text-lg) {
    font-size: 0.95rem !important;
  }

  :deep(.mb-12) {
    margin-bottom: 1.5rem !important;
  }

  :deep(.mt-12) {
    margin-top: 2rem !important;
  }
}
</style>
