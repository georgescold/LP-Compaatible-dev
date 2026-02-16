<script setup lang="ts">
import { ClipboardList, Microscope } from 'lucide-vue-next'
import FadeInSection from './FadeInSection.vue'
import logoImage from '@/assets/nouveau logo compaatible.png'

interface Step {
  title: string
  description: string
  label: string
  icon: any
  isLogo?: boolean
}

const steps: Step[] = [
  {
    icon: ClipboardList,
    label: 'Du 1er au 9',
    title: 'Tu réponds au test',
    description: '15 minutes pour révéler ta personnalité profonde et ce que tu recherches vraiment.'
  },
  {
    icon: Microscope,
    label: 'Du 10 au 12',
    title: 'On analyse',
    description: 'Ton profil est comparé aux autres participants sur 30 dimensions de personnalité.'
  },
  {
    icon: null,
    isLogo: true,
    label: 'Le 13',
    title: 'Tu découvres tes matchs',
    description: 'Tu reçois 3 profils ultra-compatibles. Choisis celui qui te parle le plus et lance la conversation !'
  }
]
</script>

<template>
  <section id="process" class="how-it-works">
    <!-- Background Elements -->
    <div class="bg-decoration top-right"></div>
    <div class="bg-decoration bottom-left"></div>

    <div class="container">
      <FadeInSection>
        <div class="header">
          <span class="label">Comment ça marche</span>
          <h2 class="title">Trouve ta moitié en 3 étapes</h2>
        </div>
      </FadeInSection>

      <div class="steps-grid">
        <template v-for="(step, index) in steps" :key="index">
          <FadeInSection :delay="index * 200" class="step-wrapper">
            <div class="step-card">
              <div class="icon-container">
                <img v-if="step.isLogo" :src="logoImage" alt="" class="w-7 h-7 object-contain" />
                <component v-else :is="step.icon" :size="28" color="#FEFEFE" :stroke-width="1.5" />
              </div>

              <div class="step-content">
                <span class="step-badge">{{ step.label }}</span>
                <h3 class="step-heading">{{ step.title }}</h3>
                <p class="step-description">{{ step.description }}</p>
              </div>
            </div>
          </FadeInSection>

          <!-- Connecting Arrow (Desktop only, not after last item) -->
          <div v-if="index < steps.length - 1" class="step-connector">
            <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 12C2 12 15 2 30 12C45 22 58 12 58 12" stroke="var(--color-gray-light)" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 6"/>
              <path d="M52 7L58 12L52 17" stroke="var(--color-red-pure)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.how-it-works {
  position: relative;
  background-color: var(--color-white-cream);
  padding: 100px 24px;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* Background Atmosphere */
.bg-decoration {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
}

.top-right {
  top: -10%;
  right: -5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.05) 0%, transparent 70%);
}

.bottom-left {
  bottom: -10%;
  left: -5%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.03) 0%, transparent 70%);
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 80px;
}

.label {
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
  margin-bottom: 16px;
}

.title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 600;
  color: #1A1A1A;
  line-height: 1.2;
}

/* Grid & Layout */
.steps-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

@media (min-width: 1024px) {
  .steps-grid {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    gap: 0;
  }
}

.step-wrapper {
  flex: 1;
  max-width: 340px;
}

/* Card Style */
.step-card {
  background: rgba(255,255,255,0.8);
  padding: 44px 30px;
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: none;
  backdrop-filter: blur(8px);
}

.step-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(139, 45, 74, 0.12);
  border-color: rgba(139, 45, 74, 0.1);
}

/* Icon Container */
.icon-container {
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, var(--color-red-pure) 0%, var(--color-red-dark) 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;
  box-shadow: 0 8px 16px rgba(139, 45, 74, 0.2);
  position: relative;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.icon-container::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 24px;
  border: 1px solid rgba(139, 45, 74, 0.1);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.step-card:hover .icon-container {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(139, 45, 74, 0.25);
}

.step-card:hover .icon-container::after {
  opacity: 1;
}

/* Content */
.step-badge {
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-red-pure);
  background: rgba(139, 45, 74, 0.08);
  padding: 6px 14px;
  border-radius: 20px;
  margin-bottom: 16px;
}

.step-heading {
  font-family: 'Playfair Display', serif;
  font-size: 1.35rem;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 12px;
  line-height: 1.3;
}

.step-description {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.7;
}

/* Connector */
.step-connector {
  display: none;
  align-self: center;
  padding: 0 16px;
  opacity: 0.6;
}

@media (min-width: 1024px) {
  .step-connector {
    display: flex;
    align-items: center;
    margin-top: 60px;
  }
}

/* Tablet */
@media (max-width: 1023px) {
  .step-wrapper {
    max-width: 100%;
    width: 100%;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .how-it-works {
    padding: 70px 16px;
  }

  .header {
    margin-bottom: 50px;
  }

  .step-card {
    padding: 35px 25px;
  }

  .step-heading {
    font-size: 1.2rem;
  }
}

@media (max-width: 400px) {
  .how-it-works {
    padding: 50px 12px;
  }

  .header {
    margin-bottom: 40px;
  }

  .step-card {
    padding: 28px 20px;
    border-radius: 20px;
  }

  .icon-container {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    margin-bottom: 20px;
  }

  .step-badge {
    font-size: 0.7rem;
    padding: 5px 12px;
  }

  .step-heading {
    font-size: 1.1rem;
  }

  .step-description {
    font-size: 0.85rem;
    line-height: 1.6;
  }
}
</style>
