# Design System — Compaatible (Vibe 3: Warm Romantic)

## Reference Code

```vue
<section id="vibe3" class="bg-[#FBF9F7] py-24 relative overflow-hidden">
  <div class="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#8B2D4A]/5 blur-3xl"></div>
  <div class="absolute bottom-0 -right-24 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl"></div>

  <div class="mx-auto max-w-7xl px-6 relative">
    <div class="mb-16 text-center">
      <div class="mb-4 inline-flex items-center gap-2 rounded-full bg-[#8B2D4A]/5 px-4 py-1 text-[11px] font-medium text-[#8B2D4A]">
        <Heart class="h-3 w-3" fill="currentColor" />
        VOTRE DESTINÉE AMOUREUSE
      </div>
      <h2 class="mb-4 font-serif text-4xl font-bold text-[#1A1A1A] md:text-5xl">Les types de personnalité</h2>
      <p class="mx-auto max-w-lg font-serif text-lg text-slate-500 italic opacity-80">
        "Le langage secret de votre cœur enfin décodé."
      </p>
    </div>

    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      <div v-for="cat in categories" :key="cat.id"
        class="flex flex-col items-center rounded-[2.5rem] bg-white p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#8B2D4A]/5">
        <div class="mb-6 flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-700" :style="{ backgroundColor: cat.color + '1a' }">
          <component :is="cat.icon" class="h-7 w-7" :style="{ color: cat.color }" stroke-width="1" />
        </div>
        <h3 class="mb-4 font-serif text-xl font-semibold text-slate-800">{{ cat.name }}</h3>
        <p class="mb-8 text-sm leading-relaxed text-slate-500 italic line-clamp-2">"{{ cat.tagline }}"</p>
        <div class="mt-auto flex flex-wrap justify-center gap-2">
          <span v-for="type in cat.types" :key="type"
            class="rounded-full bg-slate-50 px-3 py-1 text-[10px] font-medium text-slate-400 transition-colors hover:bg-white hover:text-[#8B2D4A] hover:shadow-sm">
            {{ type }}
          </span>
        </div>
      </div>
    </div>

    <div class="mt-20 flex justify-center">
      <button class="group relative flex items-center justify-center rounded-full bg-[#8B2D4A] px-12 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#A03558] hover:shadow-[#8B2D4A]/20">
        Faire le test de personnalité
      </button>
    </div>
  </div>
</section>
```

## Colors

### Brand (harmonized with geometric heart logo)
- Primary Burgundy: `#8B2D4A` — warm burgundy-rose, extracted from logo mid-tones
- Burgundy Dark (hover): `#6B2640` — deep plum from logo shadows
- Burgundy Hover: `#A03558` — slightly lighter for hover states
- Burgundy Light: `#C4637A` — dusty rose from logo highlights
- Burgundy Blush: `#F0D5C8` — cream/blush from logo lightest areas
- Cream Background: `#FBF9F7`
- Warm Background: `#F5F0EB`
- White: `#FEFEFE`
- Black Text: `#1A1A1A`

### Personality Category Colors
- **Architectes du Cœur** (Purple): `#6B3FA0` — bg light: `#6B3FA0/10` → `rgba(107,63,160,0.1)`
- **Âmes Lumineuses** (Green): `#2D8B57` — bg light: `#2D8B57/10`
- **Gardiens du Lien** (Teal): `#0F766E` — bg light: `#0F766E/10`
- **Flammes Libres** (Amber): `#D97706` — bg light: `#D97706/10`

### Grays
- Dark: `#4A4A4A`
- Main: `#5C5C5C`
- Medium: `#787878`
- Light: `#E8E8E8`
- Lighter: `#F5F5F5`

## Typography

### Font Families
- **Headings (serif)**: `'Playfair Display', serif` — used for h1-h4, decorative text
- **Body (sans)**: `'Inter', sans-serif` — used for body, labels, buttons
- **Quotes**: `'Cormorant Garamond', serif` — used for blockquotes

### Heading Styles
- H1: `font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A]`
- H2: `font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A]`
- H3: `font-serif text-xl font-semibold text-slate-800`
- Labels: `text-[10px] md:text-[11px] font-medium uppercase tracking-widest text-[#8B2D4A]`

### Body Text
- Regular: `text-sm leading-relaxed text-slate-500`
- Italic accent: `font-serif italic text-slate-500 opacity-80`

## Components

### Buttons
- **Primary**: `rounded-full bg-[#8B2D4A] px-12 py-4 text-sm font-semibold text-white shadow-lg hover:scale-105 hover:bg-[#A03558]`
- **Secondary**: `rounded-full border border-slate-200 px-10 py-3 text-xs font-medium text-slate-900 hover:border-slate-900 hover:bg-slate-900 hover:text-white`
- **Pill Badge**: `rounded-full bg-[#8B2D4A]/5 px-4 py-1 text-[11px] font-medium text-[#8B2D4A]`

### Cards
- Container: `rounded-[2.5rem] bg-white p-8 shadow-sm`
- Hover: `hover:-translate-y-2 hover:shadow-xl hover:shadow-[#8B2D4A]/5`
- Transition: `transition-all duration-500`

### Decorative Elements
- Ambient blur: `absolute rounded-full bg-[#8B2D4A]/5 blur-3xl`
- Section background: `bg-[#FBF9F7]` (cream) or `bg-white`

## Spacing & Layout
- Container max-width: `max-w-7xl` (1280px)
- Section padding: `py-24` (6rem)
- Card gap: `gap-8` (2rem)
- Scale: **refined** (small, elegant, Apple/Notion-like)

## Animations
- Card hover lift: `hover:-translate-y-2` with `duration-500`
- Button scale: `hover:scale-105`
- Icon scale on group hover: `group-hover:scale-110`
- Smooth transitions: `transition-all duration-500` / `duration-700`
- Cubic bezier (from existing site): `cubic-bezier(0.165, 0.84, 0.44, 1)`

## Vibe Direction
- **Warm Romantic**: soft backgrounds, rounded shapes, warm tones, italic serif accents
- Generous whitespace, light shadows, subtle color accents
- Category colors used as tints (10% opacity backgrounds, colored icons)
- Romantic language in subtitles and labels
- Logo: geometric low-poly heart in burgundy/plum/rose tones — premium, modern, faceted
