# RAPPORT D'AUDIT COMPLET - Compaatible
> Audit automatique du 16/02/2026

---

## 1. TEST DE PERSONNALITE (TestView.vue + bigfive-questions.ts)

### 1.1 Nombre de questions

**CONSTAT IMPORTANT : Le test contient 90 questions, pas 120.**

- O (Ouverture) : 18 questions (3 par facette x 6 facettes)
- C (Conscienciosite) : 18 questions (3 par facette x 6 facettes)
- E (Extraversion) : 18 questions (3 par facette x 6 facettes)
- A (Agreabilite) : 18 questions (3 par facette x 6 facettes)
- N (Neuroticism) : 18 questions (3 par facette x 6 facettes)
- **Total : 90 questions**

Si la spec prevoit 120 questions (24 par domaine, 4 par facette), il manque 30 questions (6 par domaine, 1 par facette). Impact : avec seulement 3 items par facette, le poids de chaque question est de ~33% au lieu de ~25%, ce qui reduit la fiabilite psychometrique.

**Fichier :** `src/data/bigfive-questions.ts`, lignes 33-213

### 1.2 Logique de scoring (processAnswers)

**Fichier :** `src/lib/scoring.ts`

Le scoring est **correct** :
- `processAnswers()` (ligne 31) accumule `score` et `count` par domaine et facette
- `calculateResult()` (ligne 24) utilise `avg = score / count` avec seuils :
  - `avg > 3.5` = `'high'`
  - `avg < 2.5` = `'low'`
  - Sinon = `'neutral'`
- Approche standard pour echelle Likert 1-5, point median 3.0, zone morte 2.5-3.5

### 1.3 Directions de codage (plus/minus)

**CORRECT.** L'objet `choices` gere correctement le reverse scoring :
- `plus` : scores 1, 2, 3, 4, 5 (accord = score eleve)
- `minus` : scores **5, 4, 3, 2, 1** (accord = score bas, inversion)

### 1.4 Echelle Likert

**CORRECT.** 5 choix de "Pas du tout d'accord" (1) a "Tout a fait d'accord" (5) pour `plus`, inverse pour `minus`.

### 1.5 Inversion du domaine N ("Stabilite emotionnelle")

**L'inversion N est correctement implementee partout :**

1. **ResultatsView.vue** :
   - `getPercentage()` : `if (domain === scores.value.N) return 100 - pct` ✓
   - `getFacetPercentage()` : `if (domainKey === 'N') return 100 - pct` ✓
   - `getBadgeText()` : swap 'low'/'high' pour N ✓
   - `getScoreText()` : utilise `getInvertedResult()` pour N ✓
   - `getFacetResult()` : inverse pour N ✓
   - `getFacetText()` : inverse pour N ✓
   - Badge CSS : utilise `getInvertedResult()` pour N ✓

2. **ProfilView.vue** :
   - `domainResults` : `if (key === 'N') percentage = 100 - percentage` ✓
   - `revealScores` : `N: 100 - getPercentage(scores.value.N)` ✓

3. **bigfive-results.ts** :
   - Les cles `high`/`low` sont deja inversees pour N ✓
   - Les textes de facettes sont egalement inverses ✓

**VERDICT : L'inversion N est correcte dans toute l'application.**

---

## 2. DETERMINATION DU TYPE DE PERSONNALITE

### 2.1 Algorithme

**Fichier :** `src/data/personality-types.ts`, lignes 1117-1166

`getPersonalityTypeFromScores()` :
1. Pour chaque domaine (O, C, E, A, N), mappe le resultat en `'high'` ou `'low'`
2. `'neutral'` est resolu en comparant la moyenne a 3.0 : `avg >= 3.0` -> `'high'`, sinon `'low'`
3. Cherche un match exact parmi les 16 types
4. **Fallback :** Si pas de match exact, trouve le type le plus proche par nombre de dimensions correspondantes

### 2.2 Les 16 types et leurs profils Big Five

| # | Type | O | C | E | A | N | Categorie |
|---|------|---|---|---|---|---|-----------|
| 1 | Stratege Serein | H | H | L | L | L | Architectes |
| 2 | Sculpteur Passionne | H | H | L | L | H | Architectes |
| 3 | Commandant Bienveillant | L | H | H | L | L | Architectes |
| 4 | Etoile Magnetique | H | H | H | L | H | Architectes |
| 5 | Sage Bienveillant | H | L | L | H | L | Ames |
| 6 | Reveur Romantique | H | L | L | H | H | Ames |
| 7 | Mentor Solaire | H | L | H | H | L | Ames |
| 8 | Papillon Empathique | H | L | H | H | H | Ames |
| 9 | Protecteur Fidele | L | H | L | H | L | Gardiens |
| 10 | Guerisseur Tendre | L | H | L | H | H | Gardiens |
| 11 | Pilier Rayonnant | L | H | H | H | L | Gardiens |
| 12 | Coeur Volcanique | L | H | H | H | H | Gardiens |
| 13 | Artisan du Moment | L | L | L | L | L | Flammes |
| 14 | Artiste Spontane | H | L | L | L | H | Flammes |
| 15 | Aventurier Audacieux | L | L | H | L | L | Flammes |
| 16 | Comete Flamboyante | H | L | H | L | H | Flammes |

