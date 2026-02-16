<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const STORAGE_KEY = 'compaatible_cookie_consent'

function getConsent(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function accept(): void {
  try {
    localStorage.setItem(STORAGE_KEY, 'accepted')
  } catch {}
  isVisible.value = false
}

function refuse(): void {
  try {
    localStorage.setItem(STORAGE_KEY, 'refused')
  } catch {}
  isVisible.value = false
}

onMounted(() => {
  // Show banner if no consent decision has been made
  if (!getConsent()) {
    // Small delay to avoid jarring appearance on load
    setTimeout(() => {
      isVisible.value = true
    }, 1500)
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="cookie-slide">
      <div v-if="isVisible" class="cookie-banner">
        <div class="cookie-content">
          <div class="cookie-text">
            <p>
              🍪 Nous utilisons des cookies essentiels pour le bon fonctionnement du site.
              <router-link to="/confidentialite" class="cookie-link">En savoir plus</router-link>
            </p>
          </div>
          <div class="cookie-actions">
            <button class="cookie-btn cookie-btn-refuse" @click="refuse">Refuser</button>
            <button class="cookie-btn cookie-btn-accept" @click="accept">Accepter</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px 24px;
  box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.15);
}

.cookie-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.cookie-text p {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.5;
  margin: 0;
}

.cookie-link {
  color: white;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: opacity 0.2s ease;
}

.cookie-link:hover {
  opacity: 0.8;
}

.cookie-actions {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}

.cookie-btn {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 10px 24px;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.cookie-btn-refuse {
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.cookie-btn-refuse:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.cookie-btn-accept {
  background: var(--color-red-pure);
  color: white;
  box-shadow: 0 2px 10px rgba(139, 45, 74, 0.3);
}

.cookie-btn-accept:hover {
  background: var(--color-red-dark);
  transform: translateY(-1px);
}

/* Slide animation */
.cookie-slide-enter-active {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
}

.cookie-slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.cookie-slide-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.cookie-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

@media (max-width: 600px) {
  .cookie-content {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }

  .cookie-actions {
    width: 100%;
    justify-content: center;
  }
}
</style>
