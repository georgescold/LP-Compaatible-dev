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
        <h1>Conditions Générales d'Utilisation</h1>
        <p class="last-update">Dernière mise à jour : 16 février 2026</p>
      </header>

      <main class="legal-content">
        <!-- Préambule -->
        <section class="legal-section">
          <h2>1. Préambule</h2>
          <p>Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») régissent l'accès et l'utilisation du site <strong>compaatible.com</strong> (ci-après « le Site ») et de ses services, édités par Loys Coquelle, Entrepreneur Individuel.</p>
          <p>En accédant au Site et en utilisant ses services, vous acceptez sans réserve les présentes CGU. Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser le Site.</p>
        </section>

        <!-- Description du service -->
        <section class="legal-section">
          <h2>2. Description du Service</h2>
          <p>Compaatible est une plateforme de rencontre en ligne proposant un service de mise en relation basé sur un algorithme de compatibilité propriétaire.</p>
          <p>Le service consiste à :</p>
          <ul>
            <li>Faire passer un test de personnalité aux utilisateurs</li>
            <li>Calculer un indice de compatibilité entre profils</li>
            <li>Proposer un match mensuel sélectionné selon cet indice</li>
          </ul>
          <p>L'indice de compatibilité est exprimé en pourcentage (0-100%) et reflète l'affinité estimée entre deux profils selon notre méthodologie.</p>
        </section>

        <!-- Conditions d'accès -->
        <section class="legal-section">
          <h2>3. Conditions d'accès</h2>
          <p>Pour utiliser le Service, vous devez :</p>
          <ul>
            <li><strong>Être âgé d'au moins 18 ans</strong></li>
            <li>Fournir des informations exactes et à jour lors de l'inscription</li>
            <li>Disposer d'une adresse email valide</li>
            <li>Accepter les présentes CGU et la Politique de Confidentialité</li>
          </ul>
          <p>L'éditeur se réserve le droit de refuser l'inscription ou de suspendre tout compte ne respectant pas ces conditions.</p>
        </section>

        <!-- Inscription et compte -->
        <section class="legal-section">
          <h2>4. Inscription et compte utilisateur</h2>
          <p>L'inscription au Service nécessite la création d'un compte personnel. Vous êtes responsable :</p>
          <ul>
            <li>De la confidentialité de vos identifiants de connexion</li>
            <li>De toute activité réalisée depuis votre compte</li>
            <li>De nous signaler immédiatement toute utilisation non autorisée</li>
          </ul>
          <p>Chaque utilisateur ne peut disposer que d'un seul compte. Les faux profils ou usurpations d'identité sont strictement interdits.</p>
        </section>

        <!-- Tarification -->
        <section class="legal-section">
          <h2>5. Tarification et paiement</h2>
          <p>Le Service est proposé <strong>gratuitement</strong> dans le cadre de la première édition (offre de lancement). Cette offre donne accès :</p>
          <ul>
            <li>Au test de personnalité complet</li>
            <li>À l'analyse de votre profil</li>
            <li>À la réception de 3 matchs basés sur votre compatibilité</li>
            <li>Au déblocage des coordonnées d'un match (inclus)</li>
          </ul>
          <p>Le déblocage des coordonnées des matchs supplémentaires pourra faire l'objet d'un paiement optionnel dont le montant sera communiqué avant toute transaction.</p>
          <p>L'éditeur se réserve le droit de modifier les tarifs pour les éditions suivantes. Tout changement sera communiqué aux utilisateurs préalablement.</p>
          <p>Les paiements éventuels sont sécurisés et traités par notre prestataire de paiement.</p>
        </section>

        <!-- Droit de rétractation -->
        <section class="legal-section">
          <h2>6. Droit de rétractation</h2>
          <p>Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les services pleinement exécutés avant la fin du délai de rétractation et dont l'exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.</p>
          <p>En accédant au test de personnalité après paiement, vous reconnaissez expressément renoncer à votre droit de rétractation.</p>
        </section>

        <!-- Obligations utilisateur -->
        <section class="legal-section">
          <h2>7. Obligations de l'utilisateur</h2>
          <p>En utilisant le Service, vous vous engagez à :</p>
          <ul>
            <li>Respecter les autres utilisateurs</li>
            <li>Ne pas publier de contenu illicite, diffamatoire, offensant ou inapproprié</li>
            <li>Ne pas utiliser le Service à des fins commerciales ou promotionnelles</li>
            <li>Ne pas tenter d'accéder aux comptes d'autres utilisateurs</li>
            <li>Ne pas perturber le fonctionnement du Site</li>
          </ul>
          <p>Tout manquement pourra entraîner la suspension ou la suppression définitive du compte, sans remboursement.</p>
        </section>

        <!-- Limitation de responsabilité -->
        <section class="legal-section">
          <h2>8. Limitation de responsabilité</h2>
          <div class="highlight-box">
            <p><strong>Obligation de moyens :</strong> L'éditeur s'engage à mettre en œuvre tous les moyens raisonnables pour fournir un service de qualité. Il s'agit d'une obligation de moyens, non de résultat.</p>
          </div>
          <p>Nous analysons les réponses au test selon une méthodologie propriétaire. <strong>Les résultats ne garantissent en aucun cas le succès d'une relation.</strong></p>
          <p>Compaatible est un outil conçu pour faciliter les rencontres entre personnes compatibles, mais ne peut être tenu responsable :</p>
          <ul>
            <li>De l'issue des rencontres entre utilisateurs</li>
            <li>Du comportement des utilisateurs entre eux</li>
            <li>De l'exactitude des informations fournies par les utilisateurs</li>
            <li>Des interruptions temporaires du service pour maintenance</li>
          </ul>
        </section>

        <!-- Propriété intellectuelle -->
        <section class="legal-section">
          <h2>9. Propriété intellectuelle</h2>
          <p>L'ensemble du contenu du Site (textes, images, logo, algorithme de compatibilité, méthodologie) est protégé par le droit de la propriété intellectuelle et appartient exclusivement à Loys Coquelle.</p>
          <p>Toute reproduction ou utilisation non autorisée constitue une contrefaçon sanctionnée pénalement.</p>
        </section>

        <!-- Données personnelles -->
        <section class="legal-section">
          <h2>10. Données personnelles et cession à des tiers</h2>
          <p>Le traitement de vos données personnelles est régi par notre <router-link to="/confidentialite">Politique de Confidentialité</router-link>, que nous vous invitons à consulter.</p>
          <p>En acceptant les présentes CGU, vous reconnaissez et acceptez que vos données, une fois anonymisées ou pseudonymisées, puissent être cédées, partagées ou mises à disposition de tiers partenaires à des fins commerciales, d'études statistiques, de recherche ou de marketing, dans le respect de la réglementation applicable en matière de protection des données personnelles.</p>
          <p>Vous pouvez à tout moment retirer votre consentement à cette cession en nous contactant à <a href="mailto:contact@compaatible.fr">contact@compaatible.fr</a>. Ce retrait n'affecte pas la licéité du traitement fondé sur le consentement effectué avant le retrait.</p>
        </section>

        <!-- Modification des CGU -->
        <section class="legal-section">
          <h2>11. Modification des CGU</h2>
          <p>L'éditeur se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés des modifications importantes par email ou notification sur le Site.</p>
          <p>La poursuite de l'utilisation du Service après modification vaut acceptation des nouvelles conditions.</p>
        </section>

        <!-- Droit applicable -->
        <section class="legal-section">
          <h2>12. Droit applicable et litiges</h2>
          <p>Les présentes CGU sont soumises au droit français.</p>
          <p>En cas de litige, une solution amiable sera recherchée prioritairement. À défaut d'accord, les tribunaux français seront seuls compétents.</p>
          <p>Conformément aux articles L611-1 et R612-1 du Code de la consommation, vous pouvez recourir gratuitement au service de médiation de la consommation. Les coordonnées du médiateur compétent seront communiquées sur simple demande à <a href="mailto:contact@compaatible.fr">contact@compaatible.fr</a>. Vous pouvez également utiliser la plateforme européenne de règlement en ligne des litiges : <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr</a></p>
        </section>

        <!-- Contact -->
        <section class="legal-section">
          <h2>13. Contact</h2>
          <p>Pour toute question relative aux présentes CGU :</p>
          <ul>
            <li><strong>Email :</strong> <a href="mailto:contact@compaatible.fr">contact@compaatible.fr</a></li>
            <li><strong>Adresse :</strong> 14 Bis Rue de la Carrière, 02190 La Malmaison, France</li>
          </ul>
        </section>

        <!-- Liens -->
        <section class="legal-section">
          <h2>Liens utiles</h2>
          <ul class="legal-links">
            <li><router-link to="/mentions-legales">Mentions Légales</router-link></li>
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
  font-size: clamp(1.6rem, 4vw, 2.2rem);
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

.highlight-box {
  background: rgba(139, 45, 74, 0.05);
  border-left: 4px solid var(--color-red-pure);
  padding: 16px 20px;
  border-radius: 0 12px 12px 0;
  margin: 16px 0;
}

.highlight-box p {
  margin: 0;
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
    font-size: 1.4rem;
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
