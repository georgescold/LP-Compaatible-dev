<script setup lang="ts">
import { ref, computed } from 'vue';
import { MapPin, Send } from 'lucide-vue-next';
import logoImage from '@/assets/nouveau logo compaatible.png';
import { HOBBIES } from '@/data/hobbies';
import smsIcon from '@/assets/sms-icon.png';
import instaIcon from '@/assets/Instagram_icon.png';

interface User {
  firstName: string;
  age: number;
  city: string;
  photoUrl?: string;
  phone: string;
  instagram: string;
  showPhone?: boolean;
  showInstagram?: boolean;
  job?: string;
  bannerColor?: string;
}

interface PersonalityTypeData {
  name: string;
  emoji: string;
  tagline?: string;
}

interface CategoryData {
  name: string;
  color: string;
  bgColor: string;
}

const props = defineProps<{
  user: User;
  hobbies: string[];
  personalityType?: PersonalityTypeData;
  category?: CategoryData;
  categoryLogoUrl?: string;
  avatarUrl?: string;
  customTagline?: string;
}>();

const contactRevealed = ref(false)

function revealContact() {
  contactRevealed.value = true
}

// Contact logic
const showSmsOnReveal = computed(() => props.user.showPhone !== false)
const showInstaOnReveal = computed(() => props.user.showInstagram !== false && !!props.user.instagram)

// Resolve hobby IDs to full objects { id, label, emoji }
const resolvedHobbies = computed(() => {
  return HOBBIES.filter(hobby => props.hobbies.includes(hobby.id));
});

const getInitials = (name: string) => {
  return name.charAt(0).toUpperCase();
};

// Display tagline: custom if chosen, otherwise default from personality type
const displayTagline = computed(() => props.customTagline || props.personalityType?.tagline || '')

// Category color
const categoryColor = computed(() => props.category?.color || props.user.bannerColor || '#8B2D4A')
</script>

<template>
  <div class="flex justify-center px-5 py-6">
    <div class="relative w-full max-w-[320px] overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-100">

      <!-- Diamond Pattern Background -->
      <div class="pointer-events-none absolute inset-0 z-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="usercard-damier" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 0L40 20L20 40L0 20Z" :fill="categoryColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#usercard-damier)" />
        </svg>
      </div>

      <!-- PHOTO -->
      <div class="relative z-10 aspect-square w-full overflow-hidden">
        <template v-if="user.photoUrl">
          <img
            :src="user.photoUrl"
            :alt="user.firstName"
            class="h-full w-full object-cover"
          />
        </template>
        <div v-else class="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#F0D5C8] to-[#C4637A]">
          <span class="font-serif text-5xl font-bold text-white opacity-40">{{ getInitials(user.firstName) }}</span>
        </div>

        <!-- Verified Badge -->
        <div class="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 backdrop-blur-sm">
          <img :src="logoImage" alt="" class="h-3 w-3 object-contain" />
          <span class="text-[9px] font-bold tracking-wider text-slate-800 uppercase">Profil vérifié</span>
        </div>
      </div>

      <!-- CONTENT -->
      <div class="relative z-10 flex flex-col items-center px-5 pt-4 pb-5 text-center">

        <!-- Name & Age -->
        <h2 class="font-serif text-2xl font-bold text-[#1A1A1A]">
          {{ user.firstName }}, {{ user.age }}
        </h2>

        <!-- City -->
        <div class="mt-1 flex items-center gap-1 text-[10px] font-medium tracking-[0.1em] text-slate-400 uppercase">
          <MapPin class="h-3 w-3" stroke-width="2.5" />
          {{ user.city }}
        </div>

        <!-- Personality Section -->
        <div v-if="personalityType" class="mt-4 flex w-full flex-col items-center rounded-2xl py-3 px-4" :style="{ backgroundColor: categoryColor + '0a' }">
          <div class="flex items-center gap-2.5">
            <img
              v-if="avatarUrl"
              :src="avatarUrl"
              class="h-8 w-8 shrink-0 object-contain"
              alt=""
            />
            <div class="flex flex-col items-start">
              <span class="font-serif text-[15px] font-bold text-[#1A1A1A] leading-tight">
                {{ personalityType.name }}
              </span>
              <span
                v-if="category"
                class="mt-0.5 text-[10px] font-semibold uppercase tracking-wide"
                :style="{ color: categoryColor }"
              >
                {{ category.name }}
              </span>
            </div>
          </div>
        </div>

        <!-- Citation -->
        <p v-if="displayTagline" class="mt-3 font-quote text-[13px] leading-relaxed text-slate-400 italic">
          « {{ displayTagline }} »
        </p>

        <!-- Hobbies -->
        <div class="mt-3 flex flex-wrap justify-center gap-1.5">
          <span
            v-for="hobby in resolvedHobbies"
            :key="hobby.id"
            class="inline-flex items-center gap-1 rounded-full bg-[#FBF9F7] px-3 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-slate-100"
          >
            <span>{{ hobby.emoji }}</span>
            <span>{{ hobby.label }}</span>
          </span>
          <span v-if="resolvedHobbies.length === 0" class="text-[11px] italic text-slate-400">
            Aucune passion renseignée
          </span>
        </div>

        <!-- Contact -->
        <div class="mt-5 w-full">
          <!-- CTA button -->
          <button
            v-if="!contactRevealed"
            @click="revealContact"
            class="flex w-full items-center justify-center gap-2 rounded-full bg-[#8B2D4A] py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#A03558] active:scale-[0.98]"
          >
            <Send class="h-3.5 w-3.5" />
            Envoyer un message
          </button>

          <!-- Revealed contacts -->
          <div v-else class="flex w-full gap-2 animate-reveal">
            <a
              v-if="showSmsOnReveal"
              :href="`sms:${user.phone}`"
              class="flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-900 py-3 text-xs font-semibold text-white transition-all hover:bg-black active:scale-[0.98]"
            >
              <img :src="smsIcon" alt="SMS" class="h-4 w-4 object-contain" />
              SMS
            </a>
            <a
              v-if="showInstaOnReveal"
              :href="`https://instagram.com/${user.instagram.replace('@', '')}`"
              target="_blank"
              class="flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white py-3 text-xs font-semibold text-slate-800 transition-all hover:border-slate-900 active:scale-[0.98]"
            >
              <img :src="instaIcon" alt="Instagram" class="h-4 w-4 object-contain" />
              Instagram
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.font-quote {
  font-family: 'Cormorant Garamond', serif;
}

@keyframes revealFade {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-reveal {
  animation: revealFade 0.3s ease;
}
</style>
