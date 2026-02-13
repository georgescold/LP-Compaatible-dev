<script setup lang="ts">
import { useIntersectionObserver } from '../composables/useIntersectionObserver'

const props = withDefaults(defineProps<{
  delay?: number
}>(), {
  delay: 0
})

const { isVisible, elementRef } = useIntersectionObserver({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

defineExpose({ elementRef })
</script>

<template>
  <div
    :ref="(el) => { elementRef = el as HTMLElement }"
    class="fade-in-section"
    :class="{ visible: isVisible }"
    :style="{ transitionDelay: `${props.delay}ms` }"
  >
    <slot />
  </div>
</template>

<style scoped>
.fade-in-section {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}

.fade-in-section.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
