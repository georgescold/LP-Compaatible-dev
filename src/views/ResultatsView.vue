<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'
import { domainDescriptions, domainOrder, domainIcons } from '../data/bigfive-results'
import type { Scores, DomainResult, FacetResult } from '../lib/scoring'
import logoImage from '../assets/Logo_compaatible-removebg-preview.png'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const error = ref('')
const userName = ref('')
const scores = ref<Scores | null>(null)
const expandedDomainId = ref<string | null>(null)
const selectedTier = ref<'free' | 'paid' | null>(null)
const tierSaving = ref(false)
const tierSaved = ref(false)
const currentTier = ref<'free' | 'paid'>('free') // Current tier from DB (to prevent downgrade)

// Celebration overlay (first view)
const showCelebration = ref(false)

onMounted(async () => {
  const id = route.params.id as string
  if (!id) {
    router.push('/')
    return
  }

  // DEMO MODE: Bypass Supabase for testing
  if (id === 'demo') {
    scores.value = {
      O: { score: 15, count: 6, result: 'high', facets: {
          '1': { score: 3, count: 1, result: 'high' },
          '2': { score: 3, count: 1, result: 'high' },
          '3': { score: 3, count: 1, result: 'high' },
          '4': { score: 2, count: 1, result: 'neutral' },
          '5': { score: 2, count: 1, result: 'neutral' },
          '6': { score: 2, count: 1, result: 'neutral' }
      }},
      C: { score: 12, count: 6, result: 'neutral', facets: {
          '1': { score: 2, count: 1, result: 'neutral' },
          '2': { score: 2, count: 1, result: 'neutral' },
          '3': { score: 2, count: 1, result: 'neutral' },
          '4': { score: 2, count: 1, result: 'neutral' },
          '5': { score: 2, count: 1, result: 'neutral' },
          '6': { score: 2, count: 1, result: 'neutral' }
      }},
      E: { score: 10, count: 6, result: 'low', facets: {
          '1': { score: 1, count: 1, result: 'low' },
          '2': { score: 1, count: 1, result: 'low' },
          '3': { score: 2, count: 1, result: 'neutral' },
          '4': { score: 2, count: 1, result: 'neutral' },
          '5': { score: 2, count: 1, result: 'neutral' },
          '6': { score: 2, count: 1, result: 'neutral' }
      }},
      A: { score: 14, count: 6, result: 'high', facets: {
          '1': { score: 3, count: 1, result: 'high' },
          '2': { score: 3, count: 1, result: 'high' },
          '3': { score: 2, count: 1, result: 'neutral' },
          '4': { score: 2, count: 1, result: 'neutral' },
          '5': { score: 2, count: 1, result: 'neutral' },
          '6': { score: 2, count: 1, result: 'neutral' }
      }},
      N: { score: 9, count: 6, result: 'low', facets: {
          '1': { score: 1, count: 1, result: 'low' },
          '2': { score: 1, count: 1, result: 'low' },
          '3': { score: 2, count: 1, result: 'neutral' },
          '4': { score: 2, count: 1, result: 'neutral' },
          '5': { score: 1, count: 1, result: 'low' },
          '6': { score: 2, count: 1, result: 'neutral' }
      }}
    } as unknown as Scores
    userName.value = 'Visiteur'
    loading.value = false
    return
  }

  try {
    const { data: result, error: fetchError } = await supabase
      .from('test_results')
      .select('scores, user_id')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError
    if (!result) throw new Error('Résultat introuvable')

    scores.value = result.scores as Scores

    // Fetch user name and current tier
    const { data: user } = await supabase
      .from('users')
      .select('first_name, tier')
      .eq('id', result.user_id)
      .single()

    if (user) {
      userName.value = user.first_name
      currentTier.value = (user.tier as 'free' | 'paid') || 'free'
      // If user already has paid tier, pre-select it
      if (currentTier.value === 'paid') {
        selectedTier.value = 'paid'
      }
    }
  } catch (err: any) {
    console.error('Error fetching results:', err)
    error.value = 'Impossible de charger tes résultats. Vérifie le lien ou réessaie.'
  } finally {
    loading.value = false
    // Show celebration overlay on first view
    const resultId = route.params.id as string
    const celebrationKey = `compaatible_celebration_${resultId}`
    if (scores.value && !localStorage.getItem(celebrationKey)) {
      showCelebration.value = true
      localStorage.setItem(celebrationKey, 'seen')
    }
  }
})

