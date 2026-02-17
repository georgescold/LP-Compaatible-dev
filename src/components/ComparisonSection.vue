<script setup lang="ts">
import FadeInSection from './FadeInSection.vue'
import IconCheck from './icons/IconCheck.vue'
import IconCross from './icons/IconCross.vue'

// Import des images
import imageAutumn from '../assets/couple-autumn.webp'
import imageWindow from '../assets/couple-window.webp'
import imageBeach from '../assets/couple-beach.webp'
import imageSunset from '../assets/couple-sunset.webp'

const features = [
  'Matchs basés sur la personnalité profonde',
  'Anonymat total jusqu\'au match',
  'Pas de swipe addictif ni d\'effet catalogue',
  'Paiement unique (pas d\'abonnement)',
  'Approche scientifique et sérieuse'
]
</script>

<template>
  <section class="comparison-section">
    <!-- Floating Images Left -->
    <div class="floating-images floating-images-left">
      <div class="floating-frame frame-1">
        <img :src="imageAutumn" alt="Couple en automne" loading="lazy" width="300" height="400" />
      </div>
      <div class="floating-frame frame-2">
        <img :src="imageWindow" alt="Couple à la fenêtre" loading="lazy" width="300" height="400" />
      </div>
    </div>

    <!-- Floating Images Right -->
    <div class="floating-images floating-images-right">
      <div class="floating-frame frame-3">
        <img :src="imageBeach" alt="Couple à la plage" loading="lazy" width="300" height="400" />
      </div>
      <div class="floating-frame frame-4">
        <img :src="imageSunset" alt="Couple au coucher de soleil" loading="lazy" width="300" height="400" />
      </div>
    </div>

    <div class="container-main">
      <!-- Header -->
      <div class="section-header">
        <span class="section-label-light">Pourquoi Compaatible ?</span>
        <h2>On ne joue pas dans la même catégorie</h2>
        <p>Les apps de rencontre classiques misent sur le volume. Nous, on mise sur la précision.</p>
      </div>

      <!-- Comparison Table -->
      <FadeInSection>
        <div class="comparison-table">
          <!-- Table Header -->
          <div class="table-header">
            <span class="feature-col"></span>
            <span class="competitor-col">Tinder & co.</span>
            <span class="brand-col">Compaatible</span>
          </div>

          <!-- Table Rows -->
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="table-row"
          >
            <span class="feature-col">{{ feature }}</span>
            <span class="competitor-col">
              <div class="icon-cross">
                <IconCross class="w-3 h-3" />
              </div>
            </span>
            <span class="brand-col">
              <div class="icon-check">
                <IconCheck class="w-3.5 h-3.5" />
              </div>
            </span>
          </div>
        </div>
      </FadeInSection>
    </div>
  </section>
</template>

<style scoped>
.comparison-section {
  padding: 100px 0;
  background: var(--color-white-cream);
  position: relative;
  overflow: hidden;
}

/* Floating Images Containers */
.floating-images {
  position: absolute;
  top: 0;
  height: 100%;
  width: 280px;
  pointer-events: none;
  z-index: 1;
}

.floating-images-left {
  left: 0;
}

.floating-images-right {
  right: 0;
}

/* Individual Frames */
.floating-frame {
  position: absolute;
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 25px 50px rgba(139, 45, 74, 0.08),
    0 10px 30px rgba(0, 0, 0, 0.12);
  border: 3px solid rgba(255, 255, 255, 0.9);
  opacity: 0.92;
}

.floating-frame::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    145deg,
    rgba(139, 45, 74, 0.05) 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.08) 100%
  );
  z-index: 1;
  pointer-events: none;
}

.floating-frame::after {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 23px;
  background: linear-gradient(
    135deg,
    rgba(139, 45, 74, 0.15) 0%,
    transparent 40%,
    transparent 60%,
    rgba(139, 45, 74, 0.1) 100%
  );
  z-index: -1;
}

.floating-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Left side frames */
.frame-1 {
  width: 160px;
  height: 210px;
  top: 40px;
  left: 30px;
  transform: rotate(-4deg);
}

