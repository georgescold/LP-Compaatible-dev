<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import IconArrowRight from './icons/IconArrowRight.vue'
import logoUrl from '../assets/nouveau logo compaatible.png'

const isVisible = ref(false)
const hasBeenShown = ref(false)
const isArmed = ref(false)

const STORAGE_KEY = 'compaatible_exit_popup_shown'

function checkIfAlreadyShown(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

function markAsShown(): void {
  try {
    localStorage.setItem(STORAGE_KEY, 'true')
  } catch {
    // localStorage not available
  }
}

function showPopup(): void {
  if (hasBeenShown.value || checkIfAlreadyShown()) return

  isVisible.value = true
  hasBeenShown.value = true
  markAsShown()
  document.body.style.overflow = 'hidden'
}

function closePopup(): void {
  isVisible.value = false
  document.body.style.overflow = ''
}

// Expose forceShow for dev panel testing (bypasses localStorage check)
function forceShow(): void {
  isVisible.value = true
  document.body.style.overflow = 'hidden'
}

defineExpose({ forceShow })

function handleMouseLeave(e: MouseEvent): void {
  // Detect when mouse leaves the viewport from the top (intent to close tab/leave)
  if (e.clientY <= 0 && isArmed.value && !hasBeenShown.value && !checkIfAlreadyShown()) {
    showPopup()
  }
}

function handleKeyDown(e: KeyboardEvent): void {
  if (e.key === 'Escape' && isVisible.value) {
    closePopup()
  }
}

onMounted(() => {
  // Only add listener if popup hasn't been shown before
  if (!checkIfAlreadyShown()) {
    // Wait 3 seconds before arming the popup to avoid false triggers on page load
    setTimeout(() => {
      isArmed.value = true
    }, 3000)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('keydown', handleKeyDown)
  }
})

onUnmounted(() => {
  document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
  document.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="popup">
      <div v-if="isVisible" class="popup-overlay" @click.self="closePopup">
        <div class="popup-container">
          <!-- Close button -->
          <button class="popup-close" @click="closePopup" aria-label="Fermer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <!-- Content -->
          <div class="popup-content">
            <!-- Logo centered -->
            <img :src="logoUrl" alt="Compaatible" class="popup-logo" />

            <!-- Decorative badge -->
            <div class="popup-badge">
              <svg class="badge-heart" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              OFFRE EXCLUSIVE
            </div>

            <!-- Main heading -->
            <h2 class="popup-title">
              Attends ! C'est <span>gratuit.</span>
            </h2>

            <!-- Subtitle -->
            <p class="popup-subtitle">
              "La 1ère édition est entièrement gratuite. Ne laisse pas passer ta chance."
            </p>

            <!-- Price display -->
            <div class="popup-price">
              <div class="price-box">
                <span class="price-label">Prix habituel</span>
                <span class="price-value crossed">19,99€</span>
              </div>
              <div class="price-divider"></div>
              <div class="price-box">
                <span class="price-label">Édition #1</span>
                <span class="price-value free">0€</span>
              </div>
            </div>

            <!-- Urgency message -->
            <div class="popup-urgency">
              <p>
                <strong>Dernière chance :</strong> Cet avantage fondateur ne sera plus jamais proposé aux futurs membres.
              </p>
            </div>

            <!-- Features -->
            <ul class="popup-features">
              <li>
                <svg class="check-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Test de personnalité (30 dimensions)</span>
              </li>
              <li>
                <svg class="check-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>3 matchs ultra-compatibles garantis</span>
              </li>
              <li>
                <svg class="check-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Aucun paiement requis</span>
              </li>
            </ul>

            <!-- CTA -->
            <a href="#participer" class="popup-cta" @click="closePopup">
              Je participe gratuitement
              <IconArrowRight class="cta-icon" />
            </a>

            <!-- Skip link -->
            <button class="popup-skip" @click="closePopup">
              Non merci, je préfère payer plus tard
            </button>
          </div>

          <!-- Decorative elements -->
          <div class="popup-decoration decor-top"></div>
          <div class="popup-decoration decor-bottom"></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(26, 26, 26, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 1rem;
}

.popup-container {
  background: #FEFEFE;
  border-radius: 2.5rem;
  max-width: 440px;
  width: 100%;
  position: relative;
  box-shadow: 0 20px 50px rgba(139, 45, 74, 0.1);
  overflow: hidden;
}

.popup-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 32px;
  height: 32px;
  border: none;
  background: #FBF9F7;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 10;
}

.popup-close svg {
  width: 14px;
  height: 14px;
  color: #787878;
}

.popup-close:hover {
  background: #8B2D4A;
  transform: rotate(90deg);
}

.popup-close:hover svg {
  color: white;
}

.popup-content {
  padding: 2.5rem 2rem 2rem;
  text-align: center;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.popup-logo {
  height: 42px;
  width: auto;
  margin-bottom: 1.25rem;
  opacity: 0.9;
}

.popup-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(139, 45, 74, 0.05);
  color: #8B2D4A;
  padding: 0.25rem 1rem;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.badge-heart {
  width: 12px;
  height: 12px;
}

.popup-title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #1A1A1A;
  line-height: 1.1;
  margin-bottom: 0.75rem;
}

.popup-title span {
  color: #8B2D4A;
}

.popup-subtitle {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 1rem;
  color: #5C5C5C;
  line-height: 1.4;
  margin-bottom: 1.5rem;
  opacity: 0.8;
  max-width: 280px;
}

.popup-price {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: #FBF9F7;
  border-radius: 1.5rem;
}

.price-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.price-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #787878;
  margin-bottom: 2px;
}

.price-value {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  font-weight: 700;
}

.price-value.crossed {
  color: #787878;
  text-decoration: line-through;
  opacity: 0.5;
}

.price-value.free {
  color: #8B2D4A;
  font-size: 1.75rem;
}

.price-divider {
  width: 1px;
  height: 30px;
  background: #E8E8E8;
}

.popup-urgency {
  background: rgba(217, 119, 6, 0.05);
  border: 1px solid rgba(217, 119, 6, 0.1);
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  max-width: 320px;
}

.popup-urgency p {
  font-size: 0.8rem;
  color: #4A4A4A;
  line-height: 1.4;
  margin: 0;
}

.popup-urgency strong {
  color: #D97706;
}

.popup-features {
  list-style: none;
  padding: 0;
  margin: 0 0 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;
}

.popup-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: #5C5C5C;
  text-align: left;
}