function dismissCelebration() {
  showCelebration.value = false
}

function toggleDomain(id: string) {
  expandedDomainId.value = expandedDomainId.value === id ? null : id
}

function getDomain(key: string): DomainResult | undefined {
  return scores.value?.[key]
}

function getFacet(key: string, facetNum: number): FacetResult | undefined {
  return scores.value?.[key]?.facets[String(facetNum)]
}

function getPercentage(domain: DomainResult | undefined): number {
  if (!domain || domain.count === 0) return 0
  const avg = domain.score / domain.count
  const pct = Math.round((avg / 5) * 100)
  // Invert for Neuroticism to show Stability
  // Low Neuroticism (e.g. 20%) = High Stability (80%)
  if (scores.value?.N && domain === scores.value.N) {
    return 100 - pct
  }
  return pct
}

function getFacetPercentage(facet: FacetResult | undefined, domainKey?: string): number {
  if (!facet || facet.count === 0) return 0
  const avg = facet.score / facet.count
  const pct = Math.round((avg / 5) * 100)
  // Invert for Neuroticism facets to show Stability
  if (domainKey === 'N') {
    return 100 - pct
  }
  return pct
}

function getBadgeText(result: string, domainKey?: string): string {
  // Invert label for Stability (N)
  if (domainKey === 'N') {
    if (result === 'low') return 'Forte' // Low Neuroticism = High Stability
    if (result === 'high') return 'Faible' // High Neuroticism = Low Stability
    return 'Équilibrée'
  }

  if (result === 'high') return 'Fort'
  if (result === 'neutral') return 'Équilibré'
  return 'Faible'
}

function getScoreText(domainKey: string, result: string): string {
  const desc = domainDescriptions[domainKey]
  if (!desc) return ''
  // Invert for N domain: low neuroticism = high stability
  const displayResult = domainKey === 'N' ? getInvertedResult(result) : result
  return desc.scoreText[displayResult as 'low' | 'neutral' | 'high'] || ''
}

function getInvertedResult(result: string): string {
  if (result === 'low') return 'high'
  if (result === 'high') return 'low'
  return 'neutral'
}

function getFacetResult(domainKey: string, facet: FacetResult | undefined): string {
  if (!facet) return 'neutral'
  // Invert for N domain: low neuroticism = high stability
  if (domainKey === 'N') return getInvertedResult(facet.result)
  return facet.result
}

function getFacetText(domainKey: string, facetKey: string, result: string): string {
  const desc = domainDescriptions[domainKey]
  if (!desc || !desc.facets[facetKey]) return ''
  // Invert result for N domain to get correct stability text
  const displayResult = domainKey === 'N' ? getInvertedResult(result) : result
  return desc.facets[facetKey][displayResult as 'low' | 'neutral' | 'high'] || ''
}

