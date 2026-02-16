<script setup lang="ts">
import { ref } from 'vue'
import FadeInSection from './FadeInSection.vue'

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: 'Comment ça marche concrètement ?',
    answer: 'Inscris-toi, passe le test de personnalité (environ 15 minutes), et laisse-nous faire. Le 13 de chaque mois, tu reçois tes 3 matchs classés par compatibilité. Pas de swipe, pas de profil à optimiser. Juste toi, tel que tu es.'
  },
  {
    question: 'À quoi servent les 16 types de personnalité ?',
    answer: 'Chaque type de personnalité a ses forces, ses zones de fragilité et surtout ses compatibilités naturelles. Ton type t\'aide à comprendre comment tu aimes, ce dont tu as besoin, et avec quel profil tu as le plus de chances de construire quelque chose de durable. Nous avons écrit des articles détaillés sur chaque type et leurs compatibilités, consultables dans l\'onglet Blog.'
  },
  {
    question: 'C\'est fiable scientifiquement ?',
    answer: 'Notre test repose sur le modèle Big Five (OCEAN), utilisé dans plus de 3 000 études scientifiques à travers le monde. C\'est la référence en psychologie de la personnalité depuis plus de 40 ans. On n\'a rien inventé, on l\'a juste appliqué à l\'amour.'
  },
  {
    question: 'Pourquoi le 13 du mois ?',
    answer: 'On ne fonctionne pas comme les autres apps. Au lieu de te noyer sous les profils, on prend le temps d\'analyser les compatibilités entre tous les participants. Cette fenêtre mensuelle garantit un pool suffisant pour des matchs de qualité.'
  },
  {
    question: 'C\'est disponible dans ma ville ?',
    answer: 'Compaatible est disponible partout en France. Notre algorithme prend en compte ta localisation pour te proposer des matchs accessibles géographiquement, tout en priorisant la compatibilité de personnalité.'
  }
]

const activeIndex = ref<number | null>(null)

const toggleItem = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

const contentStyle = (index: number) => {
  return {
    gridTemplateRows: activeIndex.value === index ? '1fr' : '0fr',
    opacity: activeIndex.value === index ? '1' : '0',
  }
}
</script>

<template>
  <section id="faq" class="faq-section">
    <!-- Decorative background elements -->
    <div class="decorative-blur top-right"></div>
    <div class="decorative-blur bottom-left"></div>

    <div class="container-main">
      <header class="faq-header">
        <span class="faq-label">FAQ</span>
        <h2 class="faq-title">Questions fréquentes</h2>
        <p class="faq-subtitle">Tout ce que tu dois savoir avant de te lancer.</p>
      </header>

      <div class="faq-grid">
        <FadeInSection v-for="(item, index) in faqItems" :key="index">
          <div
            class="faq-card"
            :class="{ 'is-open': activeIndex === index }"
            @click="toggleItem(index)"
          >
            <button
              class="faq-trigger"
              :aria-expanded="activeIndex === index"
              type="button"
            >
              <span class="faq-question">{{ item.question }}</span>
              <span class="faq-icon-box">
                <svg
                  class="chevron-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </button>

            <div class="faq-content-wrapper" :style="contentStyle(index)">
              <div class="faq-content-inner">
                <p class="faq-answer">{{ item.answer }}</p>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-section {
  position: relative;
  background-color: #FFFFFF;
  padding: 120px 24px;
  overflow: hidden;
}

/* DECORATIVE ELEMENTS */
.decorative-blur {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
}

.top-right {
  top: -20%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.05) 0%, transparent 70%);
}

.bottom-left {
  bottom: -10%;
  left: -5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.03) 0%, transparent 70%);
}

/* HEADER */
.faq-header {
  text-align: center;
  margin-bottom: 64px;
  position: relative;
  z-index: 2;
}

.faq-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(139, 45, 74, 0.05);
  padding: 6px 16px;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-red-pure);
  margin-bottom: 24px;
}

.faq-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  color: #1A1A1A;
  font-weight: 600;
  margin-bottom: 16px;
  line-height: 1.2;
}

.faq-subtitle {
  font-family: 'Playfair Display', serif;
  font-size: 1.15rem;
  color: #64748b;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
}

/* FAQ GRID & CARDS */
.faq-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.faq-card {
  background: var(--color-white);
  border: none;
  border-radius: 20px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: var(--shadow-card);
}

/* Red accent bar */
.faq-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--color-red-pure);
  transform: scaleY(0);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: center;
  z-index: 1;
}

.faq-card:hover {
  transform: translateY(-4px);
  border-color: rgba(139, 45, 74, 0.2);
  box-shadow: var(--shadow-elevated);
}

.faq-card:hover::before {
  transform: scaleY(0.4);
}

.faq-card.is-open {
  background: white;
  border-color: rgba(139, 45, 74, 0.15);
  box-shadow: var(--shadow-elevated);
}

.faq-card.is-open::before {
  transform: scaleY(1);
}

/* TRIGGER (QUESTION) */
.faq-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  outline: none;
}

.faq-question {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #334155;
  padding-right: 20px;
  transition: color 0.3s ease;
}

.is-open .faq-question {
  color: var(--color-red-pure);
}

.faq-icon-box {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gray-lighter);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.is-open .faq-icon-box {
  background: rgba(139, 45, 74, 0.1);
  transform: rotate(180deg);
}

.chevron-icon {
  width: 18px;
  height: 18px;
  color: var(--color-gray-dark);
  transition: color 0.3s ease;
}

.is-open .chevron-icon {
  color: var(--color-red-pure);
}

/* CONTENT (ANSWER) */
.faq-content-wrapper {
  display: grid;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.faq-content-inner {
  overflow: hidden;
}

.faq-answer {
  padding: 0 32px 32px 32px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.7;
  color: #64748b;
  font-weight: 300;
  max-width: 90%;
}

/* RESPONSIVE */
@media (max-width: 600px) {
  .faq-section {
    padding: 80px 16px;
  }

  .faq-header {
    margin-bottom: 48px;
  }

  .faq-trigger {
    padding: 20px;
  }

  .faq-question {
    font-size: 1.1rem;
  }

  .faq-answer {
    padding: 0 20px 24px 20px;
    font-size: 0.95rem;
    max-width: 100%;
  }

  .faq-title {
    font-size: 2rem;
  }

  .faq-subtitle {
    font-size: 1rem;
  }

  .faq-icon-box {
    width: 28px;
    height: 28px;
  }

  .chevron-icon {
    width: 16px;
    height: 16px;
  }
}

/* ACCESSIBILITY */
.faq-trigger:focus-visible {
  box-shadow: inset 0 0 0 2px rgba(139, 45, 74, 0.4);
  border-radius: 20px;
}
</style>
