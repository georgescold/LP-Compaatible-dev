<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '../lib/supabase'
import { domainDescriptions, domainOrder, domainIcons } from '../data/bigfive-results'
import type { Scores, DomainResult } from '../lib/scoring'
import logoImage from '../assets/nouveau logo compaatible.png'
import DashboardNav from '../components/dashboard/DashboardNav.vue'
import CountdownCard from '../components/dashboard/CountdownCard.vue'
import MatchCard from '../components/dashboard/MatchCard.vue'
import UserCard from '../components/UserCard.vue'
import { useDevCalendar } from '../composables/useDevCalendar'
import {
  Mail, MapPin, Calendar, LogOut, RefreshCw, Info,
  ChevronRight, CheckCircle, AlertCircle,
  Sparkles, Crown, ArrowRight, Instagram,
  Pencil, Save, X, Camera, MessageCircle
} from 'lucide-vue-next'
import smsIconImg from '@/assets/sms-icon.png'
import instaIconImg from '@/assets/Instagram_icon.png'
import { getTypeById, getCategoryForType, getPersonalityTypeFromScores, type PersonalityType, type PersonalityCategory } from '../data/personality-types'
import { generateShareToken } from '../lib/share'
import PersonalityCard from '../components/PersonalityCard.vue'
import PersonalityReveal from '../components/PersonalityReveal.vue'
import ExitPopup from '../components/ExitPopup.vue'
import DevPanel from '../components/DevPanel.vue'

// Import all personality SVGs dynamically
const avatarModules = import.meta.glob('@/assets/16 personnalités svg/*.svg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>

function getAvatarUrl(filename: string): string {
  const key = Object.keys(avatarModules).find(k => k.includes(filename))
  return key ? avatarModules[key] : ''
}

// Import category logo SVGs
const categoryLogoModules = import.meta.glob('@/assets/catégories svg/*.svg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>

const categoryLogoFiles: Record<string, string> = {
  architectes: 'architectes du coeur.svg',
  ames: 'ames lumineuses.svg',
  gardiens: 'gardiens du lien.svg',
  flammes: 'flammes libres.svg'
}

function getCategoryLogoUrl(categoryId: string): string {
  const filename = categoryLogoFiles[categoryId]
  if (!filename) return ''
  const key = Object.keys(categoryLogoModules).find(k => k.includes(filename))
  return key ? categoryLogoModules[key] : ''
}

const router = useRouter()
const route = useRoute()
const { today: devToday, setDate, clearDate, isOverridden, presets, isDev } = useDevCalendar()

// State
const loading = ref(true)
const error = ref('')
const activeTab = ref('accueil')

// Personality type theming
const userPersonalityType = ref<PersonalityType | null>(null)
const userCategory = ref<PersonalityCategory | null>(null)
const userAvatarUrl = ref('')
const userCategoryLogoUrl = computed(() => {
  if (!userCategory.value) return ''
  return getCategoryLogoUrl(userCategory.value.id)
})
const userCustomTagline = ref('')
const themeColor = computed(() => userCategory.value?.color || '#8B2D4A')
const themeBgColor = computed(() => userCategory.value?.bgColor || '#FBF9F7')

// Share token for public card
const userShareToken = ref<string | null>(null)
const shareConfirmation = ref(false)

// Subscription logic
const isUpgrading = ref(false)

// User data
const userName = ref('')
const userTier = ref('free')
const userInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  city: '',
  age: 0,
  gender: '',
  orientation: '',
  instagram: '',
  phone: '',
  showPhone: true,
  showInstagram: true,
  createdAt: '',
  profilePhotoUrl: '',
  bannerColor: '#8B2D4A'
})

// Hobbies from test results
const userHobbies = ref<string[]>([])

// Mapped user data for UserCard component
const userCardData = computed(() => ({
  firstName: userInfo.value.firstName,
  age: userInfo.value.age,
  city: userInfo.value.city,
  photoUrl: userInfo.value.profilePhotoUrl,
  phone: userInfo.value.phone,
  instagram: userInfo.value.instagram,
  showPhone: userInfo.value.showPhone,
  showInstagram: userInfo.value.showInstagram,
  bannerColor: userInfo.value.bannerColor
}))

// Edit profile state
const isEditing = ref(false)
const isSaving = ref(false)
const editForm = ref({
  firstName: '',
  lastName: '',
  city: '',
  age: 0,
  orientation: '', // raw DB value
  instagram: '',
  showPhone: true,
  showInstagram: true
})

// Banner color is now automatically set by personality category (no manual override)

// Raw orientation value (DB key) for editing
const rawOrientation = ref('')

const orientationOptions = [
  { value: 'femme', label: 'Une femme' },
  { value: 'homme', label: 'Un homme' },
  { value: 'les_deux', label: 'Les deux' }
]

function startEditing() {
  editForm.value = {
    firstName: userInfo.value.firstName,
    lastName: userInfo.value.lastName,
    city: userInfo.value.city,
    age: userInfo.value.age,
    orientation: rawOrientation.value,
    instagram: userInfo.value.instagram,
    showPhone: userInfo.value.showPhone,
    showInstagram: userInfo.value.showInstagram
  }
  isEditing.value = true
}

function cancelEditing() {
  isEditing.value = false
}

// Photo upload
const photoFileInput = ref<HTMLInputElement | null>(null)
const isUploadingPhoto = ref(false)

function triggerPhotoUpload() {
  photoFileInput.value?.click()
}

async function handlePhotoChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (!target.files || !target.files[0]) return

  const file = target.files[0]
  const validTypes = ['image/jpeg', 'image/png']
  if (!validTypes.includes(file.type)) return
  if (file.size > 5 * 1024 * 1024) return

  isUploadingPhoto.value = true
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user?.id) return

    // Get user DB id
    const { data: userData } = await supabase
      .from('users')
      .select('id')
      .eq('auth_id', session.user.id)
      .single()
    if (!userData) return

    const fileExt = file.name.split('.').pop()
    const fileName = `${userData.id}-${Date.now()}.${fileExt}`

    const { error: storageError } = await supabase.storage
      .from('profile-photos')
      .upload(fileName, file)
    if (storageError) throw storageError

    const { data: urlData } = supabase.storage
      .from('profile-photos')
      .getPublicUrl(fileName)

    if (urlData?.publicUrl) {
      await supabase
        .from('users')
        .update({ profile_photo_url: urlData.publicUrl })
        .eq('id', userData.id)

      userInfo.value.profilePhotoUrl = urlData.publicUrl
    }
  } catch (err) {
    console.error('Photo upload error:', err)
  } finally {
    isUploadingPhoto.value = false
    // Reset input so re-selecting same file triggers change
    if (photoFileInput.value) photoFileInput.value.value = ''
  }
}

async function saveSelectedTagline(tagline: string) {
  userCustomTagline.value = tagline
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user?.id) return
    await supabase
      .from('users')
      .update({ custom_tagline: tagline })
      .eq('auth_id', session.user.id)
  } catch (e) {
    console.error('Failed to save tagline:', e)
  }
}

async function ensureShareToken(): Promise<string | null> {
  if (userShareToken.value) return userShareToken.value

  const token = generateShareToken()
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user?.id) return null

    const { error } = await supabase
      .from('users')
      .update({ share_token: token })
      .eq('auth_id', session.user.id)

    if (error) {
      console.error('Failed to save share token:', error)
      return null
    }

    userShareToken.value = token
    return token
  } catch (e) {
    console.error('Failed to generate share token:', e)
    return null
  }
}

async function handleCardShare() {
  // Ensure token exists before sharing
  await ensureShareToken()

  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user?.id) return

    // Increment free_matches_earned via RPC
    await supabase.rpc('increment_free_matches', { user_auth_id: session.user.id })

    // Show confirmation toast
    shareConfirmation.value = true
    setTimeout(() => { shareConfirmation.value = false }, 4000)
  } catch (e) {
    console.error('Failed to reward share:', e)
  }
}

async function saveProfile() {
  isSaving.value = true
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user?.id) return

    const { error: updateError } = await supabase
      .from('users')
      .update({
        first_name: editForm.value.firstName,
        last_name: editForm.value.lastName,
        city: editForm.value.city,
        age: editForm.value.age,
        sexual_orientation: editForm.value.orientation,
        instagram: editForm.value.instagram || null,
        show_phone: editForm.value.showPhone,
        show_instagram: editForm.value.showInstagram
      })
      .eq('auth_id', session.user.id)

    if (updateError) throw updateError

    // Update local state
    userInfo.value.firstName = editForm.value.firstName
    userInfo.value.lastName = editForm.value.lastName
    userInfo.value.city = editForm.value.city
    userInfo.value.age = editForm.value.age
    userInfo.value.orientation = orientationLabels[editForm.value.orientation] || editForm.value.orientation
    userInfo.value.instagram = editForm.value.instagram
    userInfo.value.showPhone = editForm.value.showPhone
    userInfo.value.showInstagram = editForm.value.showInstagram
    rawOrientation.value = editForm.value.orientation
    userName.value = editForm.value.firstName

    isEditing.value = false
  } catch (err) {
    console.error('Save profile error:', err)
  } finally {
    isSaving.value = false
  }
}

// Session data
interface SessionData {
  id: string
  name: string
  registration_start: string
  registration_end: string
  matching_start: string
  matching_end: string
  reveal_date: string
}

interface MatchData {
  id: string
  matchName: string
  age: number
  city: string
  compatibilityScore: number
  unlocked: boolean
  bannerColor: string
  isUser1: boolean
  avatarUrl: string
  personalityTypeName: string
  // UserCard fields (for unlocked display)
  photoUrl: string
  phone: string
  instagram: string
  showPhone: boolean
  showInstagram: boolean
  hobbies: string[]
  customTagline: string
  personalityTypeId: string
}

const currentSession = ref<SessionData | null>(null)
const isParticipating = ref(false)
const presenceValidated = ref(false)
const participantCount = ref(0)

// Test results
const scores = ref<Scores | null>(null)
const resultId = ref<string | null>(null)
const hasResults = computed(() => scores.value !== null)

// Dev: reveal animation trigger
const showDevReveal = ref(false)
const exitPopupRef = ref<InstanceType<typeof ExitPopup> | null>(null)
const revealScores = computed(() => {
  if (!scores.value) return { O: 0, C: 0, E: 0, A: 0, N: 0 }
  const getPercentage = (domain: DomainResult | undefined) => {
    if (!domain || domain.count === 0) return 0
    const avg = domain.score / domain.count
    return Math.round((avg / 5) * 100)
  }
  return {
    O: getPercentage(scores.value.O),
    C: getPercentage(scores.value.C),
    E: getPercentage(scores.value.E),
    A: getPercentage(scores.value.A),
    N: 100 - getPercentage(scores.value.N) // Inverted for Stability
  }
})

// Matches
const userMatches = ref<MatchData[]>([])

// ===== Interactive Constellation =====
const constellationRef = ref<HTMLElement | null>(null)
const constellationMouse = reactive({ x: -1000, y: -1000 })
const CONSTELLATION_REVEAL_RADIUS = 90
const CONSTELLATION_GLOW_RADIUS = 140 // outer zone: partial reveal

