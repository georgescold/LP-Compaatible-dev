<template>
  <section class="quote-section">
    <div class="container-main">
      <blockquote class="quote-text">
        "La compatibilité psychologique est le meilleur prédicteur de la satisfaction et de la longévité dans une relation."
      </blockquote>
      <cite class="quote-author">Dr. John Gottman, psychologue spécialiste des relations de couple</cite>
    </div>
  </section>
</template>

<style scoped>
.quote-section {
  background: linear-gradient(135deg, var(--color-red-pure) 0%, var(--color-red-dark) 100%);
  color: white;
  padding: 50px 0;
  text-align: center;
}

.quote-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  font-style: italic;
  max-width: 800px;
  margin: 0 auto 15px;
  line-height: 1.5;
  font-weight: 500;
}

.quote-author {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  opacity: 0.9;
  font-style: normal;
}

@media (max-width: 600px) {
  .quote-section {
    padding: 40px 0;
  }

  .quote-text {
    font-size: 1rem;
  }

  .quote-author {
    font-size: 0.8rem;
  }
}
</style>
