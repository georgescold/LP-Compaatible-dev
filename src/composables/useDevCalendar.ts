/**
 * Dev Calendar — Override la date système pour tester les phases de session
 *
 * Usage dans un composant :
 *   import { useDevCalendar } from '../composables/useDevCalendar'
 *   const { today } = useDevCalendar()
 *   // today.value retourne la date simulée (ou la date réelle si aucun override)
 *
 * Stocke l'override dans localStorage pour persister entre les reloads.
 * Le panel est toujours visible pour faciliter les tests.
 */

import { ref, computed } from 'vue'

const DEV_DATE_KEY = 'compaatible_dev_date'

// Global reactive state (shared across all composable instances)
const overrideDate = ref<string | null>(
  localStorage.getItem(DEV_DATE_KEY)
)

export function useDevCalendar() {
  const isDev = true // Panel toujours actif

  /** Current date string (YYYY-MM-DD) — uses override if set, else real date */
  const today = computed(() => {
    if (overrideDate.value) {
      return overrideDate.value
    }
    return new Date().toISOString().split('T')[0]
  })

  /** Set a specific date override */
  function setDate(dateStr: string) {
    overrideDate.value = dateStr
    localStorage.setItem(DEV_DATE_KEY, dateStr)
  }

  /** Clear the override — use the real date */
  function clearDate() {
    overrideDate.value = null
    localStorage.removeItem(DEV_DATE_KEY)
  }

  /** Check if we're in override mode */
  const isOverridden = computed(() => overrideDate.value !== null)

  /** Preset dates for quick testing (based on Février 2026 session) */
  const presets = [
    { label: '📋 Avant inscriptions', date: '2026-01-30', phase: 'upcoming' },
    { label: '✍️ Inscriptions ouvertes', date: '2026-02-05', phase: 'registration' },
    { label: '⏳ Fin inscriptions', date: '2026-02-09', phase: 'registration' },
    { label: '🔄 Validation présence', date: '2026-02-10', phase: 'validation' },
    { label: '⚙️ Matching en cours', date: '2026-02-11', phase: 'matching' },
    { label: '🎉 Matchs révélés', date: '2026-02-13', phase: 'revealed' },
    { label: '📅 Après session', date: '2026-02-20', phase: 'between' },
  ]

  return {
    today,
    setDate,
    clearDate,
    isOverridden,
    overrideDate,
    presets,
    isDev
  }
}