const constellationStars = [
  // ===== HEART CONTOUR — all visible by default to show the heart shape =====
  // Bottom tip
  { x: 200, y: 170, r: 4.5, isAnchor: true },   // 0  - bottom point ♥
  // Lower-left slope
  { x: 163, y: 148, r: 2.5, isAnchor: true },   // 1
  { x: 130, y: 130, r: 3.0, isAnchor: true },   // 2
  // Left side
  { x: 95, y: 108, r: 2.8, isAnchor: true },    // 3
  { x: 68, y: 82, r: 3.2, isAnchor: true },     // 4
  // Left lobe top
  { x: 62, y: 52, r: 3.5, isAnchor: true },     // 5  - left lobe peak
  { x: 78, y: 28, r: 2.8, isAnchor: true },     // 6
  { x: 108, y: 15, r: 3.0, isAnchor: true },    // 7
  // Top dip center
  { x: 145, y: 22, r: 2.5, isAnchor: true },    // 8
  { x: 175, y: 38, r: 2.8, isAnchor: true },    // 9
  { x: 200, y: 48, r: 4.0, isAnchor: true },    // 10 - top center dip
  // Right lobe
  { x: 225, y: 38, r: 2.8, isAnchor: true },    // 11
  { x: 255, y: 22, r: 2.5, isAnchor: true },    // 12
  { x: 292, y: 15, r: 3.0, isAnchor: true },    // 13
  { x: 322, y: 28, r: 2.8, isAnchor: true },    // 14
  // Right lobe peak
  { x: 338, y: 52, r: 3.5, isAnchor: true },    // 15 - right lobe peak
  // Right side
  { x: 332, y: 82, r: 3.2, isAnchor: true },    // 16
  { x: 305, y: 108, r: 2.8, isAnchor: true },   // 17
  // Lower-right slope
  { x: 270, y: 130, r: 3.0, isAnchor: true },   // 18
  { x: 237, y: 148, r: 2.5, isAnchor: true },   // 19

  // ===== INNER STRUCTURE — hidden, revealed by mouse interaction =====
  { x: 140, y: 60, r: 2.2, isAnchor: false },   // 20 - inner left lobe
  { x: 260, y: 60, r: 2.2, isAnchor: false },   // 21 - inner right lobe
  { x: 200, y: 78, r: 3.0, isAnchor: false },   // 22 - center upper
  { x: 155, y: 95, r: 2.0, isAnchor: false },   // 23 - mid-left
  { x: 245, y: 95, r: 2.0, isAnchor: false },   // 24 - mid-right
  { x: 200, y: 115, r: 2.8, isAnchor: false },  // 25 - center
  { x: 170, y: 125, r: 1.6, isAnchor: false },  // 26 - lower-left
  { x: 230, y: 125, r: 1.6, isAnchor: false },  // 27 - lower-right

  // ===== SCATTERED DUST — tiny accent stars around =====
  { x: 42, y: 42, r: 1.3, isAnchor: false },    // 28
  { x: 358, y: 42, r: 1.3, isAnchor: false },   // 29
  { x: 200, y: 5, r: 1.2, isAnchor: false },    // 30
  { x: 115, y: 68, r: 1.0, isAnchor: false },   // 31
  { x: 285, y: 68, r: 1.0, isAnchor: false },   // 32
  { x: 50, y: 105, r: 1.1, isAnchor: false },   // 33
  { x: 350, y: 105, r: 1.1, isAnchor: false },  // 34
]

const constellationLines = [
  // ===== Heart outline (sequential contour) =====
  { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 },
  { from: 4, to: 5 }, { from: 5, to: 6 }, { from: 6, to: 7 }, { from: 7, to: 8 },
  { from: 8, to: 9 }, { from: 9, to: 10 },
  { from: 10, to: 11 }, { from: 11, to: 12 }, { from: 12, to: 13 }, { from: 13, to: 14 },
  { from: 14, to: 15 }, { from: 15, to: 16 }, { from: 16, to: 17 }, { from: 17, to: 18 },
  { from: 18, to: 19 }, { from: 19, to: 0 },
  // ===== Inner skeleton =====
  { from: 10, to: 22 }, { from: 22, to: 25 }, { from: 25, to: 0 },  // central vertical axis
  { from: 5, to: 20 }, { from: 20, to: 22 },   // left lobe → center
  { from: 15, to: 21 }, { from: 21, to: 22 },  // right lobe → center
  { from: 20, to: 23 }, { from: 23, to: 25 },  // left inner descent
  { from: 21, to: 24 }, { from: 24, to: 25 },  // right inner descent
  { from: 23, to: 26 }, { from: 26, to: 0 },   // left lower
  { from: 24, to: 27 }, { from: 27, to: 0 },   // right lower
  // ===== Cross connections for richness =====
  { from: 3, to: 23 }, { from: 17, to: 24 },
  { from: 2, to: 26 }, { from: 18, to: 27 },
  { from: 7, to: 20 }, { from: 13, to: 21 },
  { from: 9, to: 20 }, { from: 11, to: 21 },
  // ===== Dust connections =====
  { from: 28, to: 5 }, { from: 29, to: 15 },
  { from: 30, to: 7 }, { from: 30, to: 13 },
  { from: 31, to: 5 }, { from: 32, to: 15 },
  { from: 33, to: 4 }, { from: 34, to: 16 },
]

// ===== Hola wave animation (continuous, requestAnimationFrame) =====
const HOLA_CONTOUR_COUNT = 20
const HOLA_SPEED = 0.00012       // rotations per ms (~18s per full loop)
const HOLA_WAVE_WIDTH = 0.45     // wide soft glow covering nearly half the heart
const holaPosition = ref(0)      // continuous 0..1 around the loop
const holaActive = ref(true)
let holaRaf: number | null = null
let holaLastTime: number | null = null

function holaFrame(time: number) {
  if (!holaActive.value) return
  if (holaLastTime !== null) {
    const dt = time - holaLastTime
    holaPosition.value = (holaPosition.value + HOLA_SPEED * dt) % 1
  }
  holaLastTime = time
  holaRaf = requestAnimationFrame(holaFrame)
}

function startHola() {
  if (holaRaf) return
  holaActive.value = true
  holaLastTime = null
  holaRaf = requestAnimationFrame(holaFrame)
}

function stopHola() {
  holaActive.value = false
  if (holaRaf) {
    cancelAnimationFrame(holaRaf)
    holaRaf = null
  }
  holaLastTime = null
}

function holaIntensity(starIdx: number): number {
  if (!holaActive.value || starIdx >= HOLA_CONTOUR_COUNT) return 0
  // Star's angular position on the loop (0..1)
  const starPos = starIdx / HOLA_CONTOUR_COUNT
  // Signed shortest distance around the circle
  let diff = starPos - holaPosition.value
  if (diff > 0.5) diff -= 1
  if (diff < -0.5) diff += 1
  // Only light up stars behind the wave head (diff <= 0 means trail)
  if (diff > 0.02 || diff < -HOLA_WAVE_WIDTH) return 0
  // Remap: 0 (head) → 1 (end of trail)
  const t = Math.abs(diff) / HOLA_WAVE_WIDTH
  // Smooth bell curve (cosine) for gentle rise and fall
  return Math.cos(t * Math.PI * 0.5) * 0.5
}

onMounted(() => {
  startHola()
})

onUnmounted(() => {
  stopHola()
})

function onConstellationMouseMove(e: MouseEvent) {
  if (!constellationRef.value) return
  stopHola()
  const rect = constellationRef.value.getBoundingClientRect()
  const scaleX = 400 / rect.width
  const scaleY = 190 / rect.height
  constellationMouse.x = (e.clientX - rect.left) * scaleX
  constellationMouse.y = (e.clientY - rect.top) * scaleY
}

function onConstellationMouseLeave() {
  constellationMouse.x = -1000
  constellationMouse.y = -1000
  startHola()
}

function isConstellationStarRevealed(star: { x: number; y: number }) {
  const dx = star.x - constellationMouse.x
  const dy = star.y - constellationMouse.y
  return Math.sqrt(dx * dx + dy * dy) < CONSTELLATION_REVEAL_RADIUS
}

function constellationStarDistance(star: { x: number; y: number }) {
  const dx = star.x - constellationMouse.x
  const dy = star.y - constellationMouse.y
  return Math.sqrt(dx * dx + dy * dy)
}

function constellationStarStyle(star: { x: number; y: number; r: number; isAnchor: boolean }, idx: number) {
  const dist = constellationStarDistance(star)
  // Mouse interaction takes priority
  if (dist < CONSTELLATION_REVEAL_RADIUS) {
    const t = 1 - dist / CONSTELLATION_REVEAL_RADIUS
    const intensity = 0.6 + t * 0.4
    const scale = 1 + t * 0.8
    return { opacity: intensity, transform: `scale(${scale})` }
  }
  if (dist < CONSTELLATION_GLOW_RADIUS) {
    const t = 1 - (dist - CONSTELLATION_REVEAL_RADIUS) / (CONSTELLATION_GLOW_RADIUS - CONSTELLATION_REVEAL_RADIUS)
    const intensity = 0.12 + t * 0.35
    const scale = 1 + t * 0.15
    return { opacity: intensity, transform: `scale(${scale})` }
  }
  // Hola wave — gentle opacity pulse only
  const h = holaIntensity(idx)
  if (h > 0) {
    const opacity = 0.45 + h * 0.4 // subtle: 0.45 → 0.67 max
    return { opacity }
  }
  return {}
}

function isStarInGlow(star: { x: number; y: number }) {
  return constellationStarDistance(star) < CONSTELLATION_GLOW_RADIUS
}

function isConstellationLineAnchor(line: { from: number; to: number }) {
  return constellationStars[line.from].isAnchor && constellationStars[line.to].isAnchor
}

function isConstellationLineVisible(line: { from: number; to: number }) {
  const s1 = constellationStars[line.from]
  const s2 = constellationStars[line.to]
  const v1 = isConstellationStarRevealed(s1) || isStarInGlow(s1) || s1.isAnchor
  const v2 = isConstellationStarRevealed(s2) || isStarInGlow(s2) || s2.isAnchor
  // At least one must be in the inner reveal zone
  return v1 && v2 && (isConstellationStarRevealed(s1) || isConstellationStarRevealed(s2))
}
// ===== End Constellation =====

const orientationLabels: Record<string, string> = {
  femme: 'Une femme',
  homme: 'Un homme',
  les_deux: 'Les deux'
}

interface DomainDisplay {
  label: string
  emoji: string
  percentage: number
}

const domainResults = computed<DomainDisplay[]>(() => {
  if (!scores.value) return []
  return domainOrder.map(key => {
    const domain: DomainResult | undefined = scores.value?.[key]
    let percentage = 0
    if (domain && domain.count > 0) {
      const avg = domain.score / domain.count
      percentage = Math.round((avg / 5) * 100)
      // Invert for Neuroticism to show Stability
      if (key === 'N') {
        percentage = 100 - percentage
      }
    }
    return {
      label: domainDescriptions[key]?.title || key,
      emoji: domainIcons[key] || '📊',
      percentage
    }
  })
})

// Session phase logic (uses dev calendar override if active)
const sessionPhase = computed(() => {
  if (!currentSession.value) return 'no-session'
  const today = devToday.value
  if (!today) return 'no-session'
  const s = currentSession.value

  if (today < s.registration_start) return 'upcoming'
  if (today >= s.registration_start && today <= s.registration_end) return 'registration'
  if (today >= s.matching_start && today <= s.matching_end) return 'matching'
  if (today >= s.reveal_date) return 'revealed'
  return 'between'
})

const countdownTarget = computed(() => {
  if (!currentSession.value) return ''
  const phase = sessionPhase.value
  if (phase === 'upcoming') return currentSession.value.registration_start + 'T00:00:00'
  if (phase === 'registration') return currentSession.value.registration_end + 'T23:59:59'
  if (phase === 'matching' || phase === 'between') return currentSession.value.reveal_date + 'T00:00:00'
  return ''
})

const countdownLabel = computed(() => {
  const phase = sessionPhase.value
  if (phase === 'upcoming') return 'Ouverture des inscriptions dans'
  if (phase === 'registration') return 'Clôture des inscriptions dans'
  if (phase === 'matching' || phase === 'between') return 'Matching en cours, annonce des matchs dans...'
  return 'Prochaine session dans'
})

const romanticMessage = computed(() => {
  switch (sessionPhase.value) {
    case 'upcoming':
      return "La prochaine session approche... Ton âme sœur s'y prépare peut-être aussi."
    case 'registration':
      return "Les inscriptions sont ouvertes. Chaque profil compte, y compris le tien."
    case 'matching':
      return "Nous analysons les profils... La compatibilité ne ment jamais."
    case 'between':
      return "Patience... Les plus belles rencontres méritent d'attendre."
    case 'revealed':
      return "Les matchs sont là. Ouvre-les quand tu es prêt(e)."
    default:
      return "Ton histoire commence ici."
  }
})

// ===== DEV ONLY: Fake matches for 'revealed' phase =====
const devMatchTypes = [
  getTypeById('papillon-empathique'),
  getTypeById('mentor-solaire'),
  getTypeById('reveur-romantique')
]

