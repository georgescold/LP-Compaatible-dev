<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { questions, choices, QUESTIONS_PER_PAGE, type Question } from '../data/bigfive-questions'
import { processAnswers, type Answer } from '../lib/scoring'
import { supabase } from '../lib/supabase'

import logoImage from '../assets/Logo_compaatible-removebg-preview.png'
import HobbiesSelector from '../components/HobbiesSelector.vue'

const router = useRouter()
const resolvedUserIdRef = ref(sessionStorage.getItem('compaatible_user_id') || '')
const isEditMode = ref(false)

onMounted(async () => {
  // Try sessionStorage first, fallback to Supabase Auth
  let currentUserId = resolvedUserIdRef.value
  if (!currentUserId) {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user?.email) {
      const { data: userData } = await supabase
        .from('users')
        .select('id')
        .eq('email', session.user.email)
        .single()
      if (userData) {
        currentUserId = userData.id
        resolvedUserIdRef.value = currentUserId
        sessionStorage.setItem('compaatible_user_id', currentUserId)
      }
    }
  }

  if (!currentUserId) {
    router.push('/inscription')
    return
  }

  // 1. Restore from sessionStorage (in-progress test)
  const saved = sessionStorage.getItem('compaatible_test_progress')
  if (saved) {
    const parsed = JSON.parse(saved)
    answersMap.value = new Map(parsed.answers)
    currentPage.value = parsed.page
    hobbiesAnswer.value = parsed.hobbies || []
    idealPartnerAnswer.value = parsed.idealPartner || ''
  } else {
    // 2. Load existing answers from Supabase (edit mode)
    const { data: existingTest } = await supabase
      .from('test_results')
      .select('answers, hobbies, ideal_partner')
      .eq('user_id', currentUserId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (existingTest?.answers) {
      isEditMode.value = true
      const answers = existingTest.answers as Answer[]
      const map = new Map<string, Answer>()
      answers.forEach(a => map.set(a.id, a))
      answersMap.value = map
      hobbiesAnswer.value = existingTest.hobbies || []
      idealPartnerAnswer.value = existingTest.ideal_partner || ''
      // Start at page 0 so user can review from the beginning
    }
  }

  startTime.value = Date.now()
})

const startTime = ref(Date.now())
const answersMap = ref<Map<string, Answer>>(new Map())
const currentPage = ref(0)
const hobbiesAnswer = ref<string[]>([])
const idealPartnerAnswer = ref('')
const isSubmitting = ref(false)

// Total pages: questions pages + 1 passions page + 1 ideal partner page
const totalQuestionPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE)
const totalPages = totalQuestionPages + 2

const isOnQuestionsPhase = computed(() => currentPage.value < totalQuestionPages)
const isOnPassionsPage = computed(() => currentPage.value === totalQuestionPages)
const isOnIdealPartnerPage = computed(() => currentPage.value === totalQuestionPages + 1)

const currentQuestions = computed<Question[]>(() => {
  if (!isOnQuestionsPhase.value) return []
  const start = currentPage.value * QUESTIONS_PER_PAGE
  return questions.slice(start, start + QUESTIONS_PER_PAGE)
})

const progress = computed(() => {
  return Math.round((currentPage.value / totalPages) * 100)
})

const answeredOnCurrentPage = computed(() => {
  if (isOnPassionsPage.value) return hobbiesAnswer.value.length === 5
  if (isOnIdealPartnerPage.value) return idealPartnerAnswer.value.trim().length > 0
  return currentQuestions.value.every(q => answersMap.value.has(q.id))
})

// Check if a page has all questions answered (for enabling free navigation)
function isPageAnswered(pageIndex: number): boolean {
  if (pageIndex === totalQuestionPages) return hobbiesAnswer.value.length === 5
  if (pageIndex === totalQuestionPages + 1) return idealPartnerAnswer.value.trim().length > 0
  const start = pageIndex * QUESTIONS_PER_PAGE
  const pageQuestions = questions.slice(start, start + QUESTIONS_PER_PAGE)
  return pageQuestions.every(q => answersMap.value.has(q.id))
}

// Highest page reached (for navigation limits in non-edit mode)
const highestPageReached = computed(() => {
  let highest = 0
  for (let i = 0; i < totalPages; i++) {
    if (isPageAnswered(i)) {
      highest = i + 1
    } else {
      break
    }
  }
  return highest
})

// Can navigate to a specific page?
function canGoToPage(pageIndex: number): boolean {
  if (isEditMode.value) return true // In edit mode, all pages are accessible
  return pageIndex <= highestPageReached.value
}

