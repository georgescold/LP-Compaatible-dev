<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { MapPin, Heart, Smile, Users, Star, Check } from 'lucide-vue-next'
import womanPhoto from '../assets/smiling-blonde-woman-laughing-street-cheerfully-lovely-young-lady-feeling-happy-autumn-park-compressed.webp'
import manPhoto from '../assets/young-hispanic-man-smiling-confident-standing-street-compressed.webp'
import logoImage from '../assets/nouveau logo compaatible.png'
import papillonEmpathiqueAvatar from '@/assets/16 personnalités svg/le papillon empathique.svg?url'
import strategeSerenAvatar from '@/assets/16 personnalités svg/stratège serein.svg?url'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const hasAnimated = ref(false)
const currentPercentage = ref(0)
const targetPercentage = 86

const traits = [
  { label: 'Valeurs communes', icon: Heart },
  { label: 'Humour partagé', icon: Smile },
  { label: 'Style de vie', icon: Users },
  { label: 'Vision du futur', icon: Star }
]

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
  <section ref="sectionRef" class="matching-section" :class="{ 'is-visible': isVisible }">
    <!-- Decorative blurs -->
    <div class="blur-blob blur-top"></div>
    <div class="blur-blob blur-bottom"></div>

    <div class="container-main">
      <!-- Section header -->
      <div class="section-header">
        <span class="section-label">
          <Heart class="label-icon" :size="12" fill="currentColor" />
          LE POUVOIR DU MATCHING
        </span>
      </div>

      <!-- Matching Visual -->
      <div class="matching-container">
        <!-- Sophie Card -->
        <div class="profile-card card-sophie">
          <div class="card-photo">
            <img :src="womanPhoto" alt="Sophie" loading="lazy" />
            <div class="verified-badge">
              <img :src="logoImage" alt="" width="12" height="12" style="width:12px;height:12px;max-width:12px;max-height:12px;" class="verified-logo" />
              <span>Profil vérifié</span>
            </div>
          </div>

          <div class="card-body">
            <div class="diamond-pattern diamond-sophie"></div>
            <h3 class="card-name">Sophie, 28</h3>
            <div class="card-city">
              <MapPin :size="11" stroke-width="2.5" />
              Bordeaux
            </div>

            <!-- Personality -->
            <div class="personality-tag" style="background-color: rgba(45, 139, 87, 0.08);">
              <img :src="papillonEmpathiqueAvatar" alt="" width="28" height="28" style="width:28px;height:28px;max-width:28px;max-height:28px;" class="personality-avatar" />
              <div class="personality-text">
                <span class="personality-name" style="color: #2D8B57;">Le Papillon Empathique</span>
                <span class="personality-category" style="color: #2D8B57;">Âmes Lumineuses</span>
              </div>
            </div>

            <!-- Tagline -->
            <p class="card-tagline">
              « Enthousiaste infatigable qui voit la magie en chaque être qu'il rencontre. »
            </p>

            <!-- Hobbies -->
            <div class="card-hobbies">
              <span class="hobby-pill">🧘 Yoga</span>
              <span class="hobby-pill">✈️ Voyages</span>
              <span class="hobby-pill">📸 Photo</span>
              <span class="hobby-pill">🍷 Restaurants</span>
            </div>
          </div>
        </div>

        <!-- Compatibility Circle -->
        <div class="compatibility-circle">
          <!-- Floating hearts -->
          <span class="floating-heart fh-1"><Heart :size="14" fill="currentColor" /></span>
          <span class="floating-heart fh-2"><Heart :size="10" fill="currentColor" /></span>
          <span class="floating-heart fh-3"><Heart :size="12" fill="currentColor" /></span>
          <span class="floating-heart fh-4"><Heart :size="9" fill="currentColor" /></span>
          <span class="floating-heart fh-5"><Heart :size="11" fill="currentColor" /></span>

          <div class="circle-ring">
            <svg viewBox="0 0 100 100">
              <circle class="ring-bg" cx="50" cy="50" r="45" />
              <circle
                class="ring-progress"
                cx="50"
                cy="50"
                r="45"
                :style="{ strokeDashoffset: 283 - (283 * currentPercentage / 100) }"
              />
            </svg>
            <div class="circle-content">
              <span class="circle-number">{{ currentPercentage }}</span>
              <span class="circle-symbol">%</span>
            </div>
          </div>
          <span class="circle-label">Compatibilité</span>
        </div>

        <!-- Thomas Card -->
        <div class="profile-card card-thomas">
          <div class="card-photo">
            <img :src="manPhoto" alt="Thomas" loading="lazy" />
            <div class="verified-badge">
              <img :src="logoImage" alt="" width="12" height="12" style="width:12px;height:12px;max-width:12px;max-height:12px;" class="verified-logo" />
              <span>Profil vérifié</span>
            </div>
          </div>

          <div class="card-body">
            <div class="diamond-pattern diamond-thomas"></div>
            <h3 class="card-name">Thomas, 31</h3>
            <div class="card-city">
              <MapPin :size="11" stroke-width="2.5" />
              Toulouse
            </div>

            <!-- Personality -->
            <div class="personality-tag" style="background-color: rgba(107, 63, 160, 0.08);">
              <img :src="strategeSerenAvatar" alt="" width="28" height="28" style="width:28px;height:28px;max-width:28px;max-height:28px;" class="personality-avatar" />
              <div class="personality-text">
                <span class="personality-name" style="color: #6B3FA0;">Le Stratège Serein</span>
                <span class="personality-category" style="color: #6B3FA0;">Architectes du Cœur</span>
              </div>
            </div>

            <!-- Tagline -->
            <p class="card-tagline">
              « Visionnaire calme qui construit l'amour avec précision et profondeur. »
            </p>

            <!-- Hobbies -->
            <div class="card-hobbies">
              <span class="hobby-pill">📚 Lecture</span>
              <span class="hobby-pill">🎧 Musique</span>
              <span class="hobby-pill">🥾 Randonnée</span>
              <span class="hobby-pill">🍳 Cuisine</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Compatibility traits -->
      <div class="traits-row">
        <div
          v-for="(trait, index) in traits"
          :key="trait.label"
          class="trait-pill"
          :style="{ transitionDelay: `${1.2 + index * 0.15}s` }"
        >
          <span class="trait-icon-box">
            <component :is="trait.icon" :size="14" />
          </span>
          <span class="trait-text">{{ trait.label }}</span>
          <span class="trait-check">
            <Check :size="10" />
          </span>
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
.matching-section {
  padding: 80px 0 100px;
  background: linear-gradient(180deg, #FEFEFE 0%, #FBF9F7 100%);
  position: relative;
  overflow: hidden;
}

.blur-blob {
  position: absolute;
  border-radius: 9999px;
  pointer-events: none;
}

.blur-top {
  top: -6rem;
  left: -6rem;
  height: 24rem;
  width: 24rem;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.05) 0%, transparent 70%);
}