const DEV_FAKE_MATCHES: MatchData[] = [
  {
    id: 'dev-match-1',
    matchName: 'Camille',
    compatibilityScore: 87,
    unlocked: false,
    city: 'Paris',
    age: 26,
    bannerColor: devMatchTypes[0] ? getCategoryForType(devMatchTypes[0])?.color || '#257A4B' : '#257A4B',
    isUser1: true,
    avatarUrl: devMatchTypes[0] ? getAvatarUrl(devMatchTypes[0].avatarFile) : '',
    personalityTypeName: devMatchTypes[0]?.name || 'Le Papillon Empathique',
    photoUrl: '',
    phone: '06 12 34 56 78',
    instagram: 'camille.paris',
    showPhone: true,
    showInstagram: true,
    hobbies: ['yoga', 'lecture', 'cuisine', 'voyage'],
    customTagline: 'Sensible aux belles choses et aux belles âmes',
    personalityTypeId: 'papillon-empathique'
  },
  {
    id: 'dev-match-2',
    matchName: 'Léa',
    compatibilityScore: 74,
    unlocked: true,
    city: 'Lyon',
    age: 24,
    bannerColor: devMatchTypes[1] ? getCategoryForType(devMatchTypes[1])?.color || '#257A4B' : '#257A4B',
    isUser1: true,
    avatarUrl: devMatchTypes[1] ? getAvatarUrl(devMatchTypes[1].avatarFile) : '',
    personalityTypeName: devMatchTypes[1]?.name || 'Le Mentor Solaire',
    photoUrl: '',
    phone: '06 98 76 54 32',
    instagram: 'lea.lyon',
    showPhone: true,
    showInstagram: true,
    hobbies: ['musique_ecoute', 'randonnee', 'cinema', 'photographie'],
    customTagline: 'La vie est trop courte pour ne pas oser',
    personalityTypeId: 'mentor-solaire'
  },
  {
    id: 'dev-match-3',
    matchName: 'Jade',
    compatibilityScore: 62,
    unlocked: false,
    city: 'Bordeaux',
    age: 27,
    bannerColor: devMatchTypes[2] ? getCategoryForType(devMatchTypes[2])?.color || '#257A4B' : '#257A4B',
    isUser1: true,
    avatarUrl: devMatchTypes[2] ? getAvatarUrl(devMatchTypes[2].avatarFile) : '',
    personalityTypeName: devMatchTypes[2]?.name || 'Le Rêveur Romantique',
    photoUrl: '',
    phone: '06 55 44 33 22',
    instagram: 'jade.bdx',
    showPhone: false,
    showInstagram: true,
    hobbies: ['dessin', 'meditation', 'nature', 'ecriture'],
    customTagline: 'Rêveuse assumée, romantique dans l\'âme',
    personalityTypeId: 'reveur-romantique'
  }
]

// Watch for dev phase changes to inject/remove fake matches
watch(sessionPhase, (newPhase, oldPhase) => {
  if (!isOverridden.value) return

  if (newPhase === 'revealed') {
    // Inject fake matches only if no real matches exist
    if (userMatches.value.length === 0) {
      userMatches.value = [...DEV_FAKE_MATCHES]
    }
  } else if (oldPhase === 'revealed') {
    // Clean up fake matches when leaving revealed phase
    const hasFakeMatches = userMatches.value.some(m => m.id.startsWith('dev-match-'))
    if (hasFakeMatches) {
      userMatches.value = userMatches.value.filter(m => !m.id.startsWith('dev-match-'))
    }
  }
}, { immediate: true })
// ===== END DEV FAKE MATCHES =====

const showValidationButton = computed(() => {
  // All users are now auto-validated on join, no manual confirmation needed
  return false
})

const showRegistrationButton = computed(() => {
  return sessionPhase.value === 'registration' && !isParticipating.value && hasResults.value
})

// Plan selection modal
const showPlanModal = ref(false)
const selectedPlan = ref<'free' | 'paid' | null>(null)
const isJoiningWithPlan = ref(false)

function openPlanModal() {
  selectedPlan.value = null
  showPlanModal.value = true
}

function closePlanModal() {
  showPlanModal.value = false
  selectedPlan.value = null
}

async function joinWithPlan(plan: 'free' | 'paid') {
  isJoiningWithPlan.value = true
  try {
    if (plan === 'paid') {
      await upgradeToPaid()
    }
    await joinSession()
    showPlanModal.value = false
  } catch (err) {
    console.error('Join with plan error:', err)
  } finally {
    isJoiningWithPlan.value = false
  }
}

// Fetch data
onMounted(async () => {
  // DEMO MODE: Bypass Supabase for testing
  if (route.query.demo === 'true') {
    userName.value = 'Visiteur'
    userTier.value = 'free'
    userInfo.value = {
      firstName: 'Visiteur',
      lastName: 'Demo',
      email: 'demo@compaatible.com',
      city: 'Paris',
      age: 25,
      gender: 'femme',
      orientation: 'Un homme',
      instagram: '',
      phone: '',
      showPhone: true,
      showInstagram: false,
      createdAt: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      profilePhotoUrl: '',
      bannerColor: '#257A4B'
    }
    scores.value = {
      O: { score: 15, count: 6, result: 'high', facets: {
        '1': { score: 3, count: 1, result: 'high' },
        '2': { score: 3, count: 1, result: 'high' },
        '3': { score: 3, count: 1, result: 'high' },
        '4': { score: 2, count: 1, result: 'neutral' },
        '5': { score: 2, count: 1, result: 'neutral' },
        '6': { score: 2, count: 1, result: 'neutral' }
      }},
      C: { score: 12, count: 6, result: 'neutral', facets: {
        '1': { score: 2, count: 1, result: 'neutral' },
        '2': { score: 2, count: 1, result: 'neutral' },
        '3': { score: 2, count: 1, result: 'neutral' },
        '4': { score: 2, count: 1, result: 'neutral' },
        '5': { score: 2, count: 1, result: 'neutral' },
        '6': { score: 2, count: 1, result: 'neutral' }
      }},
      E: { score: 10, count: 6, result: 'low', facets: {
        '1': { score: 1, count: 1, result: 'low' },
        '2': { score: 1, count: 1, result: 'low' },
        '3': { score: 2, count: 1, result: 'neutral' },
        '4': { score: 2, count: 1, result: 'neutral' },
        '5': { score: 2, count: 1, result: 'neutral' },
        '6': { score: 2, count: 1, result: 'neutral' }
      }},
      A: { score: 14, count: 6, result: 'high', facets: {
        '1': { score: 3, count: 1, result: 'high' },
        '2': { score: 3, count: 1, result: 'high' },
        '3': { score: 2, count: 1, result: 'neutral' },
        '4': { score: 2, count: 1, result: 'neutral' },
        '5': { score: 2, count: 1, result: 'neutral' },
        '6': { score: 2, count: 1, result: 'neutral' }
      }},
      N: { score: 9, count: 6, result: 'low', facets: {
        '1': { score: 1, count: 1, result: 'low' },
        '2': { score: 1, count: 1, result: 'low' },
        '3': { score: 2, count: 1, result: 'neutral' },
        '4': { score: 2, count: 1, result: 'neutral' },
        '5': { score: 1, count: 1, result: 'low' },
        '6': { score: 2, count: 1, result: 'neutral' }
      }}
    } as unknown as Scores
    resultId.value = 'demo'
    userHobbies.value = ['Lecture', 'Yoga', 'Cuisine', 'Voyages']

    // Set personality type from scores
    const pType = getPersonalityTypeFromScores(scores.value!)
    if (pType) {
      userPersonalityType.value = pType
      userCategory.value = getCategoryForType(pType.id) || null
      userAvatarUrl.value = getAvatarUrl(pType.avatarFile)
      userInfo.value.bannerColor = userCategory.value?.color || '#8B2D4A'
    }

    // Fake session in "revealed" phase so matches show up
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]
    const pastDate = (daysAgo: number) => {
      const d = new Date(today)
      d.setDate(d.getDate() - daysAgo)
      return d.toISOString().split('T')[0]
    }
    currentSession.value = {
      id: 'demo-session',
      name: 'Session Démo',
      registration_start: pastDate(20),
      registration_end: pastDate(10),
      matching_start: pastDate(9),
      matching_end: pastDate(3),
      reveal_date: pastDate(2)
    }
    isParticipating.value = true
    presenceValidated.value = true
    participantCount.value = 147

    // Inject fake matches
    userMatches.value = [...DEV_FAKE_MATCHES]

    loading.value = false
    return
  }

  try {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      router.push('/connexion')
      return
    }

    const userEmail = session.user.email
    if (!userEmail) {
      router.push('/connexion')
      return
    }

    // Fetch user data
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', userEmail)
      .single()

    if (userError || !userData) {
      error.value = 'Impossible de charger ton profil.'
      loading.value = false
      return
    }

    userName.value = userData.first_name
    userTier.value = userData.tier || 'free'
    userInfo.value = {
      firstName: userData.first_name,
      lastName: userData.last_name,
      email: userData.email,
      city: userData.city,
      age: userData.age,
      gender: userData.gender || '',
      orientation: orientationLabels[userData.sexual_orientation] || userData.sexual_orientation,
      instagram: userData.instagram || '',
      phone: userData.phone || '',
      showPhone: userData.show_phone !== false,
      showInstagram: userData.show_instagram !== false,
      createdAt: new Date(userData.created_at).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric'
      }),
      profilePhotoUrl: userData.profile_photo_url || '',
      bannerColor: userData.banner_color || '#8B2D4A'
    }
    rawOrientation.value = userData.sexual_orientation || ''
    userCustomTagline.value = userData.custom_tagline || ''
    userShareToken.value = userData.share_token || null

    // Load personality type and category theming
    if (userData.personality_type) {
      const pType = getTypeById(userData.personality_type)
      if (pType) {
        userPersonalityType.value = pType
        userCategory.value = getCategoryForType(pType.id) || null
        userAvatarUrl.value = getAvatarUrl(pType.avatarFile)
        // Always set banner color to match personality category
        userInfo.value.bannerColor = userCategory.value?.color || '#8B2D4A'
      }
    }

    // Fetch latest test results
    const { data: testData } = await supabase
      .from('test_results')
      .select('id, scores, hobbies')
      .eq('user_id', userData.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (testData) {
      scores.value = testData.scores as Scores
      resultId.value = testData.id
      // Parse hobbies if JSONB or string
      const rawH = testData.hobbies
      userHobbies.value = Array.isArray(rawH) ? rawH : (typeof rawH === 'string' ? JSON.parse(rawH) : [])

      // If user hasn't chosen a plan yet, redirect to results page to force plan selection
      if (!userData.tier) {
        router.push(`/resultats/${testData.id}`)
        return
      }
    }

    // Fetch current/latest session
    try {
      const { data: sessionData } = await supabase
        .from('sessions')
        .select('*')
        .order('reveal_date', { ascending: false })
        .limit(1)
        .single()

      if (sessionData) {
        currentSession.value = sessionData

        // Check participation
        const { data: participationData } = await supabase
          .from('session_participants')
          .select('*')
          .eq('session_id', sessionData.id)
          .eq('user_id', userData.id)
          .single()

        if (participationData) {
          isParticipating.value = true
          presenceValidated.value = participationData.presence_validated
        }

        // Count participants
        const { count } = await supabase
          .from('session_participants')
          .select('*', { count: 'exact', head: true })
          .eq('session_id', sessionData.id)

        participantCount.value = count || 0

        // Fetch matches if revealed
        if (sessionData.status === 'revealed') {
          const { data: matchData } = await supabase
            .from('matches')
            .select('*')
            .eq('session_id', sessionData.id)
            .or(`user1_id.eq.${userData.id},user2_id.eq.${userData.id}`)

          if (matchData && matchData.length > 0) {
            // Enrich match data with partner info
            const enrichedMatches = await Promise.all(matchData.map(async (match) => {
              const partnerId = match.user1_id === userData.id ? match.user2_id : match.user1_id
              const isUser1 = match.user1_id === userData.id
              const isUnlocked = isUser1 ? match.unlocked_by_user1 : match.unlocked_by_user2

              const { data: partnerData } = await supabase
                .from('users')
                .select('id, first_name, city, age, instagram, phone, show_phone, show_instagram, banner_color, personality_type, profile_photo_url, custom_tagline')
                .eq('id', partnerId)
                .single()

              // Get avatar URL for partner's personality type
              let partnerAvatarUrl = ''
              let partnerTypeName = ''
              let partnerTypeId = ''
              if (partnerData?.personality_type) {
                const pType = getTypeById(partnerData.personality_type)
                if (pType) {
                  partnerTypeName = pType.name
                  partnerTypeId = pType.id
                  partnerAvatarUrl = getAvatarUrl(pType.avatarFile)
                }
              }

              // Fetch partner hobbies from test_results
              let partnerHobbies: string[] = []
              if (partnerData?.id) {
                const { data: partnerTestData } = await supabase
                  .from('test_results')
                  .select('hobbies')
                  .eq('user_id', partnerData.id)
                  .order('created_at', { ascending: false })
                  .limit(1)
                  .single()
                if (partnerTestData?.hobbies) {
                  const rawH = partnerTestData.hobbies
                  partnerHobbies = Array.isArray(rawH) ? rawH : (typeof rawH === 'string' ? JSON.parse(rawH) : [])
                }
              }

              return {
                id: match.id,
                partnerId,
                matchName: partnerData?.first_name || 'Inconnu',
                compatibilityScore: match.compatibility_score,
                unlocked: isUnlocked,
                city: partnerData?.city,
                age: partnerData?.age,
                instagram: partnerData?.instagram || '',
                phone: partnerData?.phone || '',
                showPhone: partnerData?.show_phone !== false,
                showInstagram: partnerData?.show_instagram !== false,
                bannerColor: partnerData?.banner_color || '#8B2D4A',
                isUser1,
                avatarUrl: partnerAvatarUrl,
                personalityTypeName: partnerTypeName,
                photoUrl: partnerData?.profile_photo_url || '',
                hobbies: partnerHobbies,
                customTagline: partnerData?.custom_tagline || '',
                personalityTypeId: partnerTypeId
              }
            }))
            userMatches.value = enrichedMatches
          }
        }
      }
    } catch (sessionErr) {
      console.warn('Session/match loading skipped:', sessionErr instanceof Error ? sessionErr.message : sessionErr)
    }
  } catch (err: any) {
    console.error('Profile load error:', err)
    error.value = 'Une erreur est survenue. Réessaie plus tard.'
  } finally {
    loading.value = false
  }
})

