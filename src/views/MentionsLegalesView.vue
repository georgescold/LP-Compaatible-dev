<script setup lang="ts">
import logoImage from '../assets/nouveau logo compaatible.png'
</script>

<template>
  <div class="legal-page">
    <div class="legal-container">
      <!-- Header -->
      <nav class="legal-nav">
        <router-link to="/" class="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Retour
        </router-link>
      </nav>

      <header class="legal-header">
        <router-link to="/" class="logo-brand">
          <img :src="logoImage" alt="Compaatible" class="legal-logo" />
          <span class="logo-text">Compaatible</span>
        </router-link>
        <h1>Mentions Légales</h1>
        <p class="last-update">Dernière mise à jour : 16 février 2026</p>
      </header>

      <main class="legal-content">
        <!-- Éditeur -->
        <section class="legal-section">
          <h2>1. Éditeur du site</h2>
          <p>Le site <strong>compaatible.com</strong> est édité par :</p>
          <ul>
            <li><strong>Nom :</strong> Loys Coquelle</li>
            <li><strong>Statut :</strong> Entrepreneur Individuel (EI)</li>
            <li><strong>SIRET :</strong> 989 331 418 00016</li>
            <li><strong>Adresse du siège :</strong> 14 Bis Rue de la Carrière, 02190 La Malmaison, France</li>
            <li><strong>Email :</strong> <a href="mailto:contact@compaatible.fr">contact@compaatible.fr</a></li>
          </ul>
          <p><strong>Directeur de la publication :</strong> Loys Coquelle</p>
        </section>

        <!-- Hébergeur -->
        <section class="legal-section">
          <h2>2. Hébergement</h2>
          <p>Le site est hébergé par :</p>
          <ul>
            <li><strong>Nom :</strong> Render Services, Inc.</li>
            <li><strong>Adresse :</strong> 525 Brannan Street, Suite 300, San Francisco, CA 94107, États-Unis</li>
            <li><strong>Site web :</strong> <a href="https://render.com" target="_blank" rel="noopener">https://render.com</a></li>
          </ul>
        </section>

        <!-- Propriété intellectuelle -->
        <section class="legal-section">
          <h2>3. Propriété intellectuelle</h2>
          <p>L'ensemble du contenu du site Compaatible (textes, images, graphismes, logo, icônes, algorithmes et logiciels) est la propriété exclusive de Loys Coquelle, sauf mention contraire.</p>
          <p>Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable.</p>
          <p>L'algorithme de compatibilité est une méthodologie propriétaire protégée.</p>
        </section>

        <!-- Données personnelles -->
        <section class="legal-section">
          <h2>4. Protection des données personnelles</h2>
          <p>Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez de droits sur vos données personnelles.</p>
          <p>Les données collectées peuvent être utilisées à des fins d'amélioration du service, d'analyse statistique, et potentiellement cédées ou mises à disposition de tiers partenaires à des fins commerciales, sous forme anonymisée ou pseudonymisée, dans le respect de la réglementation applicable. Pour plus de détails, veuillez consulter notre <router-link to="/confidentialite">Politique de Confidentialité</router-link>.</p>
          <p>Pour exercer vos droits, contactez-nous à : <a href="mailto:contact@compaatible.fr">contact@compaatible.fr</a></p>
        </section>

        <!-- Cookies -->
        <section class="legal-section">
          <h2>5. Cookies</h2>
          <p>Le site utilise des cookies techniques nécessaires à son fonctionnement, notamment pour :</p>
          <ul>
            <li>Maintenir votre session de connexion</li>
            <li>Mémoriser vos préférences</li>
            <li>Assurer la sécurité du site</li>
          </ul>
          <p>Des cookies analytiques peuvent également être utilisés pour mesurer l'audience du site. Vous pouvez configurer votre navigateur pour refuser les cookies.</p>
        </section>

        <!-- Limitation de responsabilité -->
        <section class="legal-section">
          <h2>6. Limitation de responsabilité</h2>
          <p>L'éditeur s'efforce de fournir sur le site des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, inexactitudes ou carences dans la mise à jour.</p>
          <p>Compaatible est un outil de mise en relation basé sur un algorithme de compatibilité. L'éditeur ne garantit pas le succès des relations issues du service et s'engage uniquement à une obligation de moyens, non de résultat.</p>
        </section>

        <!-- Médiation -->
        <section class="legal-section">
          <h2>7. Médiation de la consommation</h2>
          <p>Conformément aux articles L611-1 et R612-1 du Code de la consommation, en cas de litige non résolu, vous pouvez recourir gratuitement au service de médiation de la consommation. Le médiateur sera désigné conformément à la réglementation en vigueur. Les coordonnées du médiateur compétent seront communiquées sur simple demande à <a href="mailto:contact@compaatible.fr">contact@compaatible.fr</a>.</p>
          <p>Vous pouvez également déposer une réclamation sur la plateforme européenne de règlement en ligne des litiges : <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr</a></p>
        </section>

        <!-- Droit applicable -->
        <section class="legal-section">
          <h2>8. Droit applicable</h2>
          <p>Les présentes mentions légales sont soumises au droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux français seront seuls compétents.</p>
        </section>

        <!-- Liens -->
        <section class="legal-section">
          <h2>9. Liens utiles</h2>
          <ul class="legal-links">
            <li><router-link to="/cgu">Conditions Générales d'Utilisation</router-link></li>
            <li><router-link to="/confidentialite">Politique de Confidentialité</router-link></li>
          </ul>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.legal-page {
  min-height: 100vh;
  background: var(--color-white-cream);
  padding: 40px 24px 80px;
}

