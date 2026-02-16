<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleBySlug, getRelatedArticles, type BlogArticle } from '../data/blog-articles'

const route = useRoute()
const article = ref<BlogArticle | null>(null)
const relatedArticles = ref<BlogArticle[]>([])

const loadData = () => {
  const rawSlug = route.params.slug
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug
  if (!slug) return
  article.value = getArticleBySlug(slug) || null
  relatedArticles.value = getRelatedArticles(slug, 3)
  window.scrollTo(0, 0)
}

onMounted(loadData)
watch(() => route.params.slug, loadData)

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<template>
  <div v-if="article" class="article-view">
    <!-- Top Navigation -->
    <nav class="top-nav">
      <div class="container">
        <router-link to="/blog" class="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Retour aux articles
        </router-link>
      </div>
    </nav>

    <!-- Hero Header -->
    <header class="article-hero" :style="{ '--hero-gradient': article.coverColor }">
      <div class="hero-overlay"></div>
      <div class="container hero-container">
        <div class="hero-content">
          <span class="category-badge">{{ article.category }}</span>
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <span class="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/></svg>
              {{ formatDate(article.publishedAt) }}
            </span>
            <span class="meta-separator">•</span>
            <span class="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
              {{ article.readTime }} min de lecture
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container">
      <article class="article-body">
        <div class="article-content" v-html="article.content"></div>

        <div class="tags-row">
          <span v-for="tag in article.tags" :key="tag" class="tag">#{{ tag }}</span>
        </div>
      </article>
    </main>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="cta-blur"></div>
          <div class="cta-inner">
            <h2 class="cta-heading">Prêt(e) à rencontrer ton âme sœur ?</h2>
            <p class="cta-text">Rejoins l'expérience Compaatible et laisse la science guider ton cœur.</p>
            <div class="glass-btn-container">
              <router-link to="/inscription" class="primary-btn">
                Découvre ta personnalité
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </router-link>
            </div>
            <p class="cta-footer-text">1 seul match par mois · Scientifiquement prouvé</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Articles -->
    <section v-if="relatedArticles.length" class="related-section">
      <div class="container">
        <h2 class="section-title">Articles similaires</h2>
        <div class="related-grid">
          <router-link
            v-for="rel in relatedArticles"
            :key="rel.slug"
            :to="`/blog/${rel.slug}`"
            class="article-card"
          >
            <div class="card-cover" :style="{ background: rel.coverColor }">
              <span class="card-category-badge">{{ rel.category }}</span>
            </div>
            <div class="card-body">
              <h3 class="card-title">{{ rel.title }}</h3>
              <p class="card-excerpt">{{ rel.excerpt }}</p>
              <div class="card-meta">
                <span>{{ formatDate(rel.publishedAt) }}</span>
                <span class="card-dot">•</span>
                <span>{{ rel.readTime }} min de lecture</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>

  <!-- 404 state -->
  <div v-else class="not-found">
    <div class="not-found-content">
      <h1 class="not-found-title">Article introuvable</h1>
      <p class="not-found-text">Cet article n'existe pas ou a été déplacé.</p>
      <router-link to="/blog" class="not-found-link">Voir tous les articles</router-link>
    </div>
  </div>
</template>

