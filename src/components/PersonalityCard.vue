<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMouseInElement } from '@vueuse/core';
import { Share2, Info, Sparkles } from 'lucide-vue-next';
import logoImage from '@/assets/nouveau logo compaatible.png';

interface BigFive {
  O: 'high' | 'low';
  C: 'high' | 'low';
  E: 'high' | 'low';
  A: 'high' | 'low';
  N: 'high' | 'low';
}

interface PersonalityTypeData {
  name: string;
  emoji: string;
  tagline: string;
  code: string;
  quote: { text: string; author: string };
  bigFive: BigFive;
}

interface CategoryData {
  name: string;
  color: string;
  colorLight: string;
  bgColor: string;
}

interface Props {
  personalityType: PersonalityTypeData;
  category: CategoryData;
  avatarUrl: string;
  categoryLogoUrl?: string;
  userName?: string;
  customTagline?: string;
  variant?: 'compact' | 'full';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'full',
  userName: 'Utilisateur'
});

const displayTagline = computed(() => props.customTagline || props.personalityType.tagline);

const cardRef = ref(null);
const { elementX, elementY, elementWidth, elementHeight, isOutside } = useMouseInElement(cardRef);

// 3D Tilt Logic
const cardTransform = computed(() => {
  if (isOutside.value) return 'rotateX(0deg) rotateY(0deg) scale(1)';

  const MAX_ROTATION = 6;
  const x = (elementY.value / elementHeight.value - 0.5) * -MAX_ROTATION;
  const y = (elementX.value / elementWidth.value - 0.5) * MAX_ROTATION;

  return `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(1.02)`;
});

