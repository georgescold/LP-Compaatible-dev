<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'
import logoImage from '../assets/nouveau logo compaatible.png'

const router = useRouter()

const form = ref({
  firstName: '',
  lastName: '',
  age: '',
  city: '',
  gender: '',
  sexualOrientation: '',
  email: '',
  phone: '',
  instagram: '',
  showPhone: true,
  showInstagram: true,
  password: '',
  confirmPassword: ''
})

const isSubmitting = ref(false)
const errorMessage = ref('')
const confirmationMessage = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const acceptedCGU = ref(false)

const isValid = computed(() => {
  return (
    form.value.firstName.trim() &&
    form.value.lastName.trim() &&
    form.value.age &&
    Number(form.value.age) >= 18 &&
    Number(form.value.age) <= 99 &&
    form.value.city.trim() &&
    form.value.gender &&
    form.value.sexualOrientation &&
    form.value.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email) &&
    form.value.phone.trim() &&
    form.value.password.length >= 6 &&
    form.value.password === form.value.confirmPassword &&
    acceptedCGU.value
  )
})

async function handleSubmit() {
  if (!isValid.value || isSubmitting.value) return

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    // 1. Create Supabase Auth account
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.value.email.trim().toLowerCase(),
      password: form.value.password
    })

    if (authError) {
      if (authError.message.includes('already registered')) {
        errorMessage.value = 'Cette adresse email est déjà inscrite. Connecte-toi depuis la page connexion.'
      } else if (authError.status === 429 || authError.message.includes('rate limit') || authError.message.includes('Too Many Requests')) {
        errorMessage.value = 'Trop de tentatives. Attends quelques minutes avant de réessayer.'
      } else {
        errorMessage.value = 'Une erreur est survenue. Réessaie dans quelques instants.'
        console.error('Auth error:', authError)
      }
      return
    }

    // 2. Insert user profile in users table
    const { data, error } = await supabase
      .from('users')
      .insert({
        first_name: form.value.firstName.trim(),
        last_name: form.value.lastName.trim(),
        age: Number(form.value.age),
        city: form.value.city.trim(),
        gender: form.value.gender,
        sexual_orientation: form.value.sexualOrientation,
        email: form.value.email.trim().toLowerCase(),
        phone: form.value.phone.trim(),
        instagram: form.value.instagram.trim() || null,
        show_phone: form.value.showPhone,
        show_instagram: form.value.showInstagram,
        auth_id: authData.user?.id || null
      })
      .select('id')
      .single()

    if (error) {
      if (error.code === '23505') {
        errorMessage.value = 'Cette adresse email est déjà inscrite.'
      } else {
        errorMessage.value = 'Une erreur est survenue. Réessaie dans quelques instants.'
      }
      return
    }

    if (data) {
      sessionStorage.setItem('compaatible_user_id', data.id)
      sessionStorage.setItem('compaatible_user_name', form.value.firstName)
      sessionStorage.setItem('compaatible_user_email', form.value.email.trim().toLowerCase())

      // Redirect to test immediately (email confirmation handled after test)
      router.push('/test')
    }
  } catch {
    errorMessage.value = 'Erreur de connexion. Vérifie ta connexion internet.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="inscription-page">
    <!-- Decorative background elements -->
    <div class="deco-blur deco-top-right"></div>
    <div class="deco-blur deco-bottom-left"></div>
    <div class="deco-blur deco-center-left"></div>
    <div class="deco-blur deco-center-right"></div>
    <div class="deco-pattern deco-pattern-left"></div>
    <div class="deco-pattern deco-pattern-right"></div>

    <div class="inscription-container">
      <!-- Navigation -->
      <nav class="inscription-nav">
        <router-link to="/" class="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Retour
        </router-link>
      </nav>

      <!-- Header -->
      <div class="inscription-header">
        <router-link to="/" class="logo-brand">
          <img :src="logoImage" alt="Compaatible" class="inscription-logo" />
          <span class="logo-text">Compaatible</span>
        </router-link>

        <h1 class="inscription-title">Avant de commencer,<br>faisons connaissance.</h1>
        <p class="inscription-subtitle">
          Ces informations nous permettent de créer ton profil unique et de te connecter
          avec la personne qui te correspond vraiment.
        </p>

        <!-- DEV TEMP BUTTON -->
        <button 
          @click="router.push('/resultats/demo')" 
          type="button"
          style="margin-top: 16px; padding: 8px 16px; background: rgba(0,0,0,0.05); border: 1px dashed #999; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #666; cursor: pointer; transition: all 0.2s;"
          onmouseover="this.style.background='rgba(0,0,0,0.1)'"
          onmouseout="this.style.background='rgba(0,0,0,0.05)'"
        >
          ⚡ Accès Rapide Résultats (Dev)
        </button>
      </div>


      <!-- Form -->
      <form class="inscription-form" @submit.prevent="handleSubmit">
        <div class="form-grid">
          <div class="form-group">
            <label for="firstName">Prénom</label>
            <input
              id="firstName"
              v-model="form.firstName"
              type="text"
              placeholder="Ton prénom"
              required
            />
          </div>

          <div class="form-group">
            <label for="lastName">Nom</label>
            <input
              id="lastName"
              v-model="form.lastName"
              type="text"
              placeholder="Ton nom"
              required
            />
          </div>
        </div>

        <div class="form-grid form-grid-3">
          <div class="form-group">
            <label for="age">Âge</label>
            <input
              id="age"
              v-model="form.age"
              type="number"
              min="18"
              max="99"
              placeholder="25"
              required
            />
          </div>

          <div class="form-group form-group-span-2">
            <label for="city">Ville</label>
            <input
              id="city"
              v-model="form.city"
              type="text"
              placeholder="Ta ville"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label>Je suis</label>
          <div class="orientation-options">
            <label
              v-for="option in [
                { value: 'homme', label: 'Un homme' },
                { value: 'femme', label: 'Une femme' },
                { value: 'non_binaire', label: 'Non-binaire' },
                { value: 'autre', label: 'Autre' }
              ]"
              :key="option.value"
              class="orientation-option"
              :class="{ active: form.gender === option.value }"
            >
              <input
                type="radio"
                :value="option.value"
                v-model="form.gender"
                class="sr-only"
              />
              {{ option.label }}
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>Je suis attiré(e) par</label>
          <div class="orientation-options">
            <label
              v-for="option in [
                { value: 'femme', label: 'Une femme' },
                { value: 'homme', label: 'Un homme' },
                { value: 'les_deux', label: 'Les deux' }
              ]"
              :key="option.value"
              class="orientation-option"
              :class="{ active: form.sexualOrientation === option.value }"
            >
              <input
                type="radio"
                :value="option.value"
                v-model="form.sexualOrientation"
                class="sr-only"
              />
              {{ option.label }}
            </label>
          </div>
        </div>

        <div class="form-group">
          <label for="phone">Téléphone</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            placeholder="06 12 34 56 78"
            required
          />
        </div>

        <div class="form-group">
          <label for="instagram">
            Instagram
            <span class="optional-tag">optionnel</span>
          </label>
          <div class="input-with-prefix">
            <span class="input-prefix">@</span>
            <input
              id="instagram"
              v-model="form.instagram"
              type="text"
              placeholder="ton_compte"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="email">Adresse email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="ton@email.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <div class="password-input-wrapper">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="6 caractères minimum"
              required
              minlength="6"
            />
            <button
              type="button"
              class="password-toggle"
              @click="showPassword = !showPassword"
            >
              <svg v-if="showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirmer le mot de passe</label>
          <div class="password-input-wrapper">
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirme ton mot de passe"
              required
            />
            <button
              type="button"
              class="password-toggle"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <svg v-if="showConfirmPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
          <p v-if="form.confirmPassword && form.password !== form.confirmPassword" class="field-error">
            Les mots de passe ne correspondent pas.
          </p>
        </div>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <div v-if="confirmationMessage" class="confirmation-message">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <span>{{ confirmationMessage }}</span>
        </div>

        <button
          v-if="!confirmationMessage"
          type="submit"
          class="submit-btn"
          :class="{ disabled: !isValid || isSubmitting }"
          :disabled="!isValid || isSubmitting"
        >
          {{ isSubmitting ? 'Inscription en cours...' : 'Continuer' }}
          <svg v-if="!isSubmitting" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>

        <router-link v-if="confirmationMessage" to="/connexion" class="submit-btn" style="text-decoration: none; text-align: center;">
          Se connecter
        </router-link>

        <div class="consent-checkbox">
          <label class="checkbox-label">
            <input
              type="checkbox"
              v-model="acceptedCGU"
              class="checkbox-input"
            />
            <span class="checkbox-custom"></span>
            <span class="checkbox-text">
              J'accepte les
              <router-link to="/cgu" target="_blank">Conditions Générales d'Utilisation</router-link>
              et la
              <router-link to="/confidentialite" target="_blank">Politique de Confidentialité</router-link>
            </span>
          </label>
        </div>
      </form>

      <!-- Trust indicators -->
      <div class="trust-row">
        <div class="trust-item">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          Basé sur la psychologie profonde
        </div>
        <div class="trust-item">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          ~15 min
        </div>
        <div class="trust-item">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          100% gratuit
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inscription-page {
  min-height: 100vh;
  background: #FBF9F7;
  background-image: radial-gradient(circle at 50% 50%, transparent 0%, rgba(139, 45, 74, 0.03) 100%);
  position: relative;
  overflow: hidden;
  padding: 40px 24px 80px;
}

