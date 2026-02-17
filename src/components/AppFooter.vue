<script setup lang="ts">
import logoImage from '../assets/nouveau logo compaatible.png'
import instagramIcon from '../assets/Instagram_icon.png'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer-wrapper">
    <div class="container-main">
      <!-- Footer Content -->
      <div class="footer-grid">
        <!-- Brand -->
        <div class="footer-brand">
          <router-link to="/" class="footer-logo">
            <img :src="logoImage" alt="Logo Compaatible" class="footer-logo-icon" width="32" height="32" />
            Compaatible
          </router-link>
          <p class="footer-description">
            Une approche différente des rencontres pour des relations qui durent.
          </p>
        </div>

        <!-- Legal Links -->
        <div class="footer-col">
          <p class="footer-col-title" role="heading" aria-level="2">Légal</p>
          <nav class="footer-nav">
            <router-link to="/cgu" class="footer-link">Conditions d'utilisation</router-link>
            <router-link to="/confidentialite" class="footer-link">Politique de confidentialité</router-link>
            <router-link to="/mentions-legales" class="footer-link">Mentions légales</router-link>
          </nav>
        </div>

        <!-- Contact Links -->
        <div class="footer-col">
          <p class="footer-col-title" role="heading" aria-level="2">Contact</p>
          <nav class="footer-nav">
            <a href="mailto:contact@compaatible.fr" class="footer-link">contact@compaatible.fr</a>
            <a href="#" class="footer-link">FAQ</a>
            <span class="footer-social">
              <img :src="instagramIcon" alt="Instagram" class="footer-social-icon" width="20" height="20" />
              Instagram
            </span>
          </nav>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <p>© {{ currentYear }} Compaatible. Tous droits réservés. Fait avec ❤️ pour ceux qui cherchent l'amour.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-wrapper {
  background: #1A1A1A;
  color: white;
  padding: 64px 0 32px;
}

.footer-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
  margin-bottom: 40px;
}

.footer-brand {
  max-width: 280px;
}

.footer-logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.footer-logo-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.footer-description {
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  line-height: 1.6;
}

.footer-col-title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: white;
  margin-bottom: 16px;
  font-size: 0.95rem;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-link {
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: white;
}

.footer-social {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
}

.footer-social-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.footer-social:hover .footer-social-icon {
  opacity: 1;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 32px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
}

/* Tablet */
@media (max-width: 768px) {
  .footer-wrapper {
    padding: 48px 0 24px;
  }

  .footer-grid {
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
  }

  .footer-brand {
    max-width: 100%;
  }
}

/* Small mobile */
@media (max-width: 400px) {
  .footer-wrapper {
    padding: 40px 0 20px;
  }

  .footer-grid {
    gap: 28px;
  }

  .footer-logo {
    font-size: 1.3rem;
    gap: 8px;
  }

  .footer-logo-icon {
    width: 26px;
    height: 26px;
  }

  .footer-description {
    font-size: 0.8rem;
  }

  .footer-col-title {
    font-size: 0.85rem;
    margin-bottom: 12px;
  }

  .footer-link {
    font-size: 0.8rem;
  }

  .footer-social {
    font-size: 0.8rem;
  }

  .footer-bottom {
    padding-top: 24px;
    font-size: 0.75rem;
  }

  .footer-bottom p {
    line-height: 1.5;
  }
}
</style>
