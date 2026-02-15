<script setup lang="ts">
import { Heart } from 'lucide-vue-next'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { personalityCategories, getTypesByCategory, type PersonalityCategory, type PersonalityType } from '@/data/personality-types'

// Import all SVGs dynamically
const avatarModules = import.meta.glob('@/assets/16 personnalités svg/*.svg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>

function getAvatarUrl(filename: string): string {
  const key = Object.keys(avatarModules).find(k => k.includes(filename))
  return key ? avatarModules[key] : ''
}

interface CategoryWithTypes {
  category: PersonalityCategory
  types: PersonalityType[]
}

const categoriesWithTypes: CategoryWithTypes[] = personalityCategories.map(cat => ({
  category: cat,
  types: getTypesByCategory(cat.id)
}))
</script>

<template>
  <div class="min-h-screen bg-[#FBF9F7] font-sans text-slate-900 selection:bg-[#99001B]/10 selection:text-[#99001B]">
    <AppHeader />

    <main>
      <!-- Hero Section -->
      <section class="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div class="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#99001B]/5 blur-3xl"></div>
        <div class="mx-auto max-w-7xl px-6 relative text-center">
          <div class="mb-6 inline-flex items-center gap-2 rounded-full bg-[#99001B]/5 px-4 py-1 text-[11px] font-medium tracking-widest text-[#99001B]">
            <Heart class="h-3 w-3" fill="currentColor" />
            VOTRE DESTINÉE AMOUREUSE
          </div>
          <h1 class="mb-6 font-serif text-4xl font-bold italic text-slate-800 md:text-6xl">
            Types de personnalité
          </h1>
          <p class="mx-auto mb-10 max-w-2xl font-serif text-lg text-slate-500 italic opacity-80 md:text-xl">
            Découvrez comment votre caractère unique influence votre façon d'aimer et d'être aimé.
          </p>
          <router-link
            to="/inscription"
            class="group relative inline-flex items-center justify-center rounded-full bg-[#99001B] px-12 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#b30020] hover:shadow-[#99001B]/20"
          >
            Passer le test
          </router-link>
        </div>
      </section>

      <!-- Category Bands -->
      <div v-for="(item, index) in categoriesWithTypes" :key="item.category.id">
        <!-- Intermediary CTA (between group 2 and 3) -->
        <section v-if="index === 2" class="bg-white py-16 border-y border-slate-100">
          <div class="mx-auto max-w-7xl px-6 text-center">
            <h2 class="mb-8 font-serif text-2xl font-semibold text-slate-800">Prêt à découvrir le vôtre ?</h2>
            <router-link
              to="/inscription"
              class="rounded-full border border-slate-200 px-10 py-3 text-xs font-medium text-slate-900 transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white"
            >
              Passer le test gratuitement
            </router-link>
          </div>
        </section>

        <!-- Band Section -->
        <section
          class="relative overflow-hidden py-24 md:py-32"
          :style="{ backgroundColor: item.category.bgColor }"
        >
          <!-- Decorative Background Text -->
          <div
            class="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
            aria-hidden="true"
          >
            <span
              class="whitespace-nowrap font-serif text-[8rem] font-black uppercase opacity-[0.06] md:text-[14rem] lg:text-[18rem]"
              :style="{ color: item.category.color }"
            >
              {{ item.category.name.replace('Les ', '') }}
            </span>
          </div>

          <div class="mx-auto max-w-7xl px-6 relative">
            <!-- Personality Grid -->
            <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <router-link
                v-for="type in item.types"
                :key="type.id"
                :to="`/personnalite/${type.id}`"
                class="group flex flex-col items-center rounded-3xl bg-white/80 backdrop-blur-sm p-6 md:p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:bg-white"
              >
                <!-- Avatar -->
                <div class="mb-6 flex h-40 md:h-48 w-full items-center justify-center transition-transform duration-700 group-hover:scale-110">
                  <img
                    :src="getAvatarUrl(type.avatarFile)"
                    :alt="type.name"
                    class="h-full w-auto object-contain mix-blend-multiply"
                  />
                </div>

                <!-- Type Name -->
                <h3
                  class="mb-1 font-serif text-lg md:text-xl font-semibold transition-colors duration-300"
                  :style="{ color: item.category.color }"
                >
                  {{ type.name }}
                </h3>

                <!-- Code -->
                <span class="mb-3 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                  {{ type.code }}
                </span>

                <!-- Tagline -->
                <p class="mt-auto text-xs md:text-sm leading-relaxed text-slate-500 italic line-clamp-3">
                  {{ type.tagline }}
                </p>
              </router-link>
            </div>
          </div>
        </section>
      </div>

      <!-- Final CTA Section -->
      <section class="relative overflow-hidden py-32 bg-[#FBF9F7]">
        <div class="absolute bottom-0 -right-24 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl"></div>
        <div class="mx-auto max-w-3xl px-6 relative text-center">
          <h2 class="mb-6 font-serif text-4xl font-bold italic text-slate-800">
            Commencez votre voyage
          </h2>
          <p class="mb-12 font-serif text-lg text-slate-500 italic opacity-80">
            Rejoignez des milliers de célibataires qui utilisent la science de la personnalité pour trouver des connexions authentiques.
          </p>
          <div class="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <router-link
              to="/inscription"
              class="group relative flex w-full items-center justify-center rounded-full bg-[#99001B] px-12 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#b30020] hover:shadow-[#99001B]/20 sm:w-auto"
            >
              Faire le test maintenant
            </router-link>
            <router-link
              to="/inscription"
              class="w-full rounded-full border border-slate-200 px-10 py-4 text-xs font-medium text-slate-900 transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white sm:w-auto"
            >
              Créer un compte
            </router-link>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>
