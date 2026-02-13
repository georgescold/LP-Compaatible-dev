<script setup lang="ts">
import { computed } from 'vue'
import { Unlock, Heart, ExternalLink } from 'lucide-vue-next'

const props = defineProps<{
  matchName: string
  compatibilityScore: number
  unlocked: boolean
  instagram?: string
  city?: string
  age?: number
  bannerColor?: string
}>()

const emit = defineEmits(['unlock'])

const scoreColor = computed(() => {
  if (props.compatibilityScore >= 80) return '#22c55e'
  if (props.compatibilityScore >= 60) return '#f59e0b'
  return '#ef4444'
})

const scoreLabel = computed(() => {
  if (props.compatibilityScore >= 80) return 'Très compatible'
  if (props.compatibilityScore >= 60) return 'Compatible'
  return 'Compatibilité modérée'
})
</script>

<template>
  <div class="match-card" :class="{ unlocked }">
    <div class="match-card-banner" :style="{ background: `linear-gradient(135deg, ${bannerColor || '#99001B'}20 0%, ${bannerColor || '#99001B'}08 100%)` }"></div>
    <div class="match-header">
      <div class="match-avatar">
        <Heart class="avatar-icon" />
      </div>
      <div class="match-info">
        <h3 class="match-name" v-if="unlocked">{{ matchName }}</h3>
        <h3 class="match-name blurred" v-else>Match mystère</h3>
        <p class="match-meta" v-if="unlocked && city">{{ city }}<span v-if="age"> · {{ age }} ans</span></p>
      </div>
      <div class="score-badge" :style="{ '--score-color': scoreColor }">
        <span class="score-number">{{ compatibilityScore }}%</span>
      </div>
    </div>

    <div class="score-bar-container">
      <div class="score-bar">
        <div class="score-fill" :style="{ width: compatibilityScore + '%', background: scoreColor }"></div>
      </div>
      <span class="score-label" :style="{ color: scoreColor }">{{ scoreLabel }}</span>
    </div>

    <!-- Unlocked state -->
    <div v-if="unlocked" class="match-contact">
      <a v-if="instagram" :href="`https://instagram.com/${instagram}`" target="_blank" class="contact-link">
        <ExternalLink class="w-4 h-4" />
        @{{ instagram }}
      </a>
      <p v-else class="no-contact">Pas d'Instagram renseigné</p>
    </div>

    <!-- Locked state -->
    <button v-else class="unlock-btn" @click="emit('unlock')">
      <Unlock class="w-4 h-4" />
      Débloquer ce match
    </button>
  </div>
</template>

<style scoped>
.match-card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  padding-top: 32px;
  border: 1px solid var(--color-gray-light);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.match-card-banner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.match-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
}

.match-card.unlocked {
  border-color: rgba(153, 0, 27, 0.15);
}

.match-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.match-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(153, 0, 27, 0.08);
  flex-shrink: 0;
}

.avatar-icon {
  width: 24px;
  height: 24px;
  color: var(--color-red-pure);
}

.match-info {
  flex: 1;
  min-width: 0;
}

.match-name {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-black);
  margin-bottom: 2px;
}

.match-name.blurred {
  color: var(--color-gray-medium);
  font-style: italic;
}

.match-meta {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: var(--color-gray-main);
}

.score-badge {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--score-color) 10%, transparent);
  flex-shrink: 0;
}

.score-number {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--score-color);
}

.score-bar-container {
  margin-bottom: 20px;
}

.score-bar {
  height: 6px;
  background: var(--color-gray-lighter);
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 8px;
}

.score-fill {
  height: 100%;
  border-radius: 9999px;
  transition: width 1s cubic-bezier(0.22, 1, 0.36, 1);
}

.score-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.match-contact {
  padding-top: 16px;
  border-top: 1px solid var(--color-gray-lighter);
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-red-pure);
  text-decoration: none;
  transition: opacity 0.2s;
}

.contact-link:hover {
  opacity: 0.7;
}

.no-contact {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: var(--color-gray-medium);
  font-style: italic;
}

.unlock-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  border: 1.5px solid var(--color-red-pure);
  background: transparent;
  color: var(--color-red-pure);
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.unlock-btn:hover {
  background: var(--color-red-pure);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(153, 0, 27, 0.25);
}
</style>