/* Sophisticated background dot pattern */
.inscription-page::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(139, 45, 74, 0.12) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(circle at center, black 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(circle at center, black 30%, transparent 75%);
  pointer-events: none;
  z-index: 1;
}

.deco-blur {
  position: absolute;
  pointer-events: none;
  z-index: 0;
  filter: blur(100px);
  will-change: transform, border-radius;
}

.deco-top-right {
  top: -15%;
  right: -10%;
  width: 70vw;
  height: 70vw;
  max-width: 900px;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.12) 0%, transparent 75%);
  border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
  animation: organicMorph 25s ease-in-out infinite alternate;
}

.deco-bottom-left {
  bottom: -20%;
  left: -15%;
  width: 60vw;
  height: 60vw;
  max-width: 800px;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.08) 0%, transparent 75%);
  border-radius: 60% 40% 30% 70% / 50% 60% 40% 60%;
  animation: organicMorph 30s ease-in-out infinite alternate-reverse;
}

.deco-center-left {
  top: 25%;
  left: -5%;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.05) 0%, transparent 70%);
  border-radius: 50%;
  animation: floatingCurve 22s ease-in-out infinite;
}

.deco-center-right {
  bottom: 20%;
  right: -5%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.04) 0%, transparent 70%);
  border-radius: 50%;
  animation: floatingCurve 28s ease-in-out infinite reverse;
}

