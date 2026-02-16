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
    class="inline-flex items-center justify-center gap-3 rounded-full bg-red-pure px-12 py-4 text-sm font-semibold text-white shadow-soft transition-all hover:scale-105 hover:bg-red-hover hover:shadow-elevated"
  >
    <slot />
  </router-link>
  <a
    v-else-if="href"
    :href="href"
    class="inline-flex items-center justify-center gap-3 rounded-full bg-red-pure px-12 py-4 text-sm font-semibold text-white shadow-soft transition-all hover:scale-105 hover:bg-red-hover hover:shadow-elevated"
  >
    <slot />
  </a>
  <button
    v-else
    :type="type || 'button'"
    :disabled="disabled"
    class="inline-flex items-center justify-center gap-3 rounded-full bg-red-pure px-12 py-4 text-sm font-semibold text-white shadow-soft transition-all hover:scale-105 hover:bg-red-hover hover:shadow-elevated disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
  >
    <slot />
  </button>
</template>
