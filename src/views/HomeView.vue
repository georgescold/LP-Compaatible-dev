<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

// Above-the-fold: loaded synchronously
import UrgencyBanner from '../components/UrgencyBanner.vue'
import AppHeader from '../components/AppHeader.vue'
import HeroSection from '../components/HeroSection.vue'

// Below-the-fold: lazy-loaded
const MatchingPreviewSection = defineAsyncComponent(() => import('../components/MatchingPreviewSection.vue'))
const TechnologySection = defineAsyncComponent(() => import('../components/TechnologySection.vue'))
const ComparisonSection = defineAsyncComponent(() => import('../components/ComparisonSection.vue'))
const PourQuiSection = defineAsyncComponent(() => import('../components/PourQuiSection.vue'))
const ProcessSection = defineAsyncComponent(() => import('../components/ProcessSection.vue'))
const StorySection = defineAsyncComponent(() => import('../components/StorySection.vue'))
const PersonalityTypesSection = defineAsyncComponent(() => import('../components/PersonalityTypesSection.vue'))
const QuoteSection = defineAsyncComponent(() => import('../components/QuoteSection.vue'))
const FAQSection = defineAsyncComponent(() => import('../components/FAQSection.vue'))
const FinalCTASection = defineAsyncComponent(() => import('../components/FinalCTASection.vue'))
const AppFooter = defineAsyncComponent(() => import('../components/AppFooter.vue'))
const ExitPopup = defineAsyncComponent(() => import('../components/ExitPopup.vue'))
const DevPanel = defineAsyncComponent(() => import('../components/DevPanel.vue'))
</script>

<template>
  <div class="min-h-screen">
    <UrgencyBanner />
    <AppHeader />
    <ExitPopup />
    <main>
      <HeroSection />
      <MatchingPreviewSection />
      <TechnologySection />
      <QuoteSection />
      <ComparisonSection />
      <PourQuiSection />
      <ProcessSection />
      <StorySection />
      <PersonalityTypesSection />

      <FAQSection />
      <FinalCTASection />
    </main>
    <AppFooter />
    <DevPanel />
  </div>
</template>
