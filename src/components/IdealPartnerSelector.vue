<script setup lang="ts">
import { computed } from 'vue';
import { PARTNER_TRAITS } from '@/data/ideal-partner-traits';

interface Props {
  modelValue: string[];
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => []
});

const emit = defineEmits(['update:modelValue']);

const selectionCount = computed(() => props.modelValue.length);
const isLimitReached = computed(() => selectionCount.value >= 7);

const isSelected = (id: string) => props.modelValue.includes(id);

const toggleTrait = (id: string) => {
  const currentSelection = [...props.modelValue];
  const index = currentSelection.indexOf(id);

  if (index > -1) {
    currentSelection.splice(index, 1);
    emit('update:modelValue', currentSelection);
  } else if (!isLimitReached.value) {
    currentSelection.push(id);
    emit('update:modelValue', currentSelection);
  }
};
</script>

<template>
  <div class="trait-container">
    <div class="content-wrapper">
      <!-- Header Section -->
      <header class="trait-header">
        <div class="badge">
          <svg class="badge-icon" viewBox="0 0 24 24" fill="#8B2D4A" stroke="none">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          Dernière question
        </div>

        <h2 class="title">
          Ton(ta) partenaire <br/>
          <span class="accent-text">
            idéal(e) est...
            <svg class="accent-svg" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
              <path d="M1 9.5C50 3.5 150 1.5 299 9.5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </span>
        </h2>

        <p class="subtitle">
          Sélectionne les <strong class="highlight">7 qualités</strong> qui comptent le plus pour toi chez quelqu'un.
        </p>
      </header>

      <!-- Traits Grid -->
      <div class="trait-grid">
        <button
          v-for="trait in PARTNER_TRAITS"
          :key="trait.id"
          class="trait-card"
          :class="{
            'is-selected': isSelected(trait.id),
            'is-disabled': isLimitReached && !isSelected(trait.id)
          }"
          @click="toggleTrait(trait.id)"
          type="button"
        >
          <div class="trait-content">
            <span class="trait-emoji">{{ trait.emoji }}</span>
            <span class="trait-label">{{ trait.label }}</span>
          </div>

          <div class="selection-indicator" v-if="isSelected(trait.id)">
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </button>
      </div>

      <!-- Footer / Status Section -->
      <footer class="selection-footer">
        <div class="counter-glass">
          <div class="counter-content">
            <span class="counter-label">Qualités sélectionnées</span>
            <div class="counter-visual">
              <span class="counter-number" :class="{ 'is-complete': selectionCount === 7 }">{{ selectionCount }}</span>
              <span class="counter-separator">/</span>
              <span class="counter-total">7</span>
            </div>
          </div>
          <div class="progress-track">
            <div
              class="progress-fill"
              :style="{ width: `${(selectionCount / 7) * 100}%` }"
            ></div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* Reset & Base */
.trait-container {
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
.trait-header {
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

.highlight {
  color: #1A1A1A;
  font-weight: 600;
}

/* Grid & Cards */
.trait-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  margin-top: 32px;
}

.trait-card {
  position: relative;
  background: #FEFEFE;
  border: 1px solid #E8E8E8;
  border-radius: 16px;
  padding: 14px 12px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  outline: none;
  min-height: 56px;
}

.trait-card:hover:not(.is-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  border-color: rgba(139, 45, 74, 0.2);
}

.trait-card.is-selected {
  border-color: #8B2D4A;
  background: rgba(139, 45, 74, 0.02);
  box-shadow: 0 2px 8px rgba(139, 45, 74, 0.1);
}

.trait-card.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  filter: grayscale(0.8);
}

.trait-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.trait-emoji {
  font-size: 1.3rem;
  line-height: 1;
  flex-shrink: 0;
}

.trait-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #1A1A1A;
  text-align: left;
  line-height: 1.2;
}

.selection-indicator {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  background: #8B2D4A;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pop-in 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.check-icon {
  width: 12px;
  height: 12px;
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
  gap: 0;
}

.counter-number {
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1A1A1A;
  transition: color 0.3s ease;
  min-width: 1.2em;
  text-align: right;
}

.counter-number.is-complete {
  color: #8B2D4A;
}

.counter-separator {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #AAAAAA;
  font-weight: 400;
  margin: 0 2px;
}

.counter-total {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #787878;
  font-weight: 600;
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
  .trait-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
