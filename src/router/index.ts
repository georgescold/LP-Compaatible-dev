import { createRouter, createWebHistory } from 'vue-router'

// Lazy-load supabase to keep it out of the initial landing page bundle
const getSupabase = () => import('../lib/supabase').then(m => m.supabase)

// Routes that require authentication
const authRequiredRoutes = ['profil', 'resultats']

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
    },
    {
      path: '/carte/:token',
      name: 'carte-publique',
      component: () => import('../views/CartePubliqueView.vue')
    },
    // 404 Catch-all
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/HomeView.vue'),
      beforeEnter: (_to, _from, next) => {
        // Redirect to home for unknown routes
        next({ name: 'home' })
      }
    }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    return { top: 0 }
  }
})

// Global auth guard
router.beforeEach(async (to, _from, next) => {
  if (authRequiredRoutes.includes(to.name as string)) {
    // Allow demo mode for resultats and profil
    if (to.name === 'resultats' && to.params.id === 'demo') {
      return next()
    }
    if (to.name === 'profil' && to.query.demo === 'true') {
      return next()
    }

    const supabase = await getSupabase()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      // No valid Supabase session — clear any stale sessionStorage and redirect
      sessionStorage.removeItem('compaatible_user_id')
      return next({ name: 'connexion' })
    }

    // Sync sessionStorage with current Supabase session if stale or missing
    const sessionUserId = sessionStorage.getItem('compaatible_user_id')
    if (!sessionUserId) {
      const { data: currentUser } = await supabase
        .from('users')
        .select('id')
        .eq('auth_id', session.user.id)
        .single()
      if (currentUser?.id) {
        sessionStorage.setItem('compaatible_user_id', currentUser.id)
      }
    }
  }
  next()
})

export default router