async function handleLogout() {
  await supabase.auth.signOut()
  sessionStorage.clear()
  router.push('/')
}

// Helper to get user DB id from auth session
async function getCurrentUserId(): Promise<string | null> {
  const { data: { session } } = await supabase.auth.getSession()
  const userEmail = session?.user?.email
  if (!userEmail) return null

  const { data } = await supabase
    .from('users')
    .select('id')
    .eq('email', userEmail)
    .single()

  return data?.id || null
}

async function joinSession() {
  if (!currentSession.value) return
  const userId = await getCurrentUserId()
  if (!userId) return

  try {
    // All users are auto-validated on join
    await supabase.from('session_participants').insert({
      session_id: currentSession.value.id,
      user_id: userId,
      presence_validated: true,
      validated_at: new Date().toISOString()
    })
    isParticipating.value = true
    participantCount.value++
    presenceValidated.value = true
  } catch (err) {
    console.error('Join session error:', err)
  }
}

async function validatePresence() {
  if (!currentSession.value) return
  const userId = await getCurrentUserId()
  if (!userId) return

  try {
    await supabase
      .from('session_participants')
      .update({ presence_validated: true, validated_at: new Date().toISOString() })
      .eq('session_id', currentSession.value.id)
      .eq('user_id', userId)

    presenceValidated.value = true
  } catch (err) {
    console.error('Validate presence error:', err)
  }
}

// Sort matches once at init: locked sides, unlocked center — positions are stable after
const matchOrder = ref<string[]>([])

function computeInitialOrder(matches: MatchData[]) {
  const locked = matches.filter(m => !m.unlocked)
  const unlocked = matches.filter(m => m.unlocked)
  const half = Math.ceil(locked.length / 2)
  return [...locked.slice(0, half), ...unlocked, ...locked.slice(half)].map(m => m.id)
}

const sortedMatches = computed(() => {
  // If order not yet computed, compute it (first render)
  if (matchOrder.value.length === 0 && userMatches.value.length > 0) {
    matchOrder.value = computeInitialOrder(userMatches.value)
  }
  // Return matches in stable order
  return matchOrder.value
    .map(id => userMatches.value.find(m => m.id === id))
    .filter(Boolean) as MatchData[]
})

// Track unlock animation phases
const unlockingMatches = reactive(new Set<string>()) // phase 1: dissolving locked card
const recentlyUnlocked = reactive(new Set<string>()) // phase 2: revealing unlocked card

// Compute initial order once when matches are loaded
watch(userMatches, (matches) => {
  if (matches.length > 0 && matchOrder.value.length === 0) {
    matchOrder.value = computeInitialOrder(matches)
  }
}, { immediate: true })

async function unlockMatch(matchId: string) {
  const match = userMatches.value.find(m => m.id === matchId)
  if (!match) return
  // Prevent double-click
  if (unlockingMatches.has(matchId)) return

  // Phase 1: Start dissolve animation on locked card
  unlockingMatches.add(matchId)

  // DEV: Skip Supabase for fake matches
  if (!matchId.startsWith('dev-match-')) {
    try {
      const updateField = match.isUser1 ? 'unlocked_by_user1' : 'unlocked_by_user2'
      await supabase
        .from('matches')
        .update({ [updateField]: true })
        .eq('id', matchId)
    } catch (err) {
      console.error('Unlock match error:', err)
      unlockingMatches.delete(matchId)
      return
    }
  }

  // Wait for dissolve to finish (card is now visually hidden at opacity:0)
  await new Promise(resolve => setTimeout(resolve, 600))

  // Phase 2: Swap content (card hidden) + start reveal
  unlockingMatches.delete(matchId)
  match.unlocked = true
  recentlyUnlocked.add(matchId)

  // Spawn particles after DOM has updated with new card content
  await nextTick()
  await new Promise(resolve => setTimeout(resolve, 80))
  spawnHeartParticles(matchId)

  // Clean up animation classes after reveal completes
  setTimeout(() => {
    recentlyUnlocked.delete(matchId)
  }, 1000)
}

function spawnHeartParticles(matchId: string) {
  const wrapper = document.querySelector(`[data-match-id="${matchId}"]`)
  if (!wrapper) return

  const rect = wrapper.getBoundingClientRect()
  const hearts = ['❤️', '💕', '✨', '💖', '💗']
  const particleCount = 10

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.className = 'heart-particle'
    particle.textContent = hearts[Math.floor(Math.random() * hearts.length)]

    // Start from card center area
    const startX = rect.left + rect.width / 2 + (Math.random() - 0.5) * rect.width * 0.4
    const startY = rect.top + rect.height * 0.35 + (Math.random() - 0.5) * rect.height * 0.2

    // Trajectories biased outward and upward
    const angle = Math.random() * Math.PI * 2
    const distance = 80 + Math.random() * 140
    const tx = Math.cos(angle) * distance
    const ty = Math.sin(angle) * distance - 60

    const size = 16 + Math.random() * 16
    const duration = 1 + Math.random() * 0.5
    const delay = Math.random() * 0.25

    particle.style.cssText = `
      position: fixed;
      left: ${startX}px;
      top: ${startY}px;
      font-size: ${size}px;
      pointer-events: none;
      z-index: 9999;
      --tx: ${tx}px;
      --ty: ${ty}px;
      animation: heartFloat ${duration}s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
      animation-delay: ${delay}s;
      opacity: 0;
    `

    document.body.appendChild(particle)
    setTimeout(() => particle.remove(), 2500)
  }
}

function goToTest() {
  router.push('/test')
}

function viewDetailedResults() {
  if (resultId.value) {
    router.push(`/resultats/${resultId.value}`)
  }
}

async function upgradeToPaid() {
  isUpgrading.value = true
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user?.id) {
      console.error('No auth session found')
      return
    }

    // Use auth_id which is compatible with RLS policies
    const { data: updateData, error: updateError } = await supabase
      .from('users')
      .update({ tier: 'paid' })
      .eq('auth_id', session.user.id)
      .select('tier')

    if (updateError) throw updateError

    // Verify the update actually went through
    if (!updateData || updateData.length === 0) {
      console.error('Upgrade: no rows updated — check RLS policies on users table for UPDATE')
      // Fallback: try updating by email
      const userEmail = session.user.email
      if (userEmail) {
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('users')
          .update({ tier: 'paid' })
          .eq('email', userEmail)
          .select('tier')

        if (fallbackError) throw fallbackError
        if (fallbackData && fallbackData.length > 0) {
          userTier.value = 'paid'
          return
        }
      }
      console.error('Upgrade failed: could not update tier')
      return
    }

    userTier.value = 'paid'
  } catch (err) {
    console.error('Upgrade error:', err)
  } finally {
    isUpgrading.value = false
  }
}
</script>