### 2.3 PROBLEME : Couverture des combinaisons

Avec 5 dimensions binaires, il y a 2^5 = **32 combinaisons possibles**. Seules **16 sont couvertes**. Les 16 restantes tombent dans le fallback (type le plus proche). En cas d'egalite, le premier type dans le tableau est choisi, ce qui introduit un biais d'ordre.

### 2.4 Logique des categories

Matrice 2x2 sur C et A :
- C=high + A=low -> **Architectes du Coeur**
- C=low + A=high -> **Ames Lumineuses**
- C=high + A=high -> **Gardiens du Lien**
- C=low + A=low -> **Flammes Libres**

**Coherent et correct.**

---

## 3. AFFICHAGE DES RESULTATS (ResultatsView.vue)

### 3.1 Scores de domaines
- Utilise `domainOrder` : `['O', 'C', 'E', 'A', 'N']` ✓
- Barres de progression avec `getPercentage()` ✓
- Inversion N correcte ✓

### 3.2 Scores de facettes
- 6 facettes par domaine, expansibles ✓
- Pourcentages avec `getFacetPercentage()` et inversion N ✓
- Textes avec `getFacetText()` et inversion N ✓

### 3.3 Flow de reveal de personnalite
- 4 etapes : Categorie -> Type -> Citation -> Resume profil ✓
- Emet `tagline-selected` pour sauvegarder la citation ✓

### 3.4 Mode demo
- Route `/resultats/demo` avec scores hardcodes
- **Bug mineur :** Les scores demo ont `count: 1` avec `result: 'high'` pour score=3.0, alors que `calculateResult()` retournerait `'neutral'`. N'affecte pas les vrais utilisateurs.

### 3.5 Selection du tier
- **Bug moyen :** Le fallback (lignes 301-308) met a jour par `eq('id', userId)` via sessionStorage. Si les politiques RLS exigent `auth_id`, la mise a jour echouera silencieusement.

---

## 4. PROFIL & DASHBOARD (ProfilView.vue)

### 4.1 Chargement des donnees
- Verification de session auth au montage ✓
- Chargement utilisateur par email ✓
- Chargement du type de personnalite et theming ✓
- Chargement des derniers resultats de test ✓

### 4.2 Logique des phases de session
- Comparaison de dates en string (format YYYY-MM-DD, fonctionne correctement) ✓
- **Bug mineur :** `sessionPhase` ne retourne jamais `'validation'` alors que le code le reference dans `countdownLabel`. Code mort.

### 4.3 Affichage des matchs
- Enrichissement avec donnees partenaire ✓
- Lock/unlock par utilisateur ✓
- **Probleme de performance :** N+1 queries (1 requete par match pour charger les donnees partenaire)

### 4.4 Edition du profil
- Formulaire complet avec sauvegarde Supabase ✓
- Upload photo vers bucket `profile-photos` ✓

---

## 5. FLUX DE DONNEES & SUPABASE

### 5.1 Flux complet

1. **Inscription** : Cree compte auth + profil `users` -> redirige vers `/test`
2. **Test** : Repond aux questions -> `processAnswers()` -> `getPersonalityTypeFromScores()` -> insere dans `test_results` + MAJ `users.personality_type`
3. **Resultats** : Charge depuis `test_results` par ID -> reveal overlay
4. **Profil** : Charge user par email -> derniers resultats -> session + matchs

### 5.2 Colonnes Supabase attendues

**Table `users` :**
- `id`, `auth_id`, `first_name`, `last_name`, `email`, `phone`, `city`
- `age`, `gender`, `sexual_orientation`, `instagram`
- `show_phone`, `show_instagram`
- `profile_photo_url`, `banner_color`
- `tier`, `personality_type`, `custom_tagline`
- `created_at`

**Table `test_results` :**
- `id`, `user_id`, `answers`, `scores`, `hobbies`, `ideal_partner`
- `time_elapsed`, `personality_type`, `created_at`

### 5.3 Problemes de gestion null
- **Bug moyen :** `.single()` sans gestion d'erreur dans TestView pour le mode edit
- **Bug mineur :** `catch {}` vide dans le chargement des sessions (ProfilView ligne 862)

### 5.4 Authentification
- **Probleme :** TestView ne verifie pas la session auth, seulement `sessionStorage`
- **Probleme :** Pas de route guards globaux -> les composants s'affichent brievement avant la redirection

---

## 6. ROUTING & NAVIGATION

### 6.1 Toutes les routes

