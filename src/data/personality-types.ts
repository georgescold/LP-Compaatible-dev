// ============================================================
// COMPAATIBLE — 16 Personality Types (Big Five based)
// ============================================================

export interface PersonalityType {
  id: string
  code: string
  name: string
  emoji: string
  tagline: string
  categoryId: string
  avatarFile: string
  bigFive: {
    O: 'high' | 'low'
    C: 'high' | 'low'
    E: 'high' | 'low'
    A: 'high' | 'low'
    N: 'high' | 'low' // N high = instable / N low = stable (displayed inverted)
  }
  quote: {
    text: string
    author: string
  }
  introduction: string
  sections: {
    title: string
    content: string
  }[]
  strengths: { title: string; description: string }[]
  weaknesses: { title: string; description: string }[]
  inLove: {
    intro: string
    sections: { title: string; content: string }[]
  }
  friendships: {
    intro: string
    sections: { title: string; content: string }[]
  }
  compatibility: {
    best: string[]
    good: string[]
    challenging: string[]
  }
  advice: string
}

export interface PersonalityCategory {
  id: string
  name: string
  subtitle: string
  color: string
  colorLight: string
  bgColor: string
  description: string
  types: string[] // PersonalityType ids
}

// ============================================================
// CATEGORIES
// ============================================================

export const personalityCategories: PersonalityCategory[] = [
  {
    id: 'architectes',
    name: 'Les Architectes du Cœur',
    subtitle: 'Structuré + Affirmé',
    color: '#6B3FA0',
    colorLight: '#C8A2E8',
    bgColor: '#F0E6F6',
    description: 'Stratèges relationnels, exigeants et visionnaires. Ils abordent l\'amour avec méthode et profondeur, construisant des relations solides fondées sur le respect mutuel et l\'ambition partagée.',
    types: ['stratege-serein', 'sculpteur-passionne', 'commandant-bienveillant', 'etoile-magnetique']
  },
  {
    id: 'ames',
    name: 'Les Âmes Lumineuses',
    subtitle: 'Libre + Chaleureux',
    color: '#2D8B57',
    colorLight: '#98D7C2',
    bgColor: '#E6F5ED',
    description: 'Empathiques, idéalistes et profondément connectés. Ils vivent l\'amour comme une quête de sens, cherchant des connexions authentiques qui nourrissent l\'âme et éveillent le meilleur en chacun.',
    types: ['sage-bienveillant', 'reveur-romantique', 'mentor-solaire', 'papillon-empathique']
  },
  {
    id: 'gardiens',
    name: 'Les Gardiens du Lien',
    subtitle: 'Structuré + Chaleureux',
    color: '#0F766E',
    colorLight: '#67E8F9',
    bgColor: '#E6F7F5',
    description: 'Fiables, dévoués et bâtisseurs d\'harmonie. Ils incarnent la stabilité émotionnelle et transforment chaque relation en un refuge sûr où l\'amour peut grandir sereinement.',
    types: ['protecteur-fidele', 'guerisseur-tendre', 'pilier-rayonnant', 'coeur-volcanique']
  },
  {
    id: 'flammes',
    name: 'Les Flammes Libres',
    subtitle: 'Libre + Affirmé',
    color: '#D97706',
    colorLight: '#FDE68A',
    bgColor: '#FEF3E2',
    description: 'Passionnés, indépendants et aventuriers du cœur. Ils vivent l\'amour avec intensité et spontanéité, transformant chaque instant partagé en une aventure mémorable.',
    types: ['artisan-du-moment', 'artiste-sauvage', 'aventurier-audacieux', 'comete-flamboyante']
  }
]

// ============================================================
// 16 PERSONALITY TYPES
// ============================================================