<template>
  <div class="dashboard-page">
    <!-- Decorative blurs -->
    <div class="deco-blur deco-top-right"></div>
    <div class="deco-blur deco-bottom-left"></div>

    <!-- Header -->
    <header class="dashboard-header">
      <div class="header-container">
        <router-link to="/" class="logo">
          <img :src="logoImage" alt="Compaatible" />
          <span class="logo-text">Compaatible</span>
        </router-link>
        <button class="logout-btn" @click="handleLogout">
          <LogOut class="w-4 h-4" />
          <span class="logout-text">Déconnexion</span>
        </button>
      </div>
      <!-- Desktop nav -->
      <div class="desktop-nav">
        <DashboardNav :active-tab="activeTab" @tab-change="activeTab = $event" />
      </div>
    </header>

    <main class="dashboard-main">
      <!-- Loading -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Chargement de ton espace...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="error-state">
        <AlertCircle class="error-icon" />
        <p>{{ error }}</p>
        <button class="btn-outline" @click="router.push('/')">Retour à l'accueil</button>
      </div>

      <template v-else>
        <!-- ===== TAB: ACCUEIL ===== -->
        <div v-show="activeTab === 'accueil'" class="tab-content">
          <!-- Greeting -->
          <div class="greeting-section">
            <div class="greeting-badge">
              <span class="tier-badge" :class="userTier">{{ userTier === 'free' ? 'PLAN DISPONIBLE' : 'PLAN EXPÉRIENCE' }}</span>
            </div>
            <h1 class="greeting-title">Hey, <span class="greeting-name">{{ userName }}</span> 👋</h1>
            <p class="greeting-subtitle">Bienvenue dans ton espace Compaatible.</p>
          </div>

          <!-- Personality Card (collectible) -->
          <div v-if="userPersonalityType && userCategory && userAvatarUrl" class="personality-card-section">
            <PersonalityCard
              :personality-type="userPersonalityType"
              :category="userCategory"
              :avatar-url="userAvatarUrl"
              :category-logo-url="userCategoryLogoUrl"
              :user-name="userName"
              :custom-tagline="userCustomTagline"
              :actual-scores="revealScores"
              :share-token="userShareToken"
              :profile-photo-url="userInfo.profilePhotoUrl"
              variant="full"
              @share="handleCardShare"
            />

            <!-- Share confirmation toast -->
            <Transition name="toast">
              <div v-if="shareConfirmation" class="share-toast">
                <CheckCircle :size="16" />
                +1 match gratuit débloqué !
              </div>
            </Transition>
          </div>

          <!-- Countdown + Illustration intégrés -->
          <div v-if="currentSession && countdownTarget" class="section-card">
            <CountdownCard :target-date="countdownTarget" :label="countdownLabel" />
            <!-- Romantic illustration intégrée -->
            <div class="destiny-illustration-inline">
              <div class="destiny-divider"></div>
              <div class="illustration-wrapper">
                <svg viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg" class="destiny-svg">
                  <circle cx="200" cy="90" r="60" fill="url(#radial-glow-destiny)" fill-opacity="0.4" />
                  <path d="M80 120C120 120 140 50 200 50C260 50 280 120 320 120" stroke="#8B2D4A" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2 4" class="thread-path" />
                  <g class="floating-heart heart-1">
                    <path d="M95 110C95 105 90 100 85 100C80 100 75 105 75 110C75 120 85 128 95 135C105 128 115 120 115 110C115 105 110 100 105 100C100 100 95 105 95 110Z" fill="white" stroke="#8B2D4A" stroke-width="1.2" />
                  </g>
                  <g class="floating-heart heart-2">
                    <path d="M305 110C305 105 300 100 295 100C290 100 285 105 285 110C285 120 295 128 305 135C315 128 325 120 325 110C325 105 320 100 315 100C310 100 305 105 305 110Z" fill="#8B2D4A" stroke="#8B2D4A" stroke-width="1.2" />
                  </g>
                  <circle cx="180" cy="35" r="1.5" fill="#8B2D4A" class="sparkle-dot s1" />
                  <circle cx="220" cy="60" r="1" fill="#8B2D4A" class="sparkle-dot s2" />
                  <circle cx="140" cy="70" r="2" fill="#8B2D4A" fill-opacity="0.3" class="sparkle-dot s3" />
                  <circle cx="260" cy="85" r="1.5" fill="#8B2D4A" class="sparkle-dot s4" />
                  <path d="M200 25L202 30L207 32L202 34L200 39L198 34L193 32L198 30L200 25Z" fill="#8B2D4A" class="sparkle-star" />
                  <defs>
                    <radialGradient id="radial-glow-destiny" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 90) rotate(90) scale(80)">
                      <stop stop-color="#8B2D4A" stop-opacity="0.15" />
                      <stop offset="1" stop-color="#FBF9F7" stop-opacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
              <p class="romantic-message">{{ romanticMessage }}</p>
            </div>
          </div>

          <!-- Registration CTA -->
          <div v-if="showRegistrationButton" class="action-card">
            <div class="action-content">
              <h3>Participe à la session {{ currentSession?.name }}</h3>
              <p>Inscris-toi pour être inclus dans le matching de ce mois-ci.</p>
            </div>
            <button class="btn-primary" @click="openPlanModal">
              M'inscrire à la session
              <ChevronRight class="w-5 h-5" />
            </button>
          </div>

          <!-- Participation confirmée -->
          <div v-if="isParticipating && (sessionPhase === 'registration' || sessionPhase === 'matching' || sessionPhase === 'between')" class="success-banner">
            <CheckCircle class="w-5 h-5" />
            <span>Tu es inscrit(e) pour cette session !</span>
          </div>

          <!-- No test yet -->
          <div v-if="!hasResults" class="action-card">
            <div class="action-content">
              <h3>📝 Passe ton test de personnalité</h3>
              <p>Complète le questionnaire Big Five pour être inclus dans le matching.</p>
            </div>
            <button class="btn-primary" @click="goToTest">
              Commencer le test
              <ChevronRight class="w-5 h-5" />
            </button>
          </div>

          <!-- Timeline -->
          <div class="timeline-card">
            <h2 class="section-title">Comment se déroule l'expérience ?</h2>
            <div class="timeline">
              <div class="timeline-item" :class="{ active: sessionPhase === 'registration' }">
                <div class="timeline-marker">1</div>
                <div>
                  <p class="timeline-date">Du 1er au 9 du mois</p>
                  <p class="timeline-label">Inscriptions ouvertes</p>
                  <!-- Inscription auto-validée -->
                </div>
              </div>
              <div class="timeline-item" :class="{ active: sessionPhase === 'matching' || sessionPhase === 'between' }">
                <div class="timeline-marker">2</div>
                <div>
                  <p class="timeline-date">Du 10 au 12 du mois</p>
                  <p class="timeline-label">Nous analysons et créons les matchs</p>
                </div>
              </div>
              <div class="timeline-item" :class="{ active: sessionPhase === 'revealed' }">
                <div class="timeline-marker">3</div>
                <div>
                  <p class="timeline-date">Le 13 du mois</p>
                  <p class="timeline-label">Tu découvres tes matchs !</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ===== TAB: MES MATCHS ===== -->
        <div v-show="activeTab === 'matchs'" class="tab-content">
          <div class="tab-header">
            <h1 class="tab-title">Mes <span class="highlight">matchs</span></h1>
            <span v-if="userMatches.length" class="match-count">{{ userMatches.length }}</span>
          </div>

          <!-- Has matches -->
          <div v-if="userMatches.length" class="matches-list">
            <div
              v-for="match in sortedMatches"
              :key="match.id"
              class="match-card-wrapper"
              :class="{
                'is-dissolving': unlockingMatches.has(match.id),
                'is-revealing': recentlyUnlocked.has(match.id)
              }"
              :data-match-id="match.id"
            >
              <MatchCard
                :match-name="match.matchName"
                :compatibility-score="match.compatibilityScore"
                :unlocked="match.unlocked"
                :city="match.city"
                :age="match.age"
                :banner-color="match.bannerColor"
                :avatar-url="match.avatarUrl"
                :personality-type-name="match.personalityTypeName"
                :personality-type-id="match.personalityTypeId"
                :hobbies="match.hobbies"
                :photo-url="match.photoUrl"
                :phone="match.phone"
                :instagram="match.instagram"
                :show-phone="match.showPhone"
                :show-instagram="match.showInstagram"
                :custom-tagline="match.customTagline"
                @unlock="unlockMatch(match.id)"
              />
            </div>
          </div>

          <!-- Empty state: No match for free users (revealed session) -->
          <div v-else-if="sessionPhase === 'revealed' && userTier === 'free'" class="no-match-container">
            <div class="no-match-card">
              <div class="no-match-illustration">
                <span class="broken-heart-emoji">💔</span>
                <div class="heart-glow"></div>
              </div>

              <h2 class="no-match-title">Pas de match ce mois-ci</h2>

              <p class="no-match-description">
                Avec le <strong>Plan Disponible</strong>, les chances de match sont inférieures à 1%.
                Passe au <strong>Plan Expérience</strong> le mois prochain pour obtenir 3 matchs garantis.
              </p>

              <div class="no-match-cta-wrapper">
                <button class="no-match-cta" @click="upgradeToPaid" :disabled="isUpgrading">
                  <Sparkles class="w-5 h-5" />
                  <span v-if="isUpgrading">Activation...</span>
                  <span v-else>Découvrir le Plan Expérience</span>
                  <ArrowRight v-if="!isUpgrading" class="w-5 h-5" />
                </button>
                <p class="no-match-promo">
                  1ère édition gratuite <span class="promo-old-price">(normalement 19,99€)</span>
                </p>
              </div>
            </div>

          </div>

          <!-- Empty state: Generic (waiting for matches) -->
          <div v-else class="empty-state-premium">
            <!-- Decorative Background Elements -->
            <div class="empty-bg-blob empty-bg-blob-right"></div>
            <div class="empty-bg-blob empty-bg-blob-left"></div>

            <div class="empty-premium-content">
              <!-- Status Badge with mini search animation -->
              <div class="empty-status-badge">
                {{ sessionPhase === 'matching' ? 'Analyse en cours' : 'Prochaine Session' }}
              </div>

              <!-- Interactive Constellation: reveals on mouse hover -->
              <div
                class="constellation-wrapper"
                ref="constellationRef"
                @mousemove="onConstellationMouseMove"
                @mouseleave="onConstellationMouseLeave"
              >
                <svg viewBox="0 0 400 190" preserveAspectRatio="xMidYMid meet" class="constellation-svg">
                  <defs>
                    <filter id="cStarGlow" x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <radialGradient id="cBgGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stop-color="#8B2D4A" stop-opacity="0.06" />
                      <stop offset="100%" stop-color="#8B2D4A" stop-opacity="0" />
                    </radialGradient>
                  </defs>
                  <!-- Subtle background glow -->
                  <ellipse cx="200" cy="95" rx="180" ry="85" fill="url(#cBgGlow)" />
                  <!-- Connection lines -->
                  <line
                    v-for="(line, idx) in constellationLines"
                    :key="'cl-' + idx"
                    :x1="constellationStars[line.from].x"
                    :y1="constellationStars[line.from].y"
                    :x2="constellationStars[line.to].x"
                    :y2="constellationStars[line.to].y"
                    class="c-line"
                    :class="{
                      'c-line-anchor': isConstellationLineAnchor(line),
                      'c-line-visible': isConstellationLineVisible(line)
                    }"
                  />
                  <!-- Stars -->
                  <circle
                    v-for="(star, idx) in constellationStars"
                    :key="'cs-' + idx"
                    :cx="star.x"
                    :cy="star.y"
                    :r="star.r"
                    class="c-star"
                    :class="{
                      'c-star-anchor': star.isAnchor,
                      'c-star-revealed': isConstellationStarRevealed(star),
                      'c-star-hola': holaIntensity(idx) > 0,
                    }"
                    :style="constellationStarStyle(star, idx)"
                  />
                </svg>
                <p class="constellation-hint">explore les étoiles avec ta souris</p>
              </div>

              <h2 class="empty-premium-title">
                {{ sessionPhase === 'matching' ? 'La magie opère...' : 'Ton futur commence ici.' }}
              </h2>

              <p class="empty-premium-subtitle">
                <template v-if="sessionPhase === 'registration'">Les inscriptions sont en cours. Les matchs seront révélés le 13.</template>
                <template v-else-if="sessionPhase === 'matching' || sessionPhase === 'between'">Notre équipe analyse les affinités pour te présenter la personne la plus compatible. Un peu de patience.</template>
                <template v-else>Inscris-toi à la prochaine session pour laisser la science trouver ton âme sœur.</template>
              </p>
            </div>

            <div class="empty-preview-section">
              <p class="empty-preview-label">Aperçu de ton profil public</p>
              <div class="empty-preview-card">
                <UserCard
                  :user="userCardData"
                  :hobbies="userHobbies"
                  :personality-type="userPersonalityType ? { name: userPersonalityType.name, emoji: userPersonalityType.emoji, tagline: userPersonalityType.tagline } : undefined"
                  :category="userCategory ? { name: userCategory.name, color: userCategory.color, bgColor: userCategory.bgColor } : undefined"
                  :category-logo-url="userCategoryLogoUrl"
                  :avatar-url="userAvatarUrl"
                  :custom-tagline="userCustomTagline"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- ===== TAB: PROFIL ===== -->
        <div v-show="activeTab === 'profil'" class="tab-content">
          <div class="tab-header">
            <h1 class="tab-title">Mon <span class="highlight">profil</span></h1>
          </div>

          <div class="profil-grid">
            <!-- Identity Premium Card -->
            <div class="identity-card">
              <!-- Bandeau décoratif avec couleur personnalisée -->
              <div class="profile-card-banner" :style="{ backgroundColor: userInfo.bannerColor + '08' }">
                <svg class="absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="profil-damier" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M20 0L40 20L20 40L0 20Z" :fill="userInfo.bannerColor" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#profil-damier)" />
                </svg>
              </div>

              <!-- Edit button -->
              <button v-if="!isEditing" class="edit-profile-btn" @click="startEditing">
                <Pencil class="edit-icon" />
              </button>

              <div class="identity-header">
                <input
                  ref="photoFileInput"
                  type="file"
                  accept="image/png, image/jpeg"
                  class="sr-only"
                  @change="handlePhotoChange"
                />
                <div
                  class="profile-photo-wrapper"
                  :class="{ 'premium-ring': userTier === 'paid', 'editable': isEditing }"
                  @click="isEditing ? triggerPhotoUpload() : undefined"
                >
                  <img v-if="userInfo.profilePhotoUrl" :src="userInfo.profilePhotoUrl" :alt="userInfo.firstName" class="profile-photo" />
                  <div v-else class="initials-avatar">
                    {{ (isEditing ? editForm.firstName : userInfo.firstName)?.[0] }}{{ (isEditing ? editForm.lastName : userInfo.lastName)?.[0] }}
                  </div>
                  <div v-if="isEditing" class="photo-edit-overlay">
                    <Camera v-if="!isUploadingPhoto" :size="24" color="#FEFEFE" />
                    <div v-else class="photo-upload-spinner"></div>
                  </div>
                </div>

                <h2 class="identity-name">{{ isEditing ? editForm.firstName : userInfo.firstName }} {{ isEditing ? editForm.lastName : userInfo.lastName }}</h2>

                <div :class="['plan-badge', userTier]">
                  <Crown v-if="userTier === 'paid'" class="crown-icon" />
                  <span>{{ userTier === 'paid' ? 'Plan Expérience' : 'Plan Disponible' }}</span>
                </div>
              </div>

              <div class="identity-divider"></div>

              <!-- VIEW MODE -->
              <div v-if="!isEditing" class="identity-body">
                <div class="info-grid">
                  <div class="info-card-item full-width">
                    <div class="item-icon-box"><Mail class="item-icon" /></div>
                    <div class="item-content">
                      <span class="item-label">Email</span>
                      <span class="item-value">{{ userInfo.email }}</span>
                    </div>
                  </div>

                  <div class="info-card-item full-width">
                    <div class="item-icon-box"><MapPin class="item-icon" /></div>
                    <div class="item-content">
                      <span class="item-label">Localisation</span>
                      <span class="item-value">{{ userInfo.city }}</span>
                    </div>
                  </div>

                  <div class="info-card-item">
                    <div class="item-icon-box"><Calendar class="item-icon" /></div>
                    <div class="item-content">
                      <span class="item-label">Âge</span>
                      <span class="item-value">{{ userInfo.age }} ans</span>
                    </div>
                  </div>

                  <div class="info-card-item">
                    <div class="item-icon-box"><img :src="logoImage" alt="" class="item-icon w-4 h-4 object-contain" /></div>
                    <div class="item-content">
                      <span class="item-label">Recherche</span>
                      <span class="item-value">{{ userInfo.orientation }}</span>
                    </div>
                  </div>

                  <div v-if="userInfo.instagram" class="info-card-item full-width">
                    <div class="item-icon-box"><Instagram class="item-icon" /></div>
                    <div class="item-content">
                      <span class="item-label">Instagram</span>
                      <span class="item-value">@{{ userInfo.instagram }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- EDIT MODE -->
              <div v-else class="identity-body">
                <form class="edit-form" @submit.prevent="saveProfile">
                  <div class="edit-row">
                    <div class="edit-field">
                      <label class="edit-label">Prénom</label>
                      <input v-model="editForm.firstName" type="text" class="edit-input" required />
                    </div>
                    <div class="edit-field">
                      <label class="edit-label">Nom</label>
                      <input v-model="editForm.lastName" type="text" class="edit-input" required />
                    </div>
                  </div>

                  <div class="edit-field">
                    <label class="edit-label">Ville</label>
                    <input v-model="editForm.city" type="text" class="edit-input" required />
                  </div>

                  <div class="edit-row">
                    <div class="edit-field">
                      <label class="edit-label">Âge</label>
                      <input v-model.number="editForm.age" type="number" class="edit-input" min="18" max="99" required />
                    </div>
                    <div class="edit-field">
                      <label class="edit-label">Recherche</label>
                      <select v-model="editForm.orientation" class="edit-input edit-select">
                        <option v-for="opt in orientationOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                      </select>
                    </div>
                  </div>

                  <div class="edit-field">
                    <label class="edit-label">Instagram <span class="edit-optional">(optionnel)</span></label>
                    <input v-model="editForm.instagram" type="text" class="edit-input" placeholder="ton_pseudo" />
                  </div>

                  <div class="edit-actions">
                    <button type="submit" class="edit-save-btn" :disabled="isSaving">
                      <Save class="edit-action-icon" />
                      <span v-if="isSaving">Sauvegarde...</span>
                      <span v-else>Enregistrer</span>
                    </button>
                    <button type="button" class="edit-cancel-btn" @click="cancelEditing">
                      <X class="edit-action-icon" />
                      Annuler
                    </button>
                  </div>
                </form>
              </div>

              <!-- Upgrade CTA (only for free users) -->
              <div v-if="userTier === 'free' && !isEditing" class="upgrade-section">
                <button
                  class="upgrade-btn"
                  @click="upgradeToPaid"
                  :disabled="isUpgrading"
                >
                  <Crown class="upgrade-btn-icon" />
                  <span v-if="isUpgrading">Modification...</span>
                  <span v-else>Passer au Plan Expérience</span>
                  <ArrowRight v-if="!isUpgrading" class="upgrade-btn-arrow" />
                </button>
              </div>

              <div class="identity-footer">
                <p>Membre depuis le {{ userInfo.createdAt }}</p>
              </div>
            </div>

            <!-- Big Five results -->
            <div class="profil-card">
              <div class="results-header-row">
                <h2 class="card-title">Test de personnalité</h2>
                <div v-if="hasResults" class="results-tag"><svg class="inline-block h-3.5 w-3.5 mr-1 -mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>Complété</div>
                <div v-else class="results-tag pending">⏳ En attente</div>
              </div>

              <div v-if="hasResults" class="results-content">
                <div class="domain-bars">
                  <div v-for="trait in domainResults" :key="trait.label" class="domain-bar-item">
                    <div class="bar-header">
                      <div class="bar-label">
                        <span class="bar-emoji">{{ trait.emoji }}</span>
                        <span class="bar-name">{{ trait.label }}</span>
                      </div>
                      <span class="bar-percentage">{{ trait.percentage }}%</span>
                    </div>
                    <div class="bar-bg">
                      <div class="bar-fill" :style="{ width: trait.percentage + '%' }"></div>
                    </div>
                  </div>
                </div>

                <div class="profil-actions">
                  <button class="btn-primary" @click="viewDetailedResults">
                    Voir l'analyse détaillée
                    <ChevronRight class="w-5 h-5" />
                  </button>
                  <button class="btn-outline" @click="goToTest">
                    <Pencil class="w-4 h-4" />
                    Modifier mon test
                  </button>
                </div>
              </div>

              <div v-else class="empty-test">
                <div class="empty-icon-circle">
                  <Info class="empty-icon" />
                </div>
                <p class="empty-test-title">Tu n'as pas encore passé le test.</p>
                <p class="empty-test-subtitle">Complète ton profil psychologique pour être inclus dans le matching.</p>
                <button class="btn-primary" @click="goToTest">
                  Passer le test
                  <ChevronRight class="w-5 h-5" />
                </button>
              </div>
            </div>


          </div>
        </div>
      </template>
    </main>

    <!-- Mobile bottom nav -->
    <div class="mobile-nav">
      <DashboardNav :active-tab="activeTab" @tab-change="activeTab = $event" />
    </div>

    <!-- Dev Panel (always visible) -->
    <div class="dev-panel">
      <div class="dev-panel-header">
        <span class="dev-panel-title">🛠️ Dev Panel</span>
        <span class="dev-phase-badge">{{ sessionPhase }}</span>
      </div>
      <div class="dev-panel-info">
        <span v-if="isOverridden" class="dev-override-active">📌 {{ devToday }}</span>
        <span v-else class="dev-override-off">Date réelle</span>
      </div>
      <div class="dev-presets">
        <button
          v-for="preset in presets"
          :key="preset.date"
          class="dev-preset-btn"
          :class="{ active: devToday === preset.date }"
          @click="setDate(preset.date)"
        >
          {{ preset.label }}
        </button>
      </div>
      <button v-if="isOverridden" class="dev-reset-btn" @click="clearDate">
        ✕ Reset à aujourd'hui
      </button>
      <div class="dev-panel-divider"></div>
      <button
        class="dev-preset-btn dev-reveal-btn"
        :class="{ disabled: !userPersonalityType }"
        :disabled="!userPersonalityType"
        @click="showDevReveal = true"
      >
        🎭 Rejouer l'annonce des résultats
      </button>
      <div class="dev-panel-divider"></div>
      <button
        class="dev-preset-btn dev-reveal-btn"
        @click="exitPopupRef?.forceShow()"
      >
        🚪 Tester le popup de sortie
      </button>
    </div>

    <!-- Exit Popup (for dev testing) -->
    <ExitPopup ref="exitPopupRef" />

    <!-- Dev: Personality Reveal Overlay -->
    <PersonalityReveal
      v-if="showDevReveal && userPersonalityType && userCategory"
      :personality-type="userPersonalityType"
      :category="userCategory"
      :user-name="userInfo.firstName"
      :result-id="resultId || ''"
      :scores="revealScores"
      :avatar-url="userAvatarUrl"
      :category-logo-url="userCategoryLogoUrl"
      :navigate-on-finish="false"
      @close="showDevReveal = false"
      @finish="showDevReveal = false"
      @tagline-selected="saveSelectedTagline"
    />
    <!-- Plan Selection Modal -->
    <transition name="modal-fade">
      <div v-if="showPlanModal" class="plan-modal-overlay" @click.self="closePlanModal">
        <div class="plan-modal-container">
          <button class="plan-modal-close" @click="closePlanModal" aria-label="Fermer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <div class="plan-modal-header">
            <h2 class="plan-modal-title">Prêt pour la prochaine session ?</h2>
            <p class="plan-modal-subtitle">Choisis comment tu souhaites participer ce mois-ci.</p>
          </div>

          <div class="plans-grid">
            <!-- Plan Disponible (Free) -->
            <div class="plan-card free-plan">
              <div class="plan-card-content">
                <h3 class="plan-name">Plan Disponible</h3>
                <div class="plan-price-container">
                  <span class="plan-price">Gratuit</span>
                </div>
                <ul class="features-list">
                  <li class="feature-item">
                    <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="#8B2D4A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>1 match par session</span>
                  </li>
                  <li class="feature-item">
                    <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="#8B2D4A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Accès aux résultats de compatibilité</span>
                  </li>
                </ul>
              </div>
              <button @click="joinWithPlan('free')" class="plan-btn outline-btn" :disabled="isJoiningWithPlan">
                <span>{{ isJoiningWithPlan ? 'Chargement...' : 'Choisir ce plan' }}</span>
              </button>
            </div>

            <!-- Plan Expérience (Paid) -->
            <div class="plan-card premium-plan">
              <div class="recommendation-badge">RECOMMANDÉ</div>
              <div class="plan-card-content">
                <h3 class="plan-name">Plan Expérience</h3>
                <div class="plan-price-container">
                  <span class="plan-price premium-price">9,99€</span>
                  <span class="plan-period">/session</span>
                </div>
                <ul class="features-list">
                  <li class="feature-item">
                    <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="#A67C00" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>1 match par session</span>
                  </li>
                  <li class="feature-item">
                    <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="#A67C00" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Accès aux résultats de compatibilité</span>
                  </li>
                  <li class="feature-item">
                    <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="#A67C00" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span class="bold-feature">Profil boosté dans l'algorithme</span>
                  </li>
                  <li class="feature-item">
                    <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="#A67C00" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span class="bold-feature">Badge exclusif sur ta carte</span>
                  </li>
                </ul>
              </div>
              <button @click="joinWithPlan('paid')" class="plan-btn gold-btn" :disabled="isJoiningWithPlan">
                <span>{{ isJoiningWithPlan ? 'Chargement...' : 'Choisir le plan Expérience' }}</span>
              </button>
            </div>
          </div>

          <p class="plan-modal-footer-hint">Tu pourras changer de plan plus tard</p>
        </div>
      </div>
    </transition>

    <DevPanel />
  </div>
</template>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background: var(--color-white-cream);
  position: relative;
  overflow-x: hidden;
  padding-bottom: 80px;
}