async function selectTier(tier: 'free' | 'paid') {
  // Prevent downgrade: if user already has paid tier, they cannot go back to free
  if (currentTier.value === 'paid' && tier === 'free') {
    return
  }

  selectedTier.value = tier
  tierSaving.value = true

  try {
    // Try auth session first (most reliable, RLS-compatible)
    const { data: { session } } = await supabase.auth.getSession()

    if (session?.user?.id) {
      const { error: updateError } = await supabase
        .from('users')
        .update({ tier })
        .eq('auth_id', session.user.id)

      if (updateError) throw updateError
    } else {
      // Fallback to sessionStorage for users who just registered
      const userId = sessionStorage.getItem('compaatible_user_id')
      if (userId) {
        const { error: updateError } = await supabase
          .from('users')
          .update({ tier })
          .eq('id', userId)

        if (updateError) throw updateError
      } else {
        console.warn('No auth session or sessionStorage ID found, tier not saved')
      }
    }
    tierSaved.value = true
  } catch (err) {
    console.error('Error saving tier:', err)
  } finally {
    tierSaving.value = false
  }
}

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="results-page">
    <!-- Header -->
    <header class="header">
      <div class="header-container">
        <router-link to="/" class="logo">
          <img :src="logoImage" alt="Compaatible" />
          <span class="logo-text">Compaatible</span>
        </router-link>
        <router-link to="/" class="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Retour
        </router-link>
      </div>
    </header>

    <main class="main-content">
      <!-- Background Decorations -->
      <div class="bg-blur top-right"></div>
      <div class="bg-blur bottom-left"></div>

      <!-- Loading -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Chargement de tes résultats...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
        <button class="btn-primary" @click="goHome">Retour à l'accueil</button>
      </div>

      <!-- Results -->
      <template v-else-if="scores">
        <!-- Hero Section -->
        <section class="hero">
          <div class="container">
            <div class="badge-premium">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#99001B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              Analyse Big Five terminée
            </div>
            <h1 class="hero-title">
              Ton profil de personnalité est prêt<span v-if="userName">, <span class="highlight">{{ userName }}
                <svg viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
                  <path d="M1 9.5C50 3.5 150 1.5 299 9.5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                </svg>
              </span></span> !
            </h1>
            <p class="hero-subtitle">
              Voici ce que le test Big Five révèle sur toi. Ces résultats sont la première étape vers une compatibilité authentique.
            </p>
          </div>
        </section>

        <!-- Score Overview Grid -->
        <section class="overview-section">
          <div class="container">
            <div class="overview-grid">
              <div
                v-for="key in domainOrder"
                :key="key"
                class="overview-card"
              >
                <div class="card-header-row">
                  <div class="icon-box">
                    <span class="domain-emoji">{{ domainIcons[key] }}</span>
                  </div>
                  <h3 class="card-title">{{ domainDescriptions[key]?.title }}</h3>
                </div>
                <p class="card-desc">{{ domainDescriptions[key]?.shortDescription }}</p>
                <div class="progress-container">
                  <div class="progress-bar-bg">
                    <div
                      class="progress-bar-fill"
                      :style="{ width: getPercentage(getDomain(key)) + '%' }"
                    ></div>
                  </div>
                  <div class="progress-labels">
                    <span>Faible</span>
                    <span class="score-value">{{ getPercentage(getDomain(key)) }}%</span>
                    <span>Fort</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Detailed Domain Cards -->
        <section class="details-section">
          <div class="container">
            <h2 class="section-title">Analyse détaillée par domaine</h2>
            <div class="domain-list">
              <div
                v-for="key in domainOrder"
                :key="'detail-' + key"
                class="detail-card"
                :class="{ 'is-expanded': expandedDomainId === key }"
              >
                <button
                  class="detail-card-trigger"
                  @click="toggleDomain(key)"
                >
                  <div class="trigger-left">
                    <div class="domain-icon-wrapper">
                      <span class="domain-emoji-large">{{ domainIcons[key] }}</span>
                    </div>
                    <div class="domain-info">
                      <h3 class="domain-title">{{ domainDescriptions[key]?.title }}</h3>
                      <span
                        v-if="getDomain(key)"
                        :class="['result-badge', `badge-${key === 'N' ? getInvertedResult(getDomain(key)!.result) : getDomain(key)!.result}`]"
                      >
                        {{ getBadgeText(getDomain(key)!.result, key) }}
                      </span>
                    </div>
                  </div>
                  <div class="trigger-right">
                    <svg
                      width="20" height="20" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="2"
                      :class="{ 'chevron-rotated': expandedDomainId === key }"
                      class="chevron-icon"
                    >
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </div>
                </button>

                <div v-if="expandedDomainId === key && getDomain(key)" class="detail-card-content">
                  <div class="interpretation-box">
                    <p class="interpretation-text">
                      {{ getScoreText(key, getDomain(key)!.result) }}
                    </p>
                    <p class="domain-description">
                      {{ domainDescriptions[key]?.description }}
                    </p>
                  </div>

                  <h4 class="facets-heading">Les 6 facettes</h4>
                  <div class="facets-grid">
                    <div
                      v-for="facetNum in 6"
                      :key="facetNum"
                      class="facet-item"
                    >
                      <div class="facet-header">
                        <span class="facet-title">
                          {{ domainDescriptions[key]?.facets[String(facetNum)]?.title || `Facette ${facetNum}` }}
                        </span>
                        <div
                          v-if="getFacet(key, facetNum)"
                          :class="['facet-indicator', `indicator-${getFacetResult(key, getFacet(key, facetNum))}`]"
                        ></div>
                      </div>
                      <div v-if="getFacet(key, facetNum)" class="facet-bar-container">
                        <div class="facet-bar-bg">
                          <div
                            class="facet-bar-fill"
                            :style="{ width: getFacetPercentage(getFacet(key, facetNum), key) + '%' }"
                          ></div>
                        </div>
                        <span class="facet-percentage">{{ getFacetPercentage(getFacet(key, facetNum), key) }}%</span>
                      </div>
                      <p class="facet-interpretation">
                        {{ getFacet(key, facetNum) ? getFacetText(key, String(facetNum), getFacet(key, facetNum)!.result) : '' }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Tier Selection Section -->
        <section class="tier-selection-section">
          <div class="container">
            <header class="tier-header">
              <h2 class="tier-title">Choisis ton expérience</h2>
              <p class="tier-subtitle">Tu as deux options pour participer au matching.</p>
            </header>

            <div class="tier-grid">
              <!-- CARD 1: FREE -->
              <div
                class="tier-card"
                :class="{ 'is-selected': selectedTier === 'free', 'is-disabled': tierSaving || currentTier === 'paid', 'is-locked': currentTier === 'paid' }"
                @click="selectTier('free')"
              >
                <div v-if="currentTier === 'paid'" class="locked-badge">🔒 Indisponible</div>
                <div class="tier-card-content">
                  <h3 class="tier-card-title">Plan Disponible</h3>
                  <div class="tier-price">Gratuit</div>
                  <p class="tier-description">Pour ceux qui laissent le hasard décider à leur place.</p>

                  <ul class="tier-features">
                    <li class="feature-item">
                      <svg class="feat-icon feat-check" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      Accès au test de personnalité
                    </li>
                    <li class="feature-item">
                      <svg class="feat-icon feat-check" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      Profil visible par les membres actifs
                    </li>
                    <li class="feature-item feat-warning">
                      <svg class="feat-icon" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                      Moins de 1% de chance d'être matché
                    </li>
                    <li class="feature-item feat-disabled">
                      <svg class="feat-icon feat-cross" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                      Pas de garantie de match
                    </li>
                  </ul>

                  <button class="tier-cta" :disabled="tierSaving || currentTier === 'paid'">
                    <span v-if="currentTier === 'paid'">Déjà au Plan Expérience</span>
                    <span v-else-if="tierSaving && selectedTier === 'free'">Traitement...</span>
                    <span v-else>Choisir Disponible</span>
                  </button>
                </div>
              </div>

              <!-- CARD 2: PAID (RECOMMENDED) -->
              <div
                class="tier-card tier-featured"
                :class="{ 'is-selected': selectedTier === 'paid', 'is-disabled': tierSaving }"
                @click="selectTier('paid')"
              >
                <div class="recommended-badge">Recommandé</div>
                <div class="tier-card-content">
                  <h3 class="tier-card-title">Plan Expérience</h3>
                  <div class="edition-badge">✨ Exclusif 1ère édition</div>
                  <div class="tier-price"><s class="tier-price-old">19,99€</s> <span class="tier-price-new">0€</span></div>
                  <p class="tier-description">Pour ceux qui décident de prendre les choses en main pour changer définitivement les choses.</p>

                  <ul class="tier-features">
                    <li class="feature-item">
                      <svg class="feat-icon feat-check" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      Accès au test de personnalité
                    </li>
                    <li class="feature-item">
                      <svg class="feat-icon feat-check" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      3 matchs garantis
                    </li>
                    <li class="feature-item">
                      <svg class="feat-icon feat-check" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      1 profil débloqué · les autres en option
                    </li>
                    <li class="feature-item">
                      <svg class="feat-icon feat-check" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      Profil de compatibilité détaillé
                    </li>
                  </ul>

                  <button class="tier-cta tier-cta-premium" :disabled="tierSaving || currentTier === 'paid'">
                    <span v-if="currentTier === 'paid'">✅ Plan actuel</span>
                    <span v-else-if="tierSaving && selectedTier === 'paid'">Traitement...</span>
                    <span v-else>Commencer gratuitement</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Success message -->
            <transition name="tier-fade">
              <div v-if="tierSaved" class="tier-success-banner">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Ton choix a été enregistré avec succès
              </div>
            </transition>
          </div>
        </section>

        <!-- Closing CTA Section -->
        <section class="closing-section">
          <div class="container">
            <div class="cta-card">
              <h2 class="cta-title">Et maintenant ?</h2>
              <p class="cta-text">
                Ton profil a été enregistré. Nous allons analyser tes résultats en profondeur pour te présenter
                les personnes les plus compatibles avec toi. Tu peux modifier ton profil à tout moment.
              </p>
              <div class="cta-actions">
                <div class="cta-button-wrapper">
                  <router-link to="/profil" class="btn-primary">
                    Voir mon profil
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </router-link>
                </div>
                <button class="btn-secondary-link" @click="goHome">
                  Retour à l'accueil
                </button>
              </div>
              <div class="trust-indicators">
                <div class="trust-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#99001B"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  Approche fondée sur la recherche scientifique
                </div>
              </div>
            </div>
          </div>
        </section>
      </template>
    </main>

    <!-- Celebration Overlay (first view) -->
    <transition name="celebration-fade">
      <div v-if="showCelebration" class="celebration-overlay">
        <div class="confetti-container" aria-hidden="true">
          <div v-for="i in 16" :key="i" :class="`confetti confetti-${i}`"></div>
        </div>
        <div class="celebration-card">
          <div class="celebration-illustration">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M60 10L63 25L78 28L63 31L60 46L57 31L42 28L57 25L60 10Z" fill="#C5960A" class="celebration-sparkle-1" />
              <path d="M25 40L27 50L37 52L27 54L25 64L23 54L13 52L23 50L25 40Z" fill="#C5960A" class="celebration-sparkle-2" />
              <path d="M95 35L96.5 42L103.5 43.5L96.5 45L95 52L93.5 45L86.5 43.5L93.5 42L95 35Z" fill="#99001B" class="celebration-sparkle-3" />
              <path d="M60 85C60 85 35 70 35 52C35 42 43 35 52 35C55.5 35 58.5 36.5 60 40C61.5 36.5 64.5 35 68 35C77 35 85 42 85 52C85 70 60 85 60 85Z" fill="#99001B" />
            </svg>
          </div>
          <h2 class="celebration-title">Félicitations, {{ userName }} !</h2>
          <p class="celebration-subtitle">Ton profil de personnalité est maintenant complet. Tu es prêt(e) pour le matching.</p>
          <button class="celebration-cta" @click="dismissCelebration">
            Découvrir mes résultats
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.results-page {
  background-color: var(--color-white-cream);
  min-height: 100vh;
  color: var(--color-black);
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Header */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(251, 249, 247, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-gray-light);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.logo img {
  width: 40px;
  height: auto;
}

.logo-text {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-black);
}

.back-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-gray-dark);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--color-red-pure);
}