export const personalityTypes: PersonalityType[] = [

  // ──────────────────────────────────────────────────────────
  // 🟣 LES ARCHITECTES DU CŒUR
  // ──────────────────────────────────────────────────────────

  {
    id: 'stratege-serein',
    code: 'IASS',
    name: 'Le Stratège Serein',
    emoji: '🏛️',
    tagline: 'Visionnaire calme qui construit l\'amour avec précision et profondeur.',
    categoryId: 'architectes',
    avatarFile: 'stratège serein.svg',
    bigFive: { O: 'high', C: 'high', E: 'low', A: 'low', N: 'low' },
    quote: {
      text: 'Le cœur a ses raisons que la raison ne connaît point, mais la raison peut apprendre à les écouter.',
      author: 'Librement inspiré de Blaise Pascal'
    },
    introduction: 'Le Stratège Serein aborde l\'amour comme un architecte aborde son chef-d\'œuvre : avec vision, patience et une détermination tranquille. Derrière son calme apparent se cache un esprit qui analyse, planifie et construit des fondations relationnelles inébranlables. Il ne tombe pas amoureux par accident — il choisit consciemment d\'investir son cœur, et quand il le fait, c\'est avec une loyauté absolue.',
    sections: [
      {
        title: 'Un esprit stratégique au service du cœur',
        content: 'Le Stratège Serein ne laisse rien au hasard dans sa vie amoureuse. Là où d\'autres se laissent porter par le courant des émotions, lui observe, réfléchit et agit avec intention. Il cherche un partenaire qui partage sa vision à long terme et qui comprend que les plus belles relations se construisent pierre après pierre. Son approche peut sembler détachée au premier abord, mais elle cache une profondeur émotionnelle rare — celle de quelqu\'un qui a choisi de protéger son cœur non pas par peur, mais par respect pour sa propre capacité d\'aimer.'
      },
      {
        title: 'La quête de l\'excellence relationnelle',
        content: 'Pour le Stratège Serein, une relation doit être un espace de croissance mutuelle. Il ne se contente pas d\'une connexion superficielle — il veut comprendre l\'autre dans ses moindres nuances, anticiper ses besoins et construire ensemble quelque chose qui transcende le quotidien. Son ouverture d\'esprit le pousse à explorer des perspectives nouvelles, tandis que sa discipline lui permet de maintenir le cap même dans la tempête. Il est le partenaire qui reste calme quand tout s\'agite, celui qui a toujours un plan B sans jamais perdre de vue le plan A.'
      },
      {
        title: 'L\'intimité comme refuge sacré',
        content: 'Introverti par nature, le Stratège Serein a besoin de solitude pour recharger ses batteries émotionnelles. Il offre à son partenaire un espace de confiance absolue, mais attend en retour le respect de son jardin intérieur. Les conversations de fond le nourrissent bien plus que les bavardages mondains. Il préfère une soirée à deux, à discuter des mystères de l\'univers, plutôt qu\'une fête bondée. Son amour s\'exprime dans les détails : un geste prévenant, une solution trouvée avant même que le problème ne soit formulé, une présence stable et rassurante.'
      }
    ],
    strengths: [
      { title: 'Loyauté indéfectible', description: 'Une fois engagé, le Stratège Serein est un roc. Sa parole est un contrat moral qu\'il honore avec une constance remarquable.' },
      { title: 'Vision à long terme', description: 'Il pense en termes d\'années, pas de semaines. Chaque décision dans le couple est prise avec le futur en perspective.' },
      { title: 'Stabilité émotionnelle', description: 'Sa sérénité naturelle en fait un ancrage dans les moments de turbulence. Il ne panique jamais face aux défis relationnels.' },
      { title: 'Profondeur intellectuelle', description: 'Les conversations avec lui ne sont jamais superficielles. Il stimule l\'esprit de son partenaire et encourage la réflexion.' },
      { title: 'Résolution créative', description: 'Face aux conflits, il cherche des solutions ingénieuses plutôt que de céder à l\'émotion brute.' },
      { title: 'Authenticité', description: 'Il ne joue pas de rôle et ne fait pas de promesses qu\'il ne peut pas tenir. Sa sincérité est désarmante.' }
    ],
    weaknesses: [
      { title: 'Froideur apparente', description: 'Son calme peut être interprété comme du désintérêt. Il doit apprendre à montrer ses émotions, pas seulement les ressentir.' },
      { title: 'Exigences élevées', description: 'Ses standards sont parfois impossibles à atteindre, ce qui peut épuiser un partenaire qui se sent constamment évalué.' },
      { title: 'Difficulté à verbaliser', description: 'Il montre son amour par des actes, mais oublie que les mots ont aussi leur importance. Un "je t\'aime" dit vaut mille gestes silencieux.' },
      { title: 'Tendance à sur-analyser', description: 'Il peut transformer chaque désaccord en problème à résoudre, oubliant que parfois l\'émotion demande simplement à être entendue.' },
      { title: 'Besoin de contrôle', description: 'Sa nature planificatrice peut devenir rigide si elle n\'est pas tempérée par la spontanéité de l\'autre.' }
    ],
    inLove: {
      intro: 'En amour, le Stratège Serein est un partenaire d\'une rare profondeur. Il ne flirte pas à la légère et ne multiplie pas les aventures. Quand il choisit quelqu\'un, c\'est après une réflexion approfondie, et son engagement est total.',
      sections: [
        {
          title: 'La séduction du Stratège',
          content: 'Le Stratège Serein séduit par son intelligence et sa présence rassurante. Il ne fait pas de grandes déclarations ni de gestes spectaculaires — il préfère montrer son intérêt à travers des attentions subtiles mais significatives. Il retient chaque détail partagé et surprend par sa mémoire des petites choses qui comptent. Sa séduction est lente, délibérée et profondément sincère.'
        },
        {
          title: 'Au quotidien',
          content: 'Vivre avec un Stratège Serein, c\'est avoir un partenaire qui anticipe les besoins avant qu\'ils ne soient exprimés. Il crée des routines rassurantes tout en laissant de l\'espace à l\'imprévu quand son partenaire en a besoin. Les week-ends sont souvent consacrés à des activités intellectuelles partagées ou à des projets communs qui renforcent le couple.'
        },
        {
          title: 'Les défis amoureux',
          content: 'Le plus grand défi du Stratège Serein est d\'apprendre que l\'amour ne se planifie pas entièrement. Il doit accepter que la vulnérabilité n\'est pas une faiblesse mais une force, et que son partenaire a parfois besoin d\'entendre ses sentiments plutôt que de les deviner.'
        }
      ]
    },
    friendships: {
      intro: 'Le Stratège Serein entretient un cercle amical restreint mais profond. Chaque amitié est choisie avec soin et nourrie avec constance.',
      sections: [
        {
          title: 'Des amitiés sélectives',
          content: 'Il préfère trois amis proches à trente connaissances. Ses amitiés sont fondées sur le respect intellectuel et la confiance mutuelle. Il est le conseiller vers qui l\'on se tourne dans les moments difficiles.'
        },
        {
          title: 'Un ami fiable',
          content: 'Quand il s\'engage dans une amitié, c\'est pour la vie. Il ne trahit jamais une confidence et se montre d\'une loyauté sans faille, même quand cela lui coûte.'
        }
      ]
    },
    compatibility: {
      best: ['papillon-empathique', 'mentor-solaire', 'comete-flamboyante'],
      good: ['reveur-romantique', 'pilier-rayonnant', 'etoile-magnetique'],
      challenging: ['artiste-sauvage', 'coeur-volcanique', 'aventurier-audacieux']
    },
    advice: 'Pratique la vulnérabilité intentionnelle : exprime ton amour en mots, pas seulement en actes. Ton partenaire ne peut pas lire dans tes pensées, aussi brillantes soient-elles. Un "je t\'aime" dit à voix haute a plus de pouvoir que mille stratégies silencieuses.'
  },

  {
    id: 'sculpteur-passionne',
    code: 'IASI',
    name: 'Le Sculpteur Passionné',
    emoji: '🔮',
    tagline: 'Perfectionniste émotionnel qui transforme chaque relation en œuvre d\'art.',
    categoryId: 'architectes',
    avatarFile: 'sculpteur passionné.svg',
    bigFive: { O: 'high', C: 'high', E: 'low', A: 'low', N: 'high' },
    quote: {
      text: 'La perfection n\'est pas atteinte quand il n\'y a plus rien à ajouter, mais quand il n\'y a plus rien à retrancher — même en amour.',
      author: 'Librement inspiré d\'Antoine de Saint-Exupéry'
    },
    introduction: 'Le Sculpteur Passionné vit l\'amour avec une intensité brûlante tempérée par un besoin irrépressible de perfection. Il façonne ses relations comme un artiste façonne la matière — avec précision, passion et une vision claire de ce que le résultat devrait être. Son monde intérieur est un volcan sous la glace : calme en surface, bouillonnant en profondeur.',
    sections: [
      {
        title: 'L\'artiste des sentiments',
        content: 'Le Sculpteur Passionné ne se contente pas de vivre une relation — il la crée. Chaque moment partagé doit avoir du sens, chaque conversation doit apporter une pierre à l\'édifice. Son ouverture d\'esprit lui permet d\'explorer les dimensions les plus profondes de l\'amour, tandis que sa nature consciencieuse le pousse à perfectionner constamment la dynamique du couple. Il peut passer des heures à analyser une interaction, cherchant à comprendre chaque nuance émotionnelle.'
      },
      {
        title: 'La tempête intérieure',
        content: 'Sous son apparence maîtrisée, le Sculpteur Passionné vit des émotions d\'une intensité rare. Sa sensibilité exacerbée est à la fois sa plus grande force et son plus grand défi. Il ressent tout avec une profondeur qui peut le submerger, mais c\'est cette même intensité qui donne à son amour une qualité presque mystique. Quand il aime, il aime avec chaque fibre de son être.'
      },
      {
        title: 'La quête de l\'idéal',
        content: 'Le danger pour le Sculpteur Passionné est de poursuivre un idéal amoureux impossible. Il peut passer d\'une exaltation absolue à une déception profonde quand la réalité ne correspond pas à sa vision. Apprendre à embrasser l\'imperfection est son plus grand défi — et sa plus grande opportunité de croissance.'
      }
    ],
    strengths: [
      { title: 'Profondeur émotionnelle', description: 'Il accède à des couches de l\'amour que peu de gens peuvent atteindre. Ses sentiments ont une richesse incomparable.' },
      { title: 'Créativité relationnelle', description: 'Il trouve des moyens uniques et surprenants d\'exprimer son amour. Chaque geste est pensé comme une œuvre d\'art.' },
      { title: 'Engagement total', description: 'Quand il s\'investit, c\'est corps et âme. Il ne fait jamais les choses à moitié.' },
      { title: 'Perception fine', description: 'Il capte les moindres changements d\'humeur et les non-dits avec une acuité remarquable.' },
      { title: 'Authenticité brute', description: 'Il ne triche jamais avec ses sentiments. Sa sincérité, même quand elle dérange, est toujours vraie.' }
    ],
    weaknesses: [
      { title: 'Perfectionnisme toxique', description: 'Son besoin de perfection peut étouffer la spontanéité et créer une pression constante dans le couple.' },
      { title: 'Instabilité émotionnelle', description: 'Ses hauts sont très hauts et ses bas très bas. Le partenaire peut se sentir sur des montagnes russes émotionnelles.' },
      { title: 'Tendance à l\'isolement', description: 'Quand il souffre, il se replie sur lui-même au lieu de communiquer, créant un mur invisible.' },
      { title: 'Critique intérieure', description: 'Il est son propre juge le plus sévère, et cette exigence peut déborder sur le partenaire.' },
      { title: 'Idéalisation', description: 'Il peut placer l\'autre sur un piédestal puis être dévasté quand la réalité le rattrape.' }
    ],
    inLove: {
      intro: 'En amour, le Sculpteur Passionné est un volcan de sentiments. Sa capacité à aimer est immense, mais son intensité peut effrayer ceux qui ne sont pas prêts pour une telle profondeur.',
      sections: [
        {
          title: 'Une passion sculptée',
          content: 'Le Sculpteur Passionné aborde la séduction comme un art. Il ne drague pas — il crée une connexion. Ses premières interactions sont intenses, pleines de sous-entendus intellectuels et de regards chargés de sens. Il teste la profondeur de l\'autre avant de se révéler, comme un sculpteur qui étudie sa matière avant le premier coup de ciseau.'
        },
        {
          title: 'L\'amour au quotidien',
          content: 'Vivre avec un Sculpteur Passionné, c\'est ne jamais s\'ennuyer émotionnellement. Il transforme les rituels du couple en moments significatifs. Un dîner n\'est jamais juste un dîner — c\'est une occasion de se reconnecter. Mais ses standards élevés peuvent rendre le quotidien épuisant si le partenaire ne partage pas ce besoin d\'intensité constante.'
        },
        {
          title: 'Les épreuves',
          content: 'Les conflits avec le Sculpteur Passionné sont intenses mais transformateurs. Il ne fuit pas les confrontations émotionnelles — il les voit comme des opportunités de renforcer le lien. Son défi est d\'apprendre à lâcher prise sans avoir l\'impression de renoncer à ses standards.'
        }
      ]
    },
    friendships: {
      intro: 'Le Sculpteur Passionné a peu d\'amis, mais chacun occupe une place irremplaçable dans sa vie.',
      sections: [
        {
          title: 'Des liens intenses',
          content: 'Ses amitiés ressemblent à ses amours : profondes, exigeantes et transformatrices. Il attend de ses amis la même authenticité qu\'il offre.'
        },
        {
          title: 'Le confident absolu',
          content: 'Quand on gagne sa confiance, on gagne un confident d\'une loyauté féroce. Il est le premier à prendre la défense de ses proches, même au prix de sa propre tranquillité.'
        }
      ]
    },
    compatibility: {
      best: ['mentor-solaire', 'pilier-rayonnant', 'sage-bienveillant'],
      good: ['stratege-serein', 'guerisseur-tendre', 'reveur-romantique'],
      challenging: ['aventurier-audacieux', 'comete-flamboyante', 'artisan-du-moment']
    },
    advice: 'L\'imperfection est la matière première des plus belles histoires d\'amour. Apprends à voir la beauté dans les fêlures — c\'est par elles que la lumière entre. Ton art n\'est pas de créer un amour parfait, mais de sublimer un amour réel.'
  },

  {
    id: 'commandant-bienveillant',
    code: 'EASS',
    name: 'Le Commandant Bienveillant',
    emoji: '👑',
    tagline: 'Leader naturel du couple, stable, déterminé et profondément protecteur.',
    categoryId: 'architectes',
    avatarFile: 'le commandant bienveillant.svg',
    bigFive: { O: 'low', C: 'high', E: 'high', A: 'low', N: 'low' },
    quote: {
      text: 'Le vrai pouvoir en amour n\'est pas de dominer l\'autre, mais de créer un espace où les deux peuvent s\'élever.',
      author: 'Sagesse relationnelle'
    },
    introduction: 'Le Commandant Bienveillant dirige le navire du couple avec une main ferme et un cœur tendre. Son charisme naturel et sa stabilité émotionnelle en font un partenaire sur lequel on peut compter en toutes circonstances. Il ne cherche pas à contrôler — il cherche à protéger, à guider et à construire un empire à deux.',
    sections: [
      {
        title: 'Le capitaine du navire',
        content: 'Le Commandant Bienveillant prend naturellement les rênes dans une relation. Non pas par besoin de domination, mais parce qu\'il a une vision claire de là où le couple peut aller. Il est celui qui prend les décisions difficiles, qui organise les projets communs et qui maintient le cap quand la tempête frappe. Sa confiance en lui est contagieuse — auprès de lui, son partenaire se sent capable de tout.'
      },
      {
        title: 'La force de la stabilité',
        content: 'Sa stabilité émotionnelle est son plus grand atout. Dans un monde où tout est incertain, le Commandant Bienveillant est une constante. Il ne panique pas, ne dramatise pas et ne fuit pas face aux problèmes. Cette sérénité peut parfois être perçue comme un manque d\'empathie, mais en réalité, elle est le fondement sur lequel il construit la sécurité du couple.'
      },
      {
        title: 'L\'ambition partagée',
        content: 'Pour le Commandant Bienveillant, l\'amour est un projet d\'équipe. Il pousse son partenaire vers l\'excellence, non pas par exigence mais par croyance sincère en son potentiel. Il est le premier supporter, le coach motivant et le partenaire stratégique. Son plus grand bonheur est de voir la personne qu\'il aime réussir et s\'épanouir.'
      }
    ],
    strengths: [
      { title: 'Leadership naturel', description: 'Il sait prendre des décisions et assumer les responsabilités du couple avec aisance et confiance.' },
      { title: 'Protection instinctive', description: 'Il crée un bouclier de sécurité autour de son partenaire, tant matériel qu\'émotionnel.' },
      { title: 'Honnêteté directe', description: 'Pas de jeux ni de manipulations — il dit ce qu\'il pense avec respect mais sans détour.' },
      { title: 'Ambition constructive', description: 'Il inspire son partenaire à viser plus haut et l\'accompagne dans cette ascension.' },
      { title: 'Fiabilité absolue', description: 'Quand il dit quelque chose, c\'est fait. Sa parole est son engagement le plus sacré.' },
      { title: 'Gestion des crises', description: 'Dans les moments difficiles, il garde la tête froide et trouve des solutions pragmatiques.' }
    ],
    weaknesses: [
      { title: 'Tendance à dominer', description: 'Son leadership peut devenir étouffant si le partenaire n\'a pas assez d\'espace pour s\'exprimer et décider.' },
      { title: 'Impatience émotionnelle', description: 'Il peut manquer de patience face aux émotions qu\'il juge "irrationnelles" ou improductives.' },
      { title: 'Franchise brutale', description: 'Sa directness peut blesser sans qu\'il en ait l\'intention. Il oublie que la vérité a besoin d\'un emballage parfois.' },
      { title: 'Difficulté à ralentir', description: 'Toujours en mode "action", il peut négliger les moments de simple présence et de douceur.' },
      { title: 'Besoin de reconnaissance', description: 'Il a besoin que ses efforts soient reconnus et peut se sentir invisible si le partenaire ne verbalise pas sa gratitude.' }
    ],
    inLove: {
      intro: 'En amour, le Commandant Bienveillant est un partenaire entier et déterminé. Il ne fait pas les choses à moitié et attend la même intensité d\'engagement en retour.',
      sections: [
        {
          title: 'Une séduction directe',
          content: 'Le Commandant Bienveillant ne tourne pas autour du pot. Quand quelqu\'un lui plaît, il le montre clairement. Sa séduction passe par l\'assurance et l\'action : il organise, il planifie, il impressionne. Pas de jeux de chat et de souris — il préfère une approche franche et respectueuse.'
        },
        {
          title: 'Construire ensemble',
          content: 'Pour lui, être en couple c\'est former une équipe. Il adore les projets communs — acheter un appartement, voyager, créer une entreprise. Chaque étape franchie ensemble renforce le lien. Il est le plus heureux quand le couple avance, grandit et se dépasse.'
        },
        {
          title: 'Apprendre la douceur',
          content: 'Son plus grand défi amoureux est d\'apprendre que l\'efficacité n\'est pas tout. Parfois, son partenaire n\'a pas besoin d\'une solution — juste d\'une oreille attentive et d\'un câlin. Développer cette douceur est sa voie vers l\'amour complet.'
        }
      ]
    },
    friendships: {
      intro: 'Le Commandant Bienveillant est l\'ami vers qui l\'on se tourne quand on a besoin d\'un conseil concret et d\'un coup de main efficace.',
      sections: [
        {
          title: 'Le pilier du groupe',
          content: 'Il est souvent le leader de son groupe d\'amis — celui qui organise les sorties, prend les décisions et s\'assure que tout le monde va bien.'
        },
        {
          title: 'Un soutien concret',
          content: 'Il ne se contente pas de paroles réconfortantes. Quand un ami est dans le besoin, il agit : il aide à déménager, prête de l\'argent, mobilise son réseau. Son amitié se mesure en actes.'
        }
      ]
    },
    compatibility: {
      best: ['reveur-romantique', 'guerisseur-tendre', 'papillon-empathique'],
      good: ['sculpteur-passionne', 'sage-bienveillant', 'protecteur-fidele'],
      challenging: ['artiste-sauvage', 'comete-flamboyante', 'etoile-magnetique']
    },
    advice: 'Le plus beau cadeau que tu puisses offrir à ton partenaire n\'est pas ta protection, mais ta vulnérabilité. Apprends à poser les armes, à écouter sans chercher à résoudre, et à laisser l\'autre te guider parfois. L\'amour n\'est pas un projet à manager — c\'est un jardin à cultiver ensemble.'
  },

  {
    id: 'etoile-magnetique',
    code: 'EASI',
    name: 'L\'Étoile Magnétique',
    emoji: '⚡',
    tagline: 'Charismatique et passionnée, elle électrise chaque relation qu\'elle touche.',
    categoryId: 'architectes',
    avatarFile: "l'étoile magnétique.svg",
    bigFive: { O: 'high', C: 'high', E: 'high', A: 'low', N: 'high' },
    quote: {
      text: 'Je ne cherche pas quelqu\'un qui me complète — je cherche quelqu\'un qui ne me freine pas.',
      author: 'Mantra de l\'Étoile Magnétique'
    },
    introduction: 'L\'Étoile Magnétique est une force de la nature relationnelle. Son charisme est magnétique, son énergie est contagieuse et son intensité émotionnelle est volcanique. Elle combine une ambition dévorante avec une sensibilité à fleur de peau, créant un cocktail fascinant qui attire et déstabilise en parts égales.',
    sections: [
      {
        title: 'L\'attraction irrésistible',
        content: 'L\'Étoile Magnétique n\'entre pas dans une pièce — elle la remplit. Son extraversion débordante, combinée à une intelligence vive et une créativité sans limites, fait d\'elle le centre de gravité de tout rassemblement. En amour, cette magnétisme se traduit par une capacité unique à captiver et fasciner. Mais attention : son intensité n\'est pas un spectacle — c\'est l\'expression brute de qui elle est.'
      },
      {
        title: 'Le feu sous la glace',
        content: 'Malgré son assurance apparente, l\'Étoile Magnétique vit avec une sensibilité émotionnelle intense. Elle ressent tout avec une acuité presque douloureuse. Cette dualité — force extérieure et vulnérabilité intérieure — est ce qui la rend si fascinante et si complexe. Elle a besoin d\'un partenaire qui voit au-delà du spectacle et qui accueille sa fragilité.'
      },
      {
        title: 'Ambition et amour',
        content: 'Pour l\'Étoile Magnétique, l\'amour ne doit jamais freiner l\'ambition — il doit l\'amplifier. Elle cherche un partenaire qui est son égal, quelqu\'un avec qui elle peut conquérir le monde sans jamais se sentir diminuée. La médiocrité est son ennemi juré, tant dans sa carrière que dans ses relations.'
      }
    ],
    strengths: [
      { title: 'Charisme électrisant', description: 'Sa présence illumine et motive. Auprès d\'elle, son partenaire se sent vivant et inspiré.' },
      { title: 'Ambition contagieuse', description: 'Elle pousse naturellement les gens autour d\'elle vers l\'excellence et le dépassement.' },
      { title: 'Créativité amoureuse', description: 'Elle réinvente constamment la relation, gardant la flamme vivante et l\'ennui impossible.' },
      { title: 'Passion totale', description: 'Quand elle aime, c\'est avec une intensité qui consume et transforme. Rien n\'est tiède.' },
      { title: 'Honnêteté magnétique', description: 'Elle est d\'une franchise parfois déstabilisante mais toujours authentique.' }
    ],
    weaknesses: [
      { title: 'Intensité épuisante', description: 'Son énergie constante peut fatiguer un partenaire qui a besoin de calme et de prévisibilité.' },
      { title: 'Compétitivité relationnelle', description: 'Elle peut inconsciemment transformer le couple en terrain de compétition plutôt que de coopération.' },
      { title: 'Montagnes russes émotionnelles', description: 'Ses hauts sont euphoriques et ses bas sont abyssaux. Le partenaire doit être solide.' },
      { title: 'Impatience', description: 'Elle veut tout, tout de suite, et supporte mal la lenteur dans l\'évolution de la relation.' },
      { title: 'Difficulté à lâcher le contrôle', description: 'Elle a besoin de se sentir aux commandes, ce qui peut étouffer l\'autonomie du partenaire.' }
    ],
    inLove: {
      intro: 'En amour, l\'Étoile Magnétique est un feu d\'artifice permanent. Elle ne fait rien à moitié et attend la même intensité en retour.',
      sections: [
        {
          title: 'Séduction haute tension',
          content: 'L\'Étoile Magnétique séduit comme elle vit : avec éclat. Son regard capte, sa conversation stimule, son énergie enveloppe. Elle est de celles qu\'on n\'oublie jamais après une première rencontre. Mais sous le charme se cache une vraie sélectivité — elle est fascinante, mais elle ne se donne qu\'à ceux qui méritent son respect.'
        },
        {
          title: 'Un amour volcanique',
          content: 'La vie de couple avec l\'Étoile Magnétique est tout sauf ennuyeuse. Projets ambitieux, discussions passionnées, réconciliations intenses — tout est vécu à cent à l\'heure. Elle transforme chaque journée ordinaire en aventure extraordinaire.'
        },
        {
          title: 'Trouver l\'équilibre',
          content: 'Son défi majeur est d\'apprendre que l\'amour a aussi besoin de silences, de douceur et de moments sans enjeu. Trouver un partenaire qui sait la calmer sans l\'éteindre est sa quête ultime.'
        }
      ]
    },
    friendships: {
      intro: 'L\'Étoile Magnétique a un cercle social large et admiratif, mais peu d\'amis véritables qui la connaissent vraiment.',
      sections: [
        {
          title: 'Le catalyseur',
          content: 'Dans un groupe, elle est celle qui lance les projets, les défis et les aventures. Son enthousiasme est irrésistible et sa capacité à fédérer est exceptionnelle.'
        },
        {
          title: 'La loyauté féroce',
          content: 'Ses vrais amis bénéficient d\'une loyauté sans faille. Elle se bat pour eux avec la même intensité qu\'elle met dans tout le reste de sa vie.'
        }
      ]
    },
    compatibility: {
      best: ['stratege-serein', 'sage-bienveillant', 'protecteur-fidele'],
      good: ['pilier-rayonnant', 'artisan-du-moment', 'commandant-bienveillant'],
      challenging: ['sculpteur-passionne', 'coeur-volcanique', 'artiste-sauvage']
    },
    advice: 'Ton éclat est un don rare — apprends à le tamiser sans l\'éteindre. L\'amour le plus puissant n\'est pas celui qui brille le plus fort, mais celui qui brille le plus longtemps. Offre à ton partenaire le privilège de voir ta lumière douce, celle que tu caches derrière les étoiles.'
  },

  // ──────────────────────────────────────────────────────────
  // 🟢 LES ÂMES LUMINEUSES
  // ──────────────────────────────────────────────────────────

  {
    id: 'sage-bienveillant',
    code: 'ICLS',
    name: 'Le Sage Bienveillant',
    emoji: '🌿',
    tagline: 'Présence douce et rassurante, refuge émotionnel pour les cœurs en quête de paix.',
    categoryId: 'ames',
    avatarFile: 'le sage bienveillant.svg',
    bigFive: { O: 'high', C: 'low', E: 'low', A: 'high', N: 'low' },
    quote: {
      text: 'Le plus grand acte d\'amour est la présence silencieuse — être là, simplement là, sans chercher à changer quoi que ce soit.',
      author: 'Sagesse du Sage Bienveillant'
    },
    introduction: 'Le Sage Bienveillant est le havre de paix que tout cœur tourmenté recherche. Sa sérénité n\'est pas de l\'indifférence — c\'est le fruit d\'une compréhension profonde de la nature humaine. Il accueille l\'autre avec une douceur qui guérit, une patience qui rassure et une sagesse qui éclaire sans juger.',
    sections: [
      { title: 'La paix intérieure comme fondation', content: 'Le Sage Bienveillant a atteint un équilibre intérieur rare. Sa stabilité émotionnelle n\'est pas le résultat d\'une insensibilité mais d\'une profonde connaissance de soi. Il a appris à accueillir ses émotions sans se laisser submerger, et cette sérénité rayonne autour de lui comme une lumière douce et constante. En couple, il est le pilier tranquille sur lequel l\'autre peut s\'appuyer.' },
      { title: 'L\'écoute comme art', content: 'Sa plus grande qualité est sa capacité d\'écoute. Le Sage Bienveillant ne cherche pas à résoudre ou à conseiller — il écoute, vraiment. Cette présence attentive crée un espace de sécurité émotionnelle où le partenaire peut se révéler sans crainte du jugement. C\'est un don rare dans un monde où tout le monde parle mais où si peu écoutent.' },
      { title: 'La liberté dans l\'amour', content: 'Peu attaché aux conventions, le Sage Bienveillant laisse à son partenaire la liberté d\'être pleinement lui-même. Il n\'essaie pas de changer l\'autre — il l\'accepte dans sa totalité, ombres incluses. Cette acceptation inconditionnelle est le terreau sur lequel l\'amour le plus profond peut grandir.' }
    ],
    strengths: [
      { title: 'Sérénité contagieuse', description: 'Sa présence calme les tempêtes émotionnelles et crée un environnement de paix.' },
      { title: 'Écoute profonde', description: 'Il entend ce qui n\'est pas dit et comprend ce qui n\'est pas exprimé.' },
      { title: 'Acceptation inconditionnelle', description: 'Il accueille l\'autre tel qu\'il est, sans agenda caché ni désir de transformation.' },
      { title: 'Sagesse relationnelle', description: 'Sa compréhension de la nature humaine lui permet de naviguer les conflits avec grâce.' },
      { title: 'Patience infinie', description: 'Il sait que les belles choses prennent du temps et ne force jamais le rythme de la relation.' }
    ],
    weaknesses: [
      { title: 'Passivité', description: 'Sa sérénité peut devenir de l\'inaction. Il peut laisser des problèmes s\'envenimer par aversion pour le conflit.' },
      { title: 'Manque d\'ambition relationnelle', description: 'Il peut se contenter du statu quo au lieu de pousser le couple vers la croissance.' },
      { title: 'Difficulté à s\'affirmer', description: 'Sa bienveillance peut l\'empêcher de poser des limites claires quand c\'est nécessaire.' },
      { title: 'Retrait émotionnel', description: 'Face au stress, il peut se retirer dans son monde intérieur, laissant le partenaire se sentir exclu.' }
    ],
    inLove: {
      intro: 'En amour, le Sage Bienveillant offre un amour paisible et profond, loin des drames et des passions destructrices.',
      sections: [
        { title: 'Une séduction tranquille', content: 'Il ne séduit pas — il attire par sa présence. Son calme, son écoute et sa douceur naturelle créent un magnétisme subtil qui touche les âmes sensibles. Les premières rencontres avec lui ressemblent à une conversation avec un vieil ami.' },
        { title: 'Un amour quotidien', content: 'Vivre avec le Sage Bienveillant, c\'est redécouvrir la beauté des choses simples. Un thé partagé le matin, une promenade silencieuse en forêt, une soirée de lecture côte à côte — son amour se niche dans ces instants de plénitude ordinaire.' },
        { title: 'Grandir ensemble', content: 'Son défi est d\'apprendre à exprimer ses propres besoins au lieu de toujours s\'effacer. L\'amour n\'est pas seulement donner — c\'est aussi oser recevoir.' }
      ]
    },
    friendships: {
      intro: 'Le Sage Bienveillant est l\'ami que l\'on appelle à 3h du matin quand le monde s\'effondre.',
      sections: [
        { title: 'Le confident universel', content: 'Tout le monde se confie à lui car il écoute sans juger. Il porte les secrets des autres avec une discrétion absolue.' },
        { title: 'Une présence silencieuse', content: 'Il n\'est pas l\'ami le plus drôle ni le plus extraverti, mais il est celui qui reste quand tout le monde est parti.' }
      ]
    },
    compatibility: {
      best: ['etoile-magnetique', 'sculpteur-passionne', 'coeur-volcanique'],
      good: ['stratege-serein', 'reveur-romantique', 'protecteur-fidele'],
      challenging: ['aventurier-audacieux', 'comete-flamboyante', 'commandant-bienveillant']
    },
    advice: 'Ta paix est un don immense, mais l\'amour a parfois besoin que tu prennes position. Apprends à dire "j\'ai besoin de..." avec la même douceur que tu dis "de quoi as-tu besoin ?". Tes besoins comptent autant que ceux des autres.'
  },

  {
    id: 'reveur-romantique',
    code: 'ICLI',
    name: 'Le Rêveur Romantique',
    emoji: '🌸',
    tagline: 'Idéaliste profond qui vit l\'amour comme un poème qu\'il écrit chaque jour.',
    categoryId: 'ames',
    avatarFile: 'le reveur romantique.svg',
    bigFive: { O: 'high', C: 'low', E: 'low', A: 'high', N: 'high' },
    quote: { text: 'L\'amour véritable commence quand on accepte d\'aimer quelqu\'un pour ce qu\'il est, pas pour ce qu\'on voudrait qu\'il soit.', author: 'Sagesse du Rêveur Romantique' },
    introduction: 'Le Rêveur Romantique vit dans un monde où l\'amour est la force la plus puissante de l\'univers. Idéaliste jusqu\'au bout des ongles, il projette sur la relation une vision poétique qui la sublimise — mais qui peut aussi l\'écraser sous le poids des attentes. Son cœur est un jardin luxuriant, fertile et fragile à la fois.',
    sections: [
      { title: 'Le poète du cœur', content: 'Le Rêveur Romantique exprime l\'amour avec une créativité qui touche l\'âme. Une lettre manuscrite, une playlist composée comme un récit, un message envoyé au moment parfait — chaque geste est une œuvre d\'art. Son imagination transforme le quotidien en conte de fées, et sa sensibilité capte les nuances que les autres manquent. Aimer un Rêveur Romantique, c\'est être vu dans sa plus belle lumière.' },
      { title: 'L\'idéal et le réel', content: 'Son plus grand combat est la confrontation entre le rêve et la réalité. Il a tendance à idéaliser le partenaire et la relation, construisant dans son esprit une version embellie qui ne correspond pas toujours au quotidien. Quand la magie se dissipe, la déception peut être dévastatrice. Son défi de vie est d\'apprendre à trouver la poésie dans l\'imperfection.' },
      { title: 'La vulnérabilité comme force', content: 'Le Rêveur Romantique ressent tout avec une intensité qui le rend à la fois magnifique et fragile. Ses émotions sont à fleur de peau, et il ne cherche pas à les masquer. Cette vulnérabilité est sa plus grande force — elle permet une intimité rare — mais aussi sa plus grande faiblesse quand elle n\'est pas accueillie avec tendresse.' }
    ],
    strengths: [
      { title: 'Expression poétique', description: 'Il trouve des moyens uniques et touchants d\'exprimer son amour.' },
      { title: 'Empathie profonde', description: 'Il ressent les émotions de l\'autre comme les siennes propres.' },
      { title: 'Fidélité aux valeurs', description: 'Ses convictions profondes sont le socle de son engagement amoureux.' },
      { title: 'Présence émotionnelle', description: 'Il est pleinement présent dans les moments partagés.' },
      { title: 'Capacité de transcendance', description: 'Il voit au-delà du visible et touche l\'essence des choses.' }
    ],
    weaknesses: [
      { title: 'Idéalisation excessive', description: 'Il peut mettre l\'autre sur un piédestal impossible et souffrir quand la réalité le rattrape.' },
      { title: 'Évitement du conflit', description: 'Il préfère souffrir en silence plutôt que de provoquer une confrontation.' },
      { title: 'Hypersensibilité', description: 'Une critique même légère peut le blesser profondément.' },
      { title: 'Déconnexion pratique', description: 'Tellement dans son monde intérieur qu\'il oublie les réalités logistiques du couple.' }
    ],
    inLove: {
      intro: 'En amour, le Rêveur Romantique est le partenaire le plus poétique et le plus dévoué — à condition qu\'on sache accueillir son intensité.',
      sections: [
        { title: 'La séduction du rêveur', content: 'Il séduit par sa profondeur et son authenticité. Là où d\'autres jouent un rôle, lui se montre tel qu\'il est, avec une sincérité désarmante qui touche les cœurs les plus blindés.' },
        { title: 'L\'amour au quotidien', content: 'Chaque jour avec lui est ponctué de petits rituels de tendresse. Il transforme les moments ordinaires en souvenirs précieux et nourrit la relation d\'attentions constantes.' },
        { title: 'Embrasser le réel', content: 'Son défi est d\'apprendre que l\'amour réel, avec ses imperfections, est plus beau que n\'importe quel rêve. La magie n\'est pas dans la perfection — elle est dans le choix quotidien de s\'aimer tel que l\'on est.' }
      ]
    },
    friendships: {
      intro: 'Le Rêveur Romantique est l\'ami qui se souvient de votre chanson préférée et qui écrit des messages de trois pages pour votre anniversaire.',
      sections: [
        { title: 'L\'ami poétique', content: 'Ses amitiés sont profondes, significatives et nourries de longues conversations sur le sens de la vie.' },
        { title: 'Le gardien des souvenirs', content: 'Il est la mémoire émotionnelle du groupe, celui qui rappelle les beaux moments quand le moral est bas.' }
      ]
    },
    compatibility: {
      best: ['commandant-bienveillant', 'pilier-rayonnant', 'protecteur-fidele'],
      good: ['sage-bienveillant', 'sculpteur-passionne', 'guerisseur-tendre'],
      challenging: ['artisan-du-moment', 'aventurier-audacieux', 'etoile-magnetique']
    },
    advice: 'L\'amour parfait n\'existe pas — mais l\'amour vrai, oui. Apprends à écrire ton poème avec les mots imparfaits de la réalité. C\'est dans les fêlures du quotidien que naissent les vers les plus beaux.'
  },

  {
    id: 'mentor-solaire',
    code: 'ECLS',
    name: 'Le Mentor Solaire',
    emoji: '☀️',
    tagline: 'Guide lumineux qui illumine la relation de sa joie et de son empathie.',
    categoryId: 'ames',
    avatarFile: 'le mentor solaire.svg',
    bigFive: { O: 'high', C: 'low', E: 'high', A: 'high', N: 'low' },
    quote: { text: 'Aimer, c\'est voir en l\'autre un soleil que les nuages cachent encore.', author: 'Philosophie du Mentor Solaire' },
    introduction: 'Le Mentor Solaire est le catalyseur émotionnel du couple. Son énergie chaleureuse et sa capacité à voir le meilleur en chacun créent un espace où l\'amour grandit naturellement. Il inspire, encourage et élève — mais doit apprendre que son propre soleil a aussi besoin d\'être nourri.',
    sections: [
      { title: 'Le soleil du couple', content: 'Le Mentor Solaire irradie une chaleur naturelle qui attire les gens comme des tournesols vers la lumière. En couple, il est celui qui maintient l\'énergie positive, qui trouve toujours un angle lumineux même dans les situations sombres. Son optimisme n\'est pas naïf — il est le fruit d\'une compréhension profonde que l\'amour est un choix quotidien.' },
      { title: 'Le guide bienveillant', content: 'Il a un don pour voir le potentiel caché en son partenaire et pour l\'aider à l\'atteindre. Sans forcer ni manipuler, il éclaire le chemin avec une bienveillance qui inspire confiance. Son amour est à la fois un refuge et un tremplin — un espace sûr d\'où l\'on peut s\'envoler.' },
      { title: 'Donner sans se perdre', content: 'Le plus grand piège du Mentor Solaire est de s\'oublier dans le don. À force de nourrir les autres de sa lumière, il peut s\'épuiser sans que personne ne remarque qu\'il a lui aussi besoin d\'être réchauffé. Apprendre à recevoir est son défi le plus important.' }
    ],
    strengths: [
      { title: 'Empathie rayonnante', description: 'Il comprend et ressent les émotions de l\'autre avec une justesse remarquable.' },
      { title: 'Optimisme contagieux', description: 'Sa joie de vivre illumine le couple et neutralise les spirales négatives.' },
      { title: 'Don d\'élévation', description: 'Il a le talent de faire ressortir le meilleur de son partenaire.' },
      { title: 'Communication fluide', description: 'Il s\'exprime avec clarté et chaleur, facilitant les échanges même difficiles.' },
      { title: 'Générosité naturelle', description: 'Il donne sans compter — son temps, son énergie, son attention.' }
    ],
    weaknesses: [
      { title: 'Oubli de soi', description: 'Il peut s\'épuiser à donner sans jamais demander en retour.' },
      { title: 'Besoin de validation', description: 'Son estime de soi peut dépendre trop du regard et de la gratitude de l\'autre.' },
      { title: 'Difficulté avec la négativité', description: 'Il peut nier ou minimiser les problèmes réels pour préserver l\'harmonie.' },
      { title: 'Surcharge émotionnelle', description: 'À force d\'absorber les émotions de l\'autre, il peut atteindre un point de rupture.' }
    ],
    inLove: {
      intro: 'En amour, le Mentor Solaire est un partenaire chaleureux et inspirant qui fait de la relation un espace de croissance mutuelle.',
      sections: [
        { title: 'La séduction solaire', content: 'Il séduit naturellement par sa chaleur et son authenticité. Sa présence est réconfortante, ses mots sont justes et son attention est sincère. Près de lui, on se sent important et valorisé.' },
        { title: 'Un quotidien lumineux', content: 'La vie avec lui est ponctuée de moments de joie partagée, de conversations profondes et de projets inspirants. Il maintient la flamme vive par sa créativité relationnelle et sa capacité à célébrer les petites victoires.' },
        { title: 'Apprendre à recevoir', content: 'Son défi est d\'accepter que l\'amour n\'est pas seulement donner — c\'est aussi oser être vulnérable et demander ce dont on a besoin.' }
      ]
    },
    friendships: {
      intro: 'Le Mentor Solaire est au centre d\'un large réseau d\'amis qui le considèrent tous comme leur ami le plus proche.',
      sections: [
        { title: 'L\'aimant social', content: 'Il crée des liens facilement et profondément. Chaque amitié est nourrie avec attention et générosité.' },
        { title: 'Le motivateur', content: 'Il est celui qui croit en vous quand vous avez cessé d\'y croire vous-même. Son soutien est indéfectible.' }
      ]
    },
    compatibility: {
      best: ['stratege-serein', 'sculpteur-passionne', 'artisan-du-moment'],
      good: ['protecteur-fidele', 'guerisseur-tendre', 'reveur-romantique'],
      challenging: ['comete-flamboyante', 'etoile-magnetique', 'aventurier-audacieux']
    },
    advice: 'Ton soleil brille pour les autres — mais qui réchauffe le soleil ? Apprends à dire "j\'ai besoin de toi" sans culpabilité. Ton partenaire veut te nourrir autant que tu le nourris. Laisse-le faire.'
  },

  {
    id: 'papillon-empathique',
    code: 'ECLI',
    name: 'Le Papillon Empathique',
    emoji: '🦋',
    tagline: 'Enthousiaste infatigable qui voit la magie en chaque être qu\'il rencontre.',
    categoryId: 'ames',
    avatarFile: 'le papillon empathique.svg',
    bigFive: { O: 'high', C: 'low', E: 'high', A: 'high', N: 'high' },
    quote: { text: 'L\'amour est comme le vent — on ne le voit pas, mais on le sent, et il peut déplacer des montagnes.', author: 'Vision du Papillon Empathique' },
    introduction: 'Le Papillon Empathique est un tourbillon d\'énergie émotionnelle positive. Sa capacité à se connecter aux autres est presque surnaturelle, son enthousiasme est irrésistible et sa créativité relationnelle est sans limites. Il vole de découverte en découverte, cherchant la magie dans chaque connexion humaine.',
    sections: [
      { title: 'L\'énergie de la connexion', content: 'Le Papillon Empathique vit pour les connexions authentiques. Chaque rencontre est une aventure, chaque conversation une exploration. Son énergie sociale est alimentée par une empathie profonde — il ne fait pas que parler avec les gens, il ressent avec eux. En couple, cette capacité se traduit par une intimité émotionnelle rapide et profonde.' },
      { title: 'La beauté de l\'éphémère', content: 'Son défi principal est la constance. Comme un papillon, il est attiré par la beauté de chaque nouvelle fleur. En amour, cela peut se traduire par une difficulté à maintenir l\'engagement quand la nouveauté s\'estompe. Il doit apprendre que la magie ne disparaît pas avec le temps — elle se transforme en quelque chose de plus profond.' },
      { title: 'La sensibilité comme boussole', content: 'Son hypersensibilité est sa boussole relationnelle. Il capte les changements d\'humeur, les non-dits et les besoins inexprimés avec une précision remarquable. Cette antenne émotionnelle est un don précieux, mais elle peut aussi le submerger s\'il n\'apprend pas à se protéger.' }
    ],
    strengths: [
      { title: 'Enthousiasme contagieux', description: 'Sa joie de vivre illumine tout ce qu\'il touche et maintient la relation vivante.' },
      { title: 'Empathie intuitive', description: 'Il ressent les émotions de l\'autre avant même qu\'elles soient exprimées.' },
      { title: 'Créativité illimitée', description: 'Il ne cesse de réinventer la relation avec des idées fraîches et surprenantes.' },
      { title: 'Authenticité totale', description: 'Il est incapable de fausseté. Ce que vous voyez est ce que vous obtenez.' },
      { title: 'Optimisme résilient', description: 'Même après une déception, il retrouve foi en l\'amour et en l\'humanité.' }
    ],
    weaknesses: [
      { title: 'Difficulté d\'engagement', description: 'La routine l\'effraie et la promesse de nouveauté peut le détourner d\'une relation stable.' },
      { title: 'Émotivité débordante', description: 'Ses émotions peuvent prendre le dessus sur sa raison, menant à des décisions impulsives.' },
      { title: 'Surcharge empathique', description: 'Il absorbe tellement les émotions des autres qu\'il peut perdre le contact avec les siennes.' },
      { title: 'Désorganisation', description: 'Sa spontanéité peut créer du chaos dans les aspects pratiques de la vie de couple.' }
    ],
    inLove: {
      intro: 'En amour, le Papillon Empathique est l\'aventure incarnée. Avec lui, chaque jour est une page blanche sur laquelle écrire une nouvelle histoire.',
      sections: [
        { title: 'Coup de foudre chronique', content: 'Il tombe amoureux de l\'essence des gens — leur unicité, leur lumière cachée, leur potentiel. Sa séduction est naturelle, sans calcul, portée par un enthousiasme sincère qui fait fondre les résistances.' },
        { title: 'Un quotidien enchanté', content: 'Vivre avec lui, c\'est ne jamais savoir ce que demain réserve. Pique-nique improvisé, déclaration d\'amour en plein supermarché, voyage décidé sur un coup de tête — il transforme l\'ordinaire en extraordinaire.' },
        { title: 'S\'ancrer pour durer', content: 'Son défi est d\'apprendre que l\'amour profond n\'est pas incompatible avec la stabilité. La magie du début se transforme — elle ne meurt pas, elle mûrit en quelque chose de plus riche.' }
      ]
    },
    friendships: {
      intro: 'Le Papillon Empathique a des amis partout et dans tous les milieux. Sa curiosité pour l\'humain ne connaît pas de frontières.',
      sections: [
        { title: 'Le connecteur universel', content: 'Il met les gens en relation, crée des ponts entre des mondes différents et enrichit chaque groupe de sa présence.' },
        { title: 'L\'ami qui illumine', content: 'Une simple conversation avec lui peut transformer une mauvaise journée en moment de grâce.' }
      ]
    },
    compatibility: {
      best: ['stratege-serein', 'protecteur-fidele', 'commandant-bienveillant'],
      good: ['pilier-rayonnant', 'artisan-du-moment', 'sage-bienveillant'],
      challenging: ['sculpteur-passionne', 'artiste-sauvage', 'coeur-volcanique']
    },
    advice: 'Tes ailes sont faites pour voler — mais les plus beaux papillons sont ceux qui choisissent un jardin et l\'embellissent de leur présence fidèle. La profondeur de l\'amour ne se découvre qu\'en restant assez longtemps pour voir les saisons changer.'
  },

  // ──────────────────────────────────────────────────────────
  // 🔵 LES GARDIENS DU LIEN
  // ──────────────────────────────────────────────────────────

  {
    id: 'protecteur-fidele',
    code: 'ICSS',
    name: 'Le Protecteur Fidèle',
    emoji: '🫶',
    tagline: 'Dévotion silencieuse et mémoire du cœur — il n\'oublie jamais rien.',
    categoryId: 'gardiens',
    avatarFile: 'le protecteur fidèle.svg',
    bigFive: { O: 'low', C: 'high', E: 'low', A: 'high', N: 'low' },
    quote: { text: 'Les gestes silencieux d\'amour sont les plus éloquents — ils parlent la langue que seul le cœur comprend.', author: 'Philosophie du Protecteur Fidèle' },
    introduction: 'Le Protecteur Fidèle est l\'incarnation de la dévotion tranquille. Il n\'oublie jamais un anniversaire, se souvient de votre plat préféré et est toujours là quand vous avez besoin de lui. Son amour ne crie pas — il murmure, constamment, dans chaque geste attentionné du quotidien.',
    sections: [
      { title: 'La mémoire du cœur', content: 'Le Protecteur Fidèle a une mémoire affective prodigieuse. Il se souvient du premier rendez-vous, de la chanson qui passait, de ce que vous portiez. Chaque détail partagé est gravé dans son cœur et ressort sous forme d\'attentions qui surprennent par leur précision. Cette mémoire est sa façon de dire "tu comptes pour moi".' },
      { title: 'L\'amour en actes', content: 'Il n\'est pas du genre à faire de grandes déclarations. Son amour s\'exprime dans le café préparé exactement comme vous l\'aimez, dans le rendez-vous médical pris avant que vous n\'y pensiez, dans le plaid installé sur le canapé les soirs d\'hiver. Chaque acte est une lettre d\'amour silencieuse.' },
      { title: 'Le bouclier invisible', content: 'Il veille sur son partenaire avec une vigilance discrète mais constante. Il anticipe les problèmes, prévient les conflits et crée un cocon de sécurité émotionnelle et matérielle. Sa protection n\'est jamais étouffante — elle est enveloppante, comme une couverture chaude par une nuit froide.' }
    ],
    strengths: [
      { title: 'Fidélité inébranlable', description: 'Une fois engagé, rien ne peut le détourner. Sa loyauté est absolue et sans condition.' },
      { title: 'Attention aux détails', description: 'Il remarque ce que les autres manquent et agit en conséquence.' },
      { title: 'Constance rassurante', description: 'Dans un monde instable, il est le repère fixe sur lequel on peut toujours compter.' },
      { title: 'Patience sans limites', description: 'Il accompagne son partenaire dans ses processus sans jamais brusquer.' },
      { title: 'Générosité silencieuse', description: 'Il donne sans chercher de reconnaissance, par pur amour du don.' }
    ],
    weaknesses: [
      { title: 'Difficulté à demander', description: 'Il donne tellement qu\'il oublie de demander ce dont lui a besoin.' },
      { title: 'Accumulation silencieuse', description: 'Il peut accumuler les frustrations sans les exprimer jusqu\'au point de rupture.' },
      { title: 'Résistance au changement', description: 'Sa nature stable peut devenir rigidité face aux évolutions nécessaires du couple.' },
      { title: 'Sacrifice excessif', description: 'Il peut se perdre dans le service de l\'autre au détriment de son propre épanouissement.' }
    ],
    inLove: {
      intro: 'En amour, le Protecteur Fidèle est le partenaire dont on rêve pour construire une vie — stable, dévoué et profondément attentionné.',
      sections: [
        { title: 'Une séduction douce', content: 'Il séduit par sa fiabilité et sa douceur. Pas de grandes manœuvres — juste une présence constante et des attentions qui montrent qu\'il a écouté, compris et retenu.' },
        { title: 'Le nid douillet', content: 'La vie avec lui est un cocon de confort et de prévisibilité positive. Le foyer qu\'il crée est un refuge, les rituels du couple sont des traditions précieuses qu\'il protège avec soin.' },
        { title: 'Oser s\'exprimer', content: 'Son défi est d\'apprendre à verbaliser ses besoins et ses frustrations avant qu\'ils ne s\'accumulent. Le silence protège — mais il peut aussi isoler.' }
      ]
    },
    friendships: {
      intro: 'Le Protecteur Fidèle est l\'ami de longue date, celui que l\'on connaît depuis l\'enfance et qui sera encore là dans trente ans.',
      sections: [
        { title: 'L\'ami de toujours', content: 'Ses amitiés durent des décennies. Il maintient le lien avec une constance remarquable, même à travers la distance et le temps.' },
        { title: 'Le roc silencieux', content: 'On l\'appelle quand on a besoin d\'aide concrète — et il répond toujours, sans condition et sans reproche.' }
      ]
    },
    compatibility: {
      best: ['papillon-empathique', 'etoile-magnetique', 'reveur-romantique'],
      good: ['sage-bienveillant', 'mentor-solaire', 'pilier-rayonnant'],
      challenging: ['comete-flamboyante', 'artiste-sauvage', 'aventurier-audacieux']
    },
    advice: 'Ton dévouement est un trésor — mais n\'oublie pas que tu mérites la même attention que tu donnes. Apprends à dire "moi aussi j\'ai besoin de..." sans culpabiliser. Protéger l\'autre commence par se protéger soi-même.'
  },

  {
    id: 'guerisseur-tendre',
    code: 'ICSI',
    name: 'Le Guérisseur Tendre',
    emoji: '🩵',
    tagline: 'Empathie profonde qui transforme la douleur en soin et les blessures en lumière.',
    categoryId: 'gardiens',
    avatarFile: 'le guérisseur tendre.svg',
    bigFive: { O: 'low', C: 'high', E: 'low', A: 'high', N: 'high' },
    quote: { text: 'C\'est par les fêlures que la lumière entre — et c\'est par l\'amour que les fêlures guérissent.', author: 'Sagesse du Guérisseur Tendre' },
    introduction: 'Le Guérisseur Tendre possède un don rare : celui de sentir la douleur des autres et de la transformer en réconfort. Son empathie n\'est pas passive — c\'est une force active qui soigne, répare et reconstruit. En couple, il est le baume sur les blessures anciennes, la main qui tient quand tout s\'effondre.',
    sections: [
      { title: 'L\'empathie comme superpouvoir', content: 'Le Guérisseur Tendre ressent les émotions de l\'autre avec une acuité presque douloureuse. Il capte les blessures non dites, les peurs cachées et les besoins inexprimés. Cette capacité fait de lui un partenaire d\'une compréhension rare — mais elle peut aussi le submerger s\'il ne pose pas de limites saines.' },
      { title: 'Réparer avec amour', content: 'Il est attiré par les âmes blessées, non pas par codépendance mais par une compassion naturelle. Il voit le potentiel de guérison en chacun et offre un espace sûr pour que cette guérison puisse commencer. Son amour est thérapeutique au sens le plus noble du terme.' },
      { title: 'La profondeur de la vulnérabilité', content: 'Sa propre sensibilité intense est à la fois sa boussole et son talon d\'Achille. Il doit apprendre à transformer sa vulnérabilité en force sans se laisser consumer par les émotions — les siennes et celles de l\'autre.' }
    ],
    strengths: [
      { title: 'Compassion transformatrice', description: 'Sa présence seule a le pouvoir d\'apaiser et de guérir les blessures émotionnelles.' },
      { title: 'Intuition émotionnelle', description: 'Il sait ce dont l\'autre a besoin avant même que la demande ne soit formulée.' },
      { title: 'Patience réparatrice', description: 'Il accompagne les processus de guérison avec une patience et une douceur infinies.' },
      { title: 'Loyauté dans l\'adversité', description: 'C\'est dans les moments les plus sombres qu\'il brille le plus. Il ne fuit jamais la douleur.' },
      { title: 'Profondeur relationnelle', description: 'Ses relations atteignent un niveau d\'intimité que peu de gens connaissent.' }
    ],
    weaknesses: [
      { title: 'Absorption émotionnelle', description: 'Il peut absorber la douleur de l\'autre au point de la faire sienne.' },
      { title: 'Tendance au sacrifice', description: 'Il peut s\'oublier complètement dans le soin de l\'autre.' },
      { title: 'Attirance pour la souffrance', description: 'Il peut inconsciemment rechercher des partenaires blessés qui ont besoin d\'être "sauvés".' },
      { title: 'Fragilité émotionnelle', description: 'Son hypersensibilité le rend vulnérable aux chocs émotionnels répétés.' }
    ],
    inLove: {
      intro: 'En amour, le Guérisseur Tendre offre un espace de guérison et de reconstruction où l\'autre peut déposer ses fardeaux.',
      sections: [
        { title: 'La séduction par la douceur', content: 'Il séduit par sa capacité à écouter, à comprendre et à accueillir sans juger. Sa douceur désarme les défenses et ouvre les cœurs les plus fermés.' },
        { title: 'Un refuge amoureux', content: 'La vie avec lui est un processus continu de guérison et de croissance. Il crée un espace sûr où l\'on peut être vulnérable, imparfait et aimé malgré tout.' },
        { title: 'Se guérir soi-même', content: 'Son défi est de comprendre qu\'il ne peut pas sauver tout le monde — et qu\'il n\'a pas à le faire. Son premier patient doit être lui-même.' }
      ]
    },
    friendships: {
      intro: 'Le Guérisseur Tendre est l\'ami vers qui l\'on se tourne quand le cœur est lourd et que l\'on a besoin d\'être entendu.',
      sections: [
        { title: 'Le thérapeute naturel', content: 'Il a un don pour les conversations qui guérissent. Un moment passé avec lui laisse toujours un sentiment de légèreté et de clarté.' },
        { title: 'L\'ami des heures sombres', content: 'Il est là dans les moments de crise avec une présence qui vaut toutes les solutions du monde.' }
      ]
    },
    compatibility: {
      best: ['commandant-bienveillant', 'pilier-rayonnant', 'etoile-magnetique'],
      good: ['sage-bienveillant', 'reveur-romantique', 'sculpteur-passionne'],
      challenging: ['aventurier-audacieux', 'comete-flamboyante', 'artisan-du-moment']
    },
    advice: 'Tu ne peux pas verser d\'une tasse vide. Avant de guérir le monde, guéris-toi. Ton amour est un baume puissant — apprends à l\'appliquer aussi sur tes propres blessures.'
  },

  {
    id: 'pilier-rayonnant',
    code: 'ECSS',
    name: 'Le Pilier Rayonnant',
    emoji: '💎',
    tagline: 'Roc chaleureux sur lequel tout le monde s\'appuie — force et douceur réunies.',
    categoryId: 'gardiens',
    avatarFile: 'le pilier rayonnant.svg',
    bigFive: { O: 'low', C: 'high', E: 'high', A: 'high', N: 'low' },
    quote: { text: 'La vraie force n\'est pas de ne jamais tomber — c\'est de se relever à chaque fois en tendant la main à ceux qui sont encore au sol.', author: 'Credo du Pilier Rayonnant' },
    introduction: 'Le Pilier Rayonnant combine la solidité du roc et la chaleur du soleil. Il est le partenaire que tout le monde souhaite — fiable, généreux, stable et profondément humain. Sa force n\'écrase pas — elle soutient. Sa lumière ne brûle pas — elle réchauffe.',
    sections: [
      { title: 'La force au service de l\'amour', content: 'Le Pilier Rayonnant est solide sans être rigide, fort sans être intimidant. Il porte le couple sur ses épaules avec une aisance qui inspire confiance. Sa stabilité émotionnelle et sa fiabilité créent un environnement où l\'autre peut s\'épanouir sans crainte. Il est le phare dans la tempête, la terre ferme quand tout tangue.' },
      { title: 'La générosité organisée', content: 'Sa bienveillance n\'est pas désordonnée — elle est structurée et efficace. Il sait exactement comment aider, quand intervenir et de quelle manière soutenir. Cette combinaison rare de chaleur humaine et d\'efficacité pratique fait de lui un partenaire exceptionnel dans les bons comme dans les mauvais jours.' },
      { title: 'Le leader empathique', content: 'En couple, il prend naturellement des responsabilités mais toujours avec le consentement et le respect de l\'autre. Il ne décide pas seul — il consulte, écoute et intègre. Son leadership est collaboratif, nourri par une réelle attention aux besoins du partenaire.' }
    ],
    strengths: [
      { title: 'Fiabilité inégalée', description: 'On peut compter sur lui en toutes circonstances. Sa constance est un don.' },
      { title: 'Chaleur et solidité', description: 'Il combine la tendresse émotionnelle avec la force pratique — le meilleur des deux mondes.' },
      { title: 'Leadership bienveillant', description: 'Il guide sans dominer, structure sans rigidifier, protège sans étouffer.' },
      { title: 'Stabilité émotionnelle', description: 'Sa sérénité naturelle est un ancrage pour tout le couple.' },
      { title: 'Générosité structurée', description: 'Son aide est toujours pertinente, efficace et adaptée aux besoins réels.' }
    ],
    weaknesses: [
      { title: 'Surcharge de responsabilités', description: 'Il peut prendre trop sur ses épaules et refuser de déléguer par peur de perdre le contrôle.' },
      { title: 'Négligence de soi', description: 'À force de s\'occuper des autres, il peut négliger ses propres besoins et sa santé.' },
      { title: 'Conservatisme', description: 'Son besoin de stabilité peut le rendre réticent aux changements nécessaires.' },
      { title: 'Difficulté avec la vulnérabilité', description: 'Être le pilier peut l\'empêcher de montrer ses faiblesses et de demander du soutien.' }
    ],
    inLove: {
      intro: 'En amour, le Pilier Rayonnant est le partenaire idéal pour construire une vie — solide, chaleureux et profondément engagé.',
      sections: [
        { title: 'Une séduction rassurante', content: 'Il séduit par sa fiabilité et sa chaleur. Sa simple présence donne envie de construire quelque chose de durable. Il n\'a pas besoin de performance — sa solidité est en soi une déclaration d\'amour.' },
        { title: 'Un quotidien épanouissant', content: 'La vie avec lui est rythmée, structurée et profondément satisfaisante. Il crée un foyer où chacun a sa place, ses rituels et son espace. Les projets communs avancent, les crises sont gérées et l\'amour grandit dans un terreau fertile.' },
        { title: 'Oser être fragile', content: 'Son défi est d\'apprendre que montrer sa vulnérabilité n\'est pas un signe de faiblesse mais d\'humanité. Même les piliers ont besoin de soutien.' }
      ]
    },
    friendships: {
      intro: 'Le Pilier Rayonnant est l\'ami sur qui tout le monde compte — le roc du groupe.',
      sections: [
        { title: 'L\'organisateur bienveillant', content: 'Il est celui qui organise les retrouvailles, gère les cadeaux communs et s\'assure que personne n\'est laissé de côté.' },
        { title: 'Le soutien inconditionnel', content: 'Dans les moments difficiles, il est le premier à se manifester — avec un plan d\'action et un cœur grand ouvert.' }
      ]
    },
    compatibility: {
      best: ['sculpteur-passionne', 'reveur-romantique', 'artiste-sauvage'],
      good: ['sage-bienveillant', 'guerisseur-tendre', 'stratege-serein'],
      challenging: ['comete-flamboyante', 'etoile-magnetique', 'aventurier-audacieux']
    },
    advice: 'Être un pilier est noble — mais même les piliers ont besoin de fondations. Laisse ton partenaire te soutenir. Être fort ne signifie pas être invulnérable. Ta plus grande force sera d\'oser demander de l\'aide.'
  },

  {
    id: 'coeur-volcanique',
    code: 'ECSI',
    name: 'Le Cœur Volcanique',
    emoji: '🌋',
    tagline: 'Passionné et structuré — quand il aime, c\'est avec la force d\'un volcan.',
    categoryId: 'gardiens',
    avatarFile: 'le coeur volcanique.svg',
    bigFive: { O: 'low', C: 'high', E: 'high', A: 'high', N: 'high' },
    quote: { text: 'Mieux vaut un amour volcanique qui brûle tout sur son passage qu\'une tiédeur confortable qui n\'éclaire rien.', author: 'Devise du Cœur Volcanique' },
    introduction: 'Le Cœur Volcanique est un paradoxe vivant : une structure de fer contenant un magma d\'émotions bouillonnantes. Il combine la fiabilité d\'un gardien avec l\'intensité d\'un amant passionné, créant un amour qui est à la fois sûr et excitant. Quand il érupte, c\'est spectaculaire — mais c\'est aussi ce qui rend la terre autour de lui si fertile.',
    sections: [
      { title: 'La passion organisée', content: 'Le Cœur Volcanique ne fait rien à moitié. Sa passion est canalisée, structurée et orientée vers un but : construire un amour épique. Il planifie les surprises romantiques avec la même rigueur qu\'un projet professionnel, et chaque moment partagé est vécu avec une intensité totale.' },
      { title: 'L\'éruption émotionnelle', content: 'Sous sa surface organisée couvent des émotions d\'une puissance rare. Quand elles émergent — et elles émergent toujours — c\'est avec la force d\'une éruption volcanique. Joie explosive, colère intense, amour dévorant — tout est vécu au maximum. Son partenaire doit être prêt pour cette intensité.' },
      { title: 'L\'amour total', content: 'Pour le Cœur Volcanique, aimer c\'est donner tout — son temps, son énergie, ses émotions, sa loyauté. Il attend la même totalité en retour. Une relation tiède est pour lui un échec. Il veut le feu — mais un feu qui réchauffe plutôt qu\'un feu qui détruit.' }
    ],
    strengths: [
      { title: 'Passion structurée', description: 'Son intensité émotionnelle est canalisée de manière constructive, pas chaotique.' },
      { title: 'Engagement total', description: 'Quand il est là, il est là à 100%. Pas de demi-mesures, pas de réserve.' },
      { title: 'Chaleur débordante', description: 'Son amour est palpable, physique et enveloppant. Près de lui, on ne peut pas douter d\'être aimé.' },
      { title: 'Fiabilité passionnée', description: 'Il combine la constance du Gardien avec le feu de la passion — le meilleur des deux.' },
      { title: 'Authenticité explosive', description: 'Il est incapable de faux-semblants. Ses émotions sont vraies, toujours.' }
    ],
    weaknesses: [
      { title: 'Excès émotionnel', description: 'Son intensité peut submerger un partenaire qui a besoin de calme et d\'espace.' },
      { title: 'Possessivité', description: 'Son amour total peut frôler la possessivité s\'il n\'y prend pas garde.' },
      { title: 'Éruptions de colère', description: 'Quand la pression monte, l\'explosion peut être disproportionnée et blessante.' },
      { title: 'Difficulté avec le détachement', description: 'Il ne sait pas aimer de loin. L\'absence est son pire ennemi.' }
    ],
    inLove: {
      intro: 'En amour, le Cœur Volcanique est l\'expérience la plus intense que l\'on puisse vivre — un amour qui brûle, construit et transforme.',
      sections: [
        { title: 'La séduction incandescente', content: 'Il séduit avec une intensité qui coupe le souffle. Ses yeux parlent avant ses lèvres, son énergie enveloppe avant ses bras. Être choisi par un Cœur Volcanique, c\'est être élu parmi des milliers.' },
        { title: 'Un quotidien volcanique', content: 'Chaque jour est vécu pleinement — les joies sont célébrées avec ferveur, les conflits sont affrontés avec passion, les réconciliations sont des fêtes. La vie n\'est jamais plate avec lui.' },
        { title: 'Canaliser le feu', content: 'Son défi est d\'apprendre que le feu peut aussi être une flamme douce et constante. L\'intensité permanente n\'est pas soutenable — l\'amour a aussi besoin de moments de calme pour respirer et grandir.' }
      ]
    },
    friendships: {
      intro: 'Le Cœur Volcanique est l\'ami passionné qui transforme chaque sortie en événement mémorable.',
      sections: [
        { title: 'L\'ami tout-feu-tout-flamme', content: 'Avec lui, rien n\'est ordinaire. Chaque retrouvaille est une fête, chaque conversation est intense et chaque souvenir est marquant.' },
        { title: 'La loyauté incandescente', content: 'Il se bat pour ses amis avec la même passion qu\'il met dans tout. On le veut dans son camp, pas en face.' }
      ]
    },
    compatibility: {
      best: ['sage-bienveillant', 'stratege-serein', 'protecteur-fidele'],
      good: ['mentor-solaire', 'reveur-romantique', 'guerisseur-tendre'],
      challenging: ['etoile-magnetique', 'comete-flamboyante', 'sculpteur-passionne']
    },
    advice: 'Le volcan le plus majestueux est celui qui sait quand gronder et quand se taire. Apprends l\'art du feu doux — celui qui réchauffe sans brûler. Ton intensité est un cadeau, mais c\'est dans la maîtrise de ta flamme que tu trouveras l\'amour durable.'
  },

  // ──────────────────────────────────────────────────────────
  // 🟠 LES FLAMMES LIBRES
  // ──────────────────────────────────────────────────────────

  {
    id: 'artisan-du-moment',
    code: 'IALS',
    name: 'L\'Artisan du Moment',
    emoji: '🔧',
    tagline: 'Pragmatique et calme — il résout tout par l\'action et vit pleinement le présent.',
    categoryId: 'flammes',
    avatarFile: "l'artisan du moment.svg",
    bigFive: { O: 'low', C: 'low', E: 'low', A: 'low', N: 'low' },
    quote: { text: 'L\'amour se prouve chaque jour, dans les petits gestes qui réparent, qui construisent, qui tiennent.', author: 'Credo de l\'Artisan du Moment' },
    introduction: 'L\'Artisan du Moment est le partenaire le plus pragmatique et le plus ancré dans le réel. Il ne promet pas la lune — il répare le toit quand il pleut. Son amour s\'exprime dans l\'action concrète, dans le silence confortable et dans une indépendance saine qui respecte l\'espace de chacun.',
    sections: [
      { title: 'L\'amour en actes', content: 'L\'Artisan du Moment ne dit pas "je t\'aime" — il le montre. Il répare ce qui est cassé, construit ce qui manque et améliore ce qui existe. Sa façon d\'aimer est tangible, concrète et fiable. Pas de mots creux ni de promesses vides — seulement des résultats.' },
      { title: 'La liberté comme oxygène', content: 'Il a besoin d\'espace comme il a besoin d\'air. Son indépendance n\'est pas un rejet — c\'est une condition de son bien-être. En couple, il offre le même espace à l\'autre, créant une dynamique où chacun peut respirer et exister pleinement.' },
      { title: 'Le présent comme seule vérité', content: 'Il vit dans l\'instant. Le passé est passé, le futur est incertain — seul le moment présent compte. Cette philosophie donne à sa présence une qualité rare : quand il est là, il est vraiment là, entièrement.' }
    ],
    strengths: [
      { title: 'Fiabilité pratique', description: 'Il résout les problèmes au lieu d\'en parler. Son aide est concrète et efficace.' },
      { title: 'Calme inébranlable', description: 'Rien ne le déstabilise. Sa sérénité face aux crises est un ancrage.' },
      { title: 'Respect de l\'autonomie', description: 'Il ne cherche jamais à contrôler ou à étouffer l\'autre.' },
      { title: 'Absence de drames', description: 'Pas de jeux de pouvoir, pas de manipulation. Avec lui, ce que vous voyez est ce que vous obtenez.' },
      { title: 'Présence dans l\'instant', description: 'Quand il est là, il est entièrement présent — un luxe rare de nos jours.' }
    ],
    weaknesses: [
      { title: 'Mutisme émotionnel', description: 'Il montre mais ne dit pas. Son partenaire doit deviner ses sentiments.' },
      { title: 'Distance émotionnelle', description: 'Son besoin d\'indépendance peut être perçu comme du désintérêt.' },
      { title: 'Résistance à l\'engagement verbal', description: 'Mettre des mots sur ses sentiments est son plus grand défi.' },
      { title: 'Fuite face aux émotions intenses', description: 'Quand la charge émotionnelle monte, il a tendance à se retirer plutôt qu\'à affronter.' }
    ],
    inLove: {
      intro: 'En amour, l\'Artisan du Moment offre une relation paisible, sans drames et profondément ancrée dans le réel.',
      sections: [
        { title: 'La séduction par l\'action', content: 'Il ne drague pas avec des mots — il impressionne par sa compétence, son calme et son assurance tranquille. Sa séduction est discrète mais magnétique pour ceux qui valorisent l\'authenticité.' },
        { title: 'Un quotidien serein', content: 'La vie avec lui est paisible et confortable. Pas de drames, pas de surprises désagréables. Il gère les aspects pratiques avec une efficacité qui libère le couple pour profiter des moments simples.' },
        { title: 'Ouvrir le cœur', content: 'Son défi est d\'apprendre à verbaliser ses émotions. Un "je t\'aime" dit à voix haute a plus de pouvoir que mille actes silencieux.' }
      ]
    },
    friendships: {
      intro: 'L\'Artisan du Moment est l\'ami que l\'on appelle quand on a besoin d\'un coup de main — littéralement.',
      sections: [
        { title: 'L\'ami qui fait', content: 'Il aide à déménager, répare la voiture et installe les meubles. Son amitié est pratique et fiable.' },
        { title: 'Le compagnon silencieux', content: 'Il est parfaitement à l\'aise dans le silence partagé. Avec lui, la présence suffit.' }
      ]
    },
    compatibility: {
      best: ['mentor-solaire', 'pilier-rayonnant', 'papillon-empathique'],
      good: ['etoile-magnetique', 'protecteur-fidele', 'commandant-bienveillant'],
      challenging: ['reveur-romantique', 'sculpteur-passionne', 'coeur-volcanique']
    },
    advice: 'Ton partenaire ne peut pas lire dans tes pensées. Un "je t\'aime" dit à voix haute vaut plus que mille actes silencieux. Ouvre la porte de tes émotions — tu seras surpris de voir comme l\'air y est doux.'
  },

  {
    id: 'artiste-sauvage',
    code: 'IALI',
    name: 'L\'Artiste Sauvage',
    emoji: '🎨',
    tagline: 'Créativité émotionnelle brute — l\'amour comme instinct et comme art.',
    categoryId: 'flammes',
    avatarFile: "l'artiste sauvage.svg",
    bigFive: { O: 'high', C: 'low', E: 'low', A: 'low', N: 'high' },
    quote: { text: 'L\'amour n\'est pas une science — c\'est un art sauvage qui se crée dans le chaos et la beauté du moment.', author: 'Manifeste de l\'Artiste Sauvage' },
    introduction: 'L\'Artiste Sauvage vit l\'amour comme une expression artistique brute et instinctive. Il ne suit pas de règles, ne respecte pas les conventions et crée sa propre définition de l\'amour à chaque instant. Son monde intérieur est un chaos magnifique de créativité et d\'émotions, et il cherche un partenaire qui sait apprécier l\'art dans l\'imperfection.',
    sections: [
      { title: 'L\'art instinctif', content: 'L\'Artiste Sauvage ne planifie pas l\'amour — il le crée dans l\'instant. Chaque moment partagé est une toile blanche sur laquelle il peint avec les couleurs de ses émotions. Sa créativité relationnelle est sans limites, et ses expressions d\'amour sont aussi uniques que surprenantes.' },
      { title: 'Le chaos intérieur', content: 'Son monde intérieur est un tourbillon d\'émotions, d\'idées et de sensations. Cette richesse intérieure est la source de sa créativité, mais elle peut aussi le rendre imprévisible et difficile à suivre. Il oscille entre des moments d\'inspiration intense et des périodes de retrait profond.' },
      { title: 'La liberté créative', content: 'Il ne supporte pas les cages — même dorées. Son besoin de liberté créative s\'étend à sa vie amoureuse : il veut un partenaire qui accepte son rythme, respecte son espace de création et comprend que son besoin de solitude n\'est pas un rejet mais une nécessité vitale.' }
    ],
    strengths: [
      { title: 'Créativité amoureuse unique', description: 'Ses expressions d\'amour sont des œuvres d\'art — toujours surprenantes et profondément personnelles.' },
      { title: 'Authenticité brute', description: 'Aucune fausseté, aucun masque. Il est vrai jusqu\'à la moelle.' },
      { title: 'Profondeur émotionnelle', description: 'Il accède à des dimensions de l\'amour que les esprits conventionnels ne soupçonnent pas.' },
      { title: 'Respect de la liberté', description: 'Il n\'essaie jamais de changer ou de contrôler l\'autre.' },
      { title: 'Sensibilité extraordinaire', description: 'Il capte la beauté dans les détails que les autres ignorent.' }
    ],
    weaknesses: [
      { title: 'Imprévisibilité', description: 'Son partenaire ne sait jamais à quoi s\'attendre. Cette instabilité peut être épuisante.' },
      { title: 'Repli émotionnel', description: 'Quand il crée ou souffre, il s\'isole totalement, laissant l\'autre dans le flou.' },
      { title: 'Rejet des conventions', description: 'Il peut refuser les compromis nécessaires à la vie de couple par principe.' },
      { title: 'Montagnes russes', description: 'Ses hauts sont euphoriques et ses bas sont abyssaux. La stabilité n\'est pas son fort.' }
    ],
    inLove: {
      intro: 'En amour, l\'Artiste Sauvage est une expérience unique — belle, intense et parfois déroutante.',
      sections: [
        { title: 'Séduction instinctive', content: 'Il ne séduit pas — il fascine. Son authenticité brute, sa vision unique du monde et son intensité créent un magnétisme qui attire ceux qui cherchent quelque chose de différent.' },
        { title: 'Un amour non conventionnel', content: 'La vie avec lui ne ressemble à rien de connu. Les rituels du couple sont réinventés, les règles sont brisées et recréées, et chaque jour est une nouvelle page dans une histoire non linéaire.' },
        { title: 'Trouver un ancrage', content: 'Son défi est de trouver un équilibre entre sa liberté créative et les besoins de stabilité de la relation. L\'art et l\'amour peuvent coexister — à condition de le vouloir.' }
      ]
    },
    friendships: {
      intro: 'L\'Artiste Sauvage a peu d\'amis, mais ceux qu\'il a sont les témoins privilégiés de son univers intérieur.',
      sections: [
        { title: 'L\'ami inspirant', content: 'Ses amis sont souvent des artistes ou des esprits libres comme lui. Ensemble, ils créent, explorent et repoussent les limites.' },
        { title: 'Le loup solitaire fidèle', content: 'Il peut disparaître pendant des semaines puis réapparaître comme si le temps n\'existait pas. Ses vrais amis comprennent et acceptent ce rythme.' }
      ]
    },
    compatibility: {
      best: ['pilier-rayonnant', 'protecteur-fidele', 'commandant-bienveillant'],
      good: ['sage-bienveillant', 'guerisseur-tendre', 'stratege-serein'],
      challenging: ['etoile-magnetique', 'papillon-empathique', 'comete-flamboyante']
    },
    advice: 'Ton art est magnifique, mais l\'amour aussi est un art — un art collaboratif. Apprends à peindre à quatre mains sans perdre ta touche unique. Le plus beau tableau est celui que tu crées avec l\'autre, pas celui que tu crées seul.'
  },

  {
    id: 'aventurier-audacieux',
    code: 'EALS',
    name: 'L\'Aventurier Audacieux',
    emoji: '🔥',
    tagline: 'Énergie débordante et soif d\'adrénaline — il vit l\'amour comme une expédition.',
    categoryId: 'flammes',
    avatarFile: "l'aventurier audacieux.svg",
    bigFive: { O: 'low', C: 'low', E: 'high', A: 'low', N: 'low' },
    quote: { text: 'La vie est trop courte pour les amours tièdes. Brûle fort ou reste chez toi.', author: 'Philosophie de l\'Aventurier Audacieux' },
    introduction: 'L\'Aventurier Audacieux vit chaque jour comme si c\'était le dernier — et il emmène son partenaire dans cette course folle. Son énergie est contagieuse, sa confiance en lui est magnétique et son goût pour l\'adrénaline transforme la moindre sortie en aventure mémorable. Avec lui, on ne s\'ennuie jamais — mais on ne se repose pas non plus.',
    sections: [
      { title: 'L\'adrénaline comme langage d\'amour', content: 'L\'Aventurier Audacieux exprime son amour à travers l\'action et le partage d\'expériences. Road trips improvisés, sports extrêmes à deux, défis mutuels — sa relation est un terrain de jeu géant. Il croit que les couples les plus forts sont ceux qui ont surmonté des épreuves ensemble, même si ces épreuves sont auto-infligées.' },
      { title: 'Le présent absolu', content: 'Il vit dans un présent éternel. Le futur est une abstraction, le passé un souvenir lointain. Cette capacité à être totalement dans l\'instant donne à ses moments de couple une intensité brute et une authenticité que beaucoup envient. Mais elle rend aussi la planification à long terme particulièrement difficile.' },
      { title: 'La franchise sans filtre', content: 'L\'Aventurier Audacieux dit ce qu\'il pense sans détour. Cette honnêteté brute peut être rafraîchissante ou blessante selon le contexte. Il n\'y a pas de sous-entendus avec lui — tout est sur la table, à prendre ou à laisser.' }
    ],
    strengths: [
      { title: 'Énergie vitale', description: 'Sa vitalité est contagieuse et maintient le couple dans un mouvement perpétuel.' },
      { title: 'Courage relationnel', description: 'Il n\'a peur de rien — ni des conversations difficiles ni des remises en question.' },
      { title: 'Présence totale', description: 'Quand il est avec vous, il est 100% avec vous. Pas de distractions mentales.' },
      { title: 'Authenticité directe', description: 'Zéro jeux, zéro manipulation. Sa franchise est un gage de confiance.' },
      { title: 'Résilience', description: 'Il rebondit après chaque échec avec une rapidité impressionnante.' }
    ],
    weaknesses: [
      { title: 'Impulsivité', description: 'Il agit avant de réfléchir, ce qui peut créer des situations compliquées dans le couple.' },
      { title: 'Manque de profondeur', description: 'Les conversations longues sur les émotions ne sont pas son fort.' },
      { title: 'Instabilité', description: 'Son besoin constant de stimulation peut rendre la vie de couple épuisante.' },
      { title: 'Évitement émotionnel', description: 'Il utilise l\'action pour fuir les émotions inconfortables.' }
    ],
    inLove: {
      intro: 'En amour, l\'Aventurier Audacieux est un partenaire électrisant qui transforme la vie de couple en aventure permanente.',
      sections: [
        { title: 'Séduction à pleine vitesse', content: 'Il séduit par son audace et son énergie. Ses premiers rendez-vous sont des expériences — escalade, karting, exploration urbaine. Il veut savoir si l\'autre peut suivre son rythme.' },
        { title: 'Un couple en mouvement', content: 'La vie avec lui est un film d\'action. Pas de routine, pas de lassitude — mais aussi pas beaucoup de moments de calme. Il transforme le couple en équipe d\'aventuriers.' },
        { title: 'Apprendre la profondeur', content: 'Son défi est de comprendre que l\'amour profond se construit aussi dans les moments quiets et les conversations difficiles. L\'adrénaline ne remplace pas l\'intimité.' }
      ]
    },
    friendships: {
      intro: 'L\'Aventurier Audacieux est l\'ami qui vous entraîne dans des aventures que vous n\'auriez jamais osé vivre seul.',
      sections: [
        { title: 'Le catalyseur d\'aventures', content: 'Avec lui, chaque week-end est une expédition. Il pousse ses amis hors de leur zone de confort avec un enthousiasme irrésistible.' },
        { title: 'L\'ami de l\'instant', content: 'Il est le roi des moments spontanés et des souvenirs mémorables, même si la planification n\'est pas son point fort.' }
      ]
    },
    compatibility: {
      best: ['protecteur-fidele', 'guerisseur-tendre', 'sage-bienveillant'],
      good: ['pilier-rayonnant', 'artisan-du-moment', 'commandant-bienveillant'],
      challenging: ['reveur-romantique', 'sculpteur-passionne', 'stratege-serein']
    },
    advice: 'Le vrai courage n\'est pas de sauter d\'une falaise — c\'est de rester assis en silence avec quelqu\'un et de lui montrer ton cœur. L\'aventure la plus audacieuse que tu puisses vivre est celle de l\'intimité émotionnelle.'
  },

  {
    id: 'comete-flamboyante',
    code: 'EALI',
    name: 'La Comète Flamboyante',
    emoji: '🌟',
    tagline: 'Éclat pur, joie contagieuse — elle transforme chaque instant en célébration.',
    categoryId: 'flammes',
    avatarFile: 'la comette flamboyante.svg',
    bigFive: { O: 'high', C: 'low', E: 'high', A: 'low', N: 'high' },
    quote: { text: 'La vie est une fête et l\'amour en est la musique — danse tant que la chanson dure.', author: 'Mantra de la Comète Flamboyante' },
    introduction: 'La Comète Flamboyante traverse la vie comme une traînée de lumière — éblouissante, imprévisible et inoubliable. Son énergie créative et son enthousiasme débordant font d\'elle le centre de tous les regards. En amour, elle est un feu d\'artifice permanent qui cherche quelqu\'un capable de briller avec elle sans chercher à l\'éteindre.',
    sections: [
      { title: 'L\'éclat permanent', content: 'La Comète Flamboyante ne sait pas vivre à mi-régime. Tout ce qu\'elle fait est amplifié, magnifié, célébré. En couple, elle transforme le quotidien en spectacle — un dîner devient un événement, une balade devient une aventure, une dispute devient un drame shakespearien. Sa vie est un roman dont elle est l\'héroïne flamboyante.' },
      { title: 'La créativité sans limites', content: 'Son imagination est son moteur. Elle réinvente constamment la relation, propose des expériences nouvelles et refuse catégoriquement la routine. Avec elle, la lassitude est impossible — mais le repos aussi. Sa créativité se manifeste dans tout : la décoration du foyer, les surprises romantiques, les solutions de conflits.' },
      { title: 'L\'intensité comme mode de vie', content: 'Elle vit tout intensément — les joies sont euphoriques, les peines sont abyssales, les amours sont dévorantes. Cette intensité est sa marque de fabrique et sa plus grande vulnérabilité. Elle a besoin d\'un partenaire qui sait accueillir cette flamme sans en être consumé.' }
    ],
    strengths: [
      { title: 'Joie contagieuse', description: 'Sa présence illumine tout et rend la vie plus belle et plus vivante.' },
      { title: 'Créativité débordante', description: 'Elle ne cesse de réinventer le couple et de surprendre son partenaire.' },
      { title: 'Spontanéité magnifique', description: 'Avec elle, chaque instant peut devenir un souvenir inoubliable.' },
      { title: 'Générosité émotionnelle', description: 'Elle donne ses émotions sans réserve, créant un espace d\'authenticité totale.' },
      { title: 'Résilience joyeuse', description: 'Même après une déception, elle retrouve sa lumière et repart de plus belle.' }
    ],
    weaknesses: [
      { title: 'Instabilité émotionnelle', description: 'Ses changements d\'humeur peuvent donner le vertige à son entourage.' },
      { title: 'Besoin d\'attention', description: 'Elle a besoin d\'être vue, admirée et célébrée — constamment.' },
      { title: 'Fuite de la profondeur', description: 'Elle peut utiliser la légèreté pour éviter les conversations sérieuses.' },
      { title: 'Impulsivité relationnelle', description: 'Elle peut prendre des décisions amoureuses sur un coup de tête qu\'elle regrette ensuite.' }
    ],
    inLove: {
      intro: 'En amour, la Comète Flamboyante est une expérience totale — éblouissante, épuisante et absolument inoubliable.',
      sections: [
        { title: 'Séduction spectaculaire', content: 'Elle ne séduit pas — elle éblouit. Sa présence est un spectacle, son rire est une mélodie et son énergie est un aimant. Qui la rencontre ne l\'oublie jamais.' },
        { title: 'Un quotidien festif', content: 'La vie avec elle est une fête permanente. Elle célèbre tout : les anniversaires, les non-anniversaires, les lundis, les lundis pluvieux. Son don est de trouver une raison de se réjouir dans chaque instant.' },
        { title: 'Apprendre la constance', content: 'Son défi est de comprendre que la plus belle fête est celle qui dure — pas celle qui brille le plus fort. L\'amour profond se construit dans la durée, pas dans l\'éclat.' }
      ]
    },
    friendships: {
      intro: 'La Comète Flamboyante est l\'amie qui transforme chaque soirée en moment légendaire.',
      sections: [
        { title: 'L\'âme de la fête', content: 'Elle est le centre de gravité de tout groupe social. Sans elle, la soirée est juste une soirée. Avec elle, c\'est un événement.' },
        { title: 'L\'amie généreuse', content: 'Elle donne sans compter — son temps, son énergie, sa joie. Mais elle a besoin que cette générosité soit reconnue et célébrée en retour.' }
      ]
    },
    compatibility: {
      best: ['stratege-serein', 'protecteur-fidele', 'sage-bienveillant'],
      good: ['artisan-du-moment', 'pilier-rayonnant', 'commandant-bienveillant'],
      challenging: ['sculpteur-passionne', 'etoile-magnetique', 'reveur-romantique']
    },
    advice: 'Ta lumière est un don cosmique — apprends à briller sans te consumer. L\'étoile la plus admirée n\'est pas celle qui explose, mais celle qui brille nuit après nuit, constante et fidèle dans le ciel.'
  }
]

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export function getTypeById(id: string): PersonalityType | undefined {
  return personalityTypes.find(t => t.id === id)
}

export function getTypesByCategory(categoryId: string): PersonalityType[] {
  return personalityTypes.filter(t => t.categoryId === categoryId)
}

export function getCategoryById(id: string): PersonalityCategory | undefined {
  return personalityCategories.find(c => c.id === id)
}

export function getCategoryForType(typeId: string): PersonalityCategory | undefined {
  const type = getTypeById(typeId)
  if (!type) return undefined
  return getCategoryById(type.categoryId)
}

export function getCompatibleTypes(typeId: string): {
  best: PersonalityType[]
  good: PersonalityType[]
  challenging: PersonalityType[]
} {
  const type = getTypeById(typeId)
  if (!type) return { best: [], good: [], challenging: [] }
  return {
    best: type.compatibility.best.map(id => getTypeById(id)).filter(Boolean) as PersonalityType[],
    good: type.compatibility.good.map(id => getTypeById(id)).filter(Boolean) as PersonalityType[],
    challenging: type.compatibility.challenging.map(id => getTypeById(id)).filter(Boolean) as PersonalityType[]
  }
}

export function getTypeSlug(type: PersonalityType): string {
  return type.id
}
