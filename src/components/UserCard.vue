<script setup lang="ts">
import { ref, computed } from 'vue';
import { MapPin, Heart, Send } from 'lucide-vue-next';
import { HOBBIES } from '@/data/hobbies';
import smsIcon from '@/assets/sms-icon.png';
import instaIcon from '@/assets/Instagram_icon.png';

interface User {
  firstName: string;
  age: number;
  city: string;
  photoUrl?: string;
  phone: string;
  instagram: string;
  showPhone?: boolean;
  showInstagram?: boolean;
  job?: string;
  bannerColor?: string;
}

const props = defineProps<{
  user: User;
  hobbies: string[];
}>();

const contactRevealed = ref(false)

function revealContact() {
  contactRevealed.value = true
}

// Contact logic:
// If user prefers SMS → only show phone
// If user prefers Insta → show both phone + insta
const showSmsOnReveal = computed(() => props.user.showPhone !== false)
const showInstaOnReveal = computed(() => props.user.showInstagram !== false && !!props.user.instagram)

// Resolve hobby IDs to full objects { id, label, emoji }
const resolvedHobbies = computed(() => {
  return HOBBIES.filter(hobby => props.hobbies.includes(hobby.id));
});

const getInitials = (name: string) => {
  return name.charAt(0).toUpperCase();
};

// Banner color
const bannerColor = computed(() => props.user.bannerColor || '#99001B')
</script>

<template>
  <div class="user-card-wrapper">
    <!-- Main Card - Premium Landscape Version -->
    <article class="user-card">
      <!-- Left Photo Section -->
      <div class="photo-container">
        <template v-if="user.photoUrl">
          <img :src="user.photoUrl" :alt="user.firstName" class="user-photo" />
        </template>
        <div v-else class="initials-placeholder">
          <span>{{ getInitials(user.firstName) }}</span>
        </div>

        <!-- Science Badge with Glassmorphism -->
        <div class="science-badge">
          <Heart :size="14" fill="#99001B" color="#99001B" />
          <span>Profil vérifié</span>
        </div>
      </div>

      <!-- Right Content Section -->
      <div class="card-content">
        <!-- Decorative banner (same as profile card) -->
        <div class="card-banner">
          <div class="card-banner-blob card-banner-blob-right" :style="{ background: `radial-gradient(circle, ${bannerColor}26 0%, transparent 70%)` }"></div>
          <div class="card-banner-blob card-banner-blob-left" :style="{ background: `radial-gradient(circle, ${bannerColor}1A 0%, transparent 70%)` }"></div>
          <svg class="card-banner-wave" viewBox="0 0 500 150" preserveAspectRatio="none">
            <path d="M0,0 C150,120 350,0 500,100 L500,150 L0,150 Z" :fill="bannerColor" fill-opacity="0.08" />
          </svg>
        </div>
        <!-- Identity Header -->
        <header class="identity-header">
          <div class="header-main">
            <h2 class="user-name">
              {{ user.firstName }}, <span class="user-age">{{ user.age }}</span>
            </h2>
            <div class="user-location">
              <MapPin :size="16" color="#99001B" stroke-width="2.5" />
              <span>{{ user.city }}</span>
            </div>
          </div>
          <p v-if="user.job" class="user-job">{{ user.job }}</p>
        </header>

        <div class="divider"></div>

        <!-- Passions Grid -->
        <section class="section">
          <h3 class="section-title">Centres d'intérêt</h3>
          <div class="hobbies-grid">
            <div 
              v-for="hobby in resolvedHobbies" 
              :key="hobby.id" 
              class="hobby-tag"
            >
              <span class="hobby-emoji">{{ hobby.emoji }}</span>
              <span class="hobby-label">{{ hobby.label }}</span>
            </div>
            <div v-if="resolvedHobbies.length === 0" class="empty-state">
              Aucune passion renseignée
            </div>
          </div>
        </section>

        <!-- Contact Section — always visible -->
        <section class="section contact-section">
          <!-- Before reveal: single CTA button -->
          <div v-if="!contactRevealed" class="contact-actions">
            <button class="contact-btn message-btn" @click="revealContact">
              <Send :size="18" />
              <span>Envoyer un message</span>
            </button>
          </div>
          <!-- After reveal: show contact methods based on preference -->
          <div v-else class="contact-actions contact-revealed">
            <a v-if="showSmsOnReveal" :href="`sms:${user.phone}`" class="contact-btn sms-btn">
              <img :src="smsIcon" alt="SMS" class="contact-icon" />
              <span>SMS</span>
            </a>
            <a
              v-if="showInstaOnReveal"
              :href="`https://instagram.com/${user.instagram.replace('@', '')}`"
              target="_blank"
              class="contact-btn insta-btn"
            >
              <img :src="instaIcon" alt="Instagram" class="contact-icon" />
              <span>{{ user.instagram }}</span>
            </a>
          </div>
        </section>
      </div>
    </article>
  </div>