/* Background Decorations */
.main-content {
  position: relative;
}

.bg-blur {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

.top-right {
  top: -200px;
  right: -100px;
  background: radial-gradient(circle, rgba(153, 0, 27, 0.06) 0%, transparent 70%);
}

.bottom-left {
  bottom: -200px;
  left: -100px;
  background: radial-gradient(circle, rgba(153, 0, 27, 0.04) 0%, transparent 70%);
}

/* Loading / Error */
.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 20px;
  text-align: center;
  padding: 40px 24px;
  position: relative;
  z-index: 1;
}

.loading-state p,
.error-state p {
  font-size: 1.1rem;
  color: var(--color-gray-dark);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-gray-light);
  border-top-color: var(--color-red-pure);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Hero Section */
.hero {
  padding: 80px 0 40px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.badge-premium {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  background: white;
  border: 1px solid var(--color-gray-light);
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-gray-dark);
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 20px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  color: var(--color-black);
}

.highlight {
  color: var(--color-red-pure);
  position: relative;
  display: inline-block;
  font-family: 'Playfair Display', serif;
}

.highlight svg {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 12px;
  color: var(--color-red-pure);
  opacity: 0.5;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: var(--color-gray-dark);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Overview Section */
.overview-section {
  padding: 40px 0;
  position: relative;
  z-index: 1;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.overview-card {
  background: white;
  padding: 28px;
  border-radius: 20px;
  border: 1px solid var(--color-gray-light);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.overview-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
}

.card-header-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.icon-box {
  width: 40px;
  height: 40px;
  background: rgba(153, 0, 27, 0.05);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.domain-emoji {
  font-size: 1.2rem;
}

.domain-emoji-large {
  font-size: 1.4rem;
}

.card-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-black);
}

.card-desc {
  font-size: 0.9rem;
  color: var(--color-gray-medium);
  line-height: 1.5;
  margin-bottom: 24px;
  min-height: 2.7rem;
}

.progress-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.progress-bar-bg {
  height: 8px;
  background: var(--color-gray-light);
  border-radius: 9999px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #D1D5DB 0%, var(--color-red-pure) 100%);
  border-radius: 9999px;
  transition: width 1s cubic-bezier(0.22, 1, 0.36, 1);
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-gray-medium);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.score-value {
  color: var(--color-red-pure);
  font-size: 0.875rem;
}

/* Detailed Domain List */
.details-section {
  padding: 60px 0;
  position: relative;
  z-index: 1;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 32px;
  color: var(--color-black);
}

.domain-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-card {
  background: white;
  border: 1px solid var(--color-gray-light);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.detail-card.is-expanded {
  border-color: rgba(153, 0, 27, 0.3);
  box-shadow: 0 8px 32px rgba(153, 0, 27, 0.05);
}

.detail-card-trigger {
  width: 100%;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: 'Inter', sans-serif;
}

.trigger-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.domain-icon-wrapper {
  width: 48px;
  height: 48px;
  background: var(--color-red-pure);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.domain-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.domain-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-black);
}

.result-badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 2px 10px;
  border-radius: 9999px;
  width: fit-content;
}

