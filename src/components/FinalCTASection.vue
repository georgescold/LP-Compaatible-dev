<script setup lang="ts">
import { RouterLink } from 'vue-router'
import IconArrowRight from './icons/IconArrowRight.vue'
</script>

<template>
  <section id="participer" class="final-cta">
    <div class="container-main">
      <div class="free-badge">
        <span class="free-badge-icon">🎁</span>
        <span>1ère édition · Accès 100% gratuit</span>
      </div>

      <h2 class="final-title">
        Prêt(e) à rencontrer<br>quelqu'un qui te comprend vraiment ?
      </h2>

      <p class="final-subtitle">
        Passe le test, découvre ton type de personnalité et rencontre quelqu'un qui te correspond vraiment.
      </p>

      <div class="price-display">
        <span class="price-original">19,99€</span>
        <span class="price-arrow">→</span>
        <span class="price-free">0€</span>
      </div>

      <div class="glass-container">
        <router-link to="/inscription" class="btn-primary btn-large btn-pulse">
          Participer gratuitement
          <IconArrowRight class="w-5 h-5" />
        </router-link>
      </div>

      <p class="cta-note">
        Offre exclusive première édition
      </p>
    </div>
  </section>
</template>

<style scoped>
.final-cta {
  background: var(--color-white-warm);
  text-align: center;
  padding: 100px 0;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.free-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, var(--color-red-pure) 0%, var(--color-red-dark) 100%);
  color: white;
  padding: 10px 24px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 30px;
}

.free-badge-icon {
  font-size: 1.2rem;
}

.final-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 600;
  color: #1A1A1A;
  line-height: 1.2;
  margin-bottom: 20px;
}

.final-subtitle {
  font-size: 1.25rem;
  color: #4A5568;
  font-family: 'Playfair Display', serif;
  max-width: 500px;
  margin: 0 auto 30px;
  line-height: 1.6;
}

.price-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}

.price-original {
  font-size: 1.5rem;
  color: var(--color-gray-main);
  text-decoration: line-through;
  opacity: 0.6;
}

.price-arrow {
  font-size: 1.5rem;
  color: var(--color-gray-main);
}

.price-free {
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--color-red-pure);
}

.glass-container {
  display: inline-block;
  padding: 6px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 32px rgba(139, 45, 74, 0.08);
  margin-bottom: 20px;
}

.btn-large {
  font-size: 1.2rem;
  padding: 1.25rem 3rem;
}

.btn-pulse {
  position: relative;
  overflow: visible;
}

.btn-pulse::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  border: 2px solid rgba(139, 45, 74, 0.3);
  animation: pulse-glow 2s infinite;
  will-change: transform, opacity;
  pointer-events: none;
}

@keyframes pulse-glow {
  0% { transform: scale(1); opacity: 0.6; }
  70% { transform: scale(1.15); opacity: 0; }
  100% { transform: scale(1.15); opacity: 0; }
}

.cta-note {
  margin-top: 0;
  font-size: 0.9rem;
  color: var(--color-gray-dark);
}

@media (max-width: 768px) {
  .final-cta {
    padding: 80px 0;
  }

  .final-title {
    font-size: clamp(1.5rem, 5vw, 2.5rem);
  }

  .final-subtitle {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .final-cta {
    padding: 60px 0;
  }

  .free-badge {
    font-size: 0.8rem;
    padding: 8px 18px;
  }

  .price-display {
    gap: 10px;
  }

  .price-original {
    font-size: 1.2rem;
  }

  .price-free {
    font-size: 2.5rem;
  }

  .btn-large {
    font-size: 1rem;
    padding: 1rem 2rem;
  }

  .final-subtitle {
    font-size: 1rem;
  }

  .glass-container {
    padding: 4px;
  }
}

@media (max-width: 360px) {
  .final-cta {
    padding: 50px 0;
  }

  .free-badge {
    font-size: 0.7rem;
    padding: 6px 14px;
    gap: 8px;
  }

  .final-subtitle {
    font-size: 0.9rem;
    padding: 0 8px;
  }

  .price-original {
    font-size: 1rem;
  }

  .price-free {
    font-size: 2rem;
  }

  .btn-large {
    font-size: 0.9rem;
    padding: 0.875rem 1.5rem;
  }

  .cta-note {
    font-size: 0.8rem;
  }
}
</style>
