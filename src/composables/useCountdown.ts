import { ref, computed, onMounted, onUnmounted } from 'vue'

const STORAGE_KEY = 'compaatible_countdown_end'

export function useCountdown(initialHours: number = 47, initialMinutes: number = 23) {
  const totalSeconds = ref(0)
  let intervalId: number | null = null

  // Get or set the end time in localStorage for persistence across page reloads
  const getEndTime = (): number => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const endTime = parseInt(stored, 10)
      if (endTime > Date.now()) {
        return endTime
      }
    }
    // Create a new end time
    const endTime = Date.now() + (initialHours * 3600 + initialMinutes * 60) * 1000
    localStorage.setItem(STORAGE_KEY, endTime.toString())
    return endTime
  }

  const updateCountdown = () => {
    const endTime = getEndTime()
    const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000))
    totalSeconds.value = remaining
  }

  const hours = computed(() => Math.floor(totalSeconds.value / 3600))
  const minutes = computed(() => Math.floor((totalSeconds.value % 3600) / 60))
  const seconds = computed(() => totalSeconds.value % 60)

  const formattedHours = computed(() => hours.value.toString().padStart(2, '0'))
  const formattedMinutes = computed(() => minutes.value.toString().padStart(2, '0'))
  const formattedSeconds = computed(() => seconds.value.toString().padStart(2, '0'))

  const start = () => {
    if (intervalId) return
    updateCountdown()
    intervalId = window.setInterval(updateCountdown, 1000)
  }

  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  onMounted(start)
  onUnmounted(stop)

  return {
    hours,
    minutes,
    seconds,
    formattedHours,
    formattedMinutes,
    formattedSeconds,
    totalSeconds,
    start,
    stop
  }
}