/* Deco */
.deco-blur {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}
.deco-top-right {
  top: -10%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.06) 0%, transparent 70%);
}
.deco-bottom-left {
  bottom: 10%;
  left: -5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.04) 0%, transparent 70%);
}

/* Header */
.dashboard-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(251, 249, 247, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid #E8E8E8;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.header-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.logo img {
  width: 24px;
  height: auto;
}

.logo-text {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-black);
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-gray-dark);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}
.logout-btn:hover {
  color: var(--color-red-pure);
}

.desktop-nav {
  display: none;
}
.mobile-nav {
  display: block;
}

@media (min-width: 768px) {
  .desktop-nav {
    display: block;
    margin: 0 auto;
    border-top: 1px solid rgba(232, 232, 232, 0.4);
  }
  .mobile-nav {
    display: none;
  }
  .dashboard-page {
    padding-bottom: 0;
  }
}

/* Main */
.dashboard-main {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 20px 0;
  position: relative;
  z-index: 1;
}

/* Loading / Error */
.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 16px;
  text-align: center;
}

.loading-state p,
.error-state p {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: var(--color-gray-dark);
}

.loading-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid var(--color-gray-light);
  border-top-color: var(--color-red-pure);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.error-icon {
  width: 48px;
  height: 48px;
  color: var(--color-red-pure);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Tab content */
.tab-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ===== ACCUEIL TAB ===== */
.personality-card-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
}

.share-toast {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #16a34a, #15803d);
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);
}

.toast-enter-active {
  transition: all 0.4s ease;
}
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.95);
}

.greeting-section {
  margin-bottom: 32px;
}

.greeting-badge {
  margin-bottom: 16px;
}

.tier-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tier-badge.free {
  background: var(--color-gray-lighter);
  color: var(--color-gray-dark);
  border: 1px solid var(--color-gray-light);
}

.tier-badge.paid {
  background: rgba(139, 45, 74, 0.08);
  color: var(--color-red-pure);
  border: 1px solid rgba(139, 45, 74, 0.15);
}

.greeting-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 600;
  color: var(--color-black);
  line-height: 1.2;
  margin-bottom: 8px;
}

.greeting-name {
  color: var(--color-red-pure);
}

.greeting-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: var(--color-gray-main);
}

/* Section cards */
.section-card {
  background: white;
  border-radius: 24px;
  border: 1px solid var(--color-gray-light);
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

/* Destiny illustration inline (inside countdown card) */
.destiny-illustration-inline {
  padding: 0 24px 32px;
  text-align: center;
}

.destiny-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(139, 45, 74, 0.1), transparent);
  margin: 0 8px 24px;
}

.illustration-wrapper {
  width: 100%;
  max-width: 320px;
  margin: 0 auto 16px;
  display: flex;
  justify-content: center;
}

.destiny-svg {
  width: 100%;
  height: auto;
  overflow: visible;
}

.romantic-message {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.35rem;
  line-height: 1.4;
  color: #4A4A4A;
  max-width: 380px;
  margin: 0 auto;
}

.floating-heart {
  animation: floatHeart 4s ease-in-out infinite;
}

.heart-2 {
  animation-delay: -2s;
}

.sparkle-dot {
  animation: pulseSparkle 3s ease-in-out infinite;
}

.sparkle-dot.s2 { animation-delay: 0.5s; }
.sparkle-dot.s3 { animation-delay: 1.2s; }
.sparkle-dot.s4 { animation-delay: 1.8s; }

.sparkle-star {
  animation: rotateSparkle 6s linear infinite;
  transform-origin: 200px 42px;
}

.thread-path {
  stroke-dashoffset: 0;
  animation: moveThread 20s linear infinite;
}

