<script setup lang="ts">
import { ref, computed } from 'vue'
import { Heart, Unlock, MapPin, Send } from 'lucide-vue-next'
import logoImage from '@/assets/nouveau logo compaatible.png'
import smsIcon from '@/assets/sms-icon.png'
import instaIcon from '@/assets/Instagram_icon.png'
import { HOBBIES } from '@/data/hobbies'

const props = defineProps<{
  matchName: string
  compatibilityScore: number
  unlocked: boolean
  instagram?: string
  phone?: string
  showPhone?: boolean
  showInstagram?: boolean
  city?: string
  age?: number
  bannerColor?: string
  avatarUrl?: string
  personalityTypeName?: string
  personalityTypeId?: string
  hobbies?: string[]
  photoUrl?: string
  customTagline?: string
}>()

const emit = defineEmits(['unlock'])

const contactRevealed = ref(false)
function revealContact() {
  contactRevealed.value = true
}

const showSmsOnReveal = computed(() => props.showPhone !== false && !!props.phone)
const showInstaOnReveal = computed(() => props.showInstagram !== false && !!props.instagram)

const scoreLabel = computed(() => {
  if (props.compatibilityScore >= 80) return 'Très compatible'
  if (props.compatibilityScore >= 60) return 'Compatible'
  return 'Compatibilité modérée'
})

const resolvedHobbies = computed(() => {
  if (!props.hobbies?.length) return []
  return HOBBIES.filter(h => props.hobbies!.includes(h.id))
})

const hexToRgba = (hex: string, opacity: number) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

const bannerBg = computed(() => hexToRgba(props.bannerColor || '#8B2D4A', 0.12))
const categoryTint = computed(() => hexToRgba(props.bannerColor || '#8B2D4A', 0.08))

const getInitials = (name: string) => name.charAt(0).toUpperCase()
</script>

