import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: () => import('../views/InscriptionView.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestView.vue')
    },
    {
      path: '/photo',
      name: 'photo',
      component: () => import('../views/PhotoUploadView.vue')
    },
    {
      path: '/resultats/:id',
      name: 'resultats',
      component: () => import('../views/ResultatsView.vue')
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: () => import('../views/ConnexionView.vue')
    },
    {
      path: '/profil',
      name: 'profil',
      component: () => import('../views/ProfilView.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogListView.vue')
    },
    {
      path: '/blog/:slug',
      name: 'article',
      component: () => import('../views/ArticleView.vue')
    },
    {
      path: '/mentions-legales',
      name: 'mentions-legales',
      component: () => import('../views/MentionsLegalesView.vue')
    },
    {
      path: '/cgu',
      name: 'cgu',
      component: () => import('../views/CGUView.vue')
    },
    {
      path: '/confidentialite',
      name: 'confidentialite',
      component: () => import('../views/ConfidentialiteView.vue')
    },
    {
      path: '/types-de-personnalite',
      name: 'personality-types',
      component: () => import('../views/PersonalityTypesView.vue')
    },
    {
      path: '/personnalite/:id',
      name: 'personality-detail',
      component: () => import('../views/PersonalityDetailView.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
