<script setup lang="ts">
import FadeInSection from './FadeInSection.vue'
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
              On a fait un constat simple : les relations sont devenues éphémères, consommables. Les apps de rencontre nous transforment en produits à swiper, où l'apparence prime sur tout le reste.
            </p>
            <p class="text-lg text-gray-main mb-5 leading-relaxed">
              On a voulu créer autre chose. Un espace où la compatibilité profonde prime sur l'apparence. Où la qualité remplace la quantité. Où l'amour redevient une aventure sérieuse, pas un jeu de hasard.
            </p>
            <p class="text-lg text-black font-semibold">
              Compaatible, c'est notre réponse à la solitude moderne.
            </p>
          </div>
        </FadeInSection>

        <!-- Visual Quote -->
        <FadeInSection>
          <div class="bg-gradient-to-br from-red-pure to-red-dark rounded-[30px] p-12 text-white relative overflow-hidden">
            <!-- Decorative glow -->
            <div class="absolute -top-1/2 -right-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_50%)] pointer-events-none"></div>

            <div class="relative z-10">
              <blockquote class="font-serif text-2xl italic mb-6 leading-relaxed">
                "L'amour romantique est une pulsion, aussi fondamentale que la faim ou la soif."
              </blockquote>
              <cite class="text-white/90 not-italic">- Helen Fisher, Anthropologue, Université de Rutgers</cite>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  </section>
</template>
