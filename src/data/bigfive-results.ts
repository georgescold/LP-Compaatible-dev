export interface FacetDescription {
  title: string
  low: string
  neutral: string
  high: string
}

export interface DomainDescription {
  title: string
  shortDescription: string
  description: string
  scoreText: {
    low: string
    neutral: string
    high: string
  }
  facets: Record<string, FacetDescription>
}

export const domainDescriptions: Record<string, DomainDescription> = {
  O: {
    title: 'Ouverture d\u2019esprit',
    shortDescription: 'Imagination, cr\u00e9ativit\u00e9 et curiosit\u00e9 intellectuelle.',
    description: 'Les personnes ouvertes d\u2019esprit sont intellectuellement curieuses, appr\u00e9cient l\u2019art et sont sensibles \u00e0 la beaut\u00e9. Elles agissent de fa\u00e7on non conventionnelle et sont proches de leurs \u00e9motions. Un score bas traduit des centres d\u2019int\u00e9r\u00eat plus restreints et une pr\u00e9f\u00e9rence pour la routine et la simplicit\u00e9.',
    scoreText: {
      low: 'Tu aimes r\u00e9fl\u00e9chir en termes simples et concrets. Ton entourage te d\u00e9crit comme quelqu\u2019un de pragmatique, stable et terre \u00e0 terre.',
      neutral: 'Tu appr\u00e9cies les traditions tout en restant ouvert(e) aux nouvelles id\u00e9es. Ta pens\u00e9e est \u00e9quilibr\u00e9e entre curiosit\u00e9 et r\u00e9alisme.',
      high: 'Tu adores d\u00e9couvrir, exp\u00e9rimenter et sortir des sentiers battus. Curiosit\u00e9, imagination et cr\u00e9ativit\u00e9 sont tes moteurs.'
    },
    facets: {
      '1': {
        title: 'Imagination',
        low: 'Tu es plut\u00f4t terre \u00e0 terre et t\u2019int\u00e9resses aux faits concrets.',
        neutral: 'Tu fais preuve d\u2019imagination tout en restant ancr\u00e9(e) dans le r\u00e9el.',
        high: 'Tu trouves le quotidien trop simple \u2014 tu utilises la fantaisie pour enrichir ton monde.'
      },
      '2': {
        title: 'Sens artistique',
        low: 'Tu es peu sensible ou montres peu d\u2019int\u00e9r\u00eat pour les arts.',
        neutral: 'Tu appr\u00e9cies l\u2019art sans en \u00eatre particuli\u00e8rement touch\u00e9(e).',
        high: 'Tu aimes la beaut\u00e9 sous toutes ses formes. Tu es facilement absorb\u00e9(e) par les \u0153uvres et \u00e9v\u00e9nements artistiques.'
      },
      '3': {
        title: 'Affection',
        low: 'Tu es moins attentif(ve) \u00e0 tes \u00e9motions et tends \u00e0 les refouler.',
        neutral: 'Tu fais preuve d\u2019introspection \u00e9quilibr\u00e9e.',
        high: 'Tu acc\u00e8des facilement \u00e0 tes \u00e9motions et tu y es tr\u00e8s attentif(ve).'
      },
      '4': {
        title: 'Go\u00fbt de l\u2019aventure',
        low: 'Tu pr\u00e9f\u00e8res la routine et le confort du familier.',
        neutral: 'Tu appr\u00e9cies tes habitudes tout en accueillant un peu de nouveaut\u00e9.',
        high: 'Tu adores le changement, les voyages et les exp\u00e9riences in\u00e9dites. La routine t\u2019ennuie.'
      },
      '5': {
        title: 'Intellect',
        low: 'Tu pr\u00e9f\u00e8res les \u00e9changes avec des gens qui partagent ton point de vue.',
        neutral: 'Tu es globalement ouvert(e) aux nouvelles id\u00e9es.',
        high: 'Tu adores jouer avec les concepts, les d\u00e9bats intellectuels et les casse-t\u00eate.'
      },
      '6': {
        title: 'Lib\u00e9ralisme',
        low: 'Tu pr\u00e9f\u00e8res la s\u00e9curit\u00e9, la stabilit\u00e9 et le respect des traditions.',
        neutral: 'Tu es traditionnel(le) tout en restant ouvert(e) d\u2019esprit.',
        high: 'Tu pr\u00e9f\u00e8res remettre en question les conventions et les autorit\u00e9s \u00e9tablies.'
      }
    }
  },
  C: {
    title: 'Conscience',
    shortDescription: 'Organisation, discipline et contr\u00f4le des impulsions.',
    description: 'Les personnes consciencieuses sont organis\u00e9es, fiables et d\u00e9termin\u00e9es. Elles planifient et atteignent leurs objectifs avec rigueur. Un score bas traduit une approche plus spontan\u00e9e et d\u00e9contract\u00e9e de la vie.',
    scoreText: {
      low: 'Tu vis le moment pr\u00e9sent et fais ce qui te rend heureux(se) sur l\u2019instant. Ton approche est spontan\u00e9e et flexible.',
      neutral: 'Tu es plut\u00f4t fiable et organis\u00e9(e), avec un bon \u00e9quilibre entre discipline et d\u00e9tente.',
      high: 'Tu te fixes des objectifs pr\u00e9cis et les atteins avec d\u00e9termination. On te voit comme quelqu\u2019un d\u2019achi\u00e9v\u00e9 et travailleur.'
    },
    facets: {
      '1': {
        title: 'Auto-efficacit\u00e9',
        low: 'Tu doutes parfois de ta capacit\u00e9 \u00e0 accomplir les choses.',
        neutral: 'Tu connais tes limites et estimes assez justement tes capacit\u00e9s.',
        high: 'Tu as confiance en ta capacit\u00e9 \u00e0 g\u00e9rer et accomplir n\u2019importe quel d\u00e9fi.'
      },
      '2': {
        title: 'Organisation',
        low: 'Tu as tendance \u00e0 te d\u00e9sorganiser et t\u2019\u00e9parpiller.',
        neutral: 'Tu es organis\u00e9(e) sans \u00eatre trop pointilleux(se).',
        high: 'Tu es tr\u00e8s bien organis\u00e9(e). Tu adores les listes, les plans et les routines.'
      },
      '3': {
        title: 'Sens du devoir',
        low: 'Tu trouves les r\u00e8gles et r\u00e8glementations trop contraignantes.',
        neutral: 'Les r\u00e8gles ne te d\u00e9rangent pas particuli\u00e8rement.',
        high: 'Tu as un grand sens moral et du devoir. La fiabilit\u00e9 est une valeur cl\u00e9.'
      },
      '4': {
        title: 'Pers\u00e9v\u00e9rance',
        low: 'Tu te contentes du minimum n\u00e9cessaire.',
        neutral: 'Tu sais \u00eatre ambitieux(se) quand la situation le demande.',
        high: 'Tu vises l\u2019excellence et donnes tout pour atteindre tes objectifs.'
      },
      '5': {
        title: 'Auto-discipline',
        low: 'Tu as tendance \u00e0 procrastiner et peines \u00e0 finir ce que tu commences.',
        neutral: 'Tu sais t\u2019astreindre \u00e0 une t\u00e2che, m\u00eame si tu peux te laisser distraire.',
        high: 'Tu es capable de surmonter tes r\u00e9ticences et de rester concentr\u00e9(e) jusqu\u2019au bout.'
      },
      '6': {
        title: 'Prudence',
        low: 'Tu agis d\u2019abord et r\u00e9fl\u00e9chis ensuite.',
        neutral: 'Tu r\u00e9fl\u00e9chis avant d\u2019agir dans un d\u00e9lai raisonnable.',
        high: 'Tu prends le temps de bien r\u00e9fl\u00e9chir avant chaque d\u00e9cision.'
      }
    }
  },
  E: {
    title: 'Extraversion',
    shortDescription: 'Sociabilit\u00e9, \u00e9nergie et engagement avec le monde ext\u00e9rieur.',
    description: 'Les extravertis s\u2019\u00e9panouissent en groupe, sont \u00e9nergiques et ressentent facilement des \u00e9motions positives. Les introvertis aspirent au calme et \u00e0 la r\u00e9flexion personnelle \u2014 ce n\u2019est ni de la timidit\u00e9 ni de la froideur, juste un besoin diff\u00e9rent.',
    scoreText: {
      low: 'Tu es introverti(e), r\u00e9serv\u00e9(e) et r\u00e9fl\u00e9chi(e). Tu appr\u00e9cies la solitude et les activit\u00e9s individuelles.',
      neutral: 'Tu appr\u00e9cies autant le temps pass\u00e9 avec les autres que les moments de solitude.',
      high: 'Tu es sociable, ouvert(e) et plein(e) d\u2019\u00e9nergie. Tu pr\u00e9f\u00e8res la compagnie \u00e0 la solitude.'
    },
    facets: {
      '1': {
        title: 'Bienveillance',
        low: 'Tu n\u2019es pas froid(e), mais tu pr\u00e9f\u00e8res garder une certaine distance.',
        neutral: 'Tu appr\u00e9cies les gens tout en sachant conserver de l\u2019espace quand n\u00e9cessaire.',
        high: 'Tu appr\u00e9cies sinc\u00e8rement les autres et te fais des amis rapidement et facilement.'
      },
      '2': {
        title: 'Sociabilit\u00e9',
        low: 'Tu te sens submerg\u00e9(e) par la foule et as besoin de temps pour toi.',
        neutral: 'Tu appr\u00e9cies la compagnie mais aussi les moments de solitude.',
        high: 'Tu trouves la compagnie des autres stimulante et tu adores l\u2019\u00e9nergie de groupe.'
      },
      '3': {
        title: 'Assurance',
        low: 'Tu parles peu et laisses les autres diriger.',
        neutral: 'Tu prends la parole quand c\u2019est n\u00e9cessaire sans difficult\u00e9.',
        high: 'Tu aimes exprimer tes id\u00e9es, prendre les commandes et diriger.'
      },
      '4': {
        title: 'Niveau d\u2019activit\u00e9',
        low: 'Tu suis le mouvement paisiblement, \u00e0 ton rythme.',
        neutral: 'Tu sais acc\u00e9l\u00e9rer quand c\u2019est n\u00e9cessaire.',
        high: 'Tu as une vie effrein\u00e9e et bien remplie. Tu t\u2019impliques dans beaucoup d\u2019activit\u00e9s.'
      },
      '5': {
        title: 'Enthousiasme',
        low: 'Tu pr\u00e9f\u00e8res le calme et la tranquillit\u00e9.',
        neutral: 'Tu appr\u00e9cies le calme comme l\u2019action.',
        high: 'Tu t\u2019ennuies vite sans stimulation. Tu aimes les sensations fortes et l\u2019agitation.'
      },
      '6': {
        title: 'Gaiet\u00e9',
        low: 'Tu es moins exub\u00e9rant(e) et plus r\u00e9serv\u00e9(e) dans tes \u00e9motions.',
        neutral: 'Tu es optimiste sans \u00eatre exub\u00e9rant(e).',
        high: 'Tu ressens facilement le bonheur, l\u2019optimisme et la joie au quotidien.'
      }
    }
  },
  A: {
    title: 'Convivialit\u00e9',
    shortDescription: 'Esprit d\u2019\u00e9quipe, empathie et harmonie sociale.',
    description: 'Les personnes conviviales sont amicales, g\u00e9n\u00e9reuses et enclines aux compromis. Elles croient en l\u2019honn\u00eatet\u00e9 et la bienveillance. Un score bas traduit un esprit plus ind\u00e9pendant et comp\u00e9titif.',
    scoreText: {
      low: 'Tu places tes int\u00e9r\u00eats au premier plan. Ton entourage te voit comme quelqu\u2019un de direct, critique et ind\u00e9pendant.',
      neutral: 'Tu te soucies des autres tout en sachant d\u00e9fendre tes propres int\u00e9r\u00eats.',
      high: 'Tu portes un grand int\u00e9r\u00eat aux autres et \u00e0 leur bien-\u00eatre. On te d\u00e9crit comme agr\u00e9able, sympathique et coop\u00e9ratif(ve).'
    },
    facets: {
      '1': {
        title: 'Confiance',
        low: 'Tu pars du principe que les gens sont d\u2019abord motiv\u00e9s par leur int\u00e9r\u00eat personnel.',
        neutral: 'Tu fais confiance tout en restant prudent(e).',
        high: 'Tu crois que la plupart des gens sont honn\u00eates et ont de bonnes intentions.'
      },
      '2': {
        title: 'Honn\u00eatet\u00e9',
        low: 'Tu ma\u00eetrises l\u2019art de la n\u00e9gociation et de la diplomatie strat\u00e9gique.',
        neutral: 'Tu es plut\u00f4t honn\u00eate tout en sachant manier la subtilit\u00e9.',
        high: 'Tu pr\u00e9f\u00e8res la franchise et la sinc\u00e9rit\u00e9. Pas de faux-semblants pour toi.'
      },
      '3': {
        title: 'Altruisme',
        low: 'Aider les autres n\u2019est pas ta priorit\u00e9 naturelle.',
        neutral: 'Tu aides volontiers quand on te le demande.',
        high: 'Tu adores aider les autres. Tu y trouves un v\u00e9ritable \u00e9panouissement.'
      },
      '4': {
        title: 'Coop\u00e9ration',
        low: 'Tu n\u2019h\u00e9sites pas \u00e0 t\u2019affirmer pour d\u00e9fendre tes positions.',
        neutral: 'Tu es coop\u00e9ratif(ve) tout en sachant d\u00e9fendre tes points de vue.',
        high: 'Tu pr\u00e9f\u00e8res le compromis et l\u2019harmonie \u00e0 la confrontation.'
      },
      '5': {
        title: 'Modestie',
        low: 'Tu as une grande confiance en toi et aimes la comp\u00e9tition.',
        neutral: 'Tu ne fuis pas la comp\u00e9tition sans la rechercher activement.',
        high: 'Tu n\u2019aimes pas te comparer aux autres et pr\u00e9f\u00e8res rester humble.'
      },
      '6': {
        title: 'Empathie',
        low: 'Tu es objectif(ve) et bases tes jugements sur la raison plus que l\u2019\u00e9motion.',
        neutral: 'Tu fais preuve d\u2019empathie sans te laisser submerger.',
        high: 'Tu es tendre et empathique. Tu ressens profond\u00e9ment les \u00e9motions des autres.'
      }
    }
  },
  N: {
    title: 'Stabilit\u00e9 \u00e9motionnelle',
    shortDescription: 'Gestion des \u00e9motions n\u00e9gatives et r\u00e9silience.',
    description: 'Ce trait mesure ta capacit\u00e9 \u00e0 g\u00e9rer les situations \u00e9motionnellement difficiles. Un score \u00e9lev\u00e9 traduit une grande s\u00e9r\u00e9nit\u00e9 face au stress, un score bas une plus grande sensibilit\u00e9 \u00e9motionnelle.',
    scoreText: {
      high: 'Tu es exceptionnellement calme et imperturbable. Tu g\u00e8res le stress avec s\u00e9r\u00e9nit\u00e9.',
      neutral: 'Tu r\u00e9agis normalement au stress et aux frustrations, avec un bon \u00e9quilibre \u00e9motionnel.',
      low: 'Tu es sensible et r\u00e9actif(ve) \u00e9motionnellement. Les situations stressantes t\u2019affectent plus intensément.'
    },
    facets: {
      '1': {
        title: 'Anxi\u00e9t\u00e9',
        high: 'Tu n\u2019es pas facilement inquiet(e) et restes serein(e).',
        neutral: 'Tu ressens le stress mais g\u00e8res la pression correctement.',
        low: 'Tu te sens souvent tendu(e) et nerveux(se). Ton cerveau d\u00e9clenche facilement l\u2019alerte.'
      },
      '2': {
        title: 'Col\u00e8re',
        high: 'Tu ne t\u2019\u00e9nerves que tr\u00e8s rarement.',
        neutral: 'Certains sujets t\u2019agacent mais tu sais te contr\u00f4ler.',
        low: 'Tu te sens frustr\u00e9(e) quand les choses ne vont pas comme pr\u00e9vu. Tu exiges l\u2019\u00e9quit\u00e9.'
      },
      '3': {
        title: 'Tendance d\u00e9pressive',
        high: 'Tu te lib\u00e8res facilement des sentiments n\u00e9gatifs.',
        neutral: 'Il t\u2019arrive d\u2019\u00e9prouver de la tristesse, mais cela ne dure pas.',
        low: 'Tu as parfois moins d\u2019\u00e9nergie et des difficult\u00e9s \u00e0 prendre des initiatives.'
      },
      '4': {
        title: 'Conscience de soi',
        high: 'Tu ne souffres pas du regard des autres. Tu es \u00e0 l\u2019aise socialement.',
        neutral: 'Rares sont les situations qui te mettent mal \u00e0 l\u2019aise.',
        low: 'Tu crains le jugement des autres et te sens parfois embarrass\u00e9(e) ou timide.'
      },
      '5': {
        title: 'Imp\u00e9tuosit\u00e9',
        high: 'Tu n\u2019as pas d\u2019envies irr\u00e9sistibles et r\u00e9sistes facilement aux exc\u00e8s.',
        neutral: 'Tu n\u2019es pas particuli\u00e8rement impulsif(ve) mais appr\u00e9cies un petit exc\u00e8s de temps en temps.',
        low: 'Tu ressens de fortes envies difficiles \u00e0 contr\u00f4ler, orient\u00e9es vers le plaisir imm\u00e9diat.'
      },
      '6': {
        title: 'Vuln\u00e9rabilit\u00e9',
        high: 'Tu restes pos\u00e9(e) et lucide m\u00eame sous pression.',
        neutral: 'Tu te sens g\u00e9n\u00e9ralement capable de faire face aux situations.',
        low: 'Tu peux te sentir d\u00e9pass\u00e9(e) et confus(e) face au stress intense.'
      }
    }
  }
}

// Domain display order for results
export const domainOrder = ['O', 'C', 'E', 'A', 'N'] as const

// Emoji/icon mapping for each domain
export const domainIcons: Record<string, string> = {
  O: '\u{1F3A8}',
  C: '\u{1F3AF}',
  E: '\u{2728}',
  A: '\u{1F91D}',
  N: '\u{1F9D8}'
}
