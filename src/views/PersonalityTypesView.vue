<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import logoImage from '@/assets/nouveau logo compaatible.png'
import AppFooter from '@/components/AppFooter.vue'
import { personalityCategories, getTypesByCategory, type PersonalityCategory, type PersonalityType } from '@/data/personality-types'

// Import all personality SVGs dynamically
const avatarModules = import.meta.glob('@/assets/16 personnalités svg/*.svg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>

function getAvatarUrl(filename: string): string {
  const key = Object.keys(avatarModules).find(k => k.includes(filename))
  return key ? avatarModules[key] : ''
}

// Import category logo SVGs
const categoryLogoModules = import.meta.glob('@/assets/catégories svg/*.svg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>

const categoryLogoFiles: Record<string, string> = {
  architectes: 'architectes du coeur.svg',
  ames: 'ames lumineuses.svg',
  gardiens: 'gardiens du lien.svg',
  flammes: 'flammes libres.svg'
}

function getCategoryLogoUrl(categoryId: string): string {
  const filename = categoryLogoFiles[categoryId]
  if (!filename) return ''
  const key = Object.keys(categoryLogoModules).find(k => k.includes(filename))
  return key ? categoryLogoModules[key] : ''
}

interface CategoryWithTypes {
  category: PersonalityCategory
  types: PersonalityType[]
  logoUrl: string
}

const categoriesWithTypes: CategoryWithTypes[] = personalityCategories.map(cat => ({
  category: cat,
  types: getTypesByCategory(cat.id),
  logoUrl: getCategoryLogoUrl(cat.id)
}))
</script>

<template>
  <div class="min-h-screen bg-white-cream font-sans text-slate-900 selection:bg-red-pure/10 selection:text-red-pure">
    <AppHeader />

    <main>
      <!-- Hero Section -->
      <section class="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div class="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-red-pure/5 blur-3xl"></div>
        <div class="mx-auto max-w-7xl px-6 relative text-center">
          <div class="mb-6 inline-flex items-center gap-2 rounded-full bg-red-pure/5 px-4 py-1 text-[11px] font-medium tracking-widest text-red-pure">
            <img :src="logoImage" alt="" class="h-3.5 w-3.5 object-contain" />
            VOTRE DESTINÉE AMOUREUSE
          </div>
          <h1 class="mb-6 font-serif text-4xl font-bold text-black md:text-6xl">
            Types de personnalité
          </h1>
          <p class="mx-auto mb-10 max-w-2xl font-serif text-lg text-slate-500 italic opacity-80 md:text-xl">
            Découvrez comment votre caractère unique influence votre façon d'aimer et d'être aimé.
          </p>
          <router-link
            to="/inscription"
            class="group relative inline-flex items-center justify-center rounded-full bg-red-pure px-12 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-red-hover hover:shadow-red-pure/20"
          >
            Passer le test
          </router-link>
        </div>
      </section>

      <!-- Category Bands -->
      <div v-for="(item, index) in categoriesWithTypes" :key="item.category.id">
        <!-- Intermediary CTA (between group 2 and 3) -->
        <section v-if="index === 2" class="py-20 bg-white">
          <div class="mx-auto max-w-7xl px-6 text-center">
            <h2 class="mb-4 font-serif text-3xl md:text-4xl font-bold text-black">Prêt à découvrir le vôtre ?</h2>
            <p class="mb-8 text-base text-slate-500 max-w-md mx-auto">Passe le test et découvre quel type de personnalité te correspond.</p>
            <router-link
              to="/inscription"
              class="inline-flex items-center gap-2 rounded-full bg-red-pure px-10 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-red-hover hover:shadow-xl hover:shadow-red-pure/20"
            >
              Passer le test gratuitement
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </router-link>
          </div>
        </section>

        <!-- Category Logo at color intersection -->
        <div
          class="relative z-10 flex justify-center"
          :style="{ backgroundColor: index === 0 ? '#FBF9F7' : (index === 2 ? 'white' : categoriesWithTypes[index - 1].category.bgColor) }"
        >
          <div
            class="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white shadow-lg transition-transform duration-700 hover:scale-110 -mb-14"
            :style="{ backgroundColor: item.category.bgColor }"
          >
            <img
              v-if="item.logoUrl"
              :src="item.logoUrl"
              :alt="item.category.name"
              class="h-16 w-16 object-contain"
            />
          </div>
        </div>

        <!-- Band Section -->
        <section
          :id="`cat-${item.category.id}`"
          class="relative overflow-hidden pt-20 pb-20 md:pt-20 md:pb-24"
          :style="{ backgroundColor: item.category.bgColor }"
        >
          <div class="mx-auto max-w-7xl px-6 relative">
            <!-- Category Header -->
            <div class="mb-16 flex flex-col items-center text-center">
              <h2
                class="mb-3 font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]"
              >
                {{ item.category.name }}
              </h2>
              <span
                class="text-[11px] font-medium uppercase tracking-widest"
                :style="{ color: item.category.color }"
              >
                {{ item.category.subtitle }}
              </span>
            </div>

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
                  class="mb-1 font-serif text-lg md:text-xl font-semibold text-[#1A1A1A] transition-colors duration-300"
                >
                  {{ type.name }}
                </h3>

                <!-- Code -->
                <span
                  class="mb-3 text-[11px] font-medium tracking-widest uppercase"
                  :style="{ color: item.category.color }"
                >
                  {{ type.code }}
                </span>

                <!-- Tagline -->
                <p class="mt-auto text-sm leading-relaxed text-slate-500 line-clamp-3">
                  {{ type.tagline }}
                </p>
              </router-link>
            </div>
          </div>
        </section>
      </div>

      <!-- Final CTA Section -->
      <section class="relative overflow-hidden py-16 md:py-20 bg-white-cream">
        <div class="absolute bottom-0 -right-24 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl"></div>
        <div class="mx-auto max-w-3xl px-6 relative text-center">
          <h2 class="mb-6 font-serif text-4xl font-bold text-black">
            Commencez votre voyage
          </h2>
          <p class="mb-8 font-serif text-lg text-slate-500 italic opacity-80">
            Rejoignez des milliers de célibataires qui utilisent la science de la personnalité pour trouver des connexions authentiques.
          </p>
          <div class="flex justify-center">
            <router-link
              to="/inscription"
              class="group relative flex items-center justify-center rounded-full bg-red-pure px-12 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-red-hover hover:shadow-red-pure/20"
            >
              Faire le test maintenant
            </router-link>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>
