/**
 * Session dates helper for Compaatible
 *
 * Cycle mensuel :
 * - Du 1er au 9 : Inscription / test de personnalité
 * - Du 10 au 12 : Matching (analyse de compatibilité)
 * - Le 13 : Découverte des matchs
 * - Du 14 au 31 : Pré-inscription (session suivante)
 */

export type SessionPhase = 'inscription' | 'matching' | 'discovery' | 'pre-inscription'

export interface SessionInfo {
  phase: SessionPhase
  label: string
  description: string
  daysRemaining: number
}

export function getCurrentPhase(date: Date = new Date()): SessionInfo {
  const day = date.getDate()

  if (day >= 1 && day <= 9) {
    return {
      phase: 'inscription',
      label: 'Inscription ouverte',
      description: 'Les inscriptions sont ouvertes ! Passe le test de personnalité pour participer.',
      daysRemaining: 9 - day
    }
  }

  if (day >= 10 && day <= 12) {
    return {
      phase: 'matching',
      label: 'Analyse en cours',
      description: 'Nous analysons les profils pour trouver les meilleures compatibilités.',
      daysRemaining: 12 - day
    }
  }

  if (day === 13) {
    return {
      phase: 'discovery',
      label: 'Découverte des matchs',
      description: 'C\'est le grand jour ! Découvre avec qui tu es le plus compatible.',
      daysRemaining: 0
    }
  }

  // day >= 14
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  return {
    phase: 'pre-inscription',
    label: 'Pré-inscription',
    description: 'La prochaine session ouvre le 1er du mois. Pré-inscris-toi pour être notifié(e).',
    daysRemaining: lastDay - day + 1 // +1 to include the 1st of next month
  }
}

export function isRegistrationOpen(date: Date = new Date()): boolean {
  return date.getDate() >= 1 && date.getDate() <= 9
}

export function getPhaseLabel(phase: SessionPhase): string {
  switch (phase) {
    case 'inscription': return 'Inscription'
    case 'matching': return 'Matching'
    case 'discovery': return 'Découverte'
    case 'pre-inscription': return 'Pré-inscription'
  }
}