.check-svg {
  width: 18px;
  height: 18px;
  color: #8B2D4A;
  flex-shrink: 0;
  opacity: 0.8;
}

.popup-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  background: #8B2D4A;
  color: white;
  padding: 1rem 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 10px 20px rgba(139, 45, 74, 0.2);
}

.popup-cta:hover {
  transform: scale(1.02);
  background: #A03558;
}

.popup-cta .cta-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.popup-cta:hover .cta-icon {
  transform: translateX(3px);
}

.popup-skip {
  margin-top: 1rem;
  background: none;
  border: none;
  color: #787878;
  font-size: 0.75rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.popup-skip:hover {
  opacity: 1;
  text-decoration: underline;
}

.popup-decoration {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  filter: blur(40px);
}

.decor-top {
  width: 150px;
  height: 150px;
  background: rgba(139, 45, 74, 0.08);
  top: -75px;
  right: -75px;
}

.decor-bottom {
  width: 100px;
  height: 100px;
  background: rgba(217, 119, 6, 0.05);
  bottom: -50px;
  left: -50px;
}

.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.4s ease;
}

.popup-enter-active .popup-container,
.popup-leave-active .popup-container {
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}

.popup-enter-from .popup-container,
.popup-leave-to .popup-container {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}

@media (max-width: 480px) {
  .popup-container {
    border-radius: 2rem;
  }
  .popup-content {
    padding: 2rem 1.5rem 1.5rem;
  }
  .popup-title {
    font-size: 1.75rem;
  }
}
</style>
