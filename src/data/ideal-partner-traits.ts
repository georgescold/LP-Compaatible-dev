export interface PartnerTrait {
  id: string
  label: string
  emoji: string
}

export const PARTNER_TRAITS: PartnerTrait[] = [
  // Valeurs & mode de vie
  { id: 'ambitieux', label: 'Ambitieux(se)', emoji: '🚀' },
  { id: 'casanier', label: 'Plutôt casanier(e)', emoji: '🏠' },
  { id: 'aventurier', label: 'Aventurier(e)', emoji: '🌍' },
  { id: 'spirituel', label: 'Spirituel(le)', emoji: '✨' },
  { id: 'intellectuel', label: 'Intellectuel(le)', emoji: '📚' },
  { id: 'drole', label: 'Drôle avant tout', emoji: '😂' },
  { id: 'spontane', label: 'Spontané(e)', emoji: '⚡' },
  { id: 'organise', label: 'Organisé(e)', emoji: '📋' },
  { id: 'independant', label: 'Indépendant(e)', emoji: '🦅' },
  { id: 'fusionnel', label: 'Fusionnel(le)', emoji: '🤗' },

  // Qualités relationnelles
  { id: 'communicatif', label: 'Très communicatif(ve)', emoji: '💬' },
  { id: 'protecteur', label: 'Protecteur(trice)', emoji: '🛡️' },
  { id: 'passionné', label: 'Passionné(e)', emoji: '🔥' },
  { id: 'calme', label: 'Calme & posé(e)', emoji: '🧘' },
  { id: 'attentionne', label: 'Attentionné(e)', emoji: '💝' },
  { id: 'confiance', label: 'Qui inspire confiance', emoji: '🤝' },
  { id: 'creatif', label: 'Créatif(ve)', emoji: '🎨' },
  { id: 'leader', label: 'Qui prend les devants', emoji: '👑' },

  // Style de vie à deux
  { id: 'famille', label: 'Orienté(e) famille', emoji: '👨‍👩‍👧' },
  { id: 'animaux', label: 'Qui aime les animaux', emoji: '🐾' },
  { id: 'sportif', label: 'Sportif(ve)', emoji: '💪' },
  { id: 'foodie', label: 'Foodie & bon vivant', emoji: '🍷' },
  { id: 'cultive', label: 'Cultivé(e)', emoji: '🎭' },
  { id: 'fidele', label: 'Fidélité absolue', emoji: '💎' },
  { id: 'romantique', label: 'Romantique', emoji: '🌹' },
  { id: 'complice', label: 'Meilleur(e) ami(e) avant tout', emoji: '😊' },
  { id: 'chaleureux', label: 'Chaleureux(se)', emoji: '☀️' },
  { id: 'mystere', label: 'Part de mystère', emoji: '🌙' },
  { id: 'sociable', label: 'Très sociable', emoji: '🥂' },
  { id: 'discret', label: 'Plutôt discret(e)', emoji: '🤫' },
]
