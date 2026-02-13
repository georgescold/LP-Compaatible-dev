<script setup lang="ts">
import UrgencyBanner from '../components/UrgencyBanner.vue'
import AppHeader from '../components/AppHeader.vue'
import HeroSection from '../components/HeroSection.vue'
import MatchingPreviewSection from '../components/MatchingPreviewSection.vue'
import TechnologySection from '../components/TechnologySection.vue'
import ComparisonSection from '../components/ComparisonSection.vue'
import PourQuiSection from '../components/PourQuiSection.vue'
import ProcessSection from '../components/ProcessSection.vue'
import StorySection from '../components/StorySection.vue'

import QuoteSection from '../components/QuoteSection.vue'
import FAQSection from '../components/FAQSection.vue'
import FinalCTASection from '../components/FinalCTASection.vue'
import AppFooter from '../components/AppFooter.vue'
import ExitPopup from '../components/ExitPopup.vue'
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

      <FAQSection />
      <FinalCTASection />
    </main>
    <AppFooter />
  </div>
</template>
