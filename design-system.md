```vue
<section class="relative min-h-screen flex items-center justify-center overflow-hidden" style="background: #FBF9F7;">
  <!-- Decorative blurs -->
  <div class="absolute top-[-50%] right-[-20%] w-[800px] h-[800px] rounded-full" style="background: radial-gradient(circle, rgba(153, 0, 27, 0.08) 0%, transparent 70%); pointer-events: none;"></div>
  <div class="absolute bottom-[-30%] left-[-10%] w-[600px] h-[600px] rounded-full" style="background: radial-gradient(circle, rgba(153, 0, 27, 0.05) 0%, transparent 70%); pointer-events: none;"></div>

  <div class="container mx-auto px-6 text-center relative z-10" style="max-width: 1200px;">
    <!-- Badge -->
    <div class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border mb-8 text-sm font-medium" style="border-color: #E8E8E8; color: #4A4A4A; box-shadow: 0 2px 10px rgba(0,0,0,0.04);">
      <svg class="w-4 h-4" fill="#99001B" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      Basé sur la science de la personnalité
    </div>

    <!-- Heading -->
    <h1 style="font-family: 'Playfair Display', serif; font-size: clamp(2.8rem, 6vw, 4.5rem); font-weight: 600; line-height: 1.2; color: #1A1A1A; margin-bottom: 24px;">
      Ton <span class="relative inline-block" style="color: #99001B; font-family: 'Playfair Display', serif;">
        âme sœur
        <span class="absolute bottom-[5px] left-0 w-full h-2" style="background: rgba(153, 0, 27, 0.2); z-index: -1;"></span>
      </span> existe.<br/>
      On va la trouver.
    </h1>

    <!-- Subtitle -->
    <p class="mx-auto mb-10" style="font-family: 'Inter', sans-serif; font-size: 1.25rem; color: #4A4A4A; max-width: 600px; line-height: 1.7;">
      Fini les dates décevants et la solitude prolongée. Compaatible analyse ta personnalité en profondeur pour te présenter <strong style="color: #1A1A1A;">la personne la plus compatible avec toi</strong>.
    </p>

    <!-- CTA with glassmorphism container -->
    <div class="inline-block p-1.5 rounded-full mb-5" style="background: rgba(255,255,255,0.5); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.8); box-shadow: 0 8px 32px rgba(153,0,27,0.08);">
      <button class="inline-flex items-center gap-3 px-9 py-4.5 rounded-full text-white font-medium text-lg transition-all" style="background: #99001B; box-shadow: 0 4px 20px rgba(153,0,27,0.3);">
        Participe à l'expérience
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>

    <!-- Price badge -->
    <div class="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-white border text-sm font-medium mb-12" style="border-color: #E8E8E8; color: #1A1A1A;">
      <span style="text-decoration: line-through; opacity: 0.7; color: #4A4A4A;">19,99€</span>
      →
      <span style="color: #99001B; font-weight: 700;">GRATUIT</span>
      · 1ère édition
    </div>

    <!-- Trust badges -->
    <div class="flex flex-wrap justify-center gap-8">
      <div class="flex items-center gap-2 text-sm font-medium" style="color: #4A4A4A;">
        <svg class="w-4.5 h-4.5" fill="#99001B" viewBox="0 0 24 24"><path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/></svg>
        Données 100% confidentielles
      </div>
      <div class="flex items-center gap-2 text-sm font-medium" style="color: #4A4A4A;">
        <svg class="w-4.5 h-4.5" fill="#99001B" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        1 seul match par mois
      </div>
      <div class="flex items-center gap-2 text-sm font-medium" style="color: #4A4A4A;">
        <svg class="w-4.5 h-4.5" fill="#99001B" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
        Sans abonnement
      </div>
    </div>
  </div>
</section>

<!--
DESIGN SYSTEM — Compaatible
Direction: Sérieux romantique, élégant, premium

COLORS:
- Primary Red: #99001B (CTA, accents, icons)
- Dark Red: #7A0016 (hover states)
- Light Red: #B5001F (secondary accents)
- Black: #1A1A1A (headings, text emphasis)
- Cream: #FBF9F7 (backgrounds)
- White: #FEFEFE (cards, containers)
- Gray Dark: #4A4A4A (body text)
- Gray Main: #5C5C5C (secondary text)
- Gray Medium: #787878 (tertiary text)
- Gray Light: #E8E8E8 (borders)
- Gray Lighter: #F5F5F5 (subtle backgrounds)
- Red accent shadows: rgba(153, 0, 27, 0.08-0.4)

FONTS:
- Headings: 'Playfair Display', serif (weight 600-700)
- Body: 'Inter', sans-serif (weight 300-600)
- Quotes: 'Cormorant Garamond', serif

STYLE:
- Rounded corners: 20-24px for cards, 9999px for buttons/badges
- Glassmorphism: rgba(255,255,255,0.5) + backdrop-filter: blur(8px) + border rgba(255,255,255,0.8)
- Subtle shadows: 0 4px 20px rgba(0,0,0,0.05) for cards
- Red accent shadows: 0 4px 20px rgba(153,0,27,0.3) for CTAs
- Hover: translateY(-2px to -6px) with enhanced shadow
- Section padding: ~100px vertical
- Decorative radial gradients with rgba(153,0,27,0.05-0.08)
- Trust badges with red filled icons
- Price display: strikethrough old + bold red FREE
- Pulse glow animation on primary CTA
-->
```
