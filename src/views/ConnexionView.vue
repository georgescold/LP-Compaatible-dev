<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'
import logoImage from '../assets/nouveau logo compaatible.png'
import { ArrowLeft, Mail, Lock, ShieldCheck, Eye, EyeOff, Loader2, CheckCircle } from 'lucide-vue-next'

const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// States
const resetMode = ref(false)
const resetSent = ref(false)
const updatePasswordMode = ref(false)

onMounted(() => {
  // Check if we are in a password recovery flow (access_token in hash)
  const hash = window.location.hash
  if (hash && hash.includes('access_token') && hash.includes('type=recovery')) {
    updatePasswordMode.value = true
  }
})

async function handleLogin() {
  if (!email.value.trim() || !password.value) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email.value.trim().toLowerCase(),
      password: password.value
    })

    if (authError) {
      if (authError.message.includes('Email not confirmed')) {
        errorMessage.value = 'Tu dois confirmer ton email avant de te connecter. Vérifie ta boîte de réception (et tes spams) pour le lien de confirmation.'
      } else if (authError.message.includes('Invalid login credentials')) {
        errorMessage.value = 'Email ou mot de passe incorrect. Si tu t\'es inscrit(e) avant la mise à jour, clique sur "Mot de passe oublié ?" pour en créer un.'
      } else {
        errorMessage.value = 'Une erreur est survenue. Réessaie dans quelques instants.'
      }
      return
    }

    // Store user_id in sessionStorage for profile access
    if (authData.user) {
      const { data: userData } = await supabase
        .from('users')
        .select('id, first_name, personality_type, tier')
        .eq('email', email.value.trim().toLowerCase())
        .single()

      if (userData) {
        sessionStorage.setItem('compaatible_user_id', userData.id)
        sessionStorage.setItem('compaatible_user_name', userData.first_name)

        // Smart redirect: check if user has completed the test
        const pendingResultId = sessionStorage.getItem('compaatible_pending_result_id')
        if (pendingResultId) {
          // User just finished the test before confirming email → show results
          sessionStorage.removeItem('compaatible_pending_result_id')

          // Now that user is authenticated, update personality_type if needed
          if (!userData.personality_type) {
            const { data: testResult } = await supabase
              .from('test_results')
              .select('personality_type')
              .eq('user_id', userData.id)
              .order('created_at', { ascending: false })
              .limit(1)
              .single()
            if (testResult?.personality_type) {
              await supabase
                .from('users')
                .update({ personality_type: testResult.personality_type })
                .eq('id', userData.id)
            }
          }

          router.push(`/resultats/${pendingResultId}`)
          return
        }

        // Check if user has any test results
        const { data: existingTest } = await supabase
          .from('test_results')
          .select('id')
          .eq('user_id', userData.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (!existingTest) {
          // No test yet → send to test
          router.push('/test')
          return
        }

        // Has test results but no tier selected yet → must choose a plan first
        if (!userData.tier) {
          router.push(`/resultats/${existingTest.id}`)
          return
        }

        // Has test results and tier → go to profile dashboard
        router.push('/profil')
        return
      }
    }

    router.push('/profil')
  } catch {
    errorMessage.value = 'Erreur de connexion. Vérifie ta connexion internet.'
  } finally {
    isLoading.value = false
  }
}

async function handleResetPasswordLink() {
  if (!email.value.trim()) {
    errorMessage.value = 'Entre ton adresse email pour réinitialiser ton mot de passe.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(
      email.value.trim().toLowerCase(),
      { redirectTo: `${window.location.origin}/connexion` }
    )

    if (error) throw error
    resetSent.value = true
  } catch {
    errorMessage.value = 'Une erreur est survenue. Réessaie.'
  } finally {
    isLoading.value = false
  }
}

async function handleUpdatePassword() {
  if (!password.value || !confirmPassword.value) {
    errorMessage.value = 'Remplis tous les champs.'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Les mots de passe ne correspondent pas.'
    return
  }

  if (password.value.length < 6) {
    errorMessage.value = 'Le mot de passe doit contenir au moins 6 caractères.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const { error } = await supabase.auth.updateUser({
      password: password.value
    })

    if (error) throw error

    successMessage.value = 'Ton mot de passe a été mis à jour avec succès !'
    setTimeout(() => {
      updatePasswordMode.value = false
      successMessage.value = ''
      password.value = ''
      confirmPassword.value = ''
    }, 2000)
  } catch (err: any) {
    console.error(err)
    errorMessage.value = 'Impossible de mettre à jour le mot de passe. Le lien est peut-être expiré.'
  } finally {
    isLoading.value = false
  }
}

