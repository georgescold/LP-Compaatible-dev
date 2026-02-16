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
        <h1>Politique de Confidentialité</h1>
        <p class="last-update">Dernière mise à jour : 16 février 2026</p>
      </header>

      <main class="legal-content">
        <!-- Introduction -->
        <section class="legal-section">
          <h2>1. Introduction</h2>
          <p>La protection de vos données personnelles est une priorité pour Compaatible. Cette politique de confidentialité explique comment nous collectons, utilisons, conservons et protégeons vos informations, conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.</p>
          <p><strong>Responsable du traitement :</strong> Loys Coquelle, 14 Bis Rue de la Carrière, 02190 La Malmaison, France.</p>
        </section>

        <!-- Données collectées -->
        <section class="legal-section">
          <h2>2. Données collectées</h2>
          <p>Dans le cadre de l'utilisation du Service, nous collectons les données suivantes :</p>
          
          <h3>Données d'identification :</h3>
          <ul>
            <li>Prénom et nom</li>
            <li>Âge</li>
            <li>Ville de résidence</li>
            <li>Genre</li>
            <li>Orientation de recherche (préférences)</li>
            <li>Adresse email</li>
            <li>Identifiant Instagram (optionnel)</li>
            <li>Photo de profil</li>
          </ul>

          <h3>Données de personnalité :</h3>
          <ul>
            <li>Réponses au test de personnalité</li>
            <li>Scores et indices calculés par l'algorithme</li>
            <li>Profil de compatibilité</li>
          </ul>

          <h3>Données techniques :</h3>
          <ul>
            <li>Adresse IP</li>
            <li>Type de navigateur et d'appareil</li>
            <li>Pages visitées et durée de navigation</li>
            <li>Cookies techniques et analytiques</li>
          </ul>
        </section>

        <!-- Finalités -->
        <section class="legal-section">
          <h2>3. Finalités du traitement</h2>
          <p>Vos données sont collectées pour les finalités suivantes :</p>
          <ul>
            <li><strong>Fourniture du service :</strong> Création de votre profil, analyse de personnalité, calcul de compatibilité et mise en relation</li>
            <li><strong>Communication :</strong> Envoi de notifications relatives à votre match mensuel et informations importantes sur le service</li>
            <li><strong>Amélioration du service :</strong> Analyse statistique et amélioration de l'algorithme de compatibilité</li>
            <li><strong>Sécurité :</strong> Prévention des fraudes et protection du service</li>
            <li><strong>Obligations légales :</strong> Respect de nos obligations réglementaires</li>
          </ul>
        </section>

        <!-- Base légale -->
        <section class="legal-section">
          <h2>4. Base légale du traitement</h2>
          <p>Le traitement de vos données repose sur :</p>
          <ul>
            <li><strong>L'exécution du contrat :</strong> Le traitement est nécessaire à la fourniture du service auquel vous avez souscrit</li>
            <li><strong>Votre consentement :</strong> Pour l'envoi de communications commerciales et l'utilisation de certains cookies</li>
            <li><strong>L'intérêt légitime :</strong> Pour l'amélioration de nos services et la sécurité de la plateforme</li>
            <li><strong>Votre consentement (cession commerciale) :</strong> Pour la mise à disposition de données anonymisées ou pseudonymisées à des tiers partenaires à des fins commerciales (voir section 6)</li>
          </ul>
        </section>

        <!-- Destinataires -->
        <section class="legal-section">
          <h2>5. Destinataires des données</h2>
          <p>Vos données peuvent être partagées avec :</p>
          <ul>
            <li><strong>Autres utilisateurs :</strong> Les informations de votre profil visible (prénom, âge, ville, photo, certains traits de personnalité) sont partagées avec votre match mensuel</li>
            <li><strong>Prestataires techniques :</strong> Hébergeurs (Render), services de base de données (Supabase), prestataires de paiement sécurisé</li>
            <li><strong>Partenaires analytiques :</strong> Services d'analyse de trafic pour améliorer le service</li>
            <li><strong>Autorités compétentes :</strong> En cas d'obligation légale</li>
          </ul>
        </section>

        <!-- Cession commerciale -->
        <section class="legal-section">
          <h2>6. Utilisation commerciale et cession des données</h2>
          <p>En utilisant le Service et en acceptant la présente politique, vous consentez expressément à ce que vos données, sous forme <strong>anonymisée ou pseudonymisée</strong>, puissent être :</p>
          <ul>
            <li><strong>Utilisées à des fins d'études et de recherche :</strong> Analyse de tendances comportementales, études statistiques sur la compatibilité relationnelle, recherche en psychologie appliquée</li>
            <li><strong>Cédées ou mises à disposition de tiers partenaires :</strong> Entreprises, organismes de recherche ou partenaires commerciaux, à des fins d'analyse de marché, de marketing ciblé, de développement de produits ou de services complémentaires</li>
            <li><strong>Agrégées dans des rapports ou bases de données :</strong> Destinés à des partenaires commerciaux, sans qu'aucune identification directe des utilisateurs ne soit possible</li>
          </ul>
          <p><strong>Garanties :</strong> Les données cédées à des tiers ne permettront jamais l'identification directe d'un utilisateur. Seules des données anonymisées (sans nom, email ou photo) ou pseudonymisées (avec identifiant technique non réversible) seront partagées.</p>
          <p><strong>Droit d'opposition :</strong> Vous pouvez à tout moment vous opposer à cette utilisation commerciale de vos données en nous contactant à <a href="mailto:contact@compaatible.fr">contact@compaatible.fr</a>. Ce retrait n'affecte pas la licéité des traitements effectués avant votre opposition.</p>
        </section>

        <!-- Transferts -->
        <section class="legal-section">
          <h2>7. Transferts de données</h2>
          <p>Certains de nos prestataires sont situés en dehors de l'Union Européenne (notamment aux États-Unis). Ces transferts sont encadrés par :</p>
          <ul>
            <li>Les clauses contractuelles types approuvées par la Commission Européenne</li>
            <li>Le Data Privacy Framework (pour les prestataires américains certifiés)</li>
          </ul>
        </section>

        <!-- Conservation -->
        <section class="legal-section">
          <h2>8. Durée de conservation</h2>
          <p>Vos données sont conservées :</p>
          <ul>
            <li><strong>Données de compte :</strong> Pendant toute la durée d'utilisation du service, puis archivées 3 ans après la dernière activité</li>
            <li><strong>Données de personnalité :</strong> Pendant toute la durée du compte actif</li>
            <li><strong>Données de transaction :</strong> 10 ans (obligation comptable)</li>
            <li><strong>Données techniques :</strong> 13 mois maximum</li>
          </ul>
          <p>Vous pouvez demander la suppression de vos données à tout moment (voir section 9).</p>
        </section>

        <!-- Droits -->
        <section class="legal-section">
          <h2>9. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li><strong>Droit d'accès :</strong> Obtenir une copie de vos données personnelles</li>
            <li><strong>Droit de rectification :</strong> Corriger des données inexactes</li>
            <li><strong>Droit à l'effacement :</strong> Demander la suppression de vos données</li>
            <li><strong>Droit à la limitation :</strong> Limiter le traitement de vos données</li>
            <li><strong>Droit à la portabilité :</strong> Recevoir vos données dans un format structuré</li>
            <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</li>
            <li><strong>Droit de retrait du consentement :</strong> Retirer votre consentement à tout moment</li>
          </ul>
          <p>Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@compaatible.fr">contact@compaatible.fr</a></p>
          <p>Vous disposez également du droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener">www.cnil.fr</a></p>
        </section>

        <!-- Sécurité -->
        <section class="legal-section">
          <h2>10. Sécurité des données</h2>
          <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :</p>
          <ul>
            <li>Chiffrement des données sensibles (mots de passe)</li>
            <li>Connexions sécurisées (HTTPS)</li>
            <li>Contrôle d'accès strict aux données</li>
            <li>Hébergement sécurisé chez des prestataires reconnus</li>
          </ul>
        </section>

        <!-- Cookies -->
        <section class="legal-section">
          <h2>11. Cookies</h2>
          <p>Notre site utilise des cookies pour :</p>
          <ul>
            <li><strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site (authentification, session)</li>
            <li><strong>Cookies analytiques :</strong> Mesure d'audience et amélioration du service</li>
          </ul>
          <p>Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.</p>
        </section>

        <!-- Mineurs -->
        <section class="legal-section">
          <h2>12. Protection des mineurs</h2>
          <p>Le Service est strictement réservé aux personnes majeures (18 ans et plus). Nous ne collectons pas sciemment de données concernant des mineurs. Si nous découvrons qu'un mineur s'est inscrit, son compte sera immédiatement supprimé.</p>
        </section>

        <!-- Modifications -->
        <section class="legal-section">
          <h2>13. Modifications de la politique</h2>
          <p>Cette politique peut être modifiée pour refléter les évolutions légales ou nos pratiques. Les modifications importantes vous seront notifiées par email ou notification sur le Site.</p>
        </section>

        <!-- Contact -->
        <section class="legal-section">
          <h2>14. Contact</h2>
          <p>Pour toute question relative à cette politique ou à vos données personnelles :</p>
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
            <li><router-link to="/cgu">Conditions Générales d'Utilisation</router-link></li>
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

.legal-section h3 {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-black);
  margin: 20px 0 12px;
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
