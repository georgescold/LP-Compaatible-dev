<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../lib/supabase';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(['close']);
const router = useRouter();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
  if (!email.value.trim() || !password.value) return;

  isLoading.value = true;
  errorMessage.value = '';

  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email.value.trim().toLowerCase(),
      password: password.value
    });

    if (authError) {
      if (authError.message.includes('Invalid login credentials')) {
        errorMessage.value = 'Email ou mot de passe incorrect.';
      } else {
        errorMessage.value = 'Une erreur est survenue. Réessaie dans quelques instants.';
      }
      return;
    }

    // Store user info for profile access
    if (authData.user) {
      const { data: userData } = await supabase
        .from('users')
        .select('id, first_name')
        .eq('email', email.value.trim().toLowerCase())
        .single();

      if (userData) {
        sessionStorage.setItem('compaatible_user_id', userData.id);
        sessionStorage.setItem('compaatible_user_name', userData.first_name);
      }
    }

    emit('close');
    router.push('/profil');
  } catch {
    errorMessage.value = 'Erreur de connexion. Vérifie ta connexion internet.';
  } finally {
    isLoading.value = false;
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const closeModal = () => {
  emit('close');
};
</script>

<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="login-modal-overlay" @click.self="closeModal">
      <!-- Decorative background blurs -->
      <div class="modal-blur-1"></div>
      <div class="modal-blur-2"></div>

      <div class="modal-card">
        <!-- Close Button -->
        <button class="close-btn" @click="closeModal" aria-label="Fermer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div class="modal-content">
          <!-- Title -->
          <h2 class="modal-title">Connexion</h2>
          <p class="modal-subtitle">Heureux de te revoir parmi nous</p>

          <form @submit.prevent="handleLogin" class="login-form">
            <!-- Error Message -->
            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>

            <!-- Email Field -->
            <div class="form-group">
              <label for="login-email" class="input-label">Email</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input 
                  id="login-email"
                  v-model="email"
                  type="email" 
                  placeholder="ton@email.com" 
                  required
                  class="form-input"
                />
              </div>
            </div>

            <!-- Password Field -->
            <div class="form-group">
              <div class="label-row">
                <label for="login-password" class="input-label">Mot de passe</label>
                <a href="#" class="forgot-link" @click.prevent="closeModal(); router.push('/connexion')">Mot de passe oublié ?</a>
              </div>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input 
                  id="login-password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'" 
                  placeholder="••••••••" 
                  required
                  class="form-input"
                />
                <button type="button" class="toggle-password" @click="togglePasswordVisibility">
                  <svg v-if="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Login CTA -->
            <div class="cta-container">
              <button 
                type="submit" 
                class="submit-btn" 
                :disabled="isLoading"
              >
                <span v-if="!isLoading">Se connecter</span>
                <span v-else class="loader"></span>
                <svg v-if="!isLoading" class="btn-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </form>

          <div class="divider">
            <span>ou</span>
          </div>

          <div class="footer-note">
            Si tu n'as pas de compte, 
            <router-link to="/inscription" class="inline-link" @click="closeModal">inscris-toi pour participer à l'expérience</router-link>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Modal Transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

/* Backdrop */
.login-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(26, 26, 26, 0.4);
  backdrop-filter: blur(8px);
}

/* Decorative blurs matching design system */
.modal-blur-1 {
  position: absolute;
  top: -10%;
  right: -5%;
  width: 400px;
  height: 400px;
  border-radius: 9999px;
  background: radial-gradient(circle, rgba(153, 0, 27, 0.12) 0%, transparent 70%);
  pointer-events: none;
}

.modal-blur-2 {
  position: absolute;
  bottom: -5%;
  left: -5%;
  width: 300px;
  height: 300px;
  border-radius: 9999px;
  background: radial-gradient(circle, rgba(153, 0, 27, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

/* Card styled with Design System principles */
.modal-card {
  position: relative;
  width: 100%;
  max-width: 480px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 1010;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: #787878;
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 8px;
  z-index: 10;
}

.close-btn:hover {
  color: #1A1A1A;
}

.modal-content {
  padding: 48px 40px;
}

.modal-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.25rem;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 8px;
  text-align: center;
}

.modal-subtitle {
  font-family: 'Inter', sans-serif;
  color: #5C5C5C;
  font-size: 1rem;
  margin-bottom: 32px;
  text-align: center;
}

/* Error Message */
.error-message {
  background: rgba(153, 0, 27, 0.08);
  border: 1px solid rgba(153, 0, 27, 0.2);
  border-radius: 12px;
  padding: 12px 16px;
  color: #99001B;
  font-size: 0.875rem;
  text-align: center;
  margin-bottom: 8px;
}

/* Form Styling */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.input-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4A4A4A;
}

.forgot-link {
  font-size: 0.8125rem;
  color: #99001B;
  text-decoration: none;
  font-weight: 500;
}

.forgot-link:hover {
  text-decoration: underline;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 16px;
  color: #787878;
  display: flex;
}

.form-input {
  width: 100%;
  padding: 14px 16px 14px 46px;
  border-radius: 12px;
  border: 1px solid #E8E8E8;
  background: #FEFEFE;
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  color: #1A1A1A;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #99001B;
  box-shadow: 0 0 0 3px rgba(153, 0, 27, 0.05);
}

.toggle-password {
  position: absolute;
  right: 12px;
  background: transparent;
  border: none;
  color: #787878;
  cursor: pointer;
  padding: 4px;
  display: flex;
}

/* Button Styling matching DS */
.cta-container {
  padding-top: 12px;
}

.submit-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px;
  border-radius: 9999px;
  background: #99001B;
  color: #FEFEFE;
  font-weight: 600;
  font-size: 1.0625rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(153, 0, 27, 0.25);
}

.submit-btn:hover:not(:disabled) {
  background: #7A0016;
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(153, 0, 27, 0.35);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

/* Divider */
.divider {
  position: relative;
  text-align: center;
  margin: 32px 0;
}

.divider::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #E8E8E8;
  z-index: 1;
}

.divider span {
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  padding: 0 16px;
  font-size: 0.8125rem;
  color: #787878;
  z-index: 2;
  font-weight: 500;
}

/* Footer Note */
.footer-note {
  text-align: center;
  color: #5C5C5C;
  font-size: 0.9375rem;
  line-height: 1.5;
}

.inline-link {
  color: #99001B;
  text-decoration: none;
  font-weight: 600;
}

.inline-link:hover {
  text-decoration: underline;
}

/* Simple Loader */
.loader {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 480px) {
  .modal-content {
    padding: 40px 24px;
  }
  .modal-title {
    font-size: 1.875rem;
  }
}
</style>