<template>
  <div class="match-card" :class="{ 'is-locked': !unlocked, 'is-unlocked': unlocked }">
    <!-- UNLOCKED: Photo header -->
    <div v-if="unlocked" class="photo-header">
      <template v-if="photoUrl">
        <img :src="photoUrl" :alt="matchName" class="photo-img" />
      </template>
      <div v-else class="photo-placeholder" :style="{ background: `linear-gradient(135deg, #F0D5C8, ${bannerColor || '#C4637A'})` }">
        <span class="photo-initial">{{ getInitials(matchName) }}</span>
      </div>
      <!-- Score pill overlay -->
      <div class="photo-score-pill">
        <Heart :size="10" fill="currentColor" />
        {{ compatibilityScore }}%
      </div>
    </div>

    <!-- LOCKED: Banner + Avatar -->
    <template v-else>
      <div class="card-banner" :style="{ background: `linear-gradient(to bottom, ${bannerBg}, transparent)` }">
        <div class="decorative-dots"></div>
      </div>
      <div class="avatar-container">
        <div class="avatar-ring" :style="{ borderColor: bannerColor || '#8B2D4A' }">
          <div class="avatar-inner" :style="{ backgroundColor: categoryTint }">
            <img v-if="avatarUrl" :src="avatarUrl" :alt="personalityTypeName || ''" class="avatar-img" />
            <img v-else :src="logoImage" alt="" class="avatar-img is-placeholder" />
          </div>
        </div>
        <div class="score-badge">
          <span class="score-value">{{ compatibilityScore }}%</span>
        </div>
      </div>
    </template>

    <!-- Card Content -->
    <div class="card-content">
      <!-- Identity -->
      <div class="identity-section">
        <h3 class="match-name">
          {{ unlocked ? matchName : 'Match mystère' }}
          <span v-if="unlocked && age" class="match-age">, {{ age }}</span>
        </h3>

        <div v-if="unlocked && city" class="meta-info">
          <MapPin :size="11" stroke-width="2.5" />
          <span>{{ city }}</span>
        </div>
        <div v-else-if="!unlocked" class="meta-info hidden-meta">
          <span>Informations verrouillées</span>
        </div>
      </div>

      <!-- Personality tag -->
      <router-link
        v-if="personalityTypeName && unlocked && personalityTypeId"
        :to="`/personnalite/${personalityTypeId}`"
        class="personality-tag personality-tag-link"
        :style="{ backgroundColor: categoryTint, color: bannerColor || '#8B2D4A' }"
      >
        <img v-if="avatarUrl" :src="avatarUrl" alt="" class="tag-avatar" />
        <Heart v-else :size="10" fill="currentColor" class="tag-icon" />
        {{ personalityTypeName }}
      </router-link>
      <div v-else-if="personalityTypeName" class="personality-tag" :style="{ backgroundColor: categoryTint, color: bannerColor || '#8B2D4A' }">
        <Heart :size="10" fill="currentColor" class="tag-icon" />
        {{ personalityTypeName }}
      </div>

      <!-- Tagline (unlocked only) -->
      <p v-if="unlocked && customTagline" class="match-tagline">
        « {{ customTagline }} »
      </p>

      <!-- Compatibility Progress -->
      <div class="compatibility-section">
        <div class="compatibility-header">
          <span class="compatibility-label">{{ scoreLabel }}</span>
        </div>
        <div class="progress-track">
          <div class="progress-bar" :style="{ width: `${compatibilityScore}%` }"></div>
        </div>
      </div>

      <!-- Hobbies -->
      <div v-if="resolvedHobbies.length" class="hobbies-section">
        <div class="hobbies-list">
          <span v-for="hobby in resolvedHobbies" :key="hobby.id" class="hobby-pill">
            <span>{{ hobby.emoji }}</span>
            <span>{{ hobby.label }}</span>
          </span>
        </div>
      </div>

      <!-- Action Section -->
      <div class="action-section">
        <!-- Locked: unlock button -->
        <button v-if="!unlocked" @click="emit('unlock')" class="unlock-button">
          <Unlock :size="14" />
          Débloquer ce match
        </button>

        <!-- Unlocked: contact -->
        <template v-else>
          <button v-if="!contactRevealed" @click="revealContact" class="contact-button">
            <Send :size="14" />
            Envoyer un message
          </button>
          <div v-else class="contact-revealed">
            <a v-if="showSmsOnReveal" :href="`sms:${phone}`" class="contact-link contact-sms">
              <img :src="smsIcon" alt="SMS" class="contact-icon" />
              SMS
            </a>
            <a v-if="showInstaOnReveal" :href="`https://instagram.com/${instagram?.replace('@', '')}`" target="_blank" class="contact-link contact-insta">
              <img :src="instaIcon" alt="Instagram" class="contact-icon" />
              Instagram
            </a>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.match-card {
  position: relative;
  width: 100%;
  background: #FEFEFE;
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid rgba(232, 232, 232, 0.6);
  display: flex;
  flex-direction: column;
}

.match-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(139, 45, 74, 0.08);
}

/* ===== UNLOCKED: Photo Header ===== */
.photo-header {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
}

.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-initial {
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  font-weight: 700;
  color: white;
  opacity: 0.4;
}

.photo-score-pill {
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 12px;
  border-radius: 9999px;
  background: rgba(139, 45, 74, 0.85);
  backdrop-filter: blur(8px);
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
}