@keyframes floatHeart {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes pulseSparkle {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}

@keyframes rotateSparkle {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes moveThread {
  from { stroke-dashoffset: 60; }
  to { stroke-dashoffset: 0; }
}

@media (max-width: 640px) {
  .romantic-message {
    font-size: 1.15rem;
    padding: 0 10px;
  }
  .destiny-illustration-inline {
    padding: 0 16px 24px;
  }
}

.participants-count {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-gray-dark);
  border-top: 1px solid var(--color-gray-lighter);
}

.participants-count svg {
  color: var(--color-red-pure);
}

/* Action cards */
.action-card {
  background: white;
  border-radius: 20px;
  padding: 28px;
  border: 1px solid var(--color-gray-light);
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.action-content h3 {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-black);
  margin-bottom: 8px;
}

.action-content p {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: var(--color-gray-main);
  margin-bottom: 20px;
  line-height: 1.5;
}

.action-hint {
  font-size: 0.8rem !important;
  color: var(--color-red-pure) !important;
  font-style: italic;
  margin-bottom: 0 !important;
  margin-top: -12px;
}

.premium-button-glow-wrapper {
  position: relative;
  display: inline-flex;
  padding: 12px;
}

.aura-glow-element {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110%;
  height: 110%;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.15) 0%, transparent 70%);
  border-radius: 9999px;
  filter: blur(20px);
  z-index: 0;
  animation: auraPulse 4s infinite ease-in-out;
}

.validate-presence-btn {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 48px;
  background: #8B2D4A;
  color: #FEFEFE;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow:
    0 4px 20px rgba(139, 45, 74, 0.3),
    0 1px 0 rgba(255, 255, 255, 0.2) inset;
}

.validate-presence-btn:hover {
  background: #6B2640;
  transform: translateY(-4px);
  box-shadow:
    0 12px 28px rgba(139, 45, 74, 0.4),
    0 1px 0 rgba(255, 255, 255, 0.25) inset;
}

.validate-presence-btn:active {
  transform: translateY(-1px);
  transition: all 0.1s;
}

.btn-shine-subtle {
  position: absolute;
  top: 0;
  left: -150%;
  width: 60%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent);
  transform: skewX(-20deg);
  animation: refinedShine 4s infinite linear;
}

@keyframes auraPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.6; }
  50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
}

@keyframes refinedShine {
  0% { left: -150%; }
  25% { left: 150%; }
  100% { left: 150%; }
}

/* Success banner */
.success-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(34, 197, 94, 0.08);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 16px;
  margin-bottom: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #16a34a;
}

/* Timeline */
.timeline-card {
  background: white;
  border-radius: 24px;
  padding: 32px;
  border: 1px solid var(--color-gray-light);
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-black);
  margin-bottom: 28px;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.timeline-marker {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gray-lighter);
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-gray-medium);
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.timeline-item.active .timeline-marker {
  background: var(--color-red-pure);
  color: white;
  box-shadow: 0 4px 12px rgba(139, 45, 74, 0.3);
}

.timeline-date {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-red-pure);
  margin-bottom: 2px;
}

.timeline-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-gray-dark);
}

.timeline-hint {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-red-pure);
  margin-top: 4px;
  font-style: italic;
}

/* ===== MATCHS TAB ===== */
.tab-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
}

.tab-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 5vw, 2.2rem);
  font-weight: 600;
  color: var(--color-black);
}

.highlight {
  color: var(--color-red-pure);
}

.match-count {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(139, 45, 74, 0.1);
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-red-pure);
}

.matches-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: center;
  justify-items: center;
}

.match-card-wrapper {
  width: 100%;
  max-width: 320px;
  position: relative;
  transform-style: preserve-3d;
  perspective: 1000px;
}

/* ===== Phase 1: Dissolve locked card ===== */
.match-card-wrapper.is-dissolving {
  animation: cardDissolve 0.6s ease-out forwards;
  pointer-events: none;
  will-change: transform, opacity;
}

@keyframes cardDissolve {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  30% {
    transform: scale(1.03);
    opacity: 0.9;
  }
  100% {
    transform: scale(0.95);
    opacity: 0;
  }
}

/* ===== Phase 2: Reveal unlocked card ===== */
.match-card-wrapper.is-revealing {
  animation: cardReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  will-change: transform, opacity;
}

@keyframes cardReveal {
  0% {
    transform: scale(0.6);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Glow ring that pulses behind the card during reveal */
.match-card-wrapper.is-revealing::before {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: 2.4rem;
  background: radial-gradient(ellipse at center, rgba(139, 45, 74, 0.25), transparent 70%);
  z-index: -1;
  opacity: 0;
  animation: glowPulse 0.8s ease-out forwards;
  will-change: opacity, transform;
}

@keyframes glowPulse {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  40% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}

/* Shimmer sweep across the card */
.match-card-wrapper.is-revealing::after {
  content: '';
  position: absolute;
  top: 0;
  width: 60%;
  height: 100%;
  border-radius: 2rem;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  z-index: 10;
  pointer-events: none;
  animation: shimmerSweep 0.6s ease-out 0.2s forwards;
  will-change: transform;
  transform: translateX(-200%);
  opacity: 1;
}

@keyframes shimmerSweep {
  0% {
    transform: translateX(-200%);
  }
  100% {
    transform: translateX(350%);
  }
}

@media (max-width: 900px) {
  .matches-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 580px) {
  .matches-list {
    grid-template-columns: 1fr;
  }
}

/* Empty state premium */
.empty-state-premium {
  position: relative;
  padding: 64px 24px;
  border-radius: 24px;
  overflow: hidden;
  text-align: center;
  background: #FBF9F7;
  border: 1px solid #E8E8E8;
}

.empty-bg-blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.empty-bg-blob-right {
  top: -10%;
  right: -5%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.05) 0%, transparent 70%);
  opacity: 0.6;
}

.empty-bg-blob-left {
  bottom: -5%;
  left: -5%;
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.03) 0%, transparent 70%);
  opacity: 0.4;
}

.empty-premium-content {
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin: 0 auto 64px;
}

.empty-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 18px;
  border-radius: 9999px;
  background: white;
  border: 1px solid #E8E8E8;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #8B2D4A;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  margin-bottom: 32px;
}

/* ===== Interactive Constellation ===== */
.constellation-wrapper {
  margin-bottom: 28px;
  margin-left: -60px;
  margin-right: -60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: crosshair;
  user-select: none;
  width: calc(100% + 120px);
}

.constellation-svg {
  width: 100%;
  height: 300px;
  overflow: visible;
}

/* Stars — no permanent animations, only mouse-driven transitions */
.c-star {
  fill: #8B2D4A;
  opacity: 0;
  transform-origin: center;
  transition: opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1), transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), filter 0.45s ease;
}

.c-star.c-star-anchor {
  opacity: 0.45;
}

.c-star.c-star-revealed,
.c-star.c-star-hola {
  filter: url(#cStarGlow);
}

/* Lines */
.c-line {
  stroke: #8B2D4A;
  stroke-width: 0.7;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.c-line.c-line-anchor {
  opacity: 0.1;
}

.c-line.c-line-visible {
  opacity: 0.45;
}

/* Hint text */
.constellation-hint {
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  color: #787878;
  margin-top: 10px;
  letter-spacing: 0.04em;
  text-transform: lowercase;
  font-style: italic;
  opacity: 0.6;
  transition: opacity 0.4s ease;
}

.constellation-wrapper:hover .constellation-hint {
  opacity: 0;
}


.empty-premium-title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 20px;
  line-height: 1.2;
}

.empty-premium-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  color: #4A4A4A;
  line-height: 1.6;
  max-width: 400px;
  margin: 0 auto;
}

.empty-preview-section {
  padding-top: 48px;
  border-top: 1px solid #E8E8E8;
}

.empty-preview-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #787878;
  margin-bottom: 24px;
}

.empty-preview-card {
  max-width: 820px;
  margin: 0 auto;
  transition: transform 0.3s ease;
}

.empty-preview-card:hover {
  transform: scale(1.01);
}

/* ===== PROFIL TAB ===== */
.profil-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (min-width: 768px) {
  .profil-grid {
    display: grid;
    grid-template-columns: 5fr 7fr;
    gap: 24px;
    align-items: start;
  }
}

.profil-card {
  background: white;
  border-radius: 24px;
  padding: 28px;
  border: 1px solid var(--color-gray-light);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.card-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-black);
  margin-bottom: 24px;
}

.results-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.results-header-row .card-title { margin-bottom: 0; }

.results-tag {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 9999px;
  background: rgba(34, 197, 94, 0.1);
  color: #16a34a;
}

.results-tag.pending {
  background: rgba(245, 158, 11, 0.1);
  color: #B45309;
}

/* Info items */
.info-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.info-icon-wrapper {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: var(--color-gray-lighter);
}

.info-icon {
  width: 18px;
  height: 18px;
  color: var(--color-red-pure);
}

.info-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-gray-medium);
  margin-bottom: 2px;
}

.info-value {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-black);
}

.info-row-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.info-footer {
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid var(--color-gray-lighter);
  text-align: center;
}

.info-footer p {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: var(--color-gray-medium);
}

/* Domain bars */
.domain-bars {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.domain-bar-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bar-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bar-emoji { font-size: 1.1rem; }

.bar-name {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-black);
}

.bar-percentage {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-red-pure);
}

.bar-bg {
  height: 6px;
  background: var(--color-gray-lighter);
  border-radius: 9999px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--color-red-pure);
  border-radius: 9999px;
  transition: width 1s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Actions */
.profil-actions {
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Empty test */
.empty-test {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 32px 0;
}

.empty-icon-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gray-lighter);
  margin-bottom: 20px;
}

.empty-icon {
  width: 32px;
  height: 32px;
  color: var(--color-red-pure);
}

.empty-test-title {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-black);
  margin-bottom: 8px;
}

.empty-test-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: var(--color-gray-main);
  margin-bottom: 24px;
  max-width: 300px;
}

/* Buttons */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 28px;
  background: var(--color-red-pure);
  color: white;
  border: none;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(139, 45, 74, 0.3);
}

.btn-primary:hover {
  background: var(--color-red-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(139, 45, 74, 0.4);
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  background: transparent;
  color: var(--color-gray-dark);
  border: 1.5px solid var(--color-gray-light);
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-outline:hover {
  border-color: var(--color-red-pure);
  color: var(--color-red-pure);
}

/* ===== IDENTITY CARD ===== */
.identity-card {
  background: #FEFEFE;
  border-radius: 24px;
  padding: 48px 32px 32px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  border: 1px solid #E8E8E8;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Decorative banner */
.profile-card-banner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  overflow: hidden;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  z-index: 0;
  pointer-events: none;
}


/* Banner color picker */
.banner-color-picker {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 5;
  pointer-events: auto;
}

.banner-edit-trigger {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.banner-edit-trigger:hover {
  background: rgba(0, 0, 0, 0.5);
}

.banner-color-options {
  display: flex;
  gap: 6px;
  padding: 6px 10px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 9999px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.banner-color-dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

.banner-color-dot:hover {
  transform: scale(1.15);
}

.banner-color-dot.active {
  border-color: #FEFEFE;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2);
  transform: scale(1.1);
}

.identity-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.08);
}

.identity-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
}

.profile-photo-wrapper {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  padding: 3px;
  background: #F5F5F5;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 2px solid #E8E8E8;
}

.profile-photo-wrapper.premium-ring {
  border-color: #8B2D4A;
  box-shadow: 0 0 15px rgba(139, 45, 74, 0.15);
}

.profile-photo-wrapper.editable {
  cursor: pointer;
}

.photo-edit-overlay {
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.profile-photo-wrapper.editable:hover .photo-edit-overlay {
  opacity: 1;
}

.photo-upload-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #FEFEFE;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.profile-photo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.initials-avatar {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 600;
  color: #8B2D4A;
  background: rgba(139, 45, 74, 0.05);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.identity-name {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0 0 12px;
  line-height: 1.2;
}

.plan-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.plan-badge.free {
  background: #F5F5F5;
  color: #4A4A4A;
  border: 1px solid #E8E8E8;
}

.plan-badge.paid {
  background: rgba(139, 45, 74, 0.08);
  color: #8B2D4A;
  border: 1px solid rgba(139, 45, 74, 0.1);
}

.crown-icon {
  width: 14px;
  height: 14px;
}

.identity-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, #E8E8E8, transparent);
  margin: 0 -32px 32px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  text-align: left;
}

.info-card-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #FBF9F7;
  border-radius: 16px;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.info-card-item:hover {
  background: #FEFEFE;
  border-color: #E8E8E8;
}

.info-card-item.full-width {
  grid-column: span 2;
}

.item-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #FEFEFE;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #E8E8E8;
  color: #8B2D4A;
  flex-shrink: 0;
}

