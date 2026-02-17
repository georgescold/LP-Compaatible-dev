<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  modelValue: string | null;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null
});

const emit = defineEmits(['update:modelValue', 'skip']);

const fileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);
const errorMessage = ref<string | null>(null);
const selectedFile = ref<File | null>(null);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    processFile(target.files[0]);
  }
};

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    processFile(event.dataTransfer.files[0]);
  }
};

const processFile = (file: File) => {
  errorMessage.value = null;

  const validTypes = ['image/jpeg', 'image/png'];
  if (!validTypes.includes(file.type)) {
    errorMessage.value = 'Le format doit être JPG ou PNG.';
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    errorMessage.value = 'La photo ne doit pas dépasser 5 Mo.';
    return;
  }

  selectedFile.value = file;
  const previewUrl = URL.createObjectURL(file);
  emit('update:modelValue', previewUrl);
};

const removeImage = () => {
  selectedFile.value = null;
  emit('update:modelValue', null);
  if (fileInput.value) fileInput.value.value = '';
};

const onSkip = () => {
  emit('skip');
};

defineExpose({ selectedFile });
</script>

<template>
  <div class="photo-container">
    <div class="content-wrapper">
      <!-- Header Section -->
      <header class="photo-header">
        <div class="badge">
          <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="#8B2D4A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
          Dernière étape
        </div>

        <h2 class="title">
          Ta photo de <br/>
          <span class="accent-text">
            profil
            <svg class="accent-svg" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
              <path d="M1 9.5C50 3.5 150 1.5 299 9.5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </span>
        </h2>

        <p class="subtitle">
          C'est la photo que les personnes qui matcheront avec toi verront. Choisis une photo où l'on voit bien ton visage.
        </p>
      </header>

      <!-- Upload Area -->
      <div class="upload-area">
        <div
          class="upload-zone"
          :class="{ 'is-dragging': isDragging, 'has-preview': !!modelValue }"
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="handleDrop"
          @click="!modelValue && triggerFileInput()"
        >
          <input
            type="file"
            ref="fileInput"
            class="hidden-input"
            accept="image/jpeg, image/png"
            @change="handleFileChange"
          />

          <!-- Empty State -->
          <div v-if="!modelValue" class="empty-state">
            <div class="icon-circle">
              <svg class="icon-upload" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <p class="upload-text">Glisse ta photo ici ou clique pour en sélectionner une</p>
            <span class="upload-hint">JPG, PNG · 5 Mo max</span>
          </div>

          <!-- Preview State -->
          <div v-else class="preview-state">
            <img :src="modelValue" alt="Aperçu" class="preview-img" />
            <button class="remove-btn" @click.stop="removeImage" aria-label="Supprimer">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
        <p v-if="modelValue" class="preview-hint">Utilise une photo cadrée sur ton visage</p>
      </div>

      <!-- Footer Section -->
      <footer class="photo-footer">
        <div class="divider"></div>
        <div class="trust-indicators">
          <div class="trust-item">
            <svg class="trust-icon" viewBox="0 0 24 24" fill="#8B2D4A">
              <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
            </svg>
            Photo confidentielle
          </div>
          <div class="trust-item">
            <svg class="trust-icon" viewBox="0 0 24 24" fill="#8B2D4A">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            Visible uniquement par tes matchs
          </div>
        </div>

        <button class="skip-link" @click="onSkip" type="button">
          Passer cette étape →
        </button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* Reset & Base */
.photo-container {
  padding: 40px 0;
  position: relative;
  display: flex;
  justify-content: center;
}

.content-wrapper {
  max-width: 900px;
  width: 100%;
  position: relative;
  z-index: 10;
}

/* Header Styles */
.photo-header {
  text-align: center;
  margin-bottom: 40px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border-radius: 9999px;
  background: #FEFEFE;
  border: 1px solid #E8E8E8;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: #8B2D4A;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  margin-bottom: 28px;
}

.badge-icon {
  width: 14px;
  height: 14px;
}

.title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 600;
  line-height: 1.3;
  color: #1A1A1A;
  margin-bottom: 16px;
}

.accent-text {
  color: #8B2D4A;
  position: relative;
  display: inline-block;
}

.accent-svg {
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 12px;
  color: #8B2D4A;
  opacity: 0.5;
}

.subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #5C5C5C;
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Upload Area */
.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
}

.upload-zone {
  width: 300px;
  max-width: 100%;
  aspect-ratio: 4 / 5;
  background: #FEFEFE;
  border: 2px dashed #E8E8E8;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.upload-zone:hover:not(.has-preview) {
  border-color: rgba(139, 45, 74, 0.4);
  background: rgba(139, 45, 74, 0.01);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.upload-zone.is-dragging {
  border-color: #8B2D4A;
  background: rgba(139, 45, 74, 0.04);
  transform: scale(1.02);
}

.upload-zone.has-preview {
  border-style: solid;
  border-color: #E8E8E8;
  cursor: default;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.hidden-input {
  display: none;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  gap: 12px;
}

.icon-circle {
  width: 56px;
  height: 56px;
  background: rgba(139, 45, 74, 0.05);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  transition: transform 0.3s ease;
}

.upload-zone:hover .icon-circle {
  transform: scale(1.1);
}

.icon-upload {
  width: 24px;
  height: 24px;
  color: #8B2D4A;
}

.upload-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #1A1A1A;
  text-align: center;
  line-height: 1.4;
}

.upload-hint {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #787878;
  font-weight: 500;
}

/* Preview State */
.preview-state {
  width: 100%;
  height: 100%;
  position: relative;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  background: rgba(26, 26, 26, 0.6);
  backdrop-filter: blur(4px);
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  background: #8B2D4A;
  transform: scale(1.1);
}

.error-text {
  margin-top: 16px;
  color: #8B2D4A;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
}

.preview-hint {
  margin-top: 16px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.95rem;
  color: #5C5C5C;
  font-style: italic;
}

/* Footer Section */
.photo-footer {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.divider {
  width: 100%;
  max-width: 540px;
  height: 1px;
  background: #E8E8E8;
  margin-bottom: 24px;
}

.trust-indicators {
  display: flex;
  gap: 32px;
  margin-bottom: 24px;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: #5C5C5C;
}

.trust-icon {
  width: 14px;
  height: 14px;
  opacity: 0.7;
}

.skip-link {
  background: none;
  border: none;
  color: #787878;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 8px 16px;
}

.skip-link:hover {
  color: #1A1A1A;
}

/* Responsive */
@media (max-width: 600px) {
  .photo-container {
    padding: 24px 0;
  }

  .photo-header {
    margin-bottom: 28px;
  }

  .badge {
    margin-bottom: 20px;
  }

  .subtitle {
    font-size: 0.9rem;
    padding: 0 8px;
  }

  .upload-area {
    margin-top: 20px;
  }

  .upload-zone {
    width: 240px;
  }

  .empty-state {
    padding: 24px 16px;
  }

  .upload-text {
    font-size: 0.82rem;
  }

  .photo-footer {
    margin-top: 28px;
  }

  .trust-indicators {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }

  .trust-item {
    font-size: 0.75rem;
  }

  .skip-link {
    font-size: 0.8rem;
  }
}
</style>