/* ===== LOCKED: Banner + Avatar ===== */
.card-banner {
  height: 80px;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.decorative-dots {
  position: absolute;
  inset: 0;
  opacity: 0.08;
  background-image: radial-gradient(#8B2D4A 0.5px, transparent 0.5px);
  background-size: 10px 10px;
}

.avatar-container {
  position: relative;
  margin-top: -40px;
  display: flex;
  justify-content: center;
  z-index: 10;
}

.avatar-ring {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  padding: 3px;
  background: white;
  border: 2.5px solid #E8E8E8;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.avatar-img.is-placeholder {
  width: 55%;
  height: auto;
  opacity: 0.7;
}

.score-badge {
  position: absolute;
  bottom: -2px;
  right: calc(50% - 52px);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: #8B2D4A;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.68rem;
  border: 3px solid white;
  box-shadow: 0 4px 10px rgba(139, 45, 74, 0.2);
}

/* ===== Content ===== */
.card-content {
  padding: 1rem 1.25rem 1.5rem;
  text-align: center;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.identity-section {
  margin-bottom: 0.75rem;
}

.match-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0 0 0.25rem;
  line-height: 1.2;
}

.match-age {
  font-weight: 400;
}

.is-locked .match-name {
  font-style: italic;
  color: #787878;
  font-weight: 600;
  font-size: 1.2rem;
}

.meta-info {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: #5C5C5C;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

.hidden-meta {
  color: #A0A0A0;
  font-style: italic;
  font-size: 0.68rem;
  text-transform: none;
  letter-spacing: 0;
}

/* Personality tag */
.personality-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.75rem;
  border-radius: 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0 auto 0.75rem;
  max-width: fit-content;
}

.tag-icon {
  margin-top: -1px;
}

.tag-avatar {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.personality-tag-link {
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.personality-tag-link:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Tagline */
.match-tagline {
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.8rem;
  font-style: italic;
  color: #787878;
  line-height: 1.4;
  margin: 0 0 0.75rem;
}

/* Progress */
.compatibility-section {
  margin-bottom: 0.75rem;
}

.compatibility-header {
  display: flex;
  justify-content: center;
  margin-bottom: 0.4rem;
}

.compatibility-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.58rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #8B2D4A;
}

.progress-track {
  height: 4px;
  background: #F5F5F5;
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 10px;
  background: linear-gradient(90deg, #8B2D4A, #C4637A);
  transition: width 1s cubic-bezier(0.165, 0.84, 0.44, 1);
}

/* Hobbies */
.hobbies-section {
  margin-bottom: 0.75rem;
}

.hobbies-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.3rem;
}

.hobby-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.2rem 0.5rem;
  border-radius: 9999px;
  background: #FBF9F7;
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 500;
  color: #5C5C5C;
  border: 1px solid #F0F0F0;
}

/* Actions */
.action-section {
  margin-top: auto;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.unlock-button {
  width: 100%;
  padding: 0.7rem;
  border-radius: 2rem;
  background: transparent;
  border: 1.5px solid #8B2D4A;
  color: #8B2D4A;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.unlock-button:hover {
  background: #8B2D4A;
  color: white;
  box-shadow: 0 8px 20px rgba(139, 45, 74, 0.25);
  transform: translateY(-1px);
}

.contact-button {
  width: 100%;
  padding: 0.7rem;
  border-radius: 2rem;
  background: #8B2D4A;
  border: none;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.contact-button:hover {
  background: #A03558;
  box-shadow: 0 8px 20px rgba(139, 45, 74, 0.25);
  transform: translateY(-1px);
}

.contact-revealed {
  display: flex;
  width: 100%;
  gap: 0.5rem;
  animation: revealFade 0.3s ease;
}

.contact-link {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem;
  border-radius: 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.contact-sms {
  background: #1A1A1A;
  color: white;
}

.contact-sms:hover {
  background: #000;
}

.contact-insta {
  background: white;
  color: #1A1A1A;
  border: 1px solid #E8E8E8;
}

.contact-insta:hover {
  border-color: #1A1A1A;
}

.contact-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
}

@keyframes revealFade {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 480px) {
  .card-banner {
    height: 60px;
  }
  .avatar-container {
    margin-top: -32px;
  }
  .avatar-ring {
    width: 64px;
    height: 64px;
  }
  .score-badge {
    width: 32px;
    height: 32px;
    font-size: 0.6rem;
    right: calc(50% - 44px);
  }
  .card-content {
    padding: 0.75rem 1rem 1.25rem;
  }
  .match-name {
    font-size: 1.1rem;
  }
}
</style>