| Chemin | Vue | Auth |
|--------|-----|------|
| `/` | HomeView | Non |
| `/inscription` | InscriptionView | Non |
| `/test` | TestView | Soft (sessionStorage) |
| `/photo` | PhotoUploadView | ? |
| `/resultats/:id` | ResultatsView | Non |
| `/connexion` | ConnexionView | Non |
| `/profil` | ProfilView | Oui |
| `/blog` | BlogListView | Non |
| `/blog/:slug` | ArticleView | Non |
| `/mentions-legales` | MentionsLegalesView | Non |
| `/cgu` | CGUView | Non |
| `/confidentialite` | ConfidentialiteView | Non |
| `/types-de-personnalite` | PersonalityTypesView | Non |
| `/personnalite/:id` | PersonalityDetailView | Non |

### 6.2 Problemes
- **Pas de route 404** : naviguer vers un chemin inconnu affiche une page blanche
- **Resultats accessibles sans auth** : quiconque avec un UUID peut voir les resultats
- **Pas de guards globaux** : auth verifiee per-composant dans `onMounted()`

---

## 7. SYSTEME DE CITATIONS

### 7.1 Couverture des donnees
**16 types x 4 citations = 64 citations. Couverture complete.** ✓

### 7.2 Flow de selection
- Etape 3 du PersonalityReveal : selection radio avec 4 options ✓
- Sauvegarde via `emit('tagline-selected')` -> `saveSelectedTagline()` ✓

### 7.3 Sauvegarde/Chargement
- Save : MAJ `users.custom_tagline` via `auth_id` ✓
- Load : `userData.custom_tagline` dans ProfilView ✓
- **Prerequis SQL :** `ALTER TABLE users ADD COLUMN IF NOT EXISTS custom_tagline TEXT DEFAULT NULL;`

### 7.4 Affichage
- PersonalityCard : `displayTagline = customTagline || personalityType.tagline` ✓
- UserCard : `displayTagline = customTagline || personalityType?.tagline || ''` ✓

---

## 8. SYSTEME DE MATCHING

### 8.1 Fonctionnement
Systeme base sur des sessions mensuelles :
1. Phase inscription (1-9)
2. Phase matching (10-12) : algorithme cote serveur
3. Date de reveal (13) : matchs visibles
4. Post-session (14+) : pre-inscription mois suivant

### 8.2 Algorithme de matching
**L'algorithme n'est PAS dans le code frontend.** Le frontend lit seulement les matchs depuis la table `matches`. Le matching doit etre fait cote serveur (Edge Function Supabase, cron job, ou processus admin).

### 8.3 Donnees de compatibilite
Chaque type a des champs `compatibility.best`, `compatibility.good`, `compatibility.challenging` dans personality-types.ts, mais **aucun code frontend ne les utilise** pour calculer les scores.

---

## 9. QUALITE DU CODE

### 9.1 Imports inutilises
- ProfilView : `smsIconImg` et `instaIconImg` importes mais potentiellement non utilises (UserCard importe ses propres copies)
- `session-dates.ts` : fonctions `getCurrentPhase()`, `isRegistrationOpen()`, `getPhaseLabel()` potentiellement du code mort

### 9.2 Performance
- Import eager de tous les 16 SVGs de personnalite (`import.meta.glob({ eager: true })`)
- Animation constellation en `requestAnimationFrame` continu meme hors viewport
- N+1 queries pour le chargement des matchs

### 9.3 Accessibilite
- PersonalityReveal : pas de focus trap sur l'overlay modal
- TestView : boutons de choix sans `aria-pressed`
- Barres de progression sans `role="progressbar"`, `aria-valuenow`, `aria-valuemax`

### 9.4 Securite
- Resultats accessibles par UUID sans auth
- Selection de tier sans verification de paiement (0 euros pour la premiere edition)
- Pas de guards de route globaux

---

## RESUME PAR SEVERITE

### Critique (2)
1. **90 questions au lieu de 120** - 30 questions manquantes (1 par facette par domaine)
2. **16/32 combinaisons Big Five sans type exact** - fallback avec biais d'ordre

### Moyen (5)
3. La soumission du test cree des doublons (insert au lieu d'upsert)
4. `sessionPhase` reference une phase `'validation'` jamais produite (code mort)
5. Le fallback de sauvegarde du tier utilise `user_id` qui peut bypass les politiques RLS
6. Pas d'algorithme de matching visible dans le codebase frontend
7. Page de resultats accessible sans authentification

### Mineur (6)
8. Pas de route 404 catch-all
9. PersonalityCard utilise une visualisation binaire au lieu de pourcentages
10. Labels de domaines inconsistants ("Conscienciosite" vs "Conscience")
11. Classes CSS mortes dans TestView
12. Chargement eager de tous les SVGs de personnalite
13. Bloc catch vide dans le chargement des sessions

### Qualite de code (4)
14. Pas de guards d'auth globaux sur le routeur
15. Multiples `ref<any>` sans interfaces typees
16. Pattern N+1 queries pour le chargement des matchs
17. Lacunes d'accessibilite (pas de focus trap, ARIA manquants)
