<script setup lang="ts">
import { computed } from 'vue';
import { HOBBIES } from '@/data/hobbies';

/**
 * PROPS & EMITS
 * Following the functional context for modelValue binding
 */
interface Props {
  modelValue: string[];
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => []
});

const emit = defineEmits(['update:modelValue']);

/**
 * LOGIC
 */
const selectionCount = computed(() => props.modelValue.length);
const isLimitReached = computed(() => selectionCount.value >= 5);

const isSelected = (id: string) => props.modelValue.includes(id);

const toggleHobby = (id: string) => {
  const currentSelection = [...props.modelValue];
  const index = currentSelection.indexOf(id);

  if (index > -1) {
    // Remove if already selected
    currentSelection.splice(index, 1);
    emit('update:modelValue', currentSelection);
  } else if (!isLimitReached.value) {
    // Add if under limit
    currentSelection.push(id);
    emit('update:modelValue', currentSelection);
  } else {
    // Optional: Could trigger a subtle shake animation here
  }
};
</script>

<template>
  <div class="hobbies-container">
    <div class="content-wrapper">
      <!-- Header Section -->
      <header class="text-center mb-10 relative z-10">
        <div class="badge">
          <svg class="w-4 h-4" fill="#8B2D4A" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          Presque terminé
        </div>
        
        <h2 class="title">
          Qu'est-ce qui te fait <br/>
          <span class="accent-text">
            vibrer ?
            <svg class="accent-svg" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
              <path d="M1 9.5C50 3.5 150 1.5 299 9.5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </span>
        </h2>
        
        <p class="subtitle">
          Sélectionne tes <strong class="highlight">5 centres d'intérêt</strong> favoris pour nous aider à trouver une personne qui partage ton univers.
        </p>
      </header>

      <!-- Hobbies Grid -->
      <div class="hobbies-grid">
        <button
          v-for="hobby in HOBBIES"
          :key="hobby.id"
          class="hobby-card"
          :class="{ 
            'is-selected': isSelected(hobby.id),
            'is-disabled': isLimitReached && !isSelected(hobby.id)
          }"
          @click="toggleHobby(hobby.id)"
          type="button"
        >
          <div class="hobby-content">
            <span class="hobby-emoji">{{ hobby.emoji }}</span>
            <span class="hobby-label">{{ hobby.label }}</span>
          </div>
          
          <div class="selection-indicator" v-if="isSelected(hobby.id)">
            <svg class="w-3 h-3" fill="white" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
        </button>
      </div>

      <!-- Footer / Status Section -->
      <footer class="selection-footer">
        <div class="counter-glass">
          <div class="counter-content">
            <span class="counter-label">Passions sélectionnées</span>
            <div class="counter-visual">
              <span class="counter-number" :class="{ 'is-complete': selectionCount === 5 }">
                {{ selectionCount }}
              </span>
              <span class="counter-total">/ 5</span>
            </div>
          </div>
          <div class="progress-track">
            <div 
              class="progress-fill" 
              :style="{ width: `${(selectionCount / 5) * 100}%` }"
            ></div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* Reset & Base */
.hobbies-container {
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

.highlight {
  color: #1A1A1A;
  font-weight: 600;
}

/* Grid & Cards */
.hobbies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 12px;
  margin-top: 32px;
}

.hobby-card {
  position: relative;
  background: #FEFEFE;
  border: 1px solid #E8E8E8;
  border-radius: 16px;
  padding: 16px 12px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  outline: none;
  height: 100px;
}

.hobby-card:hover:not(.is-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  border-color: rgba(139, 45, 74, 0.2);
}

.hobby-card.is-selected {
  border-color: #8B2D4A;
  background: rgba(139, 45, 74, 0.02);
  box-shadow: 0 2px 8px rgba(139, 45, 74, 0.1);
  transform: scale(1.02);
}

.hobby-card.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  filter: grayscale(0.8);
}

.hobby-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.hobby-emoji {
  font-size: 1.8rem;
  transition: transform 0.2s ease;
}

.hobby-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: #1A1A1A;
  text-align: center;
  line-height: 1.2;
}

.selection-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 18px;
  height: 18px;
  background: #8B2D4A;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pop-in 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes pop-in {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* Footer & Progress Bar */
.selection-footer {
  margin-top: 32px;
  display: flex;
  justify-content: center;
}

.counter-glass {
  background: white;
  border: 1px solid #E8E8E8;
  border-radius: 20px;
  padding: 16px 24px;
  width: 100%;
  max-width: 320px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.counter-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.counter-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #5C5C5C;
  font-weight: 500;
}

.counter-visual {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.counter-number {
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1A1A1A;
  transition: color 0.3s ease;
}

.counter-number.is-complete {
  color: #8B2D4A;
}

.counter-total {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #787878;
  font-weight: 500;
}

.progress-track {
  height: 6px;
  background: #F0F0F0;
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #8B2D4A;
  border-radius: 999px;
  transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .hobbies-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
