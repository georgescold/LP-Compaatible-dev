<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import IconArrowRight from './icons/IconArrowRight.vue'

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
            <!-- Decorative badge -->
            <div class="popup-badge">
              <span class="badge-emoji">🎁</span>
              <span>Offre exclusive</span>
            </div>

            <!-- Main heading -->
            <h2 class="popup-title">
              Attends ! <span>C'est gratuit.</span>
            </h2>

            <!-- Subtitle -->
            <p class="popup-subtitle">
              Tu es sur le point de quitter, mais as-tu vu que la <strong>1ère édition de Compaatible est entièrement gratuite</strong> ?
            </p>

            <!-- Price display -->
            <div class="popup-price">
              <div class="price-box price-old-box">
                <span class="price-label">Prix normal</span>
                <span class="price-value crossed">19,99€</span>
              </div>
              <div class="price-arrow">→</div>
              <div class="price-box price-new-box">
                <span class="price-label">1ère édition</span>
                <span class="price-value free">0€</span>
              </div>
            </div>

            <!-- Urgency message -->
            <div class="popup-urgency">
              <div class="urgency-icon">⚡</div>
              <p>
                <strong>Cette offre ne sera plus jamais disponible.</strong><br>
                La première édition est un événement unique pour lancer Compaatible. Les prochaines éditions seront payantes.
              </p>
            </div>

            <!-- Features -->
            <ul class="popup-features">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Test de personnalité complet (30 dimensions)
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                3 matchs ultra-compatibles garantis
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Aucun paiement, aucune carte bancaire
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
          <div class="popup-decoration popup-decoration-1"></div>
          <div class="popup-decoration popup-decoration-2"></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
}

.popup-container {
  background: white;
  border-radius: 24px;
  max-width: 520px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
}

.popup-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  background: var(--color-white-cream);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.popup-close svg {
  width: 20px;
  height: 20px;
  color: var(--color-gray-dark);
}

.popup-close:hover {
  background: var(--color-gray-light);
  transform: rotate(90deg);
}

.popup-content {
  padding: 50px 40px 40px;
  text-align: center;
  position: relative;
  z-index: 2;
}

.popup-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, var(--color-red-pure) 0%, var(--color-red-dark) 100%);
  color: white;
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 25px;
}

.badge-emoji {
  font-size: 1.1rem;
}

.popup-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--color-black);
  line-height: 1.2;
  margin-bottom: 15px;
}

.popup-title span {
  color: var(--color-red-pure);
  display: block;
}

.popup-subtitle {
  font-size: 1.05rem;
  color: var(--color-gray-dark);
  line-height: 1.6;
  margin-bottom: 30px;
}

.popup-subtitle strong {
  color: var(--color-black);
}

/* Price display */
.popup-price {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 25px;
}

.price-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.price-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-gray-main);
}

.price-value {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
}

.price-value.crossed {
  color: var(--color-gray-main);
  text-decoration: line-through;
  opacity: 0.5;
}

.price-value.free {
  color: var(--color-red-pure);
  font-size: 2.5rem;
}

.price-arrow {
  font-size: 1.5rem;
  color: var(--color-gray-light);
}

/* Urgency message */
.popup-urgency {
  background: linear-gradient(135deg, rgba(153, 0, 27, 0.08) 0%, rgba(153, 0, 27, 0.03) 100%);
  border: 1px solid rgba(153, 0, 27, 0.15);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 25px;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  text-align: left;
}

.urgency-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.popup-urgency p {
  font-size: 0.9rem;
  color: var(--color-black);
  line-height: 1.5;
  margin: 0;
}

.popup-urgency strong {
  color: var(--color-red-pure);
}

/* Features list */
.popup-features {
  list-style: none;
  padding: 0;
  margin: 0 0 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.popup-features li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.95rem;
  color: var(--color-black);
}

.popup-features svg {
  width: 20px;
  height: 20px;
  color: var(--color-red-pure);
  flex-shrink: 0;
}

/* CTA Button */
.popup-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  background: linear-gradient(135deg, var(--color-red-pure) 0%, var(--color-red-dark) 100%);
  color: white;
  padding: 18px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 30px rgba(153, 0, 27, 0.3);
}

.popup-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(153, 0, 27, 0.4);
}

.popup-cta .cta-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.popup-cta:hover .cta-icon {
  transform: translateX(4px);
}

/* Skip button */
.popup-skip {
  margin-top: 15px;
  background: none;
  border: none;
  color: var(--color-gray-main);
  font-size: 0.85rem;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.popup-skip:hover {
  color: var(--color-black);
}

/* Decorations */
.popup-decoration {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
}

.popup-decoration-1 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(153, 0, 27, 0.06) 0%, transparent 70%);
  top: -50px;
  right: -50px;
}

.popup-decoration-2 {
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(153, 0, 27, 0.04) 0%, transparent 70%);
  bottom: -30px;
  left: -30px;
}

/* Transitions */
.popup-enter-active,
.popup-leave-active {
  transition: all 0.4s ease;
}

.popup-enter-active .popup-container,
.popup-leave-active .popup-container {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}

.popup-enter-from .popup-container,
.popup-leave-to .popup-container {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

/* Responsive */
@media (max-width: 600px) {
  .popup-container {
    border-radius: 20px;
    margin: 10px;
  }

  .popup-content {
    padding: 40px 25px 30px;
  }

  .popup-title {
    font-size: 1.7rem;
  }

  .popup-subtitle {
    font-size: 0.95rem;
  }

  .popup-price {
    gap: 15px;
  }

  .price-value {
    font-size: 1.5rem;
  }

  .price-value.free {
    font-size: 2rem;
  }

  .popup-urgency {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 10px;
  }

  .popup-cta {
    padding: 16px 24px;
    font-size: 1rem;
  }
}
</style>
