<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import womanPhoto from '../assets/smiling-blonde-woman-laughing-street-cheerfully-lovely-young-lady-feeling-happy-autumn-park-compressed.jpg'
import manPhoto from '../assets/young-hispanic-man-smiling-confident-standing-street-compressed.jpg'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const hasAnimated = ref(false)
const currentPercentage = ref(0)
const targetPercentage = 86

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.value) {
          isVisible.value = true
          setTimeout(() => animatePercentage(), 800)
          hasAnimated.value = true
        }
      })
    },
    { threshold: 0.3 }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

function animatePercentage() {
  const duration = 2500
  const startTime = Date.now()

  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOut = 1 - Math.pow(1 - progress, 4)
    currentPercentage.value = Math.round(easeOut * targetPercentage)

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}
</script>

<template>
  <section ref="sectionRef" class="matching-preview" :class="{ 'is-visible': isVisible }">
    <div class="container-main">
      <!-- Section Label -->
      <span class="section-label">Le pouvoir du matching</span>

      <!-- Main Matching Visual -->
      <div class="matching-container">
        <!-- Left Profile (Woman) -->
        <div class="profile profile-left">
          <div class="profile-image">
            <img :src="womanPhoto" alt="Sophie" />
          </div>
          <div class="profile-info">
            <span class="profile-name">Sophie, 28 ans</span>
            <span class="profile-city">Bordeaux</span>
          </div>
        </div>

        <!-- Connection Area -->
        <div class="connection-area">
          <!-- Animated hearts -->
          <div class="hearts-container">
            <span class="heart" v-for="n in 5" :key="n">❤</span>
          </div>

          <!-- Connection line -->
          <div class="connection-line">
            <svg viewBox="0 0 200 20" preserveAspectRatio="none">
              <path class="line-bg" d="M0,10 Q50,0 100,10 Q150,20 200,10" />
              <path class="line-animated" d="M0,10 Q50,0 100,10 Q150,20 200,10" />
            </svg>
          </div>

          <!-- Percentage Circle -->
          <div class="percentage-container">
            <div class="percentage-circle">
              <svg viewBox="0 0 100 100">
                <circle class="circle-bg" cx="50" cy="50" r="45" />
                <circle
                  class="circle-progress"
                  cx="50"
                  cy="50"
                  r="45"
                  :style="{ strokeDashoffset: 283 - (283 * currentPercentage / 100) }"
                />
              </svg>
              <div class="percentage-text">
                <span class="percentage-number">{{ currentPercentage }}</span>
                <span class="percentage-symbol">%</span>
              </div>
            </div>
            <span class="percentage-label">Compatibilité</span>
          </div>
        </div>

        <!-- Right Profile (Man) -->
        <div class="profile profile-right">
          <div class="profile-image">
            <img :src="manPhoto" alt="Thomas" />
          </div>
          <div class="profile-info">
            <span class="profile-name">Thomas, 31 ans</span>
            <span class="profile-city">Toulouse</span>
          </div>
        </div>
      </div>

      <!-- Compatibility traits -->
      <div class="compatibility-traits">
        <div class="trait" v-for="(trait, index) in ['Valeurs communes', 'Humour partagé', 'Style de vie', 'Vision du futur']" :key="index" :style="{ transitionDelay: `${1.2 + index * 0.15}s` }">
          <span class="trait-icon">
            <svg v-if="index === 0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <svg v-else-if="index === 1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
              <line x1="9" y1="9" x2="9.01" y2="9"/>
              <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
            <svg v-else-if="index === 2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </span>
          <span class="trait-text">{{ trait }}</span>
          <span class="trait-check">✓</span>
        </div>
      </div>

      <!-- Tagline -->
      <p class="matching-tagline">
        Notre méthode analyse <strong>30 dimensions de personnalité</strong> pour trouver votre match idéal.
      </p>
    </div>
  </section>
</template>

<style scoped>
.matching-preview {
  padding: 80px 0 100px;
  background: linear-gradient(180deg, var(--color-white) 0%, var(--color-white-cream) 100%);
  position: relative;
  overflow: hidden;
}

.matching-preview::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(153, 0, 27, 0.04) 0%, transparent 70%);
  pointer-events: none;
}

.container-main {
  position: relative;
  z-index: 1;
  text-align: center;
}

.section-label {
  display: inline-block;
  color: var(--color-red-pure);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 40px;
}

/* Matching Container */
.matching-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 50px;
}

/* Profile Styles */
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.profile-left {
  transform: translateX(-40px);
}

.profile-right {
  transform: translateX(40px);
}

.is-visible .profile-left {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 0.3s;
}

.is-visible .profile-right {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 0.5s;
}

.profile-image {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid white;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.profile-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-black);
}

.profile-city {
  font-size: 0.85rem;
  color: var(--color-gray-dark);
  font-weight: 500;
}

