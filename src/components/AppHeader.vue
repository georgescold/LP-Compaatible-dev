<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import logoImage from '../assets/nouveau logo compaatible.png'
import LoginModal from './LoginModal.vue'

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const showLoginModal = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

const openLoginModal = () => {
  showLoginModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeLoginModal = () => {
  showLoginModal.value = false
  document.body.style.overflow = ''
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header :class="['header', { 'is-scrolled': isScrolled }]">
    <div class="container-main header-container">
      <router-link to="/" class="logo">
        <img :src="logoImage" alt="Logo Compaatible" class="logo-icon" width="32" height="32" />
        Compaatible
      </router-link>

      <nav class="nav-menu desktop-only">
        <a href="/#technologie" class="nav-link">Le principe</a>
        <a href="/#process" class="nav-link">Comment ça marche ?</a>
        <router-link to="/types-de-personnalite" class="nav-link">Personnalités</router-link>
        <a href="/#faq" class="nav-link">FAQ</a>
        <router-link to="/blog" class="nav-link">Blogs</router-link>
      </nav>

      <div class="desktop-only">
        <button class="btn-secondary header-cta" @click="openLoginModal">Connexion</button>
      </div>

      <button class="mobile-toggle" @click="toggleMenu" aria-label="Menu">
        <Menu class="icon" />
      </button>
    </div>

    <Teleport to="body">
      <div :class="['mobile-overlay', { 'is-open': isMenuOpen }]" @click="toggleMenu"></div>
      <div :class="['mobile-panel', { 'is-open': isMenuOpen }]">
        <div class="mobile-header">
          <span class="mobile-title">Menu</span>
          <button @click="toggleMenu" class="close-btn" aria-label="Fermer le menu"><X /></button>
        </div>
      <nav class="mobile-nav">
        <a href="/#technologie" class="mobile-link" @click="toggleMenu">Le principe</a>
        <a href="/#process" class="mobile-link" @click="toggleMenu">Comment ça marche ?</a>
        <router-link to="/types-de-personnalite" class="mobile-link" @click="toggleMenu">Personnalités</router-link>
        <a href="/#faq" class="mobile-link" @click="toggleMenu">FAQ</a>
        <router-link to="/blog" class="mobile-link" @click="toggleMenu">Blogs</router-link>
      </nav>
      <div class="mobile-footer">
        <button class="btn-primary" style="width:100%;justify-content:center;" @click="toggleMenu(); openLoginModal()">Connexion</button>
      </div>
    </div>
    </Teleport>
  </header>

  <!-- Login Modal -->
  <LoginModal :is-open="showLoginModal" @close="closeLoginModal" />
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 80px;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.header.is-scrolled {
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid var(--color-gray-light);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 48px;
  width: 100%;
}

.logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-black);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.logo-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.nav-menu {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 40px;
}

.nav-link {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-gray-dark);
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 8px 0;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-red-pure);
  transition: width 0.3s ease;
}

.nav-link:hover { color: var(--color-red-pure); }
.nav-link:hover::after { width: 100%; }

.header-cta {
  flex-shrink: 0;
  white-space: nowrap;
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--color-black);
  cursor: pointer;
  padding: 0.5rem;
  z-index: 110;
}

.mobile-toggle .icon { width: 28px; height: 28px; }

@media (max-width: 768px) {
  .desktop-only { display: none; }
  .mobile-toggle { display: block; }
  .header-container {
    display: flex;
    justify-content: space-between;
    padding: 0 24px;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 12px 0;
    height: 64px;
  }

  .header.is-scrolled {
    padding: 10px 0;
  }

  .header-container {
    padding: 0 16px;
  }

  .logo {
    font-size: 1.4rem;
    gap: 8px;
  }

  .logo-icon {
    width: 26px;
  }
}

@media (max-width: 360px) {
  .header-container {
    padding: 0 12px;
  }

  .logo {
    font-size: 1.25rem;
    gap: 6px;
  }

  .logo-icon {
    width: 24px;
  }
}
</style>

<!-- Global styles for Teleported mobile menu (outside scoped) -->
<style>
.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 9998;
}

.mobile-overlay.is-open {
  opacity: 1;
  pointer-events: auto;
}

.mobile-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 85%;
  max-width: 360px;
  background: #FFFFFF;
  z-index: 9999;
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.15);
}

.mobile-panel.is-open {
  transform: translateX(0);
}

.mobile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.mobile-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #1A1A1A;
}

.close-btn {
  background: none;
  border: none;
  color: #1A1A1A;
  cursor: pointer;
  padding: 4px;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.mobile-link {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  color: #1A1A1A;
  text-decoration: none;
  padding: 16px 0;
  border-bottom: 1px solid #E8E8E8;
  transition: color 0.2s ease;
}

.mobile-link:hover {
  color: #8B2D4A;
}

.mobile-footer {
  margin-top: auto;
  padding-top: 2rem;
}
</style>
