<script setup lang="ts">
import FadeInSection from './FadeInSection.vue'

const profiles = [
  {
    emoji: '😩',
    title: 'Tu es fatigué(e) des apps classiques',
    description: 'Swiper des heures pour des conversations qui ne mènent nulle part ? C\'est terminé. Ici, chaque match compte.'
  },
  {
    emoji: '🔒',
    title: 'Tu veux rester discret(e)',
    description: 'Pas envie que tes collègues ou ton ex te croisent sur une app ? Ton profil est invisible jusqu\'au match.'
  },
  {
    emoji: '🧠',
    title: 'Tu crois en la compatibilité profonde',
    description: 'Les apparences c\'est bien, mais les valeurs, la vision de vie, l\'humour... c\'est ça qui fait durer un couple.'
  },
  {
    emoji: '💝',
    title: 'Tu veux une relation sérieuse',
    description: 'Pas de plans d\'un soir ici. Compaatible est conçu pour ceux qui cherchent l\'amour, le vrai.'
  }
]
</script>

<template>
  <section class="py-24 bg-white-cream">
    <div class="container-main">
      <!-- Header -->
      <div class="text-center max-w-2xl mx-auto mb-16">
        <span class="section-label">Pour qui ?</span>
        <h2 class="text-3xl md:text-4xl lg:text-5xl text-black mb-5">Compaatible est fait pour toi si...</h2>
        <p class="text-lg text-gray-dark">
          Tu ne cherches pas juste un date. Tu cherches quelqu'un avec qui construire quelque chose de vrai.
        </p>
      </div>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FadeInSection v-for="(profile, index) in profiles" :key="index">
          <div class="bg-white p-9 rounded-3xl border-2 border-transparent relative overflow-hidden transition-all duration-300 hover:border-red-pure hover:-translate-y-1 group h-full">
            <!-- Left accent bar -->
            <div class="absolute top-0 left-0 w-1 h-full bg-red-pure transform scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100"></div>

            <div class="text-4xl mb-5">{{ profile.emoji }}</div>
            <h3 class="text-xl font-serif font-semibold text-black mb-3">{{ profile.title }}</h3>
            <p class="text-gray-dark text-sm leading-relaxed">{{ profile.description }}</p>
          </div>
        </FadeInSection>
      </div>
    </div>
  </section>
</template>
