<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Heart, CheckCircle2, AlertCircle, Quote, ArrowRight, Sparkles } from 'lucide-vue-next'
import { getTypeById, getCategoryForType, getCompatibleTypes } from '@/data/personality-types'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const route = useRoute()
const activeTab = ref('introduction')

const personalityType = computed(() => getTypeById(route.params.id as string))
const category = computed(() => personalityType.value ? getCategoryForType(personalityType.value.id) : null)
const compatibility = computed(() => personalityType.value ? getCompatibleTypes(personalityType.value.id) : null)

// Import all SVGs dynamically
const avatarModules = import.meta.glob('@/assets/16 personnalités svg/*.svg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>

function getAvatarUrl(filename: string): string {
  const key = Object.keys(avatarModules).find(k => k.includes(filename))
  return key ? avatarModules[key] : ''
}

const tabs = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'strengths', label: 'Forces & Faiblesses' },
  { id: 'love', label: 'En amour' },
  { id: 'friendships', label: 'Amitiés' },
  { id: 'compatibility', label: 'Compatibilité' },
  { id: 'advice', label: 'Conseil' }
]

const setActiveTab = (id: string) => {
  activeTab.value = id
  window.scrollTo({ top: 400, behavior: 'smooth' })
}

watch(() => route.params.id, () => {
  activeTab.value = 'introduction'
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<template>
  <div v-if="personalityType && category" class="min-h-screen bg-[#FBF9F7] font-sans selection:bg-[#99001B]/10 selection:text-[#99001B]">
    <AppHeader />

    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div class="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-10" :style="{ backgroundColor: category.color }"></div>

      <div class="mx-auto max-w-7xl px-6">
        <div class="flex flex-col items-center gap-12 lg:flex-row lg:justify-between">
          <!-- Left Content -->
          <div class="max-w-2xl text-center lg:text-left">
            <div
              class="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1 text-[11px] font-medium tracking-wider uppercase"
              :style="{ backgroundColor: category.color + '1a', color: category.color }"
            >
              <Sparkles class="h-3 w-3" />
              {{ category.name }}
            </div>

            <h1 class="mb-2 font-serif text-5xl font-bold italic text-slate-900 md:text-7xl lg:leading-tight">
              {{ personalityType.name }}
            </h1>

            <div class="mt-4 flex flex-col items-center gap-2 lg:flex-row lg:items-center lg:gap-4">
              <span class="font-serif text-2xl font-light italic text-slate-400">{{ personalityType.code }}</span>
              <div class="hidden lg:block h-[1px] w-12 bg-slate-200"></div>
              <p class="font-serif text-lg italic text-slate-500">{{ personalityType.tagline }}</p>
            </div>

            <!-- Mobile Avatar -->
            <div class="relative mt-12 block lg:hidden">
              <div class="relative z-10 mx-auto w-64 h-64">
                <img :src="getAvatarUrl(personalityType.avatarFile)" :alt="personalityType.name" class="h-full w-full object-contain mix-blend-multiply" />
              </div>
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full blur-2xl opacity-20" :style="{ backgroundColor: category.color }"></div>
            </div>
          </div>

          <!-- Right Avatar (Desktop) -->
          <div class="relative hidden lg:block">
            <div class="relative z-10 h-[450px] w-[450px]">
              <img :src="getAvatarUrl(personalityType.avatarFile)" :alt="personalityType.name" class="h-full w-full object-contain mix-blend-multiply transform transition-transform duration-1000 hover:scale-105" />
            </div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full blur-[100px] opacity-20" :style="{ backgroundColor: category.color }"></div>
          </div>
        </div>

        <!-- Philosophical Quote -->
        <div class="mt-20 border-t border-slate-100 pt-12">
          <div class="mx-auto max-w-3xl text-center">
            <Quote class="mx-auto mb-6 h-8 w-8 opacity-20" :style="{ color: category.color }" />
            <p class="font-quote text-2xl italic leading-relaxed text-slate-700">
              "{{ personalityType.quote.text }}"
            </p>
            <p class="mt-4 font-sans text-xs font-bold tracking-widest uppercase text-slate-400">— {{ personalityType.quote.author }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sticky Tab Navigation -->
    <nav class="sticky top-[80px] z-40 border-y border-slate-100 bg-[#FBF9F7]/80 backdrop-blur-md">
      <div class="mx-auto max-w-7xl px-6">
        <div class="flex overflow-x-auto no-scrollbar py-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="setActiveTab(tab.id)"
            class="relative flex-none px-5 py-4 text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap"
            :class="activeTab === tab.id ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'"
          >
            {{ tab.label }}
            <div
              v-if="activeTab === tab.id"
              class="absolute bottom-0 left-5 right-5 h-0.5"
              :style="{ backgroundColor: category.color }"
            ></div>
          </button>
        </div>
      </div>
    </nav>

    <!-- Content -->
    <main class="mx-auto max-w-7xl px-6 py-20">
      <div class="flex flex-col lg:flex-row lg:gap-20">

        <!-- Sidebar (Desktop) -->
        <aside class="hidden w-64 shrink-0 lg:block">
          <div class="sticky top-[160px] space-y-2">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="setActiveTab(tab.id)"
              class="group flex w-full items-center justify-between rounded-2xl px-6 py-4 text-sm font-semibold transition-all"
              :class="activeTab === tab.id ? 'bg-white shadow-sm ring-1 ring-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'"
            >
              {{ tab.label }}
              <div
                class="h-1.5 w-1.5 rounded-full transition-transform"
                :class="activeTab === tab.id ? 'scale-100' : 'scale-0'"
                :style="{ backgroundColor: category.color }"
              ></div>
            </button>
          </div>
        </aside>

        <!-- Tab Content -->
        <div class="flex-1 max-w-3xl">

          <!-- INTRODUCTION -->
          <div v-if="activeTab === 'introduction'" class="space-y-12 fade-in">
            <p class="text-xl leading-relaxed text-slate-600 first-letter:text-5xl first-letter:font-serif first-letter:italic first-letter:mr-3 first-letter:float-left first-letter:text-slate-900">
              {{ personalityType.introduction }}
            </p>

            <div v-for="section in personalityType.sections" :key="section.title" class="mt-12">
              <h2 class="font-serif text-3xl font-bold italic text-slate-800 mb-6">{{ section.title }}</h2>
              <p class="text-slate-600 leading-relaxed">{{ section.content }}</p>
            </div>
          </div>

          <!-- FORCES & FAIBLESSES -->
          <div v-if="activeTab === 'strengths'" class="space-y-12 fade-in">
            <div class="grid gap-8 md:grid-cols-2">
              <!-- Forces -->
              <div class="rounded-3xl bg-emerald-50/30 p-8 ring-1 ring-emerald-100/50">
                <div class="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                  <CheckCircle2 class="h-6 w-6" />
                </div>
                <h2 class="mb-8 font-serif text-2xl font-bold italic text-slate-800">Forces</h2>
                <div class="space-y-6">
                  <div v-for="s in personalityType.strengths" :key="s.title">
                    <h3 class="font-bold text-slate-800 text-sm uppercase tracking-wide mb-2">{{ s.title }}</h3>
                    <p class="text-sm text-slate-600 leading-relaxed">{{ s.description }}</p>
                  </div>
                </div>
              </div>

              <!-- Faiblesses -->
              <div class="rounded-3xl bg-rose-50/30 p-8 ring-1 ring-rose-100/50">
                <div class="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600">
                  <AlertCircle class="h-6 w-6" />
                </div>
                <h2 class="mb-8 font-serif text-2xl font-bold italic text-slate-800">Faiblesses</h2>
                <div class="space-y-6">
                  <div v-for="w in personalityType.weaknesses" :key="w.title">
                    <h3 class="font-bold text-slate-800 text-sm uppercase tracking-wide mb-2">{{ w.title }}</h3>
                    <p class="text-sm text-slate-600 leading-relaxed">{{ w.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- EN AMOUR -->
          <div v-if="activeTab === 'love'" class="space-y-12 fade-in">
            <div class="mb-10 inline-flex items-center gap-3 rounded-full bg-[#99001B]/5 px-5 py-2 text-xs font-bold text-[#99001B] uppercase tracking-widest">
              <Heart class="h-4 w-4" fill="currentColor" />
              Le cœur de {{ personalityType.name }}
            </div>
            <p class="text-xl text-slate-600 italic leading-relaxed mb-12">
              {{ personalityType.inLove.intro }}
            </p>
            <div v-for="ls in personalityType.inLove.sections" :key="ls.title" class="mt-8">
              <h2 class="font-serif text-3xl font-bold italic text-slate-800 mb-6">{{ ls.title }}</h2>
              <p class="text-slate-600 leading-relaxed">{{ ls.content }}</p>
            </div>
          </div>

          <!-- AMITIÉS -->
          <div v-if="activeTab === 'friendships'" class="space-y-12 fade-in">
            <p class="text-xl text-slate-600 italic leading-relaxed mb-12">
              {{ personalityType.friendships.intro }}
            </p>
            <div v-for="fs in personalityType.friendships.sections" :key="fs.title" class="mt-8">
              <h2 class="font-serif text-3xl font-bold italic text-slate-800 mb-6">{{ fs.title }}</h2>
              <p class="text-slate-600 leading-relaxed">{{ fs.content }}</p>
            </div>
          </div>

          <!-- COMPATIBILITÉ -->
          <div v-if="activeTab === 'compatibility' && compatibility" class="space-y-12 fade-in">
            <div class="grid gap-6 md:grid-cols-3">
              <!-- Best -->
              <div class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                <h3 class="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500">Meilleure compatibilité</h3>
                <div class="space-y-4">
                  <router-link v-for="comp in compatibility.best" :key="comp.id" :to="`/personnalite/${comp.id}`"
                    class="group flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-slate-50">
                    <div class="h-12 w-12 overflow-hidden rounded-full bg-slate-50 p-1 ring-2 ring-emerald-500/20 group-hover:ring-emerald-500/40">
                      <img :src="getAvatarUrl(comp.avatarFile)" class="h-full w-full object-contain mix-blend-multiply" />
                    </div>
                    <div>
                      <p class="text-sm font-bold text-slate-800">{{ comp.name }}</p>
                      <p class="text-[10px] text-slate-400">{{ comp.code }}</p>
                    </div>
                  </router-link>
                </div>
              </div>

              <!-- Good -->
              <div class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                <h3 class="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">Bonne compatibilité</h3>
                <div class="space-y-4">
                  <router-link v-for="comp in compatibility.good" :key="comp.id" :to="`/personnalite/${comp.id}`"
                    class="group flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-slate-50">
                    <div class="h-12 w-12 overflow-hidden rounded-full bg-slate-50 p-1 ring-2 ring-amber-500/20 group-hover:ring-amber-500/40">
                      <img :src="getAvatarUrl(comp.avatarFile)" class="h-full w-full object-contain mix-blend-multiply" />
                    </div>
                    <div>
                      <p class="text-sm font-bold text-slate-800">{{ comp.name }}</p>
                      <p class="text-[10px] text-slate-400">{{ comp.code }}</p>
                    </div>
                  </router-link>
                </div>
              </div>

              <!-- Challenging -->
              <div class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                <h3 class="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#99001B]">Défis</h3>
                <div class="space-y-4">
                  <router-link v-for="comp in compatibility.challenging" :key="comp.id" :to="`/personnalite/${comp.id}`"
                    class="group flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-slate-50">
                    <div class="h-12 w-12 overflow-hidden rounded-full bg-slate-50 p-1 ring-2 ring-[#99001B]/20 group-hover:ring-[#99001B]/40">
                      <img :src="getAvatarUrl(comp.avatarFile)" class="h-full w-full object-contain mix-blend-multiply" />
                    </div>
                    <div>
                      <p class="text-sm font-bold text-slate-800">{{ comp.name }}</p>
                      <p class="text-[10px] text-slate-400">{{ comp.code }}</p>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- CONSEIL -->
          <div v-if="activeTab === 'advice'" class="fade-in">
            <div class="relative overflow-hidden rounded-3xl bg-white p-12 shadow-xl shadow-[#99001B]/5">
              <div class="absolute -right-12 -top-12 h-48 w-48 rounded-full opacity-5" :style="{ backgroundColor: category.color }"></div>

              <div class="relative">
                <Quote class="mb-8 h-10 w-10 opacity-10" :style="{ color: category.color }" />
                <h2 class="mb-8 font-serif text-4xl font-bold italic text-slate-900 leading-tight">Conseil pour s'épanouir</h2>
                <p class="text-xl leading-relaxed text-slate-600 italic">
                  {{ personalityType.advice }}
                </p>
                <div class="mt-12 h-[1px] w-24" :style="{ backgroundColor: category.color + '40' }"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>

    <!-- Bottom CTA -->
    <section class="border-t border-slate-100 bg-white py-24">
      <div class="mx-auto max-w-7xl px-6 text-center">
        <h2 class="mb-8 font-serif text-4xl font-bold italic text-slate-900">Vous reconnaissez-vous ?</h2>
        <div class="flex flex-col items-center gap-6">
          <router-link to="/inscription" class="group relative flex items-center justify-center rounded-full bg-[#99001B] px-12 py-5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#b30020] hover:shadow-[#99001B]/20">
            Découvrir mon type gratuitement
            <ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </router-link>

          <router-link to="/types-de-personnalite" class="text-sm font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-slate-900">
            Voir tous les types de personnalité
          </router-link>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>

  <!-- 404 State -->
  <div v-else class="min-h-screen bg-[#FBF9F7] flex items-center justify-center">
    <div class="text-center">
      <h1 class="font-serif text-4xl font-bold italic text-slate-800 mb-4">Type introuvable</h1>
      <p class="text-slate-500 mb-8">Ce type de personnalité n'existe pas.</p>
      <router-link to="/types-de-personnalite" class="rounded-full bg-[#99001B] px-8 py-3 text-sm font-semibold text-white">
        Voir tous les types
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.font-quote {
  font-family: 'Cormorant Garamond', serif;
}

.fade-in {
  animation: fadeIn 0.5s ease both;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
