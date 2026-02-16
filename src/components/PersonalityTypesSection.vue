<script setup lang="ts">
import { personalityCategories, getTypesByCategory } from '@/data/personality-types'
import logoImage from '@/assets/nouveau logo compaatible.png'

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

const categoriesWithTypes = personalityCategories.map(cat => ({
  ...cat,
  logoUrl: getCategoryLogoUrl(cat.id),
  types: getTypesByCategory(cat.id)
}))
</script>

<template>
  <section id="personality-types-teaser" class="bg-white-cream py-24 relative overflow-hidden">
    <!-- Ambient Blurs (Decorative) -->
    <div class="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-red-pure/5 blur-3xl"></div>
    <div class="absolute bottom-0 -right-24 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl"></div>

    <div class="mx-auto max-w-7xl px-6 relative">
      <!-- Section Header -->
      <div class="mb-16 text-center">
        <div class="mb-4 inline-flex items-center gap-2 rounded-full bg-red-pure/5 px-4 py-1 text-[11px] font-medium tracking-widest text-red-pure">
          <img :src="logoImage" alt="" class="h-3.5 w-3.5 object-contain" />
          VOTRE DESTINÉE AMOUREUSE
        </div>
        <h2 class="mb-4 font-serif text-4xl font-bold text-black md:text-5xl">
          Les types de personnalité
        </h2>
        <p class="mx-auto max-w-2xl font-serif text-lg text-slate-500 italic md:text-xl">
          "Notre test révèle lequel de ces 16 profils vous incarnez, et qui vous correspond le mieux."
        </p>
      </div>

      <!-- Categories Grid -->
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <router-link
          v-for="cat in categoriesWithTypes"
          :key="cat.id"
          :to="`/types-de-personnalite#cat-${cat.id}`"
          class="group flex flex-col items-center rounded-[2.5rem] bg-white p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-pure/5 no-underline"
        >
          <!-- Category Logo -->
          <div
            class="mb-6 flex h-20 w-20 items-center justify-center rounded-full transition-transform duration-700 group-hover:scale-110"
            :style="{ backgroundColor: cat.color + '1a' }"
          >
            <img
              :src="cat.logoUrl"
              :alt="cat.name"
              class="h-12 w-12 object-contain"
              loading="lazy"
            />
          </div>

          <!-- Category Info -->
          <h3 class="mb-1 font-serif text-2xl font-semibold text-[#1A1A1A]">
            {{ cat.name }}
          </h3>
          <span
            class="mb-4 text-[11px] font-medium uppercase tracking-widest"
            :style="{ color: cat.color }"
          >
            {{ cat.subtitle }}
          </span>
          <p class="mb-8 text-base leading-relaxed text-slate-500">
            "{{ cat.description }}"
          </p>

          <!-- Personality Type Pills -->
          <div class="mt-auto flex flex-wrap justify-center gap-2">
            <router-link
              v-for="type in cat.types"
              :key="type.id"
              :to="`/personnalite/${type.id}`"
              class="rounded-full bg-slate-50 px-3.5 py-1.5 text-xs font-medium text-slate-600 transition-all hover:bg-white hover:text-red-pure hover:shadow-md cursor-pointer border border-transparent hover:border-slate-100"
            >
              {{ type.name }}
            </router-link>
          </div>
        </router-link>
      </div>

      <!-- Main CTA Button -->
      <div class="mt-20 flex justify-center">
        <router-link
          to="/types-de-personnalite"
          class="group relative flex items-center justify-center rounded-full bg-red-pure px-12 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-red-hover hover:shadow-red-pure/20"
        >
          Découvrir les 16 personnalités
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (max-width: 640px) {
  :deep(.grid) {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
  }
}

@media (max-width: 400px) {
  section {
    padding-top: 4rem !important;
    padding-bottom: 4rem !important;
  }

  section :deep(.px-6) {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }

  section :deep(.mb-16) {
    margin-bottom: 2.5rem !important;
  }

  section :deep(.text-4xl) {
    font-size: 1.75rem !important;
  }

  section :deep(.text-lg),
  section :deep(.md\\:text-xl) {
    font-size: 0.95rem !important;
  }

  section :deep(.p-8) {
    padding: 1.25rem !important;
  }

  section :deep(.text-2xl) {
    font-size: 1.25rem !important;
  }

  section :deep(.mb-8) {
    margin-bottom: 1.25rem !important;
  }

  section :deep(.mt-20) {
    margin-top: 3rem !important;
  }

  section :deep(.px-12) {
    padding-left: 2rem !important;
    padding-right: 2rem !important;
  }
}
</style>