.deco-pattern {
  position: absolute;
  pointer-events: none;
  z-index: 1;
  opacity: 0.7;
}

.deco-pattern-left {
  top: 10%;
  left: -5%;
  width: 500px;
  height: 600px;
  background: url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60 Q 30 10, 60 60 T 120 60' stroke='rgba(139, 45, 74, 0.05)' fill='none' stroke-width='0.7'/%3E%3C/svg%3E") repeat;
  mask-image: linear-gradient(to right, black 20%, transparent 80%);
  -webkit-mask-image: linear-gradient(to right, black 20%, transparent 80%);
}

.deco-pattern-right {
  bottom: 10%;
  right: -5%;
  width: 500px;
  height: 600px;
  background: url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60 Q 30 110, 60 60 T 120 60' stroke='rgba(139, 45, 74, 0.05)' fill='none' stroke-width='0.7'/%3E%3C/svg%3E") repeat;
  mask-image: linear-gradient(to left, black 20%, transparent 80%);
  -webkit-mask-image: linear-gradient(to left, black 20%, transparent 80%);
}

@keyframes organicMorph {
  0% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; transform: translate(0, 0) rotate(0deg) scale(1); }
  33% { border-radius: 70% 30% 46% 54% / 30% 29% 71% 70%; transform: translate(2%, 2%) rotate(5deg) scale(1.02); }
  66% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; transform: translate(-1%, 3%) rotate(-3deg) scale(0.98); }
  100% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; transform: translate(0, 0) rotate(0deg) scale(1); }
}

