# 🎨 DIRECTION ARTISTIQUE — COMPAATIBLE

## 📐 DESIGN SYSTEM UNIFIÉ

### Couleurs (Palette Principale)
```css
--color-red-pure: #99001B      /* Rouge signature Compaatible */
--color-red-dark: #7A0016      /* Hover/dark states */
--color-red-light: #B5001F     /* Accents */
--color-white-cream: #FBF9F7   /* Background principal */
--color-white: #FEFEFE         /* Cartes/overlays */
--color-black: #1A1A1A         /* Texte principal */
```

### Couleurs Catégories Personnalités
```css
--color-purple-category: #6B3FA0   /* Architectes du Cœur */
--color-green-category: #2D8B57    /* Âmes Lumineuses */
--color-teal-category: #0F766E     /* Gardiens du Lien */
--color-amber-category: #D97706    /* Flammes Libres */
```

### Typographie
```css
Font principale (headings): 'Playfair Display', serif
  - Utilisation: h1, h2, h3, h4, titres décoratifs
  - Weights: 400, 500, 600, 700
  - Style: Regular + Italic

Font secondaire (body): 'Inter', sans-serif
  - Utilisation: paragraphes, labels, buttons, body text
  - Weights: 300, 400, 500, 600
  - Style: Clean, moderne, lisible

Font tertiaire (quotes): 'Cormorant Garamond', serif
  - Utilisation: citations, blockquotes, texte poétique
  - Weights: 400, 500, 600
  - Style: Italic privilégié
```

### Hiérarchie Typographique
```css
H1: font-serif text-4xl md:text-6xl font-bold italic
H2: font-serif text-3xl md:text-4xl font-semibold
H3: font-serif text-xl font-semibold
Body: text-sm md:text-base leading-relaxed
Labels: text-[11px] font-medium uppercase tracking-widest
```

### Espacements Standards
```css
Section padding: py-24 (6rem / 96px)
Container max-width: max-w-7xl (1280px)
Card padding: p-8 (2rem / 32px)
Grid gap: gap-8 (2rem / 32px)
```

### Border Radius
```css
Boutons: rounded-full (9999px)
Cartes principales: rounded-3xl (1.5rem / 24px)
Cartes XL: rounded-[2.5rem] (2.5rem / 40px)
Pills/badges: rounded-full
```

### Ombres
```css
Soft shadow: 0 4px 20px rgba(153, 0, 27, 0.3)
Elevated shadow: 0 8px 30px rgba(153, 0, 27, 0.4)
Category shadow: 0 10px 30px -5px rgba(catColor, 0.25)
Card hover: shadow-xl
```

### Animations & Transitions
```css
Durée standard: duration-500 (500ms)
Durée longue: duration-700 (700ms)
Easing: cubic-bezier(0.165, 0.84, 0.44, 1)

Hover effects:
- Cards: hover:-translate-y-2 hover:shadow-xl
- Buttons: hover:scale-105
- Icons: group-hover:scale-110
```

---

## 🎯 COMPOSANTS STANDARDS

### Buttons

#### Primary Button
```vue
<ButtonPrimary to="/inscription">
  Faire le test
</ButtonPrimary>
```
Classe Tailwind équivalente:
```
rounded-full bg-red-pure px-12 py-4 text-sm font-semibold text-white
shadow-soft hover:scale-105 hover:bg-red-dark hover:shadow-elevated
```

#### Secondary Button
```vue
<ButtonSecondary to="/inscription">
  En savoir plus
</ButtonSecondary>
```
Classe Tailwind équivalente:
```
rounded-full border-2 border-red-pure bg-transparent px-10 py-3
text-xs font-medium text-red-pure hover:bg-red-pure hover:text-white
```

### Cards
```vue
<div class="rounded-3xl bg-white/80 backdrop-blur-sm p-6 md:p-8
     shadow-sm transition-all duration-500
     hover:-translate-y-2 hover:shadow-xl hover:bg-white">
  <!-- Contenu -->
</div>
```

### Section Layout Standard
```vue
<section class="bg-white-cream py-24 relative overflow-hidden">
  <!-- Ambient blurs (optionnel) -->
  <div class="absolute -top-24 -left-24 h-96 w-96 rounded-full
       bg-red-pure/5 blur-3xl"></div>

  <div class="mx-auto max-w-7xl px-6 relative">
    <!-- Header section -->
    <div class="mb-16 text-center">
      <div class="mb-4 inline-flex items-center gap-2 rounded-full
           bg-red-pure/5 px-4 py-1 text-[11px] font-medium
           tracking-widest text-red-pure">
        LABEL
      </div>
      <h2 class="mb-4 font-serif text-4xl font-bold italic
          text-slate-800 md:text-5xl">
        Titre Principal
      </h2>
      <p class="mx-auto max-w-lg font-serif text-lg text-slate-500
         italic opacity-80">
        Sous-titre descriptif
      </p>
    </div>

    <!-- Contenu de la section -->
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <!-- Cards -->
    </div>
  </div>
</section>
```

