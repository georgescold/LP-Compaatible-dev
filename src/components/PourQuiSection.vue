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

<style scoped>
/* Tablet */
@media (max-width: 768px) {
  section :deep(.py-24) {
    padding-top: 4rem !important;
    padding-bottom: 4rem !important;
  }

  section :deep(.mb-16) {
    margin-bottom: 2.5rem !important;
  }

  section :deep(.text-3xl),
  section :deep(.md\:text-4xl),
  section :deep(.lg\:text-5xl) {
    font-size: 1.75rem !important;
  }

  section :deep(.text-lg) {
    font-size: 1rem !important;
  }

  section :deep(.gap-6) {
    gap: 16px !important;
  }
}

/* Small mobile */
@media (max-width: 480px) {
  section :deep(.py-24) {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }

  section :deep(.text-3xl) {
    font-size: 1.5rem !important;
  }

  section :deep(.text-lg) {
    font-size: 0.9rem !important;
  }

  section :deep(.p-9) {
    padding: 1.25rem !important;
  }

  section :deep(.text-xl) {
    font-size: 1.1rem !important;
  }

  section :deep(.text-sm) {
    font-size: 0.8rem !important;
  }

  section :deep(.text-4xl) {
    font-size: 2rem !important;
  }
}

/* Very small mobile (iPhone SE, Galaxy S) */
@media (max-width: 360px) {
  section :deep(.text-3xl) {
    font-size: 1.3rem !important;
  }

  section :deep(.mb-5) {
    margin-bottom: 0.75rem !important;
  }

  section :deep(.p-9) {
    padding: 1rem !important;
  }

  section :deep(.text-xl) {
    font-size: 1rem !important;
  }

  section :deep(.text-sm) {
    font-size: 0.75rem !important;
  }

  section :deep(.mb-16) {
    margin-bottom: 2rem !important;
  }
}
</style>
