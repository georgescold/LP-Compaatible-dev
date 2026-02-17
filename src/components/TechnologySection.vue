<script setup lang="ts">
import { Brain, ShieldCheck, GitCompareArrows } from 'lucide-vue-next'

const techCards = [
  {
    icon: Brain,
    title: 'Le test le plus complet du marché',
    description: 'Basé sur le Big Five, le modèle de référence en psychologie scientifique, notre test explore 30 facettes de ta personnalité. Là où les autres apps se contentent de quelques questions, nous allons en profondeur pour comprendre qui tu es vraiment.',
    stat: '90',
    statLabel: 'questions'
  },
  {
    icon: ShieldCheck,
    title: 'Anonymat total garanti',
    description: 'Zéro compromis sur ta vie privée. Tes données sont protégées et ton identité n\'est révélée qu\'à ton match, au moment que tu choisis. Pas de profil public, pas de swipe, pas d\'exposition.',
    stat: '100%',
    statLabel: 'confidentiel'
  },
  {
    icon: GitCompareArrows,
    title: 'La compatibilité profonde, pas le hasard',
    description: 'Notre algorithme croise 30 dimensions psychologiques pour calculer un score de compatibilité réelle. On ne te propose pas quelqu\'un qui te ressemble, on identifie la personne avec qui ça peut vraiment durer.',
    stat: '30',
    statLabel: 'dimensions'
  }
]
</script>

<template>
  <section id="technologie" class="tech-section">
    <div class="container-main">
      <div class="section-header">
        <span class="section-label">La référence en compatibilité profonde</span>
        <h2>La seule plateforme qui matche sur qui tu es vraiment</h2>
        <p>
          Les apps de rencontre classiques se basent sur des photos et des bios. Compaatible est la première plateforme française à utiliser le modèle Big Five, la référence mondiale en psychologie, pour calculer une compatibilité réelle entre deux personnalités.
        </p>
      </div>

      <div class="cards-grid">
        <div v-for="(card, index) in techCards" :key="index" class="tech-card">
          <div class="card-icon">
            <component :is="card.icon" class="icon" />
          </div>

          <div class="card-stat">
            <span class="stat-number">{{ card.stat }}</span>
            <span class="stat-label">{{ card.statLabel }}</span>
          </div>

          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tech-section {
  padding: 100px 0;
  background: white;
  position: relative;
}

.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 60px;
}

.section-header h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--color-black);
  margin-bottom: 20px;
}

.section-header p {
  font-size: 1.1rem;
  color: var(--color-gray-dark);
  line-height: 1.7;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.tech-card {
  background: var(--color-white-cream);
  padding: 40px 30px;
  border-radius: 24px;
  border: 1px solid var(--color-gray-light);
  position: relative;
  height: 100%;
  transition: all 0.4s ease;
}

.tech-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(139, 45, 74, 0.08);
}

.card-icon {
  width: 80px;
  height: 80px;
  background: var(--color-red-pure);
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 8px 24px rgba(139, 45, 74, 0.2), inset 0 2px 10px rgba(255, 255, 255, 0.2);
}

.tech-card:hover .card-icon {
  transform: translateY(-4px) scale(1.02);
  background: var(--color-red-dark);
  box-shadow: 0 12px 30px rgba(139, 45, 74, 0.3), inset 0 2px 10px rgba(255, 255, 255, 0.2);
}

.icon {
  width: 36px;
  height: 36px;
  color: #FEFEFE;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.card-stat {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 15px;
}

.stat-number {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-red-pure);
  line-height: 1;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--color-gray-dark);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

.tech-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-black);
  margin-bottom: 12px;
}

.tech-card p {
  font-size: 0.95rem;
  color: var(--color-gray-dark);
  line-height: 1.7;
}

@media (max-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .tech-section {
    padding: 70px 0;
  }

  .section-header h2 {
    font-size: clamp(1.5rem, 4vw, 2rem);
  }

  .section-header p {
    font-size: 1rem;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }

  .tech-card {
    padding: 30px 25px;
  }

  .card-icon {
    width: 64px;
    height: 64px;
  }

  .icon {
    width: 30px;
    height: 30px;
  }

  .stat-number {
    font-size: 2rem;
  }

  .tech-card h3 {
    font-size: 1.15rem;
  }
}

@media (max-width: 400px) {
  .tech-section {
    padding: 50px 0;
  }

  .section-header {
    margin-bottom: 40px;
  }

  .section-header p {
    font-size: 0.9rem;
  }

  .cards-grid {
    gap: 20px;
  }

  .tech-card {
    padding: 24px 20px;
    border-radius: 20px;
  }

  .card-icon {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    margin-bottom: 20px;
  }

  .icon {
    width: 26px;
    height: 26px;
  }

  .stat-number {
    font-size: 1.7rem;
  }

  .stat-label {
    font-size: 0.75rem;
  }

  .tech-card h3 {
    font-size: 1.05rem;
  }

  .tech-card p {
    font-size: 0.85rem;
    line-height: 1.6;
  }
}
</style>
