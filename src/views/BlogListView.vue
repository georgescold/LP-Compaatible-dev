<script setup lang="ts">
import { ref, computed } from 'vue'
import { blogArticles } from '../data/blog-articles'
import AppHeader from '../components/AppHeader.vue'

const showAll = ref(false)
const INITIAL_COUNT = 6

const visibleArticles = computed(() => {
  return showAll.value ? blogArticles : blogArticles.slice(0, INITIAL_COUNT)
})

const hasMore = computed(() => blogArticles.length > INITIAL_COUNT)

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<template>
  <div class="blog-view">
    <!-- Navigation -->
    <AppHeader />

    <!-- Hero Header -->
    <header class="blog-hero">
      <div class="blur-effect blur-1"></div>
      <div class="blur-effect blur-2"></div>

      <div class="hero-content">
        <div class="category-pill">Exploration & Savoir</div>
        <h1 class="hero-title">Nos articles</h1>
        <p class="hero-subtitle">
          Psychologie, science et conseils pratiques pour comprendre l'amour et trouver ta personne.
        </p>
      </div>
    </header>

    <!-- Blog Grid -->
    <main class="blog-main">
      <div class="grid-container">
        <router-link
          v-for="article in visibleArticles"
          :key="article.slug"
          :to="`/blog/${article.slug}`"
          class="article-card"
        >
          <div class="card-cover" :style="{ background: article.coverColor }">
            <div class="card-badge">{{ article.category }}</div>
          </div>

          <div class="card-body">
            <h2 class="card-title">{{ article.title }}</h2>
            <p class="card-excerpt">{{ article.excerpt }}</p>
          </div>

          <div class="card-footer">
            <span class="footer-date">{{ formatDate(article.publishedAt) }}</span>
            <span class="footer-dot">·</span>
            <span class="footer-time">{{ article.readTime }} min de lecture</span>
          </div>
        </router-link>
      </div>

      <!-- Voir plus button -->
      <div v-if="hasMore" class="show-more-container">
        <button class="show-more-btn" @click="showAll = !showAll">
          <span>{{ showAll ? 'Voir moins' : 'Voir plus' }}</span>
          <svg 
            :class="['chevron-icon', { 'rotated': showAll }]" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2"
          >
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
      </div>
    </main>

    <!-- Bottom -->
    <footer class="blog-footer">
      <div class="footer-divider"></div>
      <p class="footer-tagline">Basé sur la psychologie profonde</p>
    </footer>
  </div>
</template>

<style scoped>
.blog-view {
  background-color: var(--color-white-cream, #FBF9F7);
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  color: var(--color-gray-dark, #4A4A4A);
}


/* Hero Section */
.blog-hero {
  position: relative;
  padding: 96px 24px 64px;
  text-align: center;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 800px;
  margin: 0 auto;
}

.category-pill {
  display: inline-block;
  padding: 8px 20px;
  background: white;
  border: 1px solid var(--color-gray-light, #E8E8E8);
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-red-pure, #8B2D4A);
  margin-bottom: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 600;
  color: var(--color-black, #1A1A1A);
  line-height: 1.1;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 1.15rem;
  line-height: 1.6;
  color: var(--color-gray-dark, #4A4A4A);
  max-width: 560px;
  margin: 0 auto;
}

/* Decorative Blurs */
.blur-effect {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
}

.blur-1 {
  top: -20%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.06) 0%, transparent 70%);
}

.blur-2 {
  bottom: -20%;
  left: -5%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.04) 0%, transparent 70%);
}

/* Grid Layout */
.blog-main {
  padding: 32px 24px 80px;
  max-width: 1200px;
  margin: 0 auto;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

/* Show More Button */
.show-more-container {
  display: flex;
  justify-content: center;
  margin-top: 48px;
}

.show-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: white;
  border: 1px solid var(--color-gray-light, #E8E8E8);
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-gray-dark, #4A4A4A);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.show-more-btn:hover {
  border-color: var(--color-red-pure, #8B2D4A);
  color: var(--color-red-pure, #8B2D4A);
  box-shadow: 0 4px 20px rgba(139, 45, 74, 0.1);
}

.chevron-icon {
  transition: transform 0.3s ease;
}

.chevron-icon.rotated {
  transform: rotate(180deg);
}

/* Article Card */
.article-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  border: 1px solid var(--color-gray-light, #E8E8E8);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.article-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(139, 45, 74, 0.08);
  border-color: rgba(139, 45, 74, 0.15);
}

.card-cover {
  height: 160px;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 16px;
}

.card-badge {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(4px);
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-black, #1A1A1A);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.card-body {
  padding: 24px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-black, #1A1A1A);
  line-height: 1.35;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-excerpt {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--color-gray-main, #5C5C5C);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
  flex-grow: 1;
}

.card-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--color-gray-light, #E8E8E8);
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: var(--color-gray-medium, #787878);
  font-weight: 500;
}

.footer-dot {
  margin: 0 8px;
  opacity: 0.5;
}

/* Footer Section */
.blog-footer {
  text-align: center;
  padding: 48px 24px 64px;
}

.footer-divider {
  width: 40px;
  height: 2px;
  background: var(--color-red-pure, #8B2D4A);
  margin: 0 auto 20px;
  border-radius: 2px;
}

.footer-tagline {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-gray-dark, #4A4A4A);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Responsive */
@media (max-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .grid-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .blog-hero {
    padding: 80px 16px 48px;
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .blog-main {
    padding: 24px 16px 60px;
  }

  .nav-container {
    padding: 14px 16px;
  }
}
</style>
