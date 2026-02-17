<script setup lang="ts">
import { ref } from 'vue'
import { useDevCalendar } from '../composables/useDevCalendar'
import ExitPopup from './ExitPopup.vue'

const { today: devToday, setDate, clearDate, isOverridden, presets } = useDevCalendar()

const exitPopupRef = ref<InstanceType<typeof ExitPopup> | null>(null)
const isCollapsed = ref(true)
</script>

<template>
  <!-- Dev Panel (always visible, fixed position) -->
  <div class="dev-panel" :class="{ collapsed: isCollapsed }">
    <div class="dev-panel-header" @click="isCollapsed = !isCollapsed">
      <span class="dev-panel-title">🛠️ Dev Panel</span>
      <span class="dev-collapse-btn">{{ isCollapsed ? '▲' : '▼' }}</span>
    </div>

    <template v-if="!isCollapsed">
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
          @click.stop="setDate(preset.date)"
        >
          {{ preset.label }}
        </button>
      </div>
      <button v-if="isOverridden" class="dev-reset-btn" @click.stop="clearDate">
        ✕ Reset à aujourd'hui
      </button>
      <div class="dev-panel-divider"></div>
      <button
        class="dev-preset-btn dev-action-btn"
        @click.stop="exitPopupRef?.forceShow()"
      >
        🚪 Tester le popup de sortie
      </button>

      <!-- Slot for page-specific actions -->
      <slot />
    </template>
  </div>

  <!-- Exit Popup instance -->
  <ExitPopup ref="exitPopupRef" />
</template>

<style scoped>
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

.dev-panel.collapsed {
  padding: 10px 16px;
}

.dev-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  cursor: pointer;
  user-select: none;
}

.dev-panel.collapsed .dev-panel-header {
  margin-bottom: 0;
}

.dev-panel-title {
  font-weight: 700;
  font-size: 0.8rem;
}

.dev-collapse-btn {
  font-size: 0.65rem;
  opacity: 0.6;
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

.dev-action-btn {
  width: 100%;
  background: rgba(139, 45, 74, 0.2) !important;
  border-color: rgba(139, 45, 74, 0.4) !important;
  color: #ff6b8a !important;
  font-weight: 600;
  text-align: center;
}

.dev-action-btn:hover {
  background: rgba(139, 45, 74, 0.35) !important;
  border-color: #8B2D4A !important;
}

@media (min-width: 768px) {
  .dev-panel {
    bottom: 16px;
  }
}
</style>
