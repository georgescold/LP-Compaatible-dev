<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { CheckCircle2, AlertCircle, Quote, ArrowRight, Sparkles, Users, Lightbulb, ArrowUpRight, Compass } from 'lucide-vue-next'
import { getTypeById, getCategoryForType, getCompatibleTypes } from '@/data/personality-types'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import logoImage from '@/assets/nouveau logo compaatible.png'

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
  const el = document.getElementById('content-start')
  if (el) {
    const y = el.getBoundingClientRect().top + window.pageYOffset - 160
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

watch(() => route.params.id, () => {
  activeTab.value = 'introduction'
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<template>
  <div v-if="personalityType && category" class="min-h-screen bg-[#FBF9F7] font-sans selection:bg-red-pure/10 selection:text-[#8B2D4A]">
    <AppHeader />

    <!-- HERO SECTION -->
    <section
      class="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
      :style="{ backgroundColor: category.color + '0D' }"
    >
      <!-- Decorative Orbs -->
      <div
        class="absolute -top-24 -left-24 h-[500px] w-[500px] rounded-full blur-[120px] opacity-20"
        :style="{ backgroundColor: category.color }"
      ></div>
      <div class="absolute bottom-0 -right-24 h-96 w-96 rounded-full bg-amber-500/10 blur-[100px]"></div>

      <div class="mx-auto max-w-7xl px-6 relative z-10">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <!-- Text Left -->
          <div class="order-2 lg:order-1">
            <div
              class="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-medium tracking-widest uppercase"
              :style="{ backgroundColor: category.color + '1A', color: category.color }"
            >
              <Sparkles class="h-3.5 w-3.5" />
              {{ category.name }}
            </div>

            <div class="mb-4 flex items-baseline gap-4">
              <span
                class="font-mono text-xl font-bold tracking-tighter opacity-40"
                :style="{ color: category.color }"
              >
                {{ personalityType.code }}
              </span>
            </div>

            <h1 class="mb-4 font-serif text-5xl font-bold leading-[1.1] text-[#1A1A1A] md:text-7xl">
              {{ personalityType.name }}
            </h1>

            <p class="max-w-xl font-serif text-xl md:text-2xl text-slate-500 italic opacity-90 leading-relaxed">
              "{{ personalityType.tagline }}"
            </p>

            <div class="mt-10 flex flex-wrap gap-4">
              <router-link
                to="/inscription"
                class="group relative flex items-center justify-center rounded-full bg-red-pure px-10 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-red-hover hover:shadow-red-pure/20"
              >
                Passer le test
                <ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </router-link>
              <button
                @click="setActiveTab('compatibility')"
                class="rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-900 shadow-sm transition-all hover:border-slate-900 hover:shadow-md"
              >
                Voir compatibilités
              </button>
            </div>
          </div>

          <!-- Avatar Right -->
          <div class="order-1 flex justify-center lg:order-2">
            <div class="relative">
              <div
                class="absolute inset-0 scale-95 rounded-full blur-2xl opacity-20"
                :style="{ backgroundColor: category.color }"
              ></div>
              <img
                :src="getAvatarUrl(personalityType.avatarFile)"
                :alt="personalityType.name"
                class="relative h-64 w-64 object-contain drop-shadow-2xl transition-transform duration-1000 hover:scale-105 md:h-[420px] md:w-[420px] mix-blend-multiply avatar-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- QUOTE SECTION -->
    <section class="border-y border-slate-100 bg-white py-16">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <Quote
          class="mx-auto mb-8 h-10 w-10 opacity-10"
          :style="{ color: category.color }"
        />
        <blockquote class="font-quote text-3xl leading-snug text-slate-800 md:text-4xl italic">
          "{{ personalityType.quote.text }}"
        </blockquote>
        <cite class="mt-6 block text-[11px] font-medium not-italic tracking-[0.2em] text-slate-400 uppercase">
          — {{ personalityType.quote.author }}
        </cite>
      </div>
    </section>

    <!-- STICKY TAB NAV -->
    <nav class="sticky top-[80px] z-40 border-b border-slate-100 bg-white/80 backdrop-blur-xl">
      <div class="mx-auto max-w-7xl px-6">
        <div class="no-scrollbar flex items-center gap-2 overflow-x-auto py-4">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="setActiveTab(tab.id)"
            class="flex shrink-0 whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300"
            :class="activeTab === tab.id ? 'text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'"
            :style="activeTab === tab.id ? { backgroundColor: category.color } : {}"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
    </nav>

    <!-- CONTENT AREA -->
    <div id="content-start" class="mx-auto max-w-7xl px-6 py-16">
      <div class="grid gap-12 lg:grid-cols-12">

        <!-- MAIN CONTENT (8/12) -->
        <main class="lg:col-span-8">

          <!-- INTRODUCTION -->
          <div v-if="activeTab === 'introduction'" class="fade-in space-y-12">
            <div>
              <p class="text-lg leading-relaxed text-slate-600 first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:font-bold first-letter:text-[#1A1A1A]">
                {{ personalityType.introduction }}
              </p>
            </div>

            <div class="grid gap-6">
              <div
                v-for="section in personalityType.sections"
                :key="section.title"
                class="group rounded-[2rem] bg-white p-8 shadow-sm transition-all hover:shadow-md"
                :style="{ borderLeft: '4px solid ' + category.color }"
              >
                <h2 class="mb-4 font-serif text-xl font-bold text-[#1A1A1A]">{{ section.title }}</h2>
                <p class="text-slate-500 leading-relaxed">{{ section.content }}</p>
              </div>
            </div>
          </div>

          <!-- STRENGTHS & WEAKNESSES -->
          <div v-if="activeTab === 'strengths'" class="fade-in space-y-12">
            <div>
              <h2 class="mb-8 font-serif text-3xl font-bold text-[#1A1A1A]">Forces</h2>
              <div class="grid gap-4 md:grid-cols-2">
                <div
                  v-for="s in personalityType.strengths"
                  :key="s.title"
                  class="rounded-3xl bg-white p-6 shadow-sm border-t-4 border-emerald-500/20"
                >
                  <div class="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
                    <CheckCircle2 class="h-4 w-4 text-emerald-600" />
                  </div>
                  <h4 class="mb-2 font-serif text-lg font-bold text-[#1A1A1A]">{{ s.title }}</h4>
                  <p class="text-sm text-slate-500 leading-relaxed">{{ s.description }}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 class="mb-8 font-serif text-3xl font-bold text-[#1A1A1A]">Zones de vigilance</h2>
              <div class="grid gap-4 md:grid-cols-2">
                <div
                  v-for="w in personalityType.weaknesses"
                  :key="w.title"
                  class="rounded-3xl bg-white p-6 shadow-sm border-t-4 border-rose-500/20"
                >
                  <div class="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-rose-50">
                    <AlertCircle class="h-4 w-4 text-rose-600" />
                  </div>
                  <h4 class="mb-2 font-serif text-lg font-bold text-[#1A1A1A]">{{ w.title }}</h4>
                  <p class="text-sm text-slate-500 leading-relaxed">{{ w.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- LOVE -->
          <div v-if="activeTab === 'love'" class="fade-in">
            <div class="relative overflow-hidden rounded-[2.5rem] bg-white p-10 shadow-sm border border-rose-100">
              <div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-rose-50 blur-3xl"></div>

              <div class="relative z-10">
                <div class="mb-6 inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-1 text-[11px] font-bold tracking-widest text-rose-600 uppercase">
                  <img :src="logoImage" alt="" class="h-3.5 w-3.5 object-contain" />
                  La dynamique amoureuse
                </div>

                <h2 class="mb-6 font-serif text-3xl font-bold text-[#1A1A1A]">Aimer un {{ personalityType.name }}</h2>
                <p class="mb-10 text-lg leading-relaxed text-slate-600 italic font-serif opacity-80">
                  "{{ personalityType.inLove.intro }}"
                </p>

                <div class="space-y-10">
                  <div v-for="ls in personalityType.inLove.sections" :key="ls.title">
                    <h3 class="mb-3 font-serif text-xl font-bold text-[#1A1A1A]">{{ ls.title }}</h3>
                    <p class="text-slate-500 leading-relaxed">{{ ls.content }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- FRIENDSHIPS -->
          <div v-if="activeTab === 'friendships'" class="fade-in">
            <div class="rounded-[2.5rem] bg-white p-10 shadow-sm">
              <h2 class="mb-6 font-serif text-3xl font-bold text-[#1A1A1A]">Le cercle social</h2>
              <p class="mb-12 text-lg text-slate-600 leading-relaxed">{{ personalityType.friendships.intro }}</p>

              <div class="space-y-8">
                <div v-for="fs in personalityType.friendships.sections" :key="fs.title" class="flex gap-6">
                  <div
                    class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                    :style="{ backgroundColor: category.color + '1A' }"
                  >
                    <Users class="h-6 w-6" :style="{ color: category.color }" />
                  </div>
                  <div>
                    <h3 class="mb-2 font-serif text-xl font-bold text-[#1A1A1A]">{{ fs.title }}</h3>
                    <p class="text-slate-500 leading-relaxed">{{ fs.content }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- COMPATIBILITY -->
          <div v-if="activeTab === 'compatibility' && compatibility" class="fade-in space-y-16">
            <!-- Best -->
            <div>
              <div class="mb-8 flex items-center justify-between">
                <h2 class="font-serif text-3xl font-bold text-[#1A1A1A]">Le Match Parfait</h2>
                <span class="rounded-full bg-emerald-100 px-4 py-1 text-[11px] font-bold text-emerald-700 uppercase tracking-widest">Âmes Sœurs</span>
              </div>
              <div class="grid gap-6 sm:grid-cols-2">
                <router-link
                  v-for="comp in compatibility.best"
                  :key="comp.id"
                  :to="`/personnalite/${comp.id}`"
                  class="group flex items-center gap-4 rounded-3xl bg-white p-4 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md"
                >
                  <div class="h-16 w-16 overflow-hidden rounded-2xl bg-slate-50 p-1">
                    <img :src="getAvatarUrl(comp.avatarFile)" :alt="comp.name" class="h-full w-full object-contain mix-blend-multiply" />
                  </div>
                  <div>
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ comp.code }}</span>
                    <h4 class="font-serif font-bold text-[#1A1A1A] group-hover:text-[#8B2D4A] transition-colors">{{ comp.name }}</h4>
                  </div>
                  <ArrowUpRight class="ml-auto h-4 w-4 text-slate-300 group-hover:text-[#8B2D4A] transition-colors" />
                </router-link>
              </div>
            </div>

            <!-- Good -->
            <div>
              <h3 class="mb-8 font-serif text-2xl font-bold text-slate-400">Excellente Entente</h3>
              <div class="grid gap-6 sm:grid-cols-3">
                <router-link
                  v-for="comp in compatibility.good"
                  :key="comp.id"
                  :to="`/personnalite/${comp.id}`"
                  class="group rounded-3xl bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div class="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-2xl bg-slate-50 p-1">
                    <img :src="getAvatarUrl(comp.avatarFile)" :alt="comp.name" class="h-full w-full object-contain mix-blend-multiply" />
                  </div>
                  <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ comp.code }}</span>
                  <h4 class="font-serif text-sm font-bold text-[#1A1A1A] group-hover:text-[#8B2D4A] transition-colors">{{ comp.name }}</h4>
                </router-link>
              </div>
            </div>

            <!-- Challenging -->
            <div>
              <h3 class="mb-8 font-serif text-2xl font-bold text-slate-400">Le Défi Passionnant</h3>
              <div class="grid gap-6 sm:grid-cols-3">
                <router-link
                  v-for="comp in compatibility.challenging"
                  :key="comp.id"
                  :to="`/personnalite/${comp.id}`"
                  class="group rounded-3xl bg-slate-50/50 p-6 text-center transition-all hover:bg-white hover:shadow-md"
                >
                  <div class="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-2xl bg-slate-100 p-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <img :src="getAvatarUrl(comp.avatarFile)" :alt="comp.name" class="h-full w-full object-contain mix-blend-multiply" />
                  </div>
                  <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ comp.code }}</span>
                  <h4 class="font-serif text-sm font-bold text-slate-600 group-hover:text-[#1A1A1A] transition-colors">{{ comp.name }}</h4>
                </router-link>
              </div>
            </div>
          </div>

          <!-- ADVICE -->
          <div v-if="activeTab === 'advice'" class="fade-in">
            <div class="relative overflow-hidden rounded-[3rem] bg-[#1A1A1A] p-12 text-white md:p-20">
              <div class="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-red-pure/20 blur-[100px]"></div>

              <div class="relative z-10 flex flex-col items-center text-center">
                <div class="mb-10 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm">
                  <Lightbulb class="h-10 w-10 text-amber-400" />
                </div>
                <h2 class="mb-8 font-serif text-4xl font-bold text-white">Un conseil pour vous...</h2>
                <p class="font-quote text-2xl leading-relaxed italic text-slate-300 md:text-3xl">
                  "{{ personalityType.advice }}"
                </p>
                <div class="mt-12 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
            </div>
          </div>

        </main>

        <!-- SIDEBAR (4/12) -->
        <aside class="hidden lg:block lg:col-span-4">
          <div class="sticky top-[180px] space-y-8">

            <!-- Sidebar Nav -->
            <div class="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
              <p class="mb-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase px-2">Explorer</p>
              <nav class="space-y-1">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  @click="setActiveTab(tab.id)"
                  class="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-all cursor-pointer"
                  :class="activeTab === tab.id ? 'bg-[#FBF9F7] text-[#1A1A1A]' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'"
                >
                  {{ tab.label }}
                  <div
                    class="h-1.5 w-1.5 rounded-full transition-all duration-300"
                    :class="activeTab === tab.id ? 'scale-100' : 'scale-0'"
                    :style="{ backgroundColor: category.color }"
                  ></div>
                </button>
              </nav>
            </div>

            <!-- CTA Card -->
            <div class="rounded-3xl bg-red-pure p-8 text-white shadow-xl shadow-red-pure/20">
              <h3 class="mb-4 font-serif text-2xl font-bold leading-tight">Découvrez votre vraie nature</h3>
              <p class="mb-8 text-sm text-white/80 leading-relaxed">Passez notre test basé sur le Big Five et trouvez des relations qui comptent vraiment.</p>
              <router-link
                to="/inscription"
                class="inline-flex w-full items-center justify-center rounded-full bg-white py-4 text-xs font-bold text-[#8B2D4A] transition-transform hover:scale-105"
              >
                Faire le test maintenant
              </router-link>
            </div>

            <!-- Back Link -->
            <router-link
              to="/types-de-personnalite"
              class="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
            >
              <Compass class="h-4 w-4" />
              Voir tous les types
            </router-link>
          </div>
        </aside>

      </div>
    </div>

    <!-- BOTTOM CTA -->
    <section class="bg-white py-24 border-t border-slate-100">
      <div class="mx-auto max-w-5xl px-6 text-center">
        <div class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-pure/5 mb-8">
          <img :src="logoImage" alt="Compaatible" class="h-10 w-10 object-contain" />
        </div>
        <h2 class="mb-6 font-serif text-4xl font-bold text-[#1A1A1A] md:text-5xl">Vous reconnaissez-vous ?</h2>
        <p class="mx-auto mb-10 max-w-lg text-slate-500 leading-relaxed">
          Rejoignez des milliers de célibataires qui utilisent la science de la personnalité pour trouver l'amour durable.
        </p>
        <div class="flex flex-col items-center gap-6">
          <router-link
            to="/inscription"
            class="group inline-flex items-center justify-center rounded-full bg-red-pure px-12 py-5 text-sm font-bold text-white shadow-xl shadow-red-pure/20 transition-all hover:scale-105 hover:bg-red-hover"
          >
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
      <h1 class="font-serif text-4xl font-bold text-[#1A1A1A] mb-4">Type introuvable</h1>
      <p class="text-slate-500 mb-8">Ce type de personnalité n'existe pas.</p>
      <router-link to="/types-de-personnalite" class="rounded-full bg-red-pure px-8 py-3 text-sm font-semibold text-white">
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
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

.avatar-float {
  animation: float 8s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
</style>