.legal-container {
  max-width: 800px;
  margin: 0 auto;
}

.legal-nav {
  margin-bottom: 24px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-gray-dark);
  text-decoration: none;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--color-red-pure);
}

.legal-header {
  text-align: center;
  margin-bottom: 48px;
}

.logo-brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  margin-bottom: 24px;
}

.legal-logo {
  width: 30px;
  height: auto;
}

.logo-text {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-black);
}

.legal-header h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 600;
  color: var(--color-black);
  margin-bottom: 8px;
}

.last-update {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: var(--color-gray-medium);
}

.legal-content {
  background: white;
  border-radius: 24px;
  padding: 48px 40px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.04);
  border: 1px solid var(--color-gray-light);
}

.legal-section {
  margin-bottom: 40px;
}

.legal-section:last-child {
  margin-bottom: 0;
}

.legal-section h2 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-black);
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--color-red-pure);
  display: inline-block;
}

.legal-section p {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: var(--color-gray-dark);
  line-height: 1.7;
  margin-bottom: 12px;
}

.legal-section ul {
  list-style: none;
  padding: 0;
  margin: 16px 0;
}

.legal-section ul li {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: var(--color-gray-dark);
  line-height: 1.7;
  padding-left: 20px;
  position: relative;
  margin-bottom: 8px;
}

.legal-section ul li::before {
  content: '•';
  color: var(--color-red-pure);
  position: absolute;
  left: 0;
  font-weight: bold;
}

.legal-section a {
  color: var(--color-red-pure);
  text-decoration: none;
  font-weight: 500;
}

.legal-section a:hover {
  text-decoration: underline;
}

.legal-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (max-width: 600px) {
  .legal-page {
    padding: 24px 16px 60px;
  }

  .legal-content {
    padding: 32px 24px;
    border-radius: 16px;
  }

  .legal-header h1 {
    font-size: 1.6rem;
  }

  .legal-section h2 {
    font-size: 1.15rem;
  }

  .legal-section p,
  .legal-section ul li {
    font-size: 0.9rem;
  }
}

@media (max-width: 400px) {
  .legal-page {
    padding: 16px 12px 40px;
  }

  .legal-content {
    padding: 24px 16px;
  }
}
</style>