.badge-high { background: rgba(153, 0, 27, 0.1); color: var(--color-red-pure); }
.badge-neutral { background: #F3F4F6; color: var(--color-gray-dark); }
.badge-low { background: #E5E7EB; color: var(--color-gray-medium); }

.trigger-right {
  color: var(--color-gray-medium);
  flex-shrink: 0;
}

.chevron-icon {
  transition: transform 0.3s ease;
}

.chevron-rotated {
  transform: rotate(180deg);
}

/* Expanded content */
.detail-card-content {
  padding: 0 24px 32px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.interpretation-box {
  background: var(--color-white-cream);
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 32px;
}

.interpretation-text {
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--color-black);
  font-weight: 500;
  margin-bottom: 16px;
}

.domain-description {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--color-gray-dark);
}

.facets-heading {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-black);
  margin-bottom: 20px;
}

.facets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.facet-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
  background: var(--color-white-cream);
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.facet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.facet-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-black);
}

.facet-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.indicator-high { background-color: var(--color-red-pure); box-shadow: 0 0 8px rgba(153, 0, 27, 0.4); }
.indicator-neutral { background-color: var(--color-gray-medium); }
.indicator-low { background-color: var(--color-gray-light); }

.facet-bar-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.facet-bar-bg {
  flex: 1;
  height: 4px;
  background: var(--color-gray-light);
  border-radius: 9999px;
  overflow: hidden;
}