<style scoped>
.article-view {
  background: var(--color-white-cream, #FBF9F7);
  color: var(--color-black, #1A1A1A);
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* NAVIGATION */
.top-nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 32px 0;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: opacity 0.2s ease;
  background: rgba(0, 0, 0, 0.2);
  padding: 8px 16px;
  border-radius: 9999px;
  backdrop-filter: blur(4px);
}

.back-link:hover {
  opacity: 0.8;
}

/* HERO */
.article-hero {
  position: relative;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 0 80px;
  background: var(--hero-gradient);
  color: white;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%);
}

.hero-container {
  position: relative;
  z-index: 10;
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
}

.category-badge {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 24px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.article-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  line-height: 1.15;
  font-weight: 700;
  margin-bottom: 32px;
}

.article-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-size: 1rem;
  font-weight: 500;
  opacity: 0.9;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.meta-separator {
  opacity: 0.5;
}

/* ARTICLE BODY */
.article-body {
  max-width: 720px;
  margin: -60px auto 100px;
  background: white;
  padding: 80px 60px;
  border-radius: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
  position: relative;
  z-index: 20;
}

.article-content {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-gray-dark, #4A4A4A);
}

.article-content :deep(h2) {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  color: var(--color-black, #1A1A1A);
  margin: 48px 0 24px;
  line-height: 1.3;
}

.article-content :deep(p) {
  margin-bottom: 24px;
}

.article-content :deep(strong) {
  color: var(--color-black, #1A1A1A);
  font-weight: 600;
}

.article-content :deep(em) {
  font-style: italic;
}

.article-content :deep(a) {
  color: var(--color-red-pure, #8B2D4A);
  text-decoration: underline;
  text-underline-offset: 4px;
  transition: color 0.2s;
}

.article-content :deep(a:hover) {
  color: var(--color-red-dark, #6B2640);
}

.article-content :deep(ul) {
  margin: 32px 0;
  padding-left: 20px;
  list-style: none;
}

.article-content :deep(li) {
  position: relative;
  padding-left: 28px;
  margin-bottom: 16px;
}

.article-content :deep(li::before) {
  content: "";
  position: absolute;
  left: 0;
  top: 10px;
  width: 8px;
  height: 8px;
  background: var(--color-red-pure, #8B2D4A);
  border-radius: 50%;
}

.tags-row {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid var(--color-gray-light, #E8E8E8);
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tag {
  color: var(--color-gray-main, #5C5C5C);
  font-size: 0.9rem;
  font-weight: 500;
}

/* CTA SECTION */
.cta-section {
  padding: 0 0 100px;
  background: var(--color-white-cream, #FBF9F7);
}

.cta-card {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 32px;
  padding: 80px 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
  border: 1px solid var(--color-gray-light, #E8E8E8);
}

.cta-blur {
  position: absolute;
  top: -50%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.05) 0%, transparent 70%);
  pointer-events: none;
}

.cta-inner {
  position: relative;
  z-index: 2;
}

.cta-heading {
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--color-black, #1A1A1A);
}

.cta-text {
  font-size: 1.15rem;
  color: var(--color-gray-main, #5C5C5C);
  max-width: 500px;
  margin: 0 auto 40px;
  line-height: 1.6;
}

.glass-btn-container {
  display: inline-block;
  padding: 6px;
  background: rgba(139, 45, 74, 0.05);
  border-radius: 9999px;
  margin-bottom: 24px;
}

.primary-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 40px;
  background: var(--color-red-pure, #8B2D4A);
  color: white;
  text-decoration: none;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 10px 20px rgba(139, 45, 74, 0.2);
  transition: all 0.3s ease;
}

.primary-btn:hover {
  transform: translateY(-2px);
  background: var(--color-red-dark, #6B2640);
  box-shadow: 0 15px 30px rgba(139, 45, 74, 0.3);
}

.cta-footer-text {
  font-size: 0.9rem;
  color: var(--color-gray-medium, #787878);
  font-weight: 500;
}

/* RELATED SECTION */
.related-section {
  padding: 100px 0 140px;
  background: var(--color-white-cream, #FBF9F7);
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  margin-bottom: 48px;
  text-align: center;
  color: var(--color-black, #1A1A1A);
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.article-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid var(--color-gray-light, #E8E8E8);
  display: flex;
  flex-direction: column;
}

.article-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(139, 45, 74, 0.08);
  border-color: rgba(139, 45, 74, 0.15);
}

.card-cover {
  height: 160px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 16px;
}

.card-category-badge {
  background: white;
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-black, #1A1A1A);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
  color: var(--color-gray-main, #5C5C5C);
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
}

.card-meta {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: var(--color-gray-medium, #787878);
  margin-top: auto;
}

.card-dot {
  margin: 0 8px;
  opacity: 0.5;
}

/* NOT FOUND */
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-white-cream, #FBF9F7);
  font-family: 'Inter', sans-serif;
}

.not-found-content {
  text-align: center;
}

.not-found-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: var(--color-black, #1A1A1A);
  margin-bottom: 16px;
}

.not-found-text {
  color: var(--color-gray-dark, #4A4A4A);
  font-size: 1.1rem;
  margin-bottom: 32px;
}

.not-found-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: var(--color-red-pure, #8B2D4A);
  color: white;
  text-decoration: none;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.not-found-link:hover {
  background: var(--color-red-dark, #6B2640);
  transform: translateY(-2px);
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .related-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .article-body {
    padding: 40px 24px;
    margin-top: -40px;
    border-radius: 24px;
  }

  .article-title {
    font-size: 2rem;
  }

  .article-content :deep(h2) {
    font-size: 1.5rem;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }

  .cta-heading {
    font-size: 1.6rem;
  }

  .cta-card {
    padding: 60px 24px;
    border-radius: 24px;
  }

  .article-hero {
    min-height: 400px;
    padding: 100px 0 60px;
  }

  .primary-btn {
    padding: 16px 32px;
    font-size: 1rem;
  }

  .related-section {
    padding: 80px 0 100px;
  }
}

@media (max-width: 480px) {
  .article-meta {
    flex-direction: column;
    gap: 8px;
  }

  .meta-separator {
    display: none;
  }
}
</style>