function handleBack() {
  router.push('/')
}
</script>

<template>
 <main class="connexion-page">
    <!-- Decorative Atmosphere -->
    <div class="deco-blur deco-top-right"></div>
    <div class="deco-blur deco-bottom-left"></div>

    <!-- Navigation -->
    <div class="back-nav">
      <button class="back-button" @click="handleBack">
        <ArrowLeft class="w-4 h-4" />
        Retour
      </button>
    </div>

    <!-- Logo -->
    <router-link to="/" class="logo-area">
      <img :src="logoImage" alt="Compaatible" />
      <span class="logo-text">Compaatible</span>
    </router-link>

    <!-- Main Card Container -->
    <div class="card-container">

      <!-- UPDATE PASSWORD MODE (Token detected) -->
      <div v-if="updatePasswordMode" class="main-card">
        <div v-if="successMessage" class="success-state">
          <div class="success-icon-wrapper">
            <CheckCircle class="success-icon" />
          </div>
          <h2 class="success-title">Mot de passe modifié !</h2>
          <p class="success-text">Tu vas être redirigé vers la connexion...</p>
        </div>

        <div v-else>
          <div class="card-header">
            <div class="badge">Sécurité</div>
            <h1 class="card-title">Nouveau mot de passe</h1>
            <p class="card-subtitle">
              Choisis un nouveau mot de passe sécurisé pour ton compte.
            </p>
          </div>

          <form @submit.prevent="handleUpdatePassword" class="form">
            <div class="form-group">
              <label for="new-password" class="form-label">Nouveau mot de passe</label>
              <div class="input-wrapper">
                <Lock class="input-icon" />
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  id="new-password"
                  required
                  placeholder="••••••••"
                  class="form-input form-input-password"
                />
                <button
                  type="button"
                  class="toggle-password"
                  @click="showPassword = !showPassword"
                >
                  <EyeOff v-if="showPassword" class="w-4 h-4" />
                  <Eye v-else class="w-4 h-4" />
                </button>
              </div>
            </div>

            <div class="form-group">
              <label for="confirm-password" class="form-label">Confirmer le mot de passe</label>
              <div class="input-wrapper">
                <Lock class="input-icon" />
                <input
                  v-model="confirmPassword"
                  :type="showPassword ? 'text' : 'password'"
                  id="confirm-password"
                  required
                  placeholder="••••••••"
                  class="form-input"
                />
              </div>
              <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="submit-btn"
              :class="{ 'is-loading': isLoading }"
            >
              <Loader2 v-if="isLoading" class="w-5 h-5 spin-icon" />
              <span v-else>Enregistrer le mot de passe</span>
            </button>
          </form>
        </div>
      </div>

      <!-- RESET SENT STATE -->
      <div v-else-if="resetSent" class="main-card success-card">
        <div class="success-icon-wrapper">
          <Mail class="success-icon" />
        </div>
        <h2 class="success-title">Email envoyé !</h2>
        <p class="success-text">
          Un lien de réinitialisation a été envoyé à <strong>{{ email }}</strong>.<br>
          Vérifie ta boîte de réception et tes spams.
        </p>
        <button class="submit-btn" @click="resetMode = false; resetSent = false">
          Retour à la connexion
        </button>
      </div>

      <!-- RESET PASSWORD REQUEST MODE -->
      <div v-else-if="resetMode" class="main-card">
        <div class="card-header">
          <div class="badge">Réinitialisation</div>
          <h1 class="card-title">Mot de passe oublié ?</h1>
          <p class="card-subtitle">
            Entre ton adresse email et nous t'enverrons un lien pour créer un nouveau mot de passe.
          </p>
        </div>

        <form @submit.prevent="handleResetPasswordLink" class="form">
          <div class="form-group">
            <label for="reset-email" class="form-label">Adresse email</label>
            <div class="input-wrapper">
              <Mail class="input-icon" />
              <input
                v-model="email"
                type="email"
                id="reset-email"
                required
                placeholder="nom@exemple.com"
                class="form-input"
              />
            </div>
            <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="submit-btn"
            :class="{ 'is-loading': isLoading }"
          >
            <Loader2 v-if="isLoading" class="w-5 h-5 spin-icon" />
            <span v-else>Envoyer le lien</span>
          </button>
        </form>

        <div class="inscription-link-row">
          <p>
            <a href="#" class="inscription-link" @click.prevent="resetMode = false; errorMessage = ''">Retour à la connexion</a>
          </p>
        </div>
      </div>

      <!-- LOGIN STATE -->
      <div v-else class="main-card">
        <div class="card-header">
          <div class="badge">Accès à ton profil</div>
          <h1 class="card-title">Connexion</h1>
          <p class="card-subtitle">
            Connecte-toi avec l'email et le mot de passe choisis lors de ton inscription.
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="form">
          <div class="form-group">
            <label for="email" class="form-label">Adresse email</label>
            <div class="input-wrapper">
              <Mail class="input-icon" :class="{ 'icon-error': errorMessage }" />
              <input
                v-model="email"
                type="email"
                id="email"
                required
                placeholder="nom@exemple.com"
                class="form-input"
                :class="{ 'input-error': errorMessage }"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Mot de passe</label>
            <div class="input-wrapper">
              <Lock class="input-icon" :class="{ 'icon-error': errorMessage }" />
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                required
                placeholder="••••••••"
                class="form-input form-input-password"
                :class="{ 'input-error': errorMessage }"
              />
              <button
                type="button"
                class="toggle-password"
                @click="showPassword = !showPassword"
              >
                <EyeOff v-if="showPassword" class="w-4 h-4" />
                <Eye v-else class="w-4 h-4" />
              </button>
            </div>
            <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
          </div>

          <div class="forgot-row">
            <a href="#" class="forgot-link" @click.prevent="resetMode = true; errorMessage = ''">Mot de passe oublié ?</a>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="submit-btn"
            :class="{ 'is-loading': isLoading }"
          >
            <Loader2 v-if="isLoading" class="w-5 h-5 spin-icon" />
            <span v-else>Se connecter</span>
          </button>
        </form>

        <div class="inscription-link-row">
          <p>
            Pas encore inscrit(e) ?
            <router-link to="/inscription" class="inscription-link">Commencer l'expérience</router-link>
          </p>
        </div>
      </div>

      <!-- Trust Indicators -->
      <div class="trust-row">
        <div class="trust-item">
          <ShieldCheck class="trust-icon" />
          Connexion sécurisée
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.connexion-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  background: var(--color-white-cream);
  position: relative;
  overflow: hidden;
}