.facet-bar-fill {
  height: 100%;
  background: var(--color-red-pure);
  border-radius: 9999px;
  transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.facet-percentage {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-red-pure);
  min-width: 32px;
  text-align: right;
}

.facet-interpretation {
  font-size: 0.85rem;
  color: var(--color-gray-dark);
  line-height: 1.5;
}

/* Tier Selection Section */
.tier-selection-section {
  padding: 80px 0;
  position: relative;
  z-index: 1;
}

.tier-header {
  text-align: center;
  margin-bottom: 60px;
}

.tier-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 600;
  color: var(--color-black);
  margin-bottom: 16px;
}

.tier-subtitle {
  font-family: 'Inter', sans-serif;
  color: var(--color-gray-medium);
  font-size: 1.125rem;
  font-weight: 400;
}

.tier-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  align-items: stretch;
}

.tier-card {
  background: white;
  border-radius: 24px;
  padding: 40px;
  border: 1px solid var(--color-gray-light);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.tier-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.tier-featured {
  border-color: rgba(153, 0, 27, 0.2);
  background: linear-gradient(to bottom right, #ffffff, #fffdfd);
}

.tier-card.is-selected {
  border-color: var(--color-red-pure);
  box-shadow: 0 8px 30px rgba(153, 0, 27, 0.12);
}

.tier-card.is-disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.tier-card.is-locked {
  opacity: 0.5;
  pointer-events: none;
  filter: grayscale(0.3);
  position: relative;
}

.locked-badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-gray-dark, #4A4A4A);
  color: white;
  padding: 5px 16px;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  white-space: nowrap;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.recommended-badge {
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-red-pure);
  color: white;
  padding: 6px 20px;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(153, 0, 27, 0.2);
  font-family: 'Inter', sans-serif;
}

.tier-card-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.tier-card-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-black);
  margin-bottom: 8px;
}

