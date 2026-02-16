<script setup lang="ts">
import FadeInSection from './FadeInSection.vue'
import logoImage from '@/assets/nouveau logo compaatible.png'
</script>

<template>
  <section class="py-24 bg-white">
    <div class="container-main">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <!-- Text Content -->
        <FadeInSection>
          <div>
            <h2 class="text-3xl md:text-4xl lg:text-5xl text-black mb-8">Pourquoi on a créé Compaatible</h2>

            <p class="text-lg text-gray-main mb-5 leading-relaxed">
              80% des couples qui se rencontrent sur les apps classiques se séparent dans l'année. Pourquoi ? Parce que ces plateformes matchent sur l'apparence, pas sur la personnalité.
            </p>
            <p class="text-lg text-gray-main mb-5 leading-relaxed">
              On a décidé de faire l'inverse. Compaatible est la première plateforme qui analyse qui tu es vraiment grâce au <strong class="text-black">Big Five</strong>, le gold standard mondial en psychologie, et <strong class="text-black">16 profils de personnalité</strong> exclusifs créés pour révéler ta vraie nature amoureuse.
            </p>
            <p class="text-lg text-black font-semibold">
              Ici, on ne swipe pas. On se comprend.
            </p>
          </div>
        </FadeInSection>

        <!-- Visual Quote -->
        <FadeInSection>
          <div class="flex flex-col items-center gap-6">
            <!-- Logo above quote -->
            <img :src="logoImage" alt="Compaatible" class="h-12 w-12 object-contain" width="48" height="48" />

            <div class="bg-gradient-to-br from-red-pure to-red-dark rounded-[30px] p-12 text-white relative overflow-hidden w-full">
              <!-- Decorative glow -->
              <div class="absolute -top-1/2 -right-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_50%)] pointer-events-none"></div>

              <div class="relative z-10">
                <blockquote class="font-serif text-2xl italic mb-6 leading-relaxed">
                  "L'amour romantique est une pulsion, aussi fondamentale que la faim ou la soif."
                </blockquote>
                <cite class="text-white/90 not-italic">Helen Fisher, Anthropologue, Université de Rutgers</cite>
              </div>
            </div>
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

  section :deep(.gap-20) {
    gap: 3rem !important;
  }

  section :deep(.text-3xl),
  section :deep(.md\:text-4xl),
  section :deep(.lg\:text-5xl) {
    font-size: 1.75rem !important;
  }

  section :deep(.text-lg) {
    font-size: 1rem !important;
  }

  section :deep(.text-2xl) {
    font-size: 1.25rem !important;
  }

  section :deep(.p-12) {
    padding: 1.75rem !important;
  }
}

/* Small mobile */
@media (max-width: 480px) {
  section :deep(.py-24) {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }

  section :deep(.text-3xl) {
    font-size: 1.4rem !important;
  }

  section :deep(.text-lg) {
    font-size: 0.9rem !important;
  }

  section :deep(.mb-8) {
    margin-bottom: 1.25rem !important;
  }

  section :deep(.mb-5) {
    margin-bottom: 0.75rem !important;
  }

  section :deep(.p-12) {
    padding: 1.25rem !important;
  }

  section :deep(.text-2xl) {
    font-size: 1.1rem !important;
  }

  section :deep(.h-12) {
    height: 2.5rem !important;
  }

  section :deep(.w-12) {
    width: 2.5rem !important;
  }
}

/* Very small mobile */
@media (max-width: 360px) {
  section :deep(.text-3xl) {
    font-size: 1.2rem !important;
  }

  section :deep(.text-lg) {
    font-size: 0.85rem !important;
  }

  section :deep(.p-12) {
    padding: 1rem !important;
  }

  section :deep(.text-2xl) {
    font-size: 1rem !important;
  }

  section :deep(.gap-20) {
    gap: 2rem !important;
  }

  section :deep(.mb-6) {
    margin-bottom: 0.75rem !important;
  }
}
</style>
