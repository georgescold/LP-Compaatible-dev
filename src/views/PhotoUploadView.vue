<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'
import logoImage from '../assets/nouveau logo compaatible.png'

const router = useRouter()
const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(null)
const isUploading = ref(false)
const uploadError = ref<string | null>(null)
const selectedFile = ref<File | null>(null)
const userId = ref<string | null>(null)

onMounted(() => {
  userId.value = sessionStorage.getItem('compaatible_user_id')
  if (!userId.value) {
    router.push('/inscription')
  }
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    processFile(target.files[0])
  }
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    processFile(event.dataTransfer.files[0])
  }
}

const processFile = (file: File) => {
  uploadError.value = null

  const validTypes = ['image/jpeg', 'image/png']
  if (!validTypes.includes(file.type)) {
    uploadError.value = 'Le format doit être JPG ou PNG.'
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    uploadError.value = 'La photo ne doit pas dépasser 5 Mo.'
    return
  }

  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

const handleContinue = async () => {
  if (!selectedFile.value || !userId.value) return

  isUploading.value = true
  uploadError.value = null

  try {
    const fileExt = selectedFile.value.name.split('.').pop()
    const fileName = `${userId.value}-${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: storageError } = await supabase.storage
      .from('profile-photos')
      .upload(filePath, selectedFile.value)

    if (storageError) throw storageError

    // Get public URL and save to user profile
    const { data: urlData } = supabase.storage
      .from('profile-photos')
      .getPublicUrl(filePath)

    if (urlData?.publicUrl) {
      const { error: updateError } = await supabase
        .from('users')
        .update({ profile_photo_url: urlData.publicUrl })
        .eq('id', userId.value)

      if (updateError) {
        console.error('Profile photo update failed:', updateError.message)
        // Try with auth_id as fallback
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { error: fallbackError } = await supabase
            .from('users')
            .update({ profile_photo_url: urlData.publicUrl })
            .eq('auth_id', user.id)

          if (fallbackError) {
            console.error('Fallback update also failed:', fallbackError.message)
          }
        }
      }
    }

    router.push('/test')
  } catch (err: any) {
    uploadError.value = "Une erreur est survenue lors de l'envoi. Réessaie."
    console.error('Upload error:', err.message)
  } finally {
    isUploading.value = false
  }
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <main class="photo-upload-page">
    <!-- Decorative Atmosphere -->
    <div class="blur-top"></div>
    <div class="blur-bottom"></div>

    <header class="top-nav">
      <button @click="goBack" class="back-link">
        <svg class="icon-back" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M19 12H5M12 19l-7-7 7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Retour
      </button>

      <router-link to="/" class="logo-wrapper">
        <img :src="logoImage" alt="Compaatible" class="app-logo" />
        <span class="logo-text">Compaatible</span>
      </router-link>
    </header>

    <div class="content-container">
      <!-- Badge -->
      <div class="status-badge">
        <svg class="badge-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        Photo de profil
      </div>

      <!-- Heading -->
      <h1 class="page-title">
        Ajoute ta <span class="accent-text">plus belle photo<span class="accent-underline"></span></span>
      </h1>

      <p class="page-subtitle">
        C'est la photo que les personnes qui matcheront avec toi verront. Choisis une photo où l'on voit bien ton visage et qui te met en valeur.
      </p>

      <!-- Upload Interaction Area -->
      <div
        class="upload-card"
        @dragover.prevent
        @drop="handleDrop"
        :class="{ 'has-preview': !!previewUrl }"
      >
        <input
          type="file"
          ref="fileInput"
          class="hidden-input"
          accept="image/png, image/jpeg"
          @change="handleFileChange"
        />

        <div v-if="!previewUrl" class="upload-placeholder" @click="triggerFileInput">
          <div class="upload-icon-circle">
            <svg class="icon-upload" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
            </svg>
          </div>
          <p class="upload-text">Glisse ta photo ici ou clique pour en sélectionner une</p>
          <span class="upload-hint">JPG, PNG · 5 Mo max</span>
        </div>

        <div v-else class="preview-wrapper">
          <div class="preview-frame">
            <img :src="previewUrl" alt="Preview" class="image-preview" />
            <button class="remove-btn" @click="previewUrl = null; selectedFile = null" aria-label="Supprimer">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p class="adjustment-hint">Utilise une photo cadrée sur ton visage</p>
        </div>
      </div>

      <div v-if="uploadError" class="error-message">
        {{ uploadError }}
      </div>

      <!-- CTA -->
      <div class="action-container">
        <div class="glass-btn-wrapper">
          <button
            class="primary-cta"
            :disabled="!previewUrl || isUploading"
            @click="handleContinue"
          >
            <span v-if="!isUploading">Passer au test de personnalité</span>
            <span v-else class="loader"></span>
            <svg v-if="!isUploading" class="icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Trust Indicators -->
      <div class="trust-footer">
        <div class="trust-item">
          <svg class="trust-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
          </svg>
          Photo confidentielle
        </div>
        <div class="trust-item">
          <svg class="trust-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          Visible uniquement par tes matchs
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.photo-upload-page {
  position: relative;
  min-height: 100vh;
  background: var(--color-white-cream);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  padding-bottom: 60px;
}

/* Background Atmosphere */
.blur-top {
  position: absolute;
  top: -25%;
  right: -10%;
  width: 800px;
  height: 800px;
  border-radius: 9999px;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.blur-bottom {
  position: absolute;
  bottom: -15%;
  left: -5%;
  width: 600px;
  height: 600px;
  border-radius: 9999px;
  background: radial-gradient(circle, rgba(139, 45, 74, 0.05) 0%, transparent 70%);
  pointer-events: none;
}

/* Header Navigation */
.top-nav {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  padding: 40px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-gray-dark);
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.back-link:hover {
  transform: translateX(-4px);
  color: var(--color-black);
}

.icon-back {
  width: 20px;
  height: 20px;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.app-logo {
  height: 34px;
  object-fit: contain;
}

.logo-text {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-black);
}

/* Content */
.content-container {
  position: relative;
  z-index: 10;
  max-width: 600px;
  width: 100%;
  padding: 0 24px;
  text-align: center;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border-radius: 9999px;
  background: white;
  border: 1px solid var(--color-gray-light);
  margin-bottom: 32px;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-gray-dark);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

.badge-icon {
  width: 16px;
  height: 16px;
  color: var(--color-red-pure);
}

.page-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  font-weight: 600;
  line-height: 1.2;
  color: var(--color-black);
  margin-bottom: 24px;
}

.accent-text {
  position: relative;
  display: inline-block;
  color: var(--color-red-pure);
}

.accent-underline {
  position: absolute;
  bottom: 8px;
  left: 0;
  width: 100%;
  height: 8px;
  background: rgba(139, 45, 74, 0.2);
  z-index: -1;
}

.page-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  color: var(--color-gray-dark);
  line-height: 1.7;
  margin-bottom: 48px;
}

/* Upload Card */
.upload-card {
  background: white;
  border-radius: 24px;
  border: 2px dashed var(--color-gray-light);
  padding: 40px;
  margin-bottom: 32px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.upload-card:hover {
  border-color: var(--color-red-pure);
  background: #FDFBFA;
  transform: translateY(-4px);
}

.upload-card.has-preview {
  border-style: solid;
  border-color: var(--color-gray-light);
  padding: 24px;
  cursor: default;
}

.hidden-input {
  display: none;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.upload-icon-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(139, 45, 74, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-red-pure);
}

.icon-upload {
  width: 24px;
  height: 24px;
}

.upload-text {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: var(--color-black);
  font-size: 1.1rem;
}

.upload-hint {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: var(--color-gray-medium);
}

/* Preview */
.preview-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.preview-frame {
  position: relative;
  width: 100%;
  max-width: 300px;
  aspect-ratio: 4 / 5;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.image-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  color: var(--color-black);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  backdrop-filter: blur(4px);
}

.remove-btn:hover {
  background: #FFFFFF;
  color: var(--color-red-pure);
}

.adjustment-hint {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: var(--color-gray-dark);
  font-style: italic;
}

.error-message {
  margin-top: -16px;
  margin-bottom: 24px;
  color: var(--color-red-pure);
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
}

/* CTA */
.action-container {
  margin-top: 24px;
  margin-bottom: 40px;
}

.glass-btn-wrapper {
  display: inline-block;
  padding: 6px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 32px rgba(139, 45, 74, 0.08);
}

.primary-cta {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 40px;
  border-radius: 9999px;
  background: var(--color-red-pure);
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(139, 45, 74, 0.3);
}

.primary-cta:hover:not(:disabled) {
  background: var(--color-red-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(139, 45, 74, 0.4);
}

.primary-cta:disabled {
  background: var(--color-gray-medium);
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}

.icon-arrow {
  width: 20px;
  height: 20px;
}

/* Trust Footer */
.trust-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--color-gray-light);
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-gray-dark);
}

.trust-icon {
  width: 18px;
  height: 18px;
  color: var(--color-red-pure);
}

/* Loader */
.loader {
  width: 20px;
  height: 20px;
  border: 2px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 640px) {
  .top-nav {
    padding: 24px 16px;
  }

  .nav-spacer {
    display: none;
  }

  .content-container {
    padding: 0 20px;
  }

  .page-title {
    font-size: 2rem;
  }

  .primary-cta {
    padding: 16px 28px;
    font-size: 1rem;
    width: 100%;
    justify-content: center;
  }

  .glass-btn-wrapper {
    width: 100%;
  }

  .trust-footer {
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }
}
</style>
