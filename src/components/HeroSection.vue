<script setup lang="ts">
import IconStar from './icons/IconStar.vue'
import IconShield from './icons/IconShield.vue'
import IconCheck from './icons/IconCheck.vue'
import IconCheckCircle from './icons/IconCheckCircle.vue'
import IconArrowRight from './icons/IconArrowRight.vue'
</script>

<template>
  <section class="hero">
    <div class="hero-bg">
      <img src="/hero-bg-small.webp" srcset="/hero-bg-small.webp 640w, /hero-bg.webp 1920w" sizes="100vw" alt="" role="presentation" fetchpriority="high" width="1920" height="1280" />
      <div class="hero-bg-overlay"></div>
    </div>

    <div class="hero-decoration-1"></div>
    <div class="hero-decoration-2"></div>

    <div class="container-main hero-content">
      <div class="hero-badge">
        <IconStar class="hero-badge-icon" />
        Basé sur la science de la personnalité
      </div>

      <h1 class="hero-title">
        Ton <span class="highlight">âme sœur
          <svg class="underline-svg" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
            <path d="M1 9.5C50 3.5 150 1.5 299 9.5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </span> existe.<br>On va la trouver.
      </h1>

      <p class="hero-subtitle">
        Fini les dates décevants et la solitude prolongée. Nous analysons ta personnalité en profondeur pour te présenter <strong>la personne la plus compatible avec toi</strong>.
      </p>

      <div class="hero-cta-group">
        <div class="glass-container">
          <a href="#participer" class="btn-primary">
            Participe à l'expérience
            <IconArrowRight class="w-5 h-5" />
          </a>
        </div>
        <span class="discount-badge"><span class="price-old">19,99€</span> → <span class="price-free">GRATUIT</span> · 1ère édition</span>
      </div>

      <div class="hero-trust">
        <div class="hero-trust-item">
          <IconShield class="hero-trust-icon" />
          Données 100% confidentielles
        </div>
        <div class="hero-trust-item">
          <IconCheck class="hero-trust-icon" />
          3 matchs garantis
        </div>
        <div class="hero-trust-item">
          <IconCheckCircle class="hero-trust-icon" />
          Sans abonnement
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 100px 0 100px;
  background: var(--color-white-cream);
  position: relative;
  overflow: hidden;
  min-height: 85vh;
  display: flex;
  align-items: center;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-bg-overlay {
  position: absolute;
  inset: 0;
  background: rgba(251, 249, 247, 0.78);
}

.hero-decoration-1 {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.08) 0%, transparent 70%);
  pointer-events: none;
  z-index: 1;
}

.hero-decoration-2 {
  position: absolute;
  bottom: -30%;
  left: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.05) 0%, transparent 70%);
  pointer-events: none;
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--color-white);
  border: 1px solid var(--color-gray-light);
  padding: 10px 20px;
  border-radius: 50px;
  font-size: 0.9rem;
  color: var(--color-gray-dark);
  font-weight: 500;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

.hero-badge-icon {
  width: 16px;
  height: 16px;
  fill: var(--color-red-pure);
}

.hero-title {
  font-family: 'Playfair Display', serif !important;
  font-size: clamp(2.8rem, 6vw, 4.5rem);
  font-weight: 600;
  line-height: 1.2;
  color: var(--color-black);
  margin-bottom: 24px;
}

.hero-title .highlight {
  color: var(--color-red-pure);
  position: relative;
  display: inline-block;
  font-family: 'Playfair Display', serif !important;
}

.underline-svg {
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 12px;
  color: var(--color-red-pure);
  opacity: 0.5;
}

.hero-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  color: var(--color-gray-dark);
  max-width: 600px;
  margin: 0 auto 40px;
  line-height: 1.7;
}

.hero-subtitle strong {
  color: var(--color-black);
}

.hero-cta-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.glass-container {
  display: inline-block;
  padding: 6px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 32px rgba(139, 45, 74, 0.08);
}

.discount-badge {
  background: white;
  color: var(--color-black);
  padding: 8px 18px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 10px;
  border: 1px solid var(--color-gray-light);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.discount-badge .price-old {
  text-decoration: line-through;
  color: var(--color-gray-main);
}

.discount-badge .price-free {
  color: var(--color-red-pure);
  font-weight: 700;
}

.hero-trust {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-top: 50px;
  flex-wrap: wrap;
}

.hero-trust-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: var(--color-gray-dark);
  font-weight: 500;
  transition: transform 0.3s ease;
}

.hero-trust-item:hover {
  transform: translateY(-2px);
}

.hero-trust-icon {
  width: 18px;
  height: 18px;
  fill: var(--color-red-pure);
}

@media (max-width: 768px) {
  .hero {
    padding: 60px 0 80px;
    min-height: auto;
  }

  .hero-subtitle {
    font-size: 1.1rem;
    margin: 0 auto 30px;
  }

  .hero-badge {
    font-size: 0.8rem;
    padding: 8px 16px;
  }

  .hero-trust {
    gap: 20px;
  }

  .discount-badge {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 40px 0 60px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
    margin: 0 auto 25px;
  }

  .hero-trust {
    flex-direction: column;
    gap: 12px;
  }

  .hero-trust-item {
    font-size: 0.8rem;
  }

  .hero-cta-group {
    gap: 15px;
  }

  .glass-container {
    padding: 4px;
  }

  .glass-container .btn-primary {
    padding: 0.875rem 1.75rem;
    font-size: 1rem;
  }
}

@media (max-width: 360px) {
  .hero {
    padding: 32px 0 50px;
  }

  .hero-title {
    font-size: 1.75rem;
  }

  .hero-subtitle {
    font-size: 0.9rem;
    padding: 0 8px;
  }

  .hero-badge {
    font-size: 0.7rem;
    padding: 6px 12px;
    gap: 6px;
  }

  .glass-container .btn-primary {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }

  .discount-badge {
    font-size: 0.75rem;
    padding: 6px 14px;
  }

  .hero-trust-item {
    font-size: 0.75rem;
  }
}
</style>
