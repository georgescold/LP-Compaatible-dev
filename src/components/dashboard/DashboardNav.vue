<script setup lang="ts">
import { Home, UserRound } from 'lucide-vue-next'
import logoImage from '@/assets/nouveau logo compaatible.png'

const props = defineProps<{
  activeTab: string
}>()

const emit = defineEmits(['tab-change'])

const tabs = [
  { id: 'accueil', label: 'Accueil', icon: Home },
  { id: 'matchs', label: 'Mes matchs', icon: null, isLogo: true },
  { id: 'profil', label: 'Profil', icon: UserRound }
]
</script>

<template>
  <nav class="dashboard-nav">
    <div class="nav-container">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="nav-tab"
        :class="{ active: activeTab === tab.id }"
        @click="emit('tab-change', tab.id)"
      >
        <img v-if="tab.isLogo" :src="logoImage" alt="" class="nav-icon w-5 h-5 object-contain" />
        <component v-else :is="tab.icon" class="nav-icon" />
        <span class="nav-label">{{ tab.label }}</span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.dashboard-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(232, 232, 232, 0.6);
  padding: 8px 16px;
  padding-bottom: max(8px, env(safe-area-inset-bottom));
}

.nav-container {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.nav-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 16px;
  transition: all 0.25s ease;
  position: relative;
}

.nav-tab.active {
  background: rgba(139, 45, 74, 0.08);
}

.nav-icon {
  width: 22px;
  height: 22px;
  color: var(--color-gray-medium);
  transition: color 0.25s ease;
}

.nav-tab.active .nav-icon {
  color: var(--color-red-pure);
}

.nav-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--color-gray-medium);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  transition: color 0.25s ease;
}

.nav-tab.active .nav-label {
  color: var(--color-red-pure);
}

@media (min-width: 768px) {
  .dashboard-nav {
    position: static;
    border: none;
    padding: 0;
    background: transparent;
  }

  .nav-container {
    max-width: 600px;
    gap: 32px;
    justify-content: center;
  }

  .nav-tab {
    position: relative;
    flex-direction: row;
    gap: 10px;
    padding: 20px 4px;
    border-radius: 0;
    border: none;
    color: #4A4A4A;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .nav-tab:hover {
    color: #1A1A1A;
  }

  .nav-tab.active {
    background: transparent;
    color: #8B2D4A;
  }

  .nav-tab.active::after {
    content: '';
    position: absolute;
    bottom: 14px;
    left: 0;
    width: 100%;
    height: 3px;
    background: #8B2D4A;
    border-radius: 999px;
    box-shadow: 0 2px 8px rgba(139, 45, 74, 0.2);
  }

  .nav-label {
    font-size: 0.85rem;
    letter-spacing: -0.01em;
  }
}
</style>
