<script setup lang="ts">
import FadeInSection from './FadeInSection.vue'
import { getLatestArticles } from '../data/blog-articles'

const articles = getLatestArticles(6)

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<template>
  <section id="articles" class="blog-section">
    <div class="decorative-blur blur-top"></div>
    <div class="decorative-blur blur-bottom"></div>

    <div class="container-main">
      <FadeInSection>
        <header class="section-header">
          <span class="section-label">Nos articles</span>
          <h2 class="section-title">
            Comprendre l'amour, c'est le <span class="highlight">premier pas.</span>
          </h2>
          <p class="section-subtitle">
            Nos articles mêlent psychologie, science et conseils pratiques pour t'aider
            à mieux te connaître et à trouver ta personne.
          </p>
        </header>
      </FadeInSection>

      <div class="articles-grid">
        <FadeInSection v-for="article in articles" :key="article.slug">
          <router-link :to="`/blog/${article.slug}`" class="article-card">
            <div class="card-cover" :style="{ background: article.coverColor }">
              <span class="category-badge">{{ article.category }}</span>
            </div>
            <div class="card-content">
              <h3 class="article-title">{{ article.title }}</h3>
              <p class="article-excerpt">{{ article.excerpt }}</p>
              <footer class="card-footer">
                <span>{{ formatDate(article.publishedAt) }}</span>
                <span class="dot"></span>
                <span>{{ article.readTime }} min de lecture</span>
              </footer>
            </div>
          </router-link>
        </FadeInSection>
      </div>

      <div class="section-actions">
        <router-link to="/blog" class="see-all-link">
          Voir tous les articles
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog-section {
  position: relative;
  background-color: var(--color-white-cream);
  padding: 100px 24px;
  overflow: hidden;
}

.decorative-blur {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
}

.blur-top {
  top: -20%;
  right: -10%;
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.05) 0%, transparent 70%);
}

.blur-bottom {
  bottom: -10%;
  left: -5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.03) 0%, transparent 70%);
}

/* Header */
.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 64px;
  position: relative;
  z-index: 2;
}

.section-label {
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

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 600;
  color: var(--color-black);
  line-height: 1.2;
  margin-bottom: 20px;
}

.highlight {
  color: var(--color-red-pure);
}

.section-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: var(--color-gray-dark);
  line-height: 1.6;
  max-width: 560px;
  margin: 0 auto;
}

/* Grid */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* Cards */
.article-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-gray-light);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
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

.category-badge {
  background: white;
  padding: 6px 14px;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-black);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-content {
  padding: 24px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.article-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-black);
  line-height: 1.35;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-excerpt {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: var(--color-gray-main);
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
}

.card-footer {
  display: flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: var(--color-gray-medium);
  margin-top: auto;
}

.dot {
  width: 3px;
  height: 3px;
  background: var(--color-gray-light);
  border-radius: 50%;
  margin: 0 8px;
}

/* Actions */
.section-actions {
  display: flex;
  justify-content: center;
  margin-top: 56px;
  position: relative;
  z-index: 2;
}

.see-all-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--color-red-pure);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  text-decoration: none;
  font-size: 1.05rem;
  transition: all 0.3s ease;
}

.see-all-link:hover {
  gap: 16px;
  color: var(--color-red-dark);
}

/* Responsive */
@media (max-width: 1024px) {
  .articles-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .blog-section {
    padding: 80px 16px;
  }

  .articles-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 0.95rem;
  }
}
</style>