.blur-bottom {
  bottom: -4rem;
  right: -6rem;
  height: 16rem;
  width: 16rem;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.04) 0%, transparent 70%);
}

.container-main {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Header */
.section-header {
  text-align: center;
  margin-bottom: 48px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.is-visible .section-header {
  opacity: 1;
  transform: translateY(0);
}

.section-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(139, 45, 74, 0.05);
  padding: 6px 16px;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #8B2D4A;
}

.label-icon {
  margin-top: -1px;
}

/* Matching Container */
.matching-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  margin-bottom: 48px;
  position: relative;
}

/* Profile Cards */
.profile-card {
  width: 260px;
  flex-shrink: 0;
  background: #FEFEFE;
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(232, 232, 232, 0.5);
  position: relative;
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.card-sophie {
  transform: translateX(-40px) rotate(-2deg);
  z-index: 1;
}

.card-thomas {
  transform: translateX(40px) rotate(2deg);
  z-index: 1;
}

.is-visible .card-sophie {
  opacity: 1;
  transform: translateX(0) rotate(-2deg);
  transition-delay: 0.2s;
}

.is-visible .card-thomas {
  opacity: 1;
  transform: translateX(0) rotate(2deg);
  transition-delay: 0.4s;
}


/* Diamond pattern — pure CSS, no inline SVG */
.diamond-pattern {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.03;
  pointer-events: none;
  background-repeat: repeat;
  background-size: 40px 40px;
}

.diamond-sophie {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='%232D8B57'/%3E%3C/svg%3E");
}

.diamond-thomas {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='%236B3FA0'/%3E%3C/svg%3E");
}

/* Photo */
.card-photo {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  z-index: 1;
}

.card-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-photo::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.3), transparent);
  pointer-events: none;
}