function goToPage(pageIndex: number) {
  if (canGoToPage(pageIndex) && pageIndex >= 0 && pageIndex < totalPages) {
    currentPage.value = pageIndex
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function getChoicesForQuestion(q: Question) {
  return choices[q.keyed]
}

function selectAnswer(question: Question, score: number) {
  answersMap.value.set(question.id, {
    id: question.id,
    domain: question.domain,
    facet: question.facet,
    score,
    num: question.num
  })
  // Force reactivity
  answersMap.value = new Map(answersMap.value)
}

function getSelectedScore(questionId: string): number | null {
  const answer = answersMap.value.get(questionId)
  return answer ? answer.score : null
}

// Save progress
watch([answersMap, currentPage, hobbiesAnswer, idealPartnerAnswer], () => {
  sessionStorage.setItem('compaatible_test_progress', JSON.stringify({
    answers: Array.from(answersMap.value.entries()),
    page: currentPage.value,
    hobbies: hobbiesAnswer.value,
    idealPartner: idealPartnerAnswer.value
  }))
}, { deep: true })

function nextPage() {
  if (!answeredOnCurrentPage.value) return
  if (currentPage.value < totalPages - 1) {
    currentPage.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function prevPage() {
  if (currentPage.value > 0) {
    currentPage.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

async function submitTest() {
  if (!resolvedUserIdRef.value || isSubmitting.value) return

  isSubmitting.value = true
  try {
    const allAnswers = Array.from(answersMap.value.values())
    const scores = processAnswers(allAnswers)
    const timeElapsed = Math.round((Date.now() - startTime.value) / 1000)

    const { data, error } = await supabase
      .from('test_results')
      .insert({
        user_id: resolvedUserIdRef.value,
        answers: allAnswers,
        scores,
        passions: '', // Deprecated, keeping empty for compat
        hobbies: hobbiesAnswer.value,
        ideal_partner: idealPartnerAnswer.value.trim(),
        time_elapsed: timeElapsed
      })
      .select('id')
      .single()

    if (error) throw error

    sessionStorage.removeItem('compaatible_test_progress')
    if (data) {
      router.push(`/resultats/${data.id}`)
    }
  } catch (err) {
    console.error('Error submitting test:', err)
    alert('Une erreur est survenue lors de l\'envoi. Réessaie.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="test-page">
    <!-- Top bar -->
    <div class="test-topbar">
      <div class="topbar-inner">
        <div class="header-left">
           <router-link to="/" class="topbar-logo">
            <img :src="logoImage" alt="Compaatible" />
            <span class="logo-text">Compaatible</span>
          </router-link>
          
          <router-link v-if="resolvedUserIdRef" to="/profil" class="back-profile-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Retour au profil
          </router-link>
        </div>
        <div class="progress-info">
          <span class="progress-label">{{ progress }}%</span>
        </div>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
    </div>

    <div class="test-content">
      <!-- Page navigator (visible when answers exist / edit mode, or when some pages answered) -->
      <div v-if="isEditMode || highestPageReached > 0" class="page-navigator">
        <button
          class="page-nav-arrow"
          :disabled="currentPage === 0"
          @click="goToPage(currentPage - 1)"
          aria-label="Page précédente"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <div class="page-dots">
          <button
            v-for="i in totalPages"
            :key="i - 1"
            class="page-dot"
            :class="{
              active: currentPage === i - 1,
              answered: isPageAnswered(i - 1),
              reachable: canGoToPage(i - 1),
              special: i - 1 >= totalQuestionPages
            }"
            :disabled="!canGoToPage(i - 1)"
            @click="goToPage(i - 1)"
            :title="i - 1 < totalQuestionPages ? `Questions ${(i - 1) * 5 + 1}-${Math.min(i * 5, questions.length)}` : i - 1 === totalQuestionPages ? 'Centres d\'intérêt' : 'Partenaire idéal'"
          ></button>
        </div>

        <button
          class="page-nav-arrow"
          :disabled="!canGoToPage(currentPage + 1)"
          @click="goToPage(currentPage + 1)"
          aria-label="Page suivante"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        <span class="page-indicator">{{ currentPage + 1 }}/{{ totalPages }}</span>
      </div>

      <!-- Questions phase -->
      <div v-if="isOnQuestionsPhase" class="questions-container">
        <p v-if="currentPage === 0" class="honesty-notice">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          Réponds le plus honnêtement possible - il n'y a pas de bonne ou mauvaise réponse. Évite les réponses neutres pour un résultat plus précis.
        </p>

        <div class="questions-list">
          <div
            v-for="question in currentQuestions"
            :key="question.id"
            class="question-card"
          >
            <p class="question-number">{{ question.num }}.</p>
            <p class="question-text">{{ question.text }}</p>

            <div class="choices-row">
              <button
                v-for="choice in getChoicesForQuestion(question)"
                :key="choice.score + '-' + choice.color"
                class="choice-btn"
                :class="{
                  selected: getSelectedScore(question.id) === choice.score,
                  [`color-${choice.color}`]: true
                }"
                @click="selectAnswer(question, choice.score)"
              >
                {{ choice.text }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Passions page -->
      <div v-else-if="isOnPassionsPage" class="open-question-container">
        <HobbiesSelector v-model="hobbiesAnswer" />
      </div>

      <!-- Ideal partner page -->
      <div v-else-if="isOnIdealPartnerPage" class="open-question-container">
        <div class="open-question-badge">Dernière question</div>
        <h2 class="open-question-title">Décris la personne idéale selon toi.</h2>
        <p class="open-question-subtitle">
          Au-delà du physique, quelle personnalité, quelles valeurs, quel mode de vie
          recherches-tu chez quelqu'un ? Plus tu es sincère, meilleur sera ton match.
        </p>
        <textarea
          v-model="idealPartnerAnswer"
          class="open-textarea"
          placeholder="Quelqu'un de curieux, bienveillant, qui aime rire et qui partage cette envie de construire quelque chose de vrai..."
          rows="6"
        ></textarea>
      </div>

      <!-- Navigation -->
      <div class="test-nav">
        <button
          class="nav-btn nav-prev"
          :class="{ invisible: currentPage === 0 }"
          @click="prevPage"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Précédent
        </button>

        <button
          v-if="currentPage < totalPages - 1"
          class="nav-btn nav-next"
          :class="{ disabled: !answeredOnCurrentPage }"
          :disabled="!answeredOnCurrentPage"
          @click="nextPage"
        >
          Suivant
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>

        <button
          v-else
          class="nav-btn nav-submit"
          :class="{ disabled: !answeredOnCurrentPage || isSubmitting }"
          :disabled="!answeredOnCurrentPage || isSubmitting"
          @click="submitTest"
        >
          {{ isSubmitting ? 'Envoi en cours...' : 'Découvrir mon profil' }}
          <svg v-if="!isSubmitting" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.test-page {
  min-height: 100vh;
  background: var(--color-white-cream);
  cursor: default;
}

.test-page * {
  cursor: default;
}

/* Top bar */
.test-topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-gray-light);
  user-select: none; /* Prevent text selection to avoid cursor artifacts */
  -webkit-user-select: none;
}

.topbar-inner {
  max-width: 800px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.header-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.topbar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  border: none;
  outline: none;
}

.topbar-logo img {
  width: 36px;
  height: auto;
}

.back-profile-link {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-gray-medium);
  text-decoration: none;
  transition: color 0.2s ease;
  padding: 4px 8px;
  border-radius: 6px;
}

.back-profile-link:hover {
  color: var(--color-red-pure);
  background: rgba(153, 0, 27, 0.05);
}

.logo-text {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-black);
}

.progress-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-red-pure);
}

.progress-bar {
  height: 5px;
  background: var(--color-gray-light);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-red-pure), #cc0025);
  border-radius: 0 9999px 9999px 0;
  transition: width 0.4s ease;
  box-shadow: 0 0 8px rgba(153, 0, 27, 0.3);
}

/* Content */
.test-content {
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 24px 100px;
}

/* Page navigator */
.page-navigator {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
  padding: 12px 16px;
  background: white;
  border-radius: 16px;
  border: 1px solid var(--color-gray-light);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.page-nav-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1.5px solid var(--color-gray-light);
  background: var(--color-white-cream);
  color: var(--color-gray-dark);
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.page-nav-arrow:hover:not(:disabled) {
  border-color: var(--color-red-pure);
  color: var(--color-red-pure);
  background: rgba(153, 0, 27, 0.03);
}

.page-nav-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.page-dots {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: center;
  flex: 1;
}

.page-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: var(--color-gray-light);
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
}

.page-dot.answered {
  background: rgba(153, 0, 27, 0.25);
}

.page-dot.active {
  background: var(--color-red-pure);
  transform: scale(1.3);
  box-shadow: 0 0 6px rgba(153, 0, 27, 0.3);
}

.page-dot.special {
  border-radius: 3px;
  width: 14px;
}

.page-dot.special.answered {
  background: rgba(153, 0, 27, 0.25);
}

.page-dot.special.active {
  background: var(--color-red-pure);
}

.page-dot:not(.reachable) {
  opacity: 0.3;
  cursor: not-allowed;
}

.page-dot.reachable:hover:not(.active) {
  background: rgba(153, 0, 27, 0.4);
  transform: scale(1.2);
}

.page-indicator {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-gray-medium);
  white-space: nowrap;
  flex-shrink: 0;
}