@keyframes floatingCurve {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(40px, -60px); }
}

.inscription-container {
  max-width: 560px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Navigation */
.inscription-nav {
  margin-bottom: 24px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-gray-dark);
  text-decoration: none;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--color-red-pure);
}

.inscription-header {
  text-align: center;
  margin-bottom: 48px;
}

.inscription-logo {
  width: 34px;
  height: auto;
  mix-blend-mode: multiply;
}

.logo-brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  margin-bottom: 28px;
}

.logo-text {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-black);
}

.inscription-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 600;
  color: var(--color-black);
  line-height: 1.25;
  margin-bottom: 16px;
}

.inscription-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: var(--color-gray-dark);
  line-height: 1.6;
  max-width: 440px;
  margin: 0 auto;
}

/* Form */
.inscription-form {
  background: white;
  border-radius: 24px;
  padding: 40px 36px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.04);
  border: 1px solid var(--color-gray-light);
  margin-bottom: 32px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-grid-3 {
  grid-template-columns: 100px 1fr;
}

.form-group-span-2 {
  grid-column: span 1;
}

.form-group {
  margin-bottom: 20px;
}

.form-grid .form-group {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-black);
  margin-bottom: 8px;
}

.optional-tag {
  font-weight: 400;
  color: var(--color-gray-medium);
  font-size: 0.75rem;
  margin-left: 6px;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="number"],
.form-group input[type="password"] {
  width: 100%;
  padding: 14px 18px;
  border: 1.5px solid var(--color-gray-light);
  border-radius: 14px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: var(--color-black);
  background: var(--color-white-cream);
  transition: all 0.2s ease;
  outline: none;
  box-sizing: border-box;
}

.form-group input:focus {
  border-color: var(--color-red-pure);
  box-shadow: 0 0 0 3px rgba(139, 45, 74, 0.08);
  background: white;
}

.form-group input::placeholder {
  color: var(--color-gray-medium);
}

/* Password input */
.password-input-wrapper {
  position: relative;
}

.password-input-wrapper input {
  padding-right: 48px !important;
}

.password-toggle {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-gray-medium);
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.password-toggle:hover {
  color: var(--color-red-pure);
}

.field-error {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: var(--color-red-pure);
  margin-top: 6px;
}

/* Visibility section */
.visibility-section {
  margin-bottom: 24px;
}

.visibility-section-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-black);
  margin-bottom: 4px;
  display: block;
}

.visibility-hint {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: var(--color-gray-medium);
  margin-bottom: 14px;
  line-height: 1.4;
}

.visibility-toggles {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.visibility-toggle {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  background: var(--color-white-cream);
  border: 1.5px solid var(--color-gray-light);
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.visibility-toggle:hover {
  border-color: var(--color-red-pure);
}

.visibility-toggle.active {
  border-color: var(--color-red-pure);
  background: rgba(139, 45, 74, 0.03);
}

.choice-radio {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid var(--color-gray-light);
  flex-shrink: 0;
  position: relative;
  transition: all 0.2s ease;
}

.choice-radio.selected {
  border-color: var(--color-red-pure);
}

.choice-radio.selected::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-red-pure);
}

.toggle-indicator {
  width: 44px;
  height: 24px;
  border-radius: 9999px;
  background: var(--color-gray-light);
  position: relative;
  transition: background 0.25s ease;
  flex-shrink: 0;
}

.visibility-toggle.active .toggle-indicator {
  background: var(--color-red-pure);
}

.toggle-dot {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  transition: transform 0.25s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.visibility-toggle.active .toggle-dot {
  transform: translateX(20px);
}

.toggle-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-gray-dark);
}

.toggle-icon-img {
  width: 20px;
  height: 20px;
  object-fit: contain;
  flex-shrink: 0;
  border-radius: 4px;
}

/* Input with prefix */
.input-with-prefix {
  position: relative;
}

.input-prefix {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: var(--color-gray-medium);
  font-weight: 500;
}

.input-with-prefix input {
  padding-left: 36px !important;
}

