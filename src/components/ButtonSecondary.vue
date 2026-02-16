<script setup lang="ts">
defineProps<{
  to?: string
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}>()
</script>

<template>
  <router-link
    v-if="to"
    :to="to"
    class="inline-flex items-center justify-center gap-2 rounded-full border-2 border-red-pure bg-transparent px-10 py-3 text-xs font-medium text-red-pure transition-all hover:bg-red-pure hover:text-white"
  >
    <slot />
  </router-link>
  <a
    v-else-if="href"
    :href="href"
    class="inline-flex items-center justify-center gap-2 rounded-full border-2 border-red-pure bg-transparent px-10 py-3 text-xs font-medium text-red-pure transition-all hover:bg-red-pure hover:text-white"
  >
    <slot />
  </a>
  <button
    v-else
    :type="type || 'button'"
    :disabled="disabled"
    class="inline-flex items-center justify-center gap-2 rounded-full border-2 border-red-pure bg-transparent px-10 py-3 text-xs font-medium text-red-pure transition-all hover:bg-red-pure hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <slot />
  </button>
</template>