.honesty-notice {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-gray-dark);
  line-height: 1.5;
  margin-bottom: 32px;
  padding: 16px 20px;
  background: white;
  border: 1px solid var(--color-gray-light);
  border-left: 3px solid var(--color-red-pure);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.honesty-notice svg {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--color-red-pure);
}

/* Question cards */
.questions-list {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.question-card {
  background: white;
  border-radius: 20px;
  padding: 28px 32px;
  border: 1px solid var(--color-gray-light);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.02);
}

.question-number {
  font-family: 'Playfair Display', serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-red-pure);
  margin-bottom: 6px;
}

.question-text {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--color-black);
  line-height: 1.5;
  margin-bottom: 20px;
}

/* Choice buttons */
.choices-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.choice-btn {
  flex: 1;
  min-width: 0;
  padding: 10px 6px;
  border: 1.5px solid var(--color-gray-light);
  border-radius: 12px;
  background: var(--color-white-cream);
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--color-gray-dark);
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  line-height: 1.3;
}

.choice-btn:hover {
  border-color: var(--color-red-pure);
  color: var(--color-red-pure);
}

.choice-btn.selected {
  border-color: var(--color-red-pure);
  background: var(--color-red-pure);
  color: white;
  font-weight: 600;
}

/* Open questions */
.open-question-container {
  text-align: center;
  padding: 40px 0;
}