</template>

<style scoped>
.user-card-wrapper {
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  background-color: transparent;
}

.user-card {
  width: 100%;
  max-width: 820px; /* Widened for web-profile feel */
  display: flex;
  flex-direction: row; /* Horizontal layout */
  background: #FEFEFE;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid #E8E8E8;
  position: relative;
}

.user-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(153, 0, 27, 0.1); /* Subtle red accent shadow from DS */
}

/* Left Photo Area */
.photo-container {
  position: relative;
  width: 320px; /* Fixed landscape proportion */
  flex-shrink: 0;
  background-color: #F5F5F5;
}

.card-banner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

.card-banner-blob {
  position: absolute;
  border-radius: 9999px;
}

.card-banner-blob-right {
  top: -50px;
  right: -30px;
  width: 220px;
  height: 220px;
}

.card-banner-blob-left {
  top: -20px;
  left: -40px;
  width: 160px;
  height: 160px;
}

.card-banner-wave {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  transform: rotate(180deg);
  opacity: 0.5;
}

.user-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: relative;
  z-index: 1;
}

.contact-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.initials-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FBF9F7 0%, #E8E8E8 100%);
  color: #99001B;
  font-family: 'Playfair Display', serif;
  font-size: 5rem;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

.science-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #1A1A1A;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* Right Content Area */
.card-content {
  flex-grow: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.identity-header {
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}

.header-main {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 8px;
}

.user-name {
  font-family: 'Playfair Display', serif;
  font-size: 2.25rem;
  font-weight: 600;
  color: #1A1A1A;
}

.user-age {
  font-weight: 400;
  color: #4A4A4A;
}

.user-location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #5C5C5C;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.user-job {
  color: #787878;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.15rem;
}

.divider {
  height: 1px;
  background: #F0F0F0;
  margin: 24px 0;
  position: relative;
  z-index: 1;
}

/* Sections Styling */
.section {
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
}

.section-title {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #787878;
  font-weight: 700;
  margin-bottom: 16px;
}

.hobbies-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hobby-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  background: #FBF9F7;
  border: 1px solid #E8E8E8;
  border-radius: 9999px;
  transition: all 0.3s ease;
}

.hobby-tag:hover {
  border-color: #99001B;
  background: #FEFEFE;
  transform: translateY(-2px);
}

.hobby-emoji {
  font-size: 1.1rem;
}

.hobby-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #4A4A4A;
}

.empty-state {
  font-size: 0.9rem;
  color: #787878;
  font-style: italic;
}

/* Contact Row */
.contact-section {
  margin-top: auto;
  margin-bottom: 0;
  padding-top: 12px;
}

.contact-actions {
  display: flex;
  gap: 12px;
  width: 100%;
}

.contact-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 15px 12px;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  text-decoration: none;
  white-space: nowrap;
}

.message-btn {
  background: #99001B;
  color: #FEFEFE;
  cursor: pointer;
  border: none;
}

.message-btn:hover {
  background: #7A0016;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(153, 0, 27, 0.15);
}

.contact-revealed {
  animation: revealFade 0.35s ease;
}

@keyframes revealFade {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.sms-btn {
  background: #99001B;
  color: #FEFEFE;
}

.sms-btn:hover {
  background: #7A0016;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(153, 0, 27, 0.15);
}

.insta-btn {
  background: #FEFEFE;
  color: #4A4A4A;
  border: 1px solid #E8E8E8;
}

.insta-btn:hover {
  background: #F5F5F5;
  color: #1A1A1A;
  border-color: #787878;
  transform: translateY(-2px);
}

@media (max-width: 480px) {
  .contact-actions {
    flex-direction: column;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .user-card {
    flex-direction: column;
    max-width: 420px;
  }
  
  .photo-container {
    width: 100%;
    aspect-ratio: 1 / 1;
  }

  .card-content {
    padding: 30px;
  }

  .header-main {
    flex-direction: column;
    gap: 8px;
  }

  .user-name {
    font-size: 1.75rem;
  }

  .contact-actions {
    flex-direction: column;
  }
}
</style>
