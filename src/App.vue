<template>
  <RouterView />
  <CookieBanner />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { supabase } from './lib/supabase'
import { useRouter } from 'vue-router'
import CookieBanner from './components/CookieBanner.vue'

const router = useRouter()

onMounted(() => {
  // Listen for auth state changes (login, password reset callback)
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'PASSWORD_RECOVERY' && session) {
      // Redirect to connexion page for password reset flow
      router.push('/connexion')
    }
  })
})
</script>