.edition-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, rgba(153, 0, 27, 0.08) 0%, rgba(153, 0, 27, 0.03) 100%);
  border: 1px solid rgba(153, 0, 27, 0.15);
  color: var(--color-red-pure);
  padding: 6px 16px;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  margin-bottom: 16px;
  letter-spacing: 0.02em;
}

.tier-price {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--color-black);
  margin-bottom: 20px;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.tier-price-old {
  font-size: 1.4rem;
  color: var(--color-gray-medium);
  text-decoration: line-through;
  font-weight: 500;
  opacity: 0.6;
}

.tier-price-new {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-red-pure);
}

.tier-period {
  font-size: 1rem;
  color: var(--color-gray-medium);
  font-weight: 400;
}

.tier-description {
  color: var(--color-gray-dark);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 32px;
  font-family: 'Inter', sans-serif;
}

.tier-features {
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;
  flex-grow: 1;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
  font-size: 0.9375rem;
  color: var(--color-gray-dark);
  font-family: 'Inter', sans-serif;
}

.feature-item.feat-disabled {
  color: var(--color-gray-medium);
  opacity: 0.6;
}

.feature-item.feat-warning {
  color: #c27803;
}

.feat-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 2px;
}

.feat-check {
  fill: var(--color-red-pure);
}

.feat-cross {
  fill: var(--color-gray-medium);
}

.feat-warning .feat-icon {
  fill: #f59e0b;
}

.tier-cta {
  width: 100%;
  padding: 16px;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--color-gray-light);
  background: white;
  color: var(--color-black);
  font-family: 'Inter', sans-serif;
}

.tier-cta:hover:not(:disabled) {
  background: var(--color-gray-light);
}

.tier-cta-premium {
  background: var(--color-red-pure);
  color: white;
  border: none;
  box-shadow: 0 4px 15px rgba(153, 0, 27, 0.25);
}

.tier-cta-premium:hover:not(:disabled) {
  background: var(--color-red-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(153, 0, 27, 0.3);
}

.is-selected .tier-cta:not(.tier-cta-premium) {
  background: var(--color-black);
  color: white;
  border-color: var(--color-black);
}

.tier-success-banner {
  margin-top: 40px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #166534;
  padding: 16px 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
}

.tier-fade-enter-active, .tier-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.tier-fade-enter-from, .tier-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Closing Section */
.closing-section {
  padding: 60px 0 100px;
  position: relative;
  z-index: 1;
}

.cta-card {
  background: white;
  border: 1px solid var(--color-gray-light);
  border-radius: 20px;
  padding: 60px 40px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.cta-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--color-red-pure);
}

.cta-title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--color-black);
}

.cta-text {
  font-size: 1.125rem;
  color: var(--color-gray-dark);
  max-width: 650px;
  margin: 0 auto 40px;
  line-height: 1.6;
}

.cta-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
}

.cta-button-wrapper {
  padding: 6px;
  background: rgba(153, 0, 27, 0.05);
  border-radius: 9999px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 40px;
  background: var(--color-red-pure);
  color: white;
  border: none;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(153, 0, 27, 0.3);
}

.btn-primary:hover {
  background: var(--color-red-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(153, 0, 27, 0.4);
}

.btn-secondary-link {
  background: none;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-gray-dark);
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s ease;
  margin-top: 8px;
}

.btn-secondary-link:hover {
  color: var(--color-red-pure);
}

.trust-indicators {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-gray-dark);
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    padding: 60px 0 30px;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .overview-grid {
    grid-template-columns: 1fr;
  }

  .cta-card {
    padding: 40px 24px;
  }

  .facets-grid {
    grid-template-columns: 1fr;
  }

  .trigger-left {
    gap: 12px;
  }

  .domain-title {
    font-size: 1.1rem;
  }

  .domain-icon-wrapper {
    width: 42px;
    height: 42px;
  }
}