.verified-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(6px);
  padding: 4px 8px;
  border-radius: 9999px;
}

.verified-logo {
  width: 12px !important;
  height: 12px !important;
  max-width: 12px !important;
  max-height: 12px !important;
  object-fit: contain;
  flex-shrink: 0;
  display: block;
}

.verified-badge span {
  font-family: 'Inter', sans-serif;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #1A1A1A;
}

/* Card body */
.card-body {
  position: relative;
  z-index: 1;
  padding: 14px 16px 18px;
  text-align: center;
  overflow: hidden;
}

.card-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0 0 2px;
  line-height: 1.2;
}

.card-city {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #787878;
  margin-bottom: 10px;
}

/* Personality tag */
.personality-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 1rem;
  margin-bottom: 8px;
  overflow: hidden;
}

.personality-avatar {
  width: 28px !important;
  height: 28px !important;
  min-width: 28px !important;
  min-height: 28px !important;
  max-width: 28px !important;
  max-height: 28px !important;
  object-fit: contain;
  flex-shrink: 0;
  display: block;
}

.personality-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.personality-name {
  font-family: 'Playfair Display', serif;
  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1.1;
}

.personality-category {
  font-family: 'Inter', sans-serif;
  font-size: 0.55rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-top: 1px;
}

/* Tagline */
.card-tagline {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 0.78rem;
  line-height: 1.35;
  color: #787878;
  margin: 0 0 10px;
}

/* Hobbies */
.card-hobbies {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
}

.hobby-pill {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 3px 8px;
  border-radius: 9999px;
  background: #FBF9F7;
  border: 1px solid rgba(232, 232, 232, 0.6);
  font-family: 'Inter', sans-serif;
  font-size: 0.58rem;
  font-weight: 500;
  color: #5C5C5C;
}