.frame-2 {
  width: 140px;
  height: 180px;
  bottom: 60px;
  left: 50px;
  transform: rotate(3deg);
}

/* Right side frames */
.frame-3 {
  width: 150px;
  height: 195px;
  top: 50px;
  right: 40px;
  transform: rotate(4deg);
}

.frame-4 {
  width: 160px;
  height: 200px;
  bottom: 50px;
  right: 30px;
  transform: rotate(-3deg);
}

.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 60px;
  position: relative;
  z-index: 2;
}

.section-label-light {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(139, 45, 74, 0.05);
  padding: 6px 16px;
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-red-pure);
  margin-bottom: 16px;
}

.section-header h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  color: #1A1A1A;
  margin-bottom: 20px;
}

.section-header p {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  color: #64748b;
}

.comparison-table {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  padding: 20px 28px;
  background: var(--color-black);
  color: white;
}

.table-header .feature-col {
  /* empty */
}

.table-header .competitor-col,
.table-header .brand-col {
  text-align: center;
  font-weight: 600;
  font-size: 0.95rem;
}

.table-header .brand-col {
  color: white;
  font-weight: 700;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  padding: 18px 28px;
  border-bottom: 1px solid var(--color-gray-light);
  transition: background 0.2s ease;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background: var(--color-white-cream);
}

.table-row .feature-col {
  color: var(--color-black);
  font-size: 0.95rem;
  display: flex;
  align-items: center;
}

.table-row .competitor-col,
.table-row .brand-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-cross {
  width: 28px;
  height: 28px;
  background: var(--color-gray-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-cross svg {
  fill: var(--color-gray-dark);
}

.icon-check {
  width: 28px;
  height: 28px;
  background: var(--color-red-pure);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-check svg {
  fill: white;
}

/* Responsive - hide images on smaller screens */
@media (max-width: 1400px) {
  .floating-frame {
    transform: scale(0.85);
  }

  .frame-1 {
    left: 10px;
  }

  .frame-2 {
    left: 20px;
  }

  .frame-3 {
    right: 20px;
  }

  .frame-4 {
    right: 10px;
  }
}

@media (max-width: 1200px) {
  .floating-images {
    width: 200px;
  }

  .floating-frame {
    transform: scale(0.7);
  }

  .frame-1 {
    left: -20px;
  }

  .frame-2 {
    left: -10px;
  }

  .frame-3 {
    right: -10px;
  }

  .frame-4 {
    right: -20px;
  }
}

@media (max-width: 1024px) {
  .floating-images {
    display: none;
  }
}

@media (max-width: 600px) {
  .comparison-section {
    padding: 70px 0;
  }

  .table-header,
  .table-row {
    grid-template-columns: 1.5fr 1fr 1fr;
    padding: 14px 16px;
    font-size: 0.85rem;
  }

  .table-row .feature-col {
    font-size: 0.85rem;
  }

  .icon-cross,
  .icon-check {
    width: 24px;
    height: 24px;
  }
}

@media (max-width: 400px) {
  .comparison-section {
    padding: 50px 0;
  }

  .section-header {
    margin-bottom: 40px;
  }

  .section-header h2 {
    font-size: 1.5rem;
  }

  .section-header p {
    font-size: 0.9rem;
  }

  .table-header,
  .table-row {
    grid-template-columns: 1.2fr 0.8fr 0.8fr;
    padding: 10px 12px;
    font-size: 0.75rem;
  }

  .table-header .competitor-col,
  .table-header .brand-col {
    font-size: 0.7rem;
  }

  .table-row .feature-col {
    font-size: 0.75rem;
    line-height: 1.3;
  }

  .icon-cross,
  .icon-check {
    width: 20px;
    height: 20px;
  }

  .comparison-table {
    border-radius: 16px;
  }
}

@media (max-width: 340px) {
  .table-header,
  .table-row {
    padding: 8px 10px;
    font-size: 0.7rem;
  }

  .table-row .feature-col {
    font-size: 0.68rem;
  }
}
</style>