.open-question-badge {
  display: inline-block;
  padding: 8px 20px;
  background: white;
  border: 1px solid var(--color-gray-light);
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-red-pure);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 28px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.open-question-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 600;
  color: var(--color-black);
  line-height: 1.3;
  margin-bottom: 16px;
}

.open-question-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: var(--color-gray-dark);
  line-height: 1.6;
  max-width: 480px;
  margin: 0 auto 32px;
}

.open-textarea {
  width: 100%;
  padding: 20px 24px;
  border: 1.5px solid var(--color-gray-light);
  border-radius: 20px;
  background: white;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: var(--color-black);
  line-height: 1.7;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.open-textarea:focus {
  border-color: var(--color-red-pure);
  box-shadow: 0 0 0 3px rgba(153, 0, 27, 0.08);
}

.open-textarea::placeholder {
  color: var(--color-gray-medium);
  font-style: italic;
}

/* Navigation */
.test-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 48px;
  gap: 16px;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.nav-prev {
  background: transparent;
  color: var(--color-gray-dark);
  border: 1.5px solid var(--color-gray-light);
}

.nav-prev:hover {
  border-color: var(--color-gray-dark);
  color: var(--color-black);
}

.nav-next,
.nav-submit {
  background: var(--color-red-pure);
  color: white;
  box-shadow: 0 4px 20px rgba(153, 0, 27, 0.3);
  margin-left: auto;
}

.nav-next:hover:not(.disabled),
.nav-submit:hover:not(.disabled) {
  background: var(--color-red-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(153, 0, 27, 0.4);
}

.nav-btn.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.nav-btn.invisible {
  visibility: hidden;
}

/* Responsive */
@media (max-width: 600px) {
  .test-content {
    padding: 24px 16px 80px;
  }

  .question-card {
    padding: 20px;
    border-radius: 16px;
  }

  .choices-row {
    flex-direction: column;
    gap: 6px;
  }

  .choice-btn {
    padding: 12px 16px;
    font-size: 0.8rem;
    text-align: left;
  }

  .nav-btn {
    padding: 12px 20px;
    font-size: 0.85rem;
  }

  .questions-list {
    gap: 20px;
  }

  .page-navigator {
    padding: 10px 12px;
    margin-bottom: 20px;
  }

  .page-dot {
    width: 8px;
    height: 8px;
  }

  .page-dot.special {
    width: 12px;
  }

  .page-nav-arrow {
    width: 28px;
    height: 28px;
  }
}
</style>