const flareStyle = computed(() => {
  if (isOutside.value) return { opacity: 0 };
  const x = (elementX.value / elementWidth.value) * 100;
  const y = (elementY.value / elementHeight.value) * 100;
  return {
    background: `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
    opacity: 1
  };
});

const traits = [
  { key: 'O', label: 'Ouverture' },
  { key: 'C', label: 'Conscience' },
  { key: 'E', label: 'Extraversion' },
  { key: 'A', label: 'Agr\u00e9abilit\u00e9' },
  { key: 'N', label: 'Stabilit\u00e9' },
];

const getTraitLevel = (key: keyof BigFive) => props.personalityType.bigFive[key] === 'high';
</script>

<template>
  <div class="flex items-center justify-center p-4 antialiased">
    <div
      ref="cardRef"
      class="relative transition-all duration-300 ease-out"
      :style="{ transform: cardTransform }"
      :class="[
        variant === 'full' ? 'w-[360px]' : 'w-[280px]',
      ]"
    >
      <!-- Background Glow (Matching Category) -->
      <div
        class="absolute -inset-4 rounded-[3rem] blur-2xl opacity-20 transition-opacity duration-500"
        :style="{ backgroundColor: category.color }"
      ></div>

      <!-- Main Card Container -->
      <div
        class="relative overflow-hidden rounded-[2.5rem] border border-white/40 bg-white shadow-2xl transition-shadow duration-500"
        :class="isOutside ? 'shadow-sm' : 'shadow-[#8B2D4A]/10'"
      >
        <!-- Top Lighting Layer -->
        <div
          class="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
          :style="flareStyle"
        ></div>

        <!-- Card Pattern Background -->
        <div class="absolute inset-0 z-0 opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="geo-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 0L40 20L20 40L0 20Z" :fill="category.color" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geo-pattern)" />
          </svg>
        </div>

        <!-- Card Content -->
        <div class="relative z-10 flex flex-col p-6 h-full">

          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-2">
              <div
                class="flex h-6 w-6 items-center justify-center rounded-full"
                :style="{ backgroundColor: category.color + '1a' }"
              >
                <img :src="logoImage" alt="" class="h-3.5 w-3.5 object-contain" />
              </div>
              <span class="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                COMPAATIBLE
              </span>
            </div>
            <div
              class="rounded-full px-3 py-1 text-[9px] font-semibold tracking-wide uppercase shadow-sm"
              :style="{ backgroundColor: category.color, color: '#FEFEFE' }"
            >
              {{ category.name }}
            </div>
          </div>

          <!-- Avatar Section -->
          <div class="relative flex flex-col items-center justify-center py-4">
            <div class="absolute inset-0 flex items-center justify-center opacity-10">
               <div class="h-48 w-48 rounded-full blur-3xl" :style="{ backgroundColor: category.color }"></div>
            </div>

            <div class="relative z-10 flex h-32 w-32 items-center justify-center rounded-full bg-slate-50 p-2 shadow-inner ring-4 ring-white">
              <img :src="avatarUrl" alt="Personality Avatar" class="h-full w-full object-contain" />
            </div>

            <div class="mt-4 text-center">
              <div class="inline-flex items-center gap-2 mb-1">
                <img v-if="categoryLogoUrl" :src="categoryLogoUrl" :alt="category.name" class="h-6 w-6 object-contain" />
                <span v-else class="text-2xl">{{ personalityType.emoji }}</span>
                <h3 class="font-serif text-2xl font-bold text-[#1A1A1A]">
                  {{ personalityType.name }}
                </h3>
              </div>
              <p class="font-quote text-sm italic text-slate-500 opacity-80">
                "{{ displayTagline }}"
              </p>
            </div>
          </div>

          <!-- Traits Section (Only for Full Variant) -->
          <div v-if="variant === 'full'" class="mt-6 space-y-3 rounded-2xl bg-slate-50/50 p-4 border border-slate-100">
            <div class="flex items-center justify-between mb-1">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Profil Big Five</span>
              <Info class="h-3 w-3 text-slate-300" />
            </div>

            <div class="grid grid-cols-1 gap-2">
              <div v-for="trait in traits" :key="trait.key" class="flex items-center justify-between">
                <span class="text-[11px] font-medium text-slate-600">{{ trait.label }}</span>
                <div class="flex gap-1">
                  <div
                    v-for="i in 5" :key="i"
                    class="h-1.5 w-4 rounded-full transition-all duration-700"
                    :class="[
                      getTraitLevel(trait.key as keyof BigFive)
                        ? (i <= 4 ? 'opacity-100' : 'opacity-20')
                        : (i <= 2 ? 'opacity-100' : 'opacity-20')
                    ]"
                    :style="{ backgroundColor: getTraitLevel(trait.key as keyof BigFive) ? category.color : '#CBD5E1' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quote Section -->
          <div class="mt-6 border-t border-slate-100 pt-6">
            <blockquote class="text-center">
              <p class="font-quote text-sm leading-relaxed text-slate-600 italic">
                "{{ personalityType.quote.text }}"
              </p>
              <footer class="mt-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                — {{ personalityType.quote.author }}
              </footer>
            </blockquote>
          </div>

          <!-- Footer Action -->
          <div class="mt-auto pt-6 flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-[9px] font-bold uppercase tracking-wider text-slate-300">Carte de</span>
              <span class="font-serif text-sm font-semibold text-[#1A1A1A]">{{ userName }}</span>
            </div>

            <button
              class="group flex h-10 items-center gap-2 rounded-full border border-slate-100 bg-white px-4 py-2 text-[11px] font-semibold text-slate-600 transition-all hover:border-[#8B2D4A]/20 hover:text-[#8B2D4A] hover:shadow-md active:scale-95"
            >
              <Share2 class="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
              Partager ma carte
            </button>
          </div>
        </div>

        <!-- Decorative Card Border Glow -->
        <div
          class="pointer-events-none absolute inset-0 z-40 rounded-[2.5rem] border-2 border-transparent transition-colors duration-500"
          :style="{ borderColor: isOutside ? 'transparent' : category.color + '1a' }"
        ></div>
      </div>

      <!-- Decorative type code label -->
      <div class="mt-4 flex items-center justify-center gap-2 opacity-50">
        <Sparkles class="h-3 w-3 text-[#8B2D4A]" />
        <span class="font-mono text-[11px] font-medium text-slate-400 tracking-widest">{{ personalityType.code }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-quote {
  font-family: 'Cormorant Garamond', serif;
}

blockquote p {
  font-family: 'Cormorant Garamond', serif;
}

/* Custom shadow for inner card depth */
.shadow-inner {
  box-shadow: inset 0 2px 8px 0 rgba(0, 0, 0, 0.05);
}

/* Smooth reveal animation for traits */
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-4px); }
  to { opacity: 1; transform: translateX(0); }
}

.grid > div {
  animation: slideIn 0.5s ease-out forwards;
}

.grid > div:nth-child(2) { animation-delay: 0.1s; }
.grid > div:nth-child(3) { animation-delay: 0.2s; }
.grid > div:nth-child(4) { animation-delay: 0.3s; }
.grid > div:nth-child(5) { animation-delay: 0.4s; }
</style>
