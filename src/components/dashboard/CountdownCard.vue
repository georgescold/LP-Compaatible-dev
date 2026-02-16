<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useDevCalendar } from '../../composables/useDevCalendar'

const props = defineProps<{
  targetDate: string  // ISO date string
  label?: string
}>()

const { today: devToday, isOverridden } = useDevCalendar()

const tick = ref(0)
let timerId: number | null = null

onMounted(() => {
  timerId = window.setInterval(() => {
    tick.value++
  }, 1000)
})

onUnmounted(() => {
  if (timerId) clearInterval(timerId)
})

const timeLeft = computed(() => {
  // Force reactivity on tick
  void tick.value

  const target = new Date(props.targetDate)
  let now: Date

  if (isOverridden.value) {
    // In dev override mode: use the simulated date as "now"
    // Add a time component so the countdown shows hours/minutes/seconds ticking
    const realNow = new Date()
    const devDate = new Date(devToday.value + 'T00:00:00')
    // Use the dev date but keep the real time-of-day for a ticking effect
    now = new Date(devDate.getFullYear(), devDate.getMonth(), devDate.getDate(),
      realNow.getHours(), realNow.getMinutes(), realNow.getSeconds())
  } else {
    now = new Date()
  }

  const diff = target.getTime() - now.getTime()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds, expired: false }
})

function pad(n: number): string {
  return n.toString().padStart(2, '0')
}
</script>

<template>
  <div class="countdown-card" :class="{ 'is-active': !timeLeft.expired }">
    <div class="countdown-bg" :class="{ 'pulse-glow': !timeLeft.expired }"></div>
    <div class="countdown-content">
      <p class="countdown-label">
        <svg v-if="!timeLeft.expired" class="heartbeat-icon" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        {{ label || 'Prochaine session dans' }}
      </p>

      <div v-if="!timeLeft.expired" class="countdown-grid">
        <div class="countdown-unit">
          <span class="countdown-number">{{ pad(timeLeft.days) }}</span>
          <span class="countdown-text">Jours</span>
        </div>
        <span class="countdown-sep">:</span>
        <div class="countdown-unit">
          <span class="countdown-number">{{ pad(timeLeft.hours) }}</span>
          <span class="countdown-text">Heures</span>
        </div>
        <span class="countdown-sep">:</span>
        <div class="countdown-unit">
          <span class="countdown-number">{{ pad(timeLeft.minutes) }}</span>
          <span class="countdown-text">Minutes</span>
        </div>
        <span class="countdown-sep">:</span>
        <div class="countdown-unit">
          <span class="countdown-number">{{ pad(timeLeft.seconds) }}</span>
          <span class="countdown-text">Secondes</span>
        </div>
      </div>

      <div v-else class="countdown-expired">
        <p>🎉 C'est l'heure !</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.countdown-card {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  padding: 40px 32px;
  text-align: center;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.countdown-card.is-active {
  animation: cardPulse 6s ease-in-out infinite;
}

.countdown-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg,
    rgba(139, 45, 74, 0.06) 0%,
    rgba(139, 45, 74, 0.12) 40%,
    rgba(180, 40, 60, 0.08) 70%,
    rgba(139, 45, 74, 0.04) 100%
  );
  z-index: 0;
}

.countdown-bg.pulse-glow {
  animation: glowPulse 8s ease-in-out infinite;
}

.countdown-content {
  position: relative;
  z-index: 1;
}

.countdown-label {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-black);
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.heartbeat-icon {
  width: 16px;
  height: 16px;
  fill: var(--color-red-pure);
  animation: heartBeat 2s ease-in-out infinite;
  transform-origin: center;
  flex-shrink: 0;
}

.countdown-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.countdown-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.countdown-number {
  font-family: 'Inter', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-black);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(4px);
  border-radius: 16px;
  padding: 12px 18px;
  min-width: 72px;
  line-height: 1;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.countdown-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-gray-dark);
}

.countdown-sep {
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-red-pure);
  margin-top: -20px;
}

.countdown-expired p {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-red-pure);
}

@media (max-width: 480px) {
  .countdown-card {
    padding: 32px 20px;
  }

  .countdown-number {
    font-size: 1.8rem;
    padding: 10px 14px;
    min-width: 56px;
  }

  .countdown-sep {
    font-size: 1.5rem;
  }
}

@keyframes cardPulse {
  0%, 100% { transform: scale(1); box-shadow: 0 2px 12px rgba(139, 45, 74, 0.04); }
  50% { transform: scale(1.008); box-shadow: 0 6px 24px rgba(139, 45, 74, 0.1); }
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.15); }
}

@keyframes heartBeat {
  0% { transform: scale(1); }
  14% { transform: scale(1.3); }
  28% { transform: scale(1); }
  42% { transform: scale(1.3); }
  70% { transform: scale(1); }
}
</style>