/* Compatibility Circle */
.compatibility-circle {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: 0 -24px;
  opacity: 0;
  transform: scale(0.7);
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.is-visible .compatibility-circle {
  opacity: 1;
  transform: scale(1);
  transition-delay: 0.5s;
}

/* Floating hearts around the circle */
.floating-heart {
  position: absolute;
  color: #8B2D4A;
  opacity: 0;
  pointer-events: none;
  filter: drop-shadow(0 1px 3px rgba(139, 45, 74, 0.15));
}

.is-visible .floating-heart {
  animation: heartPulseFloat 3s ease-in-out infinite;
}

.fh-1 {
  top: -8px;
  right: 8px;
  opacity: 0;
}
.is-visible .fh-1 {
  animation-delay: 1.2s;
}

.fh-2 {
  top: 20px;
  left: -6px;
  opacity: 0;
}
.is-visible .fh-2 {
  animation-delay: 1.6s;
}

.fh-3 {
  bottom: 28px;
  right: -10px;
  opacity: 0;
}
.is-visible .fh-3 {
  animation-delay: 2s;
}

.fh-4 {
  bottom: 8px;
  left: 4px;
  opacity: 0;
}
.is-visible .fh-4 {
  animation-delay: 1.4s;
}

.fh-5 {
  top: 50%;
  right: -14px;
  transform: translateY(-50%);
  opacity: 0;
}
.is-visible .fh-5 {
  animation-delay: 1.8s;
}

@keyframes heartPulseFloat {
  0% {
    opacity: 0;
    transform: translateY(4px) scale(0.7);
  }
  15% {
    opacity: 0.6;
    transform: translateY(0) scale(1);
  }
  50% {
    opacity: 0.4;
    transform: translateY(-3px) scale(0.9);
  }
  85% {
    opacity: 0.6;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(4px) scale(0.7);
  }
}

.circle-ring {
  width: 120px;
  height: 120px;
  position: relative;
  background: #FEFEFE;
  border-radius: 50%;
  box-shadow:
    0 12px 40px rgba(139, 45, 74, 0.14),
    0 0 60px rgba(139, 45, 74, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle-ring svg {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.ring-bg {
  fill: none;
  stroke: #F5F5F5;
  stroke-width: 5;
}

.ring-progress {
  fill: none;
  stroke: #8B2D4A;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-dasharray: 283;
  transition: stroke-dashoffset 0.05s linear;
  filter: drop-shadow(0 0 4px rgba(139, 45, 74, 0.3));
}

.is-visible .ring-progress {
  animation: ringGlow 2.5s ease-in-out 3.5s infinite;
}

@keyframes ringGlow {
  0%, 100% {
    filter: drop-shadow(0 0 4px rgba(139, 45, 74, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 8px rgba(139, 45, 74, 0.5));
  }
}

.circle-content {
  display: flex;
  align-items: baseline;
  gap: 1px;
  position: relative;
  z-index: 1;
}

.circle-number {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #8B2D4A;
  line-height: 1;
}

.circle-symbol {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #8B2D4A;
}

.circle-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #1A1A1A;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.is-visible .circle-label {
  opacity: 1;
  transition-delay: 1.5s;
}

/* Traits */
.traits-row {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.trait-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: white;
  border-radius: 9999px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  opacity: 0;
  transform: translateY(15px);
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.is-visible .trait-pill {
  opacity: 1;
  transform: translateY(0);
}

.trait-icon-box {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(139, 45, 74, 0.06);
  color: #8B2D4A;
}

.trait-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  color: #1A1A1A;
}

.trait-check {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #8B2D4A;
  color: white;
}

/* Tagline */
.matching-tagline {
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #787878;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.is-visible .matching-tagline {
  opacity: 1;
  transition-delay: 1.8s;
}

.matching-tagline strong {
  color: #1A1A1A;
}

/* Responsive */
@media (max-width: 900px) {
  .matching-container {
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  .compatibility-circle {
    margin: -16px 0;
    order: 0;
  }

  .card-sophie {
    order: -1;
    transform: translateY(20px);
  }

  .card-thomas {
    order: 1;
    transform: translateY(20px);
  }

  .is-visible .card-sophie,
  .is-visible .card-thomas {
    transform: translateY(0) rotate(0deg);
  }

  .profile-card {
    width: 280px;
  }
}

@media (max-width: 580px) {
  .matching-section {
    padding: 60px 0 80px;
  }

  .profile-card {
    width: 80%;
    max-width: 300px;
  }

  .compatibility-circle {
    margin: -12px 0;
  }

  .circle-ring {
    width: 100px;
    height: 100px;
  }

  .circle-number {
    font-size: 1.6rem;
  }

  .circle-label {
    font-size: 0.5rem;
  }

  .traits-row {
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 12px;
  }

  .trait-pill {
    padding: 5px 10px;
  }

  .trait-text {
    font-size: 0.65rem;
  }

  .trait-icon-box {
    width: 20px;
    height: 20px;
  }

  .trait-check {
    width: 14px;
    height: 14px;
  }

  .matching-tagline {
    font-size: 0.9rem;
    padding: 0 16px;
  }

  .floating-heart {
    display: none;
  }
}

@media (max-width: 400px) {
  .profile-card {
    width: 92%;
    max-width: 280px;
  }

  .matching-container {
    padding: 0 4px;
  }

  .card-body {
    padding: 10px 12px 14px;
  }

  .card-name {
    font-size: 1.1rem;
  }

  .personality-tag {
    padding: 6px 8px;
    gap: 6px;
  }

  .personality-name {
    font-size: 0.65rem;
  }

  .personality-category {
    font-size: 0.5rem;
  }

  .card-tagline {
    font-size: 0.72rem;
  }

  .card-hobbies {
    gap: 3px;
  }

  .hobby-pill {
    font-size: 0.55rem;
    padding: 2px 6px;
  }

  .circle-ring {
    width: 88px;
    height: 88px;
  }

  .circle-number {
    font-size: 1.4rem;
  }

  .circle-symbol {
    font-size: 0.7rem;
  }

  .matching-tagline {
    font-size: 0.82rem;
    padding: 0 8px;
  }

  .section-label {
    font-size: 0.6rem;
    padding: 5px 12px;
  }
}
</style>
