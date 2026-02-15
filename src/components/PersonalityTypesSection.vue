<script setup lang="ts">
import { Heart, Brain, Sparkles, Shield, Flame } from 'lucide-vue-next'
import { personalityCategories, getTypesByCategory } from '@/data/personality-types'
import type { Component } from 'vue'

const categoryIcons: Record<string, Component> = {
  architectes: Brain,
  ames: Sparkles,
  gardiens: Shield,
  flammes: Flame
}

const categoriesWithTypes = personalityCategories.map(cat => ({
  ...cat,
  icon: categoryIcons[cat.id],
  typeNames: getTypesByCategory(cat.id).map(t => t.name)
}))
</script>

<template>
  <section id="personality-types-teaser" class="bg-[#FBF9F7] py-24 relative overflow-hidden">
    <!-- Ambient Blurs (Decorative) -->
    <div class="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#99001B]/5 blur-3xl"></div>
    <div class="absolute bottom-0 -right-24 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl"></div>

    <div class="mx-auto max-w-7xl px-6 relative">
      <!-- Section Header -->
      <div class="mb-16 text-center">
        <div class="mb-4 inline-flex items-center gap-2 rounded-full bg-[#99001B]/5 px-4 py-1 text-[11px] font-medium tracking-widest text-[#99001B]">
          <Heart class="h-3 w-3" fill="currentColor" />
          VOTRE DESTINÉE AMOUREUSE
        </div>
        <h2 class="mb-4 font-serif text-4xl font-bold italic text-slate-800 md:text-5xl">
          Les types de personnalité
        </h2>
        <p class="mx-auto max-w-lg font-serif text-lg text-slate-500 italic opacity-80">
          "Le langage secret de votre cœur enfin décodé."
        </p>
      </div>

      <!-- Categories Grid -->
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="cat in categoriesWithTypes"
          :key="cat.id"
          class="group flex flex-col items-center rounded-[2.5rem] bg-white p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#99001B]/5"
        >
          <!-- Icon Area -->
          <div
            class="mb-6 flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-700 group-hover:scale-110"
            :style="{ backgroundColor: cat.color + '1a' }"
          >
            <component
              :is="cat.icon"
              class="h-7 w-7"
              :style="{ color: cat.color }"
              stroke-width="1.5"
            />
          </div>

          <!-- Category Info -->
          <h3 class="mb-1 font-serif text-xl font-semibold text-slate-800">
            {{ cat.name }}
          </h3>
          <span class="mb-4 text-[10px] font-medium uppercase tracking-wider text-slate-400">
            {{ cat.subtitle }}
          </span>
          <p class="mb-8 text-sm leading-relaxed text-slate-500 italic">
            "{{ cat.description }}"
          </p>

          <!-- Personality Type Pills -->
          <div class="mt-auto flex flex-wrap justify-center gap-2">
            <span
              v-for="typeName in cat.typeNames"
              :key="typeName"
              class="rounded-full bg-slate-50 px-3 py-1 text-[10px] font-medium text-slate-400 transition-colors hover:bg-white hover:text-[#99001B] hover:shadow-sm"
            >
              {{ typeName }}
            </span>
          </div>
        </div>
      </div>

      <!-- Main CTA Button -->
      <div class="mt-20 flex justify-center">
        <router-link
          to="/types-de-personnalite"
          class="group relative flex items-center justify-center rounded-full bg-[#99001B] px-12 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#b30020] hover:shadow-[#99001B]/20"
        >
          Découvrir les 16 personnalités
        </router-link>
      </div>
    </div>
  </section>
</template>