.item-icon {
  width: 18px;
  height: 18px;
}

.item-content {
  display: flex;
  flex-direction: column;
}

.item-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #787878;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.item-value {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #1A1A1A;
  font-weight: 600;
}

/* Edit profile button */
.edit-profile-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #F5F5F5;
  border: 1px solid #E8E8E8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #787878;
}

.edit-profile-btn:hover {
  background: rgba(139, 45, 74, 0.05);
  border-color: rgba(139, 45, 74, 0.15);
  color: #8B2D4A;
}

.edit-icon {
  width: 16px;
  height: 16px;
}

/* Edit form */
.edit-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.edit-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.edit-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.edit-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #787878;
}

.edit-optional {
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0;
}

.edit-input {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #E8E8E8;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #1A1A1A;
  background: #FBF9F7;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.edit-input:focus {
  border-color: #8B2D4A;
  box-shadow: 0 0 0 3px rgba(139, 45, 74, 0.06);
  background: white;
}

.edit-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23787878' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;
}

.edit-actions {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.edit-save-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  background: #8B2D4A;
  color: white;
  border: none;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 16px rgba(139, 45, 74, 0.25);
}

.edit-save-btn:hover:not(:disabled) {
  background: #6B2640;
}

.edit-save-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.edit-cancel-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 20px;
  background: transparent;
  color: #787878;
  border: 1.5px solid #E8E8E8;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.edit-cancel-btn:hover {
  border-color: #8B2D4A;
  color: #8B2D4A;
}

.edit-action-icon {
  width: 14px;
  height: 14px;
}

/* Visibility toggles in edit mode */
.edit-visibility-toggles {
  display: flex;
  gap: 10px;
}

.edit-contact-choice {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: #FBF9F7;
  border: 1.5px solid #E8E8E8;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #4A4A4A;
}

.edit-contact-choice:hover {
  border-color: #8B2D4A;
}

.edit-contact-choice.active {
  border-color: #8B2D4A;
  background: rgba(139, 45, 74, 0.04);
  color: #1A1A1A;
}

.choice-radio {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #E8E8E8;
  flex-shrink: 0;
  position: relative;
  transition: all 0.2s ease;
}

.choice-radio.selected {
  border-color: #8B2D4A;
}

.choice-radio.selected::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #8B2D4A;
}

.toggle-icon {
  flex-shrink: 0;
}

.toggle-icon-img {
  width: 20px;
  height: 20px;
  object-fit: contain;
  flex-shrink: 0;
  border-radius: 4px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Upgrade section */
.upgrade-section {
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid #F5F5F5;
}

.upgrade-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px 24px;
  background: linear-gradient(135deg, #A13D5B 0%, #8B2D4A 50%, #6E2240 100%);
  color: white;
  border: none;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 4px 20px rgba(139, 45, 74, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  letter-spacing: 0.02em;
}

.upgrade-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #B34868 0%, #9B3556 50%, #7A284A 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(139, 45, 74, 0.4), 0 2px 8px rgba(139, 45, 74, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.upgrade-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.upgrade-btn-icon {
  width: 16px;
  height: 16px;
}

.upgrade-btn-arrow {
  width: 16px;
  height: 16px;
}

.identity-footer {
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid #F5F5F5;
  text-align: center;
}

.identity-footer p {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #787878;
  margin: 0;
}

/* ===== DEV CALENDAR PANEL ===== */
.dev-panel {
  position: fixed;
  bottom: 90px;
  right: 16px;
  z-index: 9999;
  background: #1a1a2e;
  color: #e0e0e0;
  border-radius: 16px;
  padding: 16px;
  width: 240px;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dev-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.dev-panel-title {
  font-weight: 700;
  font-size: 0.8rem;
}

.dev-phase-badge {
  padding: 2px 8px;
  border-radius: 9999px;
  background: rgba(139, 45, 74, 0.3);
  color: #ff6b8a;
  font-weight: 600;
  font-size: 0.65rem;
  text-transform: uppercase;
}

.dev-panel-info {
  margin-bottom: 10px;
}

.dev-override-active {
  color: #fbbf24;
  font-weight: 600;
}

.dev-override-off {
  color: #6b7280;
}

.dev-presets {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
}

.dev-preset-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #e0e0e0;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 0.7rem;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
  font-family: 'Inter', sans-serif;
}

.dev-preset-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.dev-preset-btn.active {
  background: rgba(139, 45, 74, 0.2);
  border-color: #8B2D4A;
  color: #ff6b8a;
}

.dev-reset-btn {
  width: 100%;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fca5a5;
  padding: 6px;
  border-radius: 8px;
  font-size: 0.7rem;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  transition: all 0.15s ease;
}

.dev-reset-btn:hover {
  background: rgba(239, 68, 68, 0.25);
}

.dev-panel-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 10px 0;
}

.dev-reveal-btn {
  width: 100%;
  background: rgba(139, 45, 74, 0.2) !important;
  border-color: rgba(139, 45, 74, 0.4) !important;
  color: #ff6b8a !important;
  font-weight: 600;
  text-align: center;
}

.dev-reveal-btn:hover:not(.disabled) {
  background: rgba(139, 45, 74, 0.35) !important;
  border-color: #8B2D4A !important;
}

.dev-reveal-btn.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

@media (min-width: 768px) {
  .dev-panel {
    bottom: 16px;
  }
}

/* ===== NO MATCH EMPTY STATE (Free tier, revealed) ===== */
.no-match-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  width: 100%;
}

.no-match-card {
  background: #FEFEFE;
  border-radius: 24px;
  padding: 48px 32px;
  max-width: 520px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 40px rgba(26, 26, 26, 0.05);
  border: 1px solid #E8E8E8;
  position: relative;
}

.no-match-illustration {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.broken-heart-emoji {
  font-size: 64px;
  z-index: 2;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.1));
  animation: heartFloat 4s ease-in-out infinite;
}

.heart-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: rgba(139, 45, 74, 0.08);
  filter: blur(20px);
  border-radius: 50%;
  z-index: 1;
}

@keyframes heartFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.no-match-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  color: #1A1A1A;
  margin-bottom: 16px;
  font-weight: 600;
}

.no-match-description {
  font-family: 'Inter', sans-serif;
  color: #5C5C5C;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 32px;
}

.no-match-description strong {
  color: #1A1A1A;
  font-weight: 600;
}

.no-match-cta-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.no-match-cta {
  background: var(--color-red-pure, #8B2D4A);
  color: #FEFEFE;
  border: none;
  border-radius: 9999px;
  padding: 16px 36px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(139, 45, 74, 0.3);
}

.no-match-cta:hover:not(:disabled) {
  background: var(--color-red-dark, #6B2640);
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(139, 45, 74, 0.4);
}

.no-match-cta:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.no-match-promo {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: var(--color-red-pure, #8B2D4A);
  font-weight: 500;
  margin: 0;
}

.promo-old-price {
  text-decoration: line-through;
  color: #787878;
  font-weight: 400;
  margin-left: 4px;
}

.no-match-secondary {
  font-family: 'Inter', sans-serif;
  background: transparent;
  border: none;
  color: #787878;
  font-size: 0.85rem;
  text-decoration: underline;
  text-underline-offset: 4px;
  margin: 0;
}

/* UserCard preview in matchs empty state */
.empty-content-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-card-preview-section {
  width: 100%;
  margin-top: 32px;
}

.preview-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(139, 45, 74, 0.15), transparent);
  margin-bottom: 20px;
}

.preview-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: var(--color-gray-main);
  font-weight: 500;
  text-align: center;
  margin-bottom: 8px;
}

/* Responsive */
@media (max-width: 600px) {
  .dashboard-main {
    padding: 24px 16px 0;
  }

  .logout-text {
    display: none;
  }

  .timeline-card,
  .profil-card {
    padding: 24px 20px;
  }

  .identity-card {
    padding: 32px 20px 24px;
  }

  .identity-divider {
    margin: 0 -20px 24px;
  }

  .identity-name {
    font-size: 1.5rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .info-card-item.full-width {
    grid-column: span 1;
  }

  .edit-row {
    grid-template-columns: 1fr;
  }

  .upgrade-btn {
    padding: 12px 20px;
    font-size: 0.875rem;
  }
}

@media (max-width: 400px) {
  .dashboard-main {
    padding: 16px 12px 0;
  }

  .identity-card {
    padding: 24px 16px 20px;
    border-radius: 16px;
  }

  .identity-name {
    font-size: 1.3rem;
  }

  .timeline-card,
  .profil-card {
    padding: 20px 16px;
    border-radius: 16px;
  }
}

/* ===== PLAN SELECTION MODAL ===== */
.plan-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(26, 26, 26, 0.4);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.plan-modal-container {
  background: #FBF9F7;
  width: 100%;
  max-width: 860px;
  border-radius: 24px;
  padding: 48px 40px 40px;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  max-height: 90vh;
  overflow-y: auto;
}

.plan-modal-close {
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  color: #787878;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s ease;
}

.plan-modal-close:hover {
  color: #1A1A1A;
}

.plan-modal-header {
  text-align: center;
  margin-bottom: 40px;
}

.plan-modal-title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 12px;
}

.plan-modal-subtitle {
  font-family: 'Inter', sans-serif;
  color: #4A4A4A;
  font-size: 1.1rem;
}

.plans-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.plan-card {
  background: #FEFEFE;
  border: 1px solid #E8E8E8;
  border-radius: 20px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.plan-card.premium-plan {
  border: 2px solid #C5960A;
  box-shadow: 0 10px 30px rgba(197, 150, 10, 0.1);
}

.recommendation-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #C5960A 0%, #A67C00 100%);
  color: white;
  padding: 4px 16px;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 10px rgba(166, 124, 0, 0.3);
  white-space: nowrap;
}

.plan-card-content {
  flex: 1;
}

.plan-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0 0 16px;
}

.plan-price-container {
  margin-bottom: 32px;
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.plan-price {
  font-family: 'Inter', sans-serif;
  font-size: 2.25rem;
  font-weight: 700;
  color: #1A1A1A;
}

.plan-price.premium-price {
  color: #A67C00;
}

.plan-period {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #787878;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #4A4A4A;
  line-height: 1.4;
}

.check-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 2px;
}

.bold-feature {
  font-weight: 600;
  color: #1A1A1A;
}

.plan-btn {
  width: 100%;
  padding: 16px;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.outline-btn {
  background: transparent;
  border: 1px solid #E8E8E8;
  color: #4A4A4A;
}

.outline-btn:hover:not(:disabled) {
  background: #F5F5F5;
  border-color: #787878;
  color: #1A1A1A;
  transform: translateY(-2px);
}

.gold-btn {
  background: linear-gradient(135deg, #C5960A 0%, #A67C00 100%);
  border: none;
  color: white;
  box-shadow: 0 4px 15px rgba(166, 124, 0, 0.3);
}

.gold-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(166, 124, 0, 0.4);
}

.plan-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.plan-modal-footer-hint {
  text-align: center;
  font-family: 'Inter', sans-serif;
  color: #787878;
  font-size: 0.875rem;
  margin-top: 8px;
}

/* Modal animation */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .plan-modal-container {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-fade-enter-from .plan-modal-container {
  transform: scale(0.9) translateY(20px);
}

@media (max-width: 768px) {
  .plans-grid {
    grid-template-columns: 1fr;
  }
  .plan-modal-container {
    padding: 40px 24px 32px;
  }
  .plan-modal-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 400px) {
  .plan-modal-overlay {
    padding: 12px;
  }
  .plan-modal-container {
    padding: 32px 16px 24px;
    border-radius: 16px;
  }
  .plan-card {
    padding: 24px 16px;
  }
  .plan-name {
    font-size: 1.25rem;
  }
  .plan-price {
    font-size: 1.8rem;
  }
  .feature-item {
    font-size: 0.875rem;
  }
}
</style>

<!-- Global styles for heart particles (appended to body) -->
<style>
@keyframes heartFloat {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0) rotate(0deg);
  }
  10% {
    opacity: 1;
    transform: translate(calc(var(--tx) * 0.05), calc(var(--ty) * 0.05)) scale(1.2) rotate(10deg);
  }
  50% {
    opacity: 0.8;
    transform: translate(calc(var(--tx) * 0.5), calc(var(--ty) * 0.5)) scale(1) rotate(25deg);
  }
  100% {
    opacity: 0;
    transform: translate(var(--tx), var(--ty)) scale(0.3) rotate(60deg);
  }
}

.heart-particle {
  will-change: transform, opacity;
  filter: drop-shadow(0 2px 6px rgba(139, 45, 74, 0.4));
  line-height: 1;
}
</style>