/* ===== CELEBRATION OVERLAY ===== */
.celebration-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 26, 26, 0.4);
  backdrop-filter: blur(12px);
  padding: 24px;
}

.celebration-card {
  background: #FEFEFE;
  border-radius: 24px;
  padding: 48px 32px;
  max-width: 480px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 10;
  animation: celebrationCardEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes celebrationCardEnter {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.celebration-illustration {
  margin-bottom: 24px;
}

.celebration-sparkle-1 { animation: celebrationFloat 3s ease-in-out infinite; }
.celebration-sparkle-2 { animation: celebrationFloat 4s ease-in-out infinite 0.5s; }
.celebration-sparkle-3 { animation: celebrationFloat 3.5s ease-in-out infinite 1s; }

@keyframes celebrationFloat {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-8px) scale(1.1); }
}

.celebration-title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 16px;
  line-height: 1.2;
}

.celebration-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: #5C5C5C;
  line-height: 1.6;
  margin-bottom: 32px;
}

.celebration-cta {
  background: #99001B;
  color: #FEFEFE;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  padding: 16px 32px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(153, 0, 27, 0.3);
}

.celebration-cta:hover {
  background: #7A0016;
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(153, 0, 27, 0.4);
}

/* CSS Confetti System */
.confetti-container {
  position: absolute;
  top: -20px;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  top: -10%;
  animation: confettiFall linear forwards;
}

@keyframes confettiFall {
  to {
    transform: translateY(110vh) rotate(720deg);
  }
}

.confetti-1 { left: 5%; background: #99001B; animation-duration: 4s; animation-delay: 0s; }
.confetti-2 { left: 15%; background: #C5960A; animation-duration: 3.5s; animation-delay: 0.5s; }
.confetti-3 { left: 25%; background: #FBF9F7; animation-duration: 5s; animation-delay: 0.2s; border: 1px solid #E8E8E8; }
.confetti-4 { left: 35%; background: #99001B; animation-duration: 4.2s; animation-delay: 0.8s; }
.confetti-5 { left: 45%; background: #C5960A; animation-duration: 3.8s; animation-delay: 0.3s; }
.confetti-6 { left: 55%; background: #99001B; animation-duration: 4.5s; animation-delay: 1.2s; }
.confetti-7 { left: 65%; background: #FBF9F7; animation-duration: 3.2s; animation-delay: 0.1s; border: 1px solid #E8E8E8; }
.confetti-8 { left: 75%; background: #C5960A; animation-duration: 4.8s; animation-delay: 0.6s; }
.confetti-9 { left: 85%; background: #99001B; animation-duration: 3.6s; animation-delay: 1.5s; }
.confetti-10 { left: 95%; background: #C5960A; animation-duration: 4.1s; animation-delay: 0.4s; }
.confetti-11 { left: 10%; background: #99001B; width: 6px; height: 12px; animation-duration: 4.4s; animation-delay: 2s; }
.confetti-12 { left: 30%; background: #C5960A; width: 12px; height: 8px; animation-duration: 3.9s; animation-delay: 1.8s; }
.confetti-13 { left: 50%; background: #FBF9F7; width: 8px; height: 8px; animation-duration: 4.7s; animation-delay: 2.2s; border: 1px solid #E8E8E8; }
.confetti-14 { left: 70%; background: #99001B; width: 10px; height: 4px; animation-duration: 3.3s; animation-delay: 1.3s; }
.confetti-15 { left: 90%; background: #C5960A; width: 6px; height: 6px; animation-duration: 4.6s; animation-delay: 2.5s; }
.confetti-16 { left: 20%; background: #99001B; width: 8px; height: 12px; animation-duration: 4.2s; animation-delay: 2.1s; }

/* Celebration transition */
.celebration-fade-enter-active,
.celebration-fade-leave-active {
  transition: opacity 0.4s ease;
}

.celebration-fade-enter-from,
.celebration-fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .celebration-card {
    padding: 32px 24px;
  }
  .celebration-title {
    font-size: 1.5rem;
  }
  .celebration-subtitle {
    font-size: 1rem;
  }
}
</style>