/* Connection Area */
.connection-area {
  position: relative;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Hearts animation */
.hearts-container {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: visible;
}

.heart {
  position: absolute;
  font-size: 12px;
  opacity: 0;
  color: var(--color-red-pure);
}

.is-visible .heart:nth-child(1) {
  top: 10%;
  left: 20%;
  animation: floatHeart 4s ease-in-out infinite 1.5s;
}

.is-visible .heart:nth-child(2) {
  top: 70%;
  left: 15%;
  animation: floatHeart 3.5s ease-in-out infinite 2s;
}

.is-visible .heart:nth-child(3) {
  top: 20%;
  right: 15%;
  animation: floatHeart 4.2s ease-in-out infinite 1.8s;
}

.is-visible .heart:nth-child(4) {
  top: 65%;
  right: 20%;
  animation: floatHeart 3.8s ease-in-out infinite 2.3s;
}

.is-visible .heart:nth-child(5) {
  top: 40%;
  left: 5%;
  animation: floatHeart 3.2s ease-in-out infinite 2.6s;
}

@keyframes floatHeart {
  0%, 100% {
    opacity: 0;
    transform: translateY(0) scale(0.5);
  }
  20% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
    transform: translateY(-20px) scale(1);
  }
  80% {
    opacity: 0.7;
  }
}

/* Connection Line */
.connection-line {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.connection-line svg {
  width: 100%;
  height: 20px;
}

.line-bg {
  fill: none;
  stroke: var(--color-gray-light);
  stroke-width: 2;
}

.line-animated {
  fill: none;
  stroke: var(--color-red-pure);
  stroke-width: 3;
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  filter: drop-shadow(0 0 3px rgba(153, 0, 27, 0.3));
}

.is-visible .line-animated {
  animation: drawLine 1.5s ease-out forwards 0.8s;
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}

/* Percentage Circle */
.percentage-container {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.is-visible .percentage-container {
  opacity: 1;
  transform: scale(1);
  transition-delay: 0.6s;
}

.percentage-circle {
  width: 120px;
  height: 120px;
  position: relative;
  background: white;
  border-radius: 50%;
  box-shadow: 0 15px 50px rgba(153, 0, 27, 0.15);
}

.percentage-circle svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.circle-bg {
  fill: none;
  stroke: var(--color-gray-light);
  stroke-width: 6;
}

.circle-progress {
  fill: none;
  stroke: var(--color-red-pure);
  stroke-width: 6;
  stroke-linecap: round;
  stroke-dasharray: 283;
  transition: stroke-dashoffset 0.05s linear;
  filter: drop-shadow(0 0 4px rgba(153, 0, 27, 0.4));
}

.percentage-text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
}

.percentage-number {
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--color-red-pure);
  line-height: 1;
}

.percentage-symbol {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-red-pure);
  margin-top: 5px;
}

.percentage-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-black);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.is-visible .percentage-label {
  opacity: 1;
  transition-delay: 1.5s;
}

/* Compatibility Traits */
.compatibility-traits {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.trait {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: white;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  cursor: default;
  opacity: 0;
  transform: translateY(15px);
  transition: all 0.5s ease;
}

.is-visible .trait {
  opacity: 1;
  transform: translateY(0);
}

.trait-icon {
  width: 20px;
  height: 20px;
  color: var(--color-red-pure);
}

.trait-icon svg {
  width: 100%;
  height: 100%;
}

.trait-text {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-black);
}

.trait-check {
  width: 18px;
  height: 18px;
  background: var(--color-red-pure);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
}

/* Tagline */
.matching-tagline {
  font-size: 1.1rem;
  color: var(--color-gray-dark);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
}

.matching-tagline strong {
  color: var(--color-black);
}

/* Responsive */
@media (max-width: 768px) {
  .matching-preview {
    padding: 60px 0 80px;
  }

  .matching-container {
    flex-direction: column;
    gap: 30px;
  }

  .profile-left, .profile-right {
    transform: translateY(30px);
  }

  .is-visible .profile-left,
  .is-visible .profile-right {
    transform: translateY(0);
  }

  .connection-area {
    width: 100%;
    height: 150px;
  }

  .connection-line {
    transform: rotate(90deg);
    width: 150px;
    left: 50%;
    margin-left: -75px;
  }

  .profile-image {
    width: 120px;
    height: 120px;
  }

  .percentage-circle {
    width: 100px;
    height: 100px;
  }

  .percentage-number {
    font-size: 1.8rem;
  }

  .compatibility-traits {
    gap: 12px;
  }

  .trait {
    padding: 8px 14px;
  }

  .trait-text {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .profile-image {
    width: 100px;
    height: 100px;
  }

  .profile-name {
    font-size: 1rem;
  }

  .percentage-circle {
    width: 90px;
    height: 90px;
  }

  .percentage-number {
    font-size: 1.5rem;
  }

  .trait {
    padding: 6px 12px;
  }

  .trait-icon {
    width: 16px;
    height: 16px;
  }

  .trait-text {
    font-size: 0.75rem;
  }

  .trait-check {
    width: 14px;
    height: 14px;
    font-size: 8px;
  }
}
</style>