---

## 🎨 STYLE GUIDE

### Principes de Design

#### 1. Warm Romantic
- Formes arrondies généreuses (rounded-3xl, rounded-full)
- Ombres douces et subtiles
- Couleurs chaudes (rouge, crème, ambre)
- Typographie serif italique pour romance
- Blurs ambiants pour depth

#### 2. Premium Luxury
- Espacements généreux (py-24, p-8, gap-8)
- Animations fluides et élégantes
- Ombres avec couleur brand (rgba(153, 0, 27, ...))
- Hiérarchie claire et sophistiquée
- Attention aux détails (ring-4, drop-shadow-md)

#### 3. Scientific Precision
- Grilles symétriques (grid-cols-2, grid-cols-4)
- Alignements parfaits (items-center, justify-center)
- Typographie sans-serif pour clarté (Inter)
- Structure organisée et prévisible

### Règles d'Usage

#### ✅ À FAIRE
- Utiliser `font-serif` pour tous les titres
- Utiliser `font-sans` pour tous les body texts
- Utiliser `italic` sur les titres serif pour romantisme
- Combiner translate + shadow sur hover pour depth
- Utiliser opacity pour états désactivés/décoratifs
- Préférer `bg-white/80 backdrop-blur-sm` pour glassmorphism
- Utiliser les classes Tailwind custom: `bg-red-pure`, `text-red-pure`

#### ❌ À ÉVITER
- Mélanger plusieurs styles de border-radius sur une page
- Utiliser des couleurs en dur (#99001B) → préférer `bg-red-pure`
- Négliger les états hover/focus
- Oublier les transitions (`transition-all duration-500`)
- Utiliser Comic Sans (jamais, jamais, JAMAIS)
- Créer des buttons avec des styles inline custom

---

## 📱 RESPONSIVE DESIGN

### Breakpoints Tailwind
```css
sm: 640px   /* Tablette portrait */
md: 768px   /* Tablette landscape */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

### Pattern Mobile-First
```vue
<!-- Base: Mobile -->
<div class="grid grid-cols-1 gap-4 p-4">

<!-- Tablette: 2 colonnes -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">

<!-- Desktop: 4 colonnes -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
```

### Tailles Typographiques Responsives
```vue
<h1 class="text-4xl md:text-6xl">Titre</h1>
<h2 class="text-3xl md:text-4xl">Sous-titre</h2>
<p class="text-sm md:text-base">Corps de texte</p>
```

---

## 🚀 CHECKLIST AVANT DÉPLOIEMENT

### Design
- [ ] Couleurs cohérentes (pas de #C41E3A ou autres variants)
- [ ] Typographie unifiée (Playfair + Inter + Cormorant)
- [ ] Espacements standards (py-24, gap-8, p-8)
- [ ] Hover states sur tous éléments cliquables
- [ ] Transitions fluides (duration-500)

### Accessibilité
- [ ] Contraste texte/fond ≥ 4.5:1
- [ ] Focus states visibles
- [ ] Alt text sur toutes images
- [ ] Tailles touch-friendly (≥ 44px)
- [ ] Aria labels sur icônes interactives

### Performance
- [ ] SVG optimisés (SVGO)
- [ ] Images lazy-load
- [ ] Fonts preload
- [ ] CSS purgé (Tailwind)
- [ ] Lighthouse score > 90

### Cohérence
- [ ] Même style de cards partout
- [ ] Même style de buttons partout
- [ ] Même spacing sections partout
- [ ] Logos sans fond blanc
- [ ] Animations cohérentes

---

## 🎨 IDENTITÉ VISUELLE

### Ce qui rend Compaatible unique
1. **Couleur rouge #99001B** (vs concurrents bleu/vert)
2. **Warm Romantic aesthetic** (vs tech froid)
3. **Low-poly avatars SVG** (vs illustrations plates)
4. **4 catégories Big Five** (vs MBTI)
5. **Logos catégories premium** avec relief
6. **Typographie Playfair italic** (élégance intemporelle)

### Ton de Voix Visuel
- **Sophistiqué** mais accessible
- **Romantique** mais scientifique
- **Premium** mais chaleureux
- **Moderne** mais intemporel
- **Français** mais universel

---

*Document mis à jour : Février 2025*
*Version : 1.0 — Post-audit complet*