/* Decorative blurs */
.deco-blur {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.deco-top-right {
  top: -20%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.06) 0%, transparent 70%);
}

.deco-bottom-left {
  bottom: -10%;
  left: -5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.04) 0%, transparent 70%);
}

/* Navigation */
.back-nav {
  position: absolute;
  top: 32px;
  left: 32px;
  z-index: 20;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-gray-dark);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.back-button:hover {
  color: var(--color-red-pure);
}

/* Logo */
.logo-area {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 48px;
  position: relative;
  z-index: 10;
  text-decoration: none;
}

.logo-area img {
  height: 34px;
  width: auto;
}

.logo-text {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-black);
}

/* Card container */
.card-container {
  width: 100%;
  max-width: 560px;
  position: relative;
  z-index: 10;
}

.main-card {
  background: white;
  padding: 40px 36px;
  border-radius: 24px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.03);
  border: 1px solid var(--color-gray-light);
}

/* Card header */
.card-header {
  text-align: center;
  margin-bottom: 40px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--color-white-cream);
  border: 1px solid var(--color-gray-light);
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-red-pure);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 24px;
}

.card-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.25rem;
  font-weight: 600;
  color: var(--color-black);
  line-height: 1.2;
  margin-bottom: 16px;
}

.card-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: var(--color-gray-main);
  line-height: 1.6;
}

/* Form */
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-gray-medium);
  margin-left: 4px;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--color-gray-medium);
  transition: color 0.2s ease;
}

.input-icon.icon-error {
  color: var(--color-red-pure);
}

.form-input {
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: 1.5px solid var(--color-gray-light);
  border-radius: 16px;
  background: var(--color-white);
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: var(--color-black);
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-input-password {
  padding-right: 48px;
}

.form-input:focus {
  border-color: var(--color-red-pure);
  box-shadow: 0 0 0 4px rgba(139, 45, 74, 0.05);
}

.form-input.input-error {
  border-color: var(--color-red-pure);
}

.form-input::placeholder {
  color: var(--color-gray-medium);
}

.toggle-password {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-gray-medium);
  padding: 4px;
  transition: color 0.2s;
}

