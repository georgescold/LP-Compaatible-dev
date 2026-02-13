<script setup lang="ts">
import { ref } from 'vue'
import FadeInSection from './FadeInSection.vue'

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: 'Combien de matchs vais-je recevoir ?',
    answer: 'Tu reçois 3 matchs classés par ordre de compatibilité. Tu peux contacter celui qui te correspond le plus - ses coordonnées sont incluses. Si les deux autres t\'intriguent aussi, tu peux les débloquer individuellement pour un petit supplément. Notre priorité : des connexions qui ont vraiment du sens.'
  },
  {
    question: 'Comment calculez-vous la compatibilité ?',
    answer: 'Notre méthode d\'analyse compare tes réponses sur 30 dimensions clés de personnalité : ouverture d\'esprit, stabilité émotionnelle, convivialité, conscience, extraversion et leurs sous-facettes. Chaque profil est comparé aux autres en tenant compte de tes critères (âge, localisation, etc.). Le résultat ? Un pourcentage de compatibilité qui reflète vraiment votre potentiel ensemble.'
  },
  {
    question: 'Et si je ne trouve pas l\'amour ?',
    answer: 'Notre objectif, c\'est que tu n\'aies plus jamais besoin de nous. Mais si ça ne marche pas du premier coup, tu pourras retenter l\'expérience à un tarif réduit. On croit en notre méthode, et on veut que tu trouves la bonne personne.'
  },
  {
    question: 'Quand vais-je recevoir mes résultats ?',
    answer: 'Les matchs sont révélés le 13 de chaque mois. Du 1er au 9, les inscriptions sont ouvertes. Du 10 au 12, nous analysons les compatibilités. Le 13, tu découvres tes 3 matchs ! Tu recevras une notification dès que tes compatibilités seront disponibles.'
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
  background-color: var(--color-white-cream);
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
  background: radial-gradient(circle, rgba(153, 0, 27, 0.05) 0%, transparent 70%);
}

.bottom-left {
  bottom: -10%;
  left: -5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(153, 0, 27, 0.03) 0%, transparent 70%);
}

/* HEADER */
.faq-header {
  text-align: center;
  margin-bottom: 64px;
  position: relative;
  z-index: 2;
}

.faq-label {
  display: inline-block;
  padding: 8px 20px;
  background: white;
  border: 1px solid var(--color-gray-light);
  border-radius: 9999px;
  color: var(--color-gray-dark);
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.faq-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  color: var(--color-black);
  font-weight: 600;
  margin-bottom: 16px;
  line-height: 1.2;
}

.faq-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1.15rem;
  color: var(--color-gray-dark);
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
  border: 1px solid var(--color-gray-light);
  border-radius: 20px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
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
  border-color: rgba(153, 0, 27, 0.2);
  box-shadow: 0 12px 30px rgba(153, 0, 27, 0.06);
}

.faq-card:hover::before {
  transform: scaleY(0.4);
}

.faq-card.is-open {
  background: white;
  border-color: rgba(153, 0, 27, 0.15);
  box-shadow: 0 15px 40px rgba(153, 0, 27, 0.08);
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
  color: var(--color-black);
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
  background: rgba(153, 0, 27, 0.1);
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
  color: var(--color-gray-dark);
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
  box-shadow: inset 0 0 0 2px rgba(153, 0, 27, 0.4);
  border-radius: 20px;
}
</style>