/* Orientation options */
.orientation-options {
  display: flex;
  gap: 10px;
}

.orientation-option {
  flex: 1;
  padding: 14px 16px;
  border: 1.5px solid var(--color-gray-light);
  border-radius: 14px;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-gray-dark);
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--color-white-cream);
}

.orientation-option:hover {
  border-color: var(--color-red-pure);
  color: var(--color-red-pure);
}

.orientation-option.active {
  border-color: var(--color-red-pure);
  background: rgba(139, 45, 74, 0.05);
  color: var(--color-red-pure);
  font-weight: 600;
}

/* Error */
.error-message {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: var(--color-red-pure);
  text-align: center;
  margin-bottom: 16px;
  padding: 12px;
  background: rgba(139, 45, 74, 0.05);
  border-radius: 12px;
}

.confirmation-message {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #166534;
  text-align: left;
  margin-bottom: 16px;
  padding: 16px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  line-height: 1.5;
}

.confirmation-message svg {
  flex-shrink: 0;
  color: #16a34a;
  margin-top: 2px;
}

/* Submit */
.submit-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
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
  margin-bottom: 16px;
}

.submit-btn:hover:not(.disabled) {
  background: var(--color-red-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(139, 45, 74, 0.4);
}

.submit-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.consent-checkbox {
  margin-top: 20px;
  text-align: left;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  user-select: none;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkbox-custom {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-gray-light);
  border-radius: 6px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: relative;
  margin-top: 1px;
}

.checkbox-input:checked + .checkbox-custom {
  background: var(--color-red-pure);
  border-color: var(--color-red-pure);
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '';
  position: absolute;
  width: 5px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  top: 2px;
}

.checkbox-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: var(--color-gray-dark);
  line-height: 1.5;
}

.checkbox-text a {
  color: var(--color-red-pure);
  font-weight: 600;
  text-decoration: none;
}

.checkbox-text a:hover {
  text-decoration: underline;
}

/* Trust */
.trust-row {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-gray-dark);
}

.trust-item svg {
  color: var(--color-red-pure);
  fill: var(--color-red-pure);
}

/* Responsive - Tablet */
@media (max-width: 768px) {
  .inscription-form {
    padding: 32px 24px;
  }
}

/* Responsive - Mobile */
@media (max-width: 600px) {
  .inscription-page {
    padding: 24px 16px 60px;
  }

  .inscription-form {
    padding: 28px 20px;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .form-grid .form-group {
    margin-bottom: 20px;
  }

  .form-grid-3 {
    grid-template-columns: 1fr;
  }

  .orientation-options {
    flex-direction: column;
  }

  .inscription-title {
    font-size: 1.6rem;
  }

  .trust-row {
    gap: 16px;
  }
}

@media (max-width: 400px) {
  .inscription-page {
    padding: 16px 12px 40px;
  }

  .inscription-form {
    padding: 20px 16px;
    border-radius: 16px;
  }

  .inscription-title {
    font-size: 1.4rem;
  }

  .inscription-subtitle {
    font-size: 0.9rem;
  }

  .logo-text {
    font-size: 1.3rem;
  }

  .form-group label {
    font-size: 0.8rem;
  }

  .form-group input[type="text"],
  .form-group input[type="email"],
  .form-group input[type="number"],
  .form-group input[type="password"],
  .form-group input[type="tel"] {
    padding: 12px 14px;
    font-size: 0.9rem;
    border-radius: 12px;
  }

  .orientation-option {
    padding: 12px 14px;
    font-size: 0.8rem;
    border-radius: 12px;
  }

  .submit-btn {
    padding: 16px 24px;
    font-size: 0.95rem;
  }

  .trust-row {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }

  .trust-item {
    font-size: 0.75rem;
  }

  .checkbox-text {
    font-size: 0.72rem;
  }
}

@media (max-width: 340px) {
  .inscription-page {
    padding: 12px 8px 32px;
  }

  .inscription-form {
    padding: 16px 12px;
  }

  .inscription-title {
    font-size: 1.25rem;
  }

  .orientation-option {
    padding: 10px 10px;
    font-size: 0.75rem;
  }
}

/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