.toggle-password:hover {
  color: var(--color-black);
}

.error-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-red-pure);
}

.forgot-row {
  text-align: right;
  margin-top: -8px;
}

.forgot-link {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-red-pure);
  text-decoration: none;
  transition: opacity 0.2s;
}

.forgot-link:hover {
  opacity: 0.7;
}

/* Submit button */
.submit-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 18px 32px;
  background: var(--color-red-pure);
  color: white;
  border: none;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(139, 45, 74, 0.3);
}

.submit-btn:hover:not(:disabled) {
  background: var(--color-red-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(139, 45, 74, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spin-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Inscription link */
.inscription-link-row {
  margin-top: 40px;
  padding-top: 32px;
  border-top: 1px solid var(--color-gray-lighter);
  text-align: center;
}

.inscription-link-row p {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: var(--color-gray-main);
}

.inscription-link {
  font-weight: 600;
  color: var(--color-red-pure);
  text-decoration: underline;
  text-underline-offset: 4px;
  transition: opacity 0.2s ease;
}

.inscription-link:hover {
  opacity: 0.8;
}

/* Success state */
.success-card,
.success-state {
  text-align: center;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.success-icon-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 32px;
  background: rgba(139, 45, 74, 0.05);
}

.success-icon {
  width: 40px;
  height: 40px;
  color: var(--color-red-pure);
}

.success-title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-black);
  margin-bottom: 16px;
}

.success-text {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  color: var(--color-gray-main);
  line-height: 1.7;
  margin-bottom: 32px;
}

.success-text strong {
  color: var(--color-black);
}

/* Trust row */
.trust-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  margin-top: 48px;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-gray-medium);
}

.trust-icon {
  width: 16px;
  height: 16px;
  color: var(--color-red-pure);
}

/* Responsive */
@media (max-width: 600px) {
  .connexion-page {
    padding: 24px 16px;
    justify-content: flex-start;
    padding-top: 80px;
  }

  .back-nav {
    top: 24px;
    left: 16px;
  }

  .main-card {
    padding: 28px 20px;
  }

  .card-title {
    font-size: 1.75rem;
  }

  .trust-row {
    gap: 16px;
  }

  .logo-area {
    margin-bottom: 32px;
  }
}

@media (max-width: 400px) {
  .connexion-page {
    padding: 20px 12px;
    padding-top: 72px;
  }

  .main-card {
    padding: 24px 16px;
    border-radius: 20px;
  }

  .card-title {
    font-size: 1.5rem;
  }

  .card-subtitle {
    font-size: 0.9rem;
  }

  .card-header {
    margin-bottom: 28px;
  }

  .badge {
    font-size: 0.65rem;
    padding: 6px 12px;
  }

  .form-input {
    padding: 14px 14px 14px 44px;
    font-size: 0.875rem;
    border-radius: 14px;
  }

  .submit-btn {
    padding: 16px 28px;
    font-size: 0.95rem;
  }

  .inscription-link-row {
    margin-top: 28px;
    padding-top: 24px;
  }

  .inscription-link-row p {
    font-size: 0.85rem;
  }
}

@media (max-width: 360px) {
  .connexion-page {
    padding: 16px 10px;
    padding-top: 64px;
  }

  .back-nav {
    top: 20px;
    left: 12px;
  }

  .back-button {
    font-size: 0.8rem;
  }

  .main-card {
    padding: 20px 14px;
  }

  .card-title {
    font-size: 1.35rem;
  }

  .card-subtitle {
    font-size: 0.85rem;
  }

  .logo-text {
    font-size: 1.4rem;
  }

  .logo-area img {
    height: 28px;
  }

  .logo-area {
    margin-bottom: 24px;
    gap: 8px;
  }

  .form-input {
    padding: 12px 12px 12px 40px;
    font-size: 0.82rem;
  }

  .submit-btn {
    padding: 14px 24px;
    font-size: 0.9rem;
  }

  .trust-row {
    margin-top: 32px;
  }

  .error-text {
    font-size: 0.78rem;
  }

  .forgot-link {
    font-size: 0.78rem;
  }

  .success-title {
    font-size: 1.5rem;
  }

  .success-text {
    font-size: 0.9rem;
  }

  .success-icon-wrapper {
    width: 60px;
    height: 60px;
    margin-bottom: 24px;
  }

  .success-icon {
    width: 30px;
    height: 30px;
  }
}
</style>
