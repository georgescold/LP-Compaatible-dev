export interface Question {
  id: string
  text: string
  keyed: 'plus' | 'minus'
  domain: 'O' | 'C' | 'E' | 'A' | 'N'
  facet: number
  num: number
}

export interface Choice {
  text: string
  score: number
  color: number
}

export const choices = {
  plus: [
    { text: 'Pas du tout d\'accord', score: 1, color: 1 },
    { text: 'Plutôt pas d\'accord', score: 2, color: 2 },
    { text: 'Neutre', score: 3, color: 3 },
    { text: 'Plutôt d\'accord', score: 4, color: 4 },
    { text: 'Tout à fait d\'accord', score: 5, color: 5 }
  ],
  minus: [
    { text: 'Pas du tout d\'accord', score: 5, color: 1 },
    { text: 'Plutôt pas d\'accord', score: 4, color: 2 },
    { text: 'Neutre', score: 3, color: 3 },
    { text: 'Plutôt d\'accord', score: 2, color: 4 },
    { text: 'Tout à fait d\'accord', score: 1, color: 5 }
  ]
}

const rawQuestions = [
  // ========== ROUND 1 (questions 1-30): one per facet, interleaved across domains ==========

  // === N1 - Anxiety (plus) ===
  { id: '43c98ce8-a07a-4dc2-80f6-c1b2a2485f06', text: 'Je m\'inquiète souvent de ce qui pourrait mal tourner', keyed: 'plus', domain: 'N', facet: 1 },
  // === E1 - Friendliness (plus) ===
  { id: 'd50a597f-632b-4f7b-89e6-6d85b50fd1c9', text: 'J\'engage facilement la conversation avec des inconnus', keyed: 'plus', domain: 'E', facet: 1 },
  // === O1 - Imagination (plus) ===
  { id: '888dd864-7449-4e96-8d5c-7a439603ea91', text: 'Je m\'invente souvent des histoires ou des mondes dans ma tête', keyed: 'plus', domain: 'O', facet: 1 },
  // === A1 - Trust (plus) ===
  { id: '6f66cdc0-9044-457b-b40d-501ecae15ee7', text: 'Je crois que les gens sont honnêtes dans leurs intentions', keyed: 'plus', domain: 'A', facet: 1 },
  // === C1 - Self-efficacy (plus) ===
  { id: 'f110fc66-2e9e-413c-920b-19f05e63d7ac', text: 'Je me sens capable de bien faire ce que j\'entreprends', keyed: 'plus', domain: 'C', facet: 1 },
  // === N2 - Anger (plus) ===
  { id: '48ad12ce-470e-4339-90ac-ea8c43a0103e', text: 'Je m\'emporte vite quand quelque chose me contrarie', keyed: 'plus', domain: 'N', facet: 2 },
  // === E2 - Gregariousness (plus) ===
  { id: '458f3957-2359-4077-ade1-34525d633063', text: 'J\'adore les soirées avec beaucoup de monde et d\'ambiance', keyed: 'plus', domain: 'E', facet: 2 },
  // === O2 - Artistic interests (plus) ===
  { id: '58d571e5-d725-4cf8-a438-32c16ee28eb6', text: 'Je suis sensible à la musique, la peinture ou d\'autres formes d\'art', keyed: 'plus', domain: 'O', facet: 2 },
  // === A2 - Morality (minus) ===
  { id: '5a5fa975-d024-4ac8-8845-2823f957c21b', text: 'Il m\'arrive de mentir ou de tricher si ça m\'arrange', keyed: 'minus', domain: 'A', facet: 2 },
  // === C2 - Orderliness (plus) ===
  { id: 'cda1ca17-b599-4561-a6cd-ff9d36062d27', text: 'J\'aime que mes affaires soient bien rangées et organisées', keyed: 'plus', domain: 'C', facet: 2 },
  // === N3 - Depression (plus) ===
  { id: '5e8550d7-b8ef-4905-950a-f81d735d39e2', text: 'Je me sens triste ou vide sans raison apparente', keyed: 'plus', domain: 'N', facet: 3 },
  // === E3 - Assertiveness (plus) ===
  { id: '2452f034-8273-4f71-9122-a40f5ead31ba', text: 'J\'aime prendre les décisions quand personne ne se lance', keyed: 'plus', domain: 'E', facet: 3 },
  // === O3 - Emotionality (plus) ===
  { id: '0727def6-3d18-4221-bf38-86b58f9f3eed', text: 'Je vis mes émotions très intensément, que ce soit la joie ou la peine', keyed: 'plus', domain: 'O', facet: 3 },
  // === A3 - Altruism (plus) ===
  { id: 'ccf3a5c8-fb50-4bd4-8e7a-22af3d657279', text: 'J\'aime donner un coup de main, même quand on ne me le demande pas', keyed: 'plus', domain: 'A', facet: 3 },
  // === C3 - Dutifulness (plus) ===
  { id: '73d84e5d-cbf5-47f0-b8cb-4d2159a52e32', text: 'Quand je donne ma parole, je la respecte quoi qu\'il arrive', keyed: 'plus', domain: 'C', facet: 3 },
  // === N4 - Self-consciousness (plus) ===
  { id: 'acd8fadc-5399-4a67-b5ff-9d1ada049c01', text: 'Je déteste être le centre de l\'attention en public', keyed: 'plus', domain: 'N', facet: 4 },
  // === E4 - Activity level (plus) ===
  { id: '48a761ef-438e-409b-ae59-ea2ce8f84414', text: 'J\'ai toujours un projet ou une activité en cours', keyed: 'plus', domain: 'E', facet: 4 },
  // === O4 - Adventurousness (plus) ===
  { id: 'cae55842-8957-4e3b-83b3-ceff98fb9dcf', text: 'Je préfère tester de nouvelles choses plutôt que suivre la routine', keyed: 'plus', domain: 'O', facet: 4 },
  // === A4 - Cooperation (minus) ===
  { id: 'e2028ad3-b128-4f76-be57-398bfe2aff22', text: 'J\'aime provoquer le débat même si ça crée des tensions', keyed: 'minus', domain: 'A', facet: 4 },
  // === C4 - Achievement-striving (plus) ===
  { id: 'f12c3d9d-1d12-4aa6-ad2e-009cd0651cbb', text: 'Je vise toujours l\'excellence, même quand ce n\'est pas exigé', keyed: 'plus', domain: 'C', facet: 4 },
  // === N5 - Immoderation (plus) ===
  { id: '481efd08-c810-43b1-a952-f8ac9052f96b', text: 'J\'ai du mal à résister à mes envies (manger, acheter, scroller...)', keyed: 'plus', domain: 'N', facet: 5 },
  // === E5 - Excitement-seeking (plus) ===
  { id: '987efee2-899f-4a65-b9b5-1589ef0460d7', text: 'Je recherche les sensations fortes et l\'adrénaline', keyed: 'plus', domain: 'E', facet: 5 },
  // === O5 - Intellect (plus) ===
  { id: 'e1e804c7-4a1d-498f-8610-f95147af9d1d', text: 'J\'aime explorer des sujets complexes qui me font réfléchir', keyed: 'plus', domain: 'O', facet: 5 },
  // === A5 - Modesty (minus) ===
  { id: '80c1d149-7050-481a-9953-aefb441642e7', text: 'J\'aime montrer mes réussites et recevoir des compliments', keyed: 'minus', domain: 'A', facet: 5 },
  // === C5 - Self-discipline (plus) ===
  { id: '9d3cb5c7-955c-43a4-b6c7-b07ed01dcbd9', text: 'Quand je me fixe un objectif, je m\'y tiens jusqu\'au bout', keyed: 'plus', domain: 'C', facet: 5 },
  // === N6 - Vulnerability (plus) ===
  { id: '13c58810-3864-42ba-aa87-d4166f858756', text: 'Je suis vite débordé(e) quand j\'ai trop de choses à gérer en même temps', keyed: 'plus', domain: 'N', facet: 6 },
  // === E6 - Cheerfulness (plus) ===
  { id: '899c3f66-51d0-46ea-963a-6fc36d3b3cb9', text: 'Mes proches me décrivent comme quelqu\'un de joyeux et positif', keyed: 'plus', domain: 'E', facet: 6 },
  // === O6 - Liberalism (plus) ===
  { id: '79186f48-e7fa-4df4-b74b-b0627ee244e1', text: 'Je pense que les traditions méritent d\'être questionnées', keyed: 'plus', domain: 'O', facet: 6 },
  // === A6 - Sympathy (plus) ===
  { id: 'fd50e1ca-d9e0-4037-a7a1-a191d4db2d96', text: 'Je suis touché(e) quand je vois quelqu\'un dans la difficulté', keyed: 'plus', domain: 'A', facet: 6 },
  // === C6 - Cautiousness (minus) ===
  { id: '956f3e17-ff17-4af5-a52f-9222b8968106', text: 'Je prends souvent des décisions sur un coup de tête', keyed: 'minus', domain: 'C', facet: 6 },

  // ========== ROUND 2 (questions 31-60): second question per facet, opposite keyed direction ==========

  // === N1 - Anxiety (minus) ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000001', text: 'Je reste serein(e) même quand l\'avenir est incertain', keyed: 'minus', domain: 'N', facet: 1 },
  // === E1 - Friendliness (minus) ===
  { id: '9f9166f0-fa94-4c14-a91d-3eecd8395794', text: 'Je n\'éprouve pas le besoin de me faire de nouveaux amis', keyed: 'minus', domain: 'E', facet: 1 },
  // === O1 - Imagination (minus) ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000003', text: 'Je préfère me concentrer sur le concret plutôt que de laisser vagabonder mon esprit', keyed: 'minus', domain: 'O', facet: 1 },
  // === A1 - Trust (minus) ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000004', text: 'Je me méfie des intentions des gens que je ne connais pas bien', keyed: 'minus', domain: 'A', facet: 1 },
  // === C1 - Self-efficacy (minus) ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000005', text: 'Il m\'arrive de douter de ma capacité à mener les choses à bien', keyed: 'minus', domain: 'C', facet: 1 },
  // === N2 - Anger (minus) ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000006', text: 'Même dans les situations frustrantes, je garde mon calme sans difficulté', keyed: 'minus', domain: 'N', facet: 2 },
  // === E2 - Gregariousness (minus) ===
  { id: '03c10b30-b88f-4c63-8acc-71251ca24615', text: 'Je préfère un moment tranquille seul(e) plutôt qu\'une sortie en groupe', keyed: 'minus', domain: 'E', facet: 2 },
  // === O2 - Artistic interests (minus) ===
  { id: '751a04bc-5adf-485a-8ea4-4308406ae85b', text: 'La poésie, la musique classique ou l\'art contemporain me laissent froid(e)', keyed: 'minus', domain: 'O', facet: 2 },
  // === A2 - Morality (plus) ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000009', text: 'Je reste honnête même quand mentir serait plus avantageux pour moi', keyed: 'plus', domain: 'A', facet: 2 },
  // === C2 - Orderliness (minus) ===
  { id: 'adf33f9f-45bd-43e3-af25-4c491176d97f', text: 'Je laisse souvent traîner mes affaires un peu partout', keyed: 'minus', domain: 'C', facet: 2 },
  // === N3 - Depression (minus) ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000011', text: 'Je me sens globalement satisfait(e) de la personne que je suis', keyed: 'minus', domain: 'N', facet: 3 },
  // === E3 - Assertiveness (minus) ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000012', text: 'Je préfère laisser quelqu\'un d\'autre prendre les commandes dans un groupe', keyed: 'minus', domain: 'E', facet: 3 },
  // === O3 - Emotionality (minus) ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000013', text: 'Je ne suis pas du genre à pleurer facilement devant un film ou une histoire', keyed: 'minus', domain: 'O', facet: 3 },
  // === A3 - Altruism (minus) ===
  { id: 'cd54bd76-ca9c-4030-b325-bb8d896bcb3f', text: 'Les problèmes des autres ne me touchent pas beaucoup', keyed: 'minus', domain: 'A', facet: 3 },
  // === C3 - Dutifulness (minus) ===
  { id: '4e6e3a34-176f-4e6e-8730-1341611f972b', text: 'Il m\'arrive d\'ignorer certaines règles quand elles ne m\'arrangent pas', keyed: 'minus', domain: 'C', facet: 3 },
  // === N4 - Self-consciousness (minus) ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000016', text: 'Le regard des autres sur moi ne me préoccupe pas vraiment', keyed: 'minus', domain: 'N', facet: 4 },
  // === E4 - Activity level (minus) ===
  { id: '7d93e1ca-46e8-4a30-9623-42a80c9b420c', text: 'Je préfère un rythme lent et tranquille sans me presser', keyed: 'minus', domain: 'E', facet: 4 },
  // === O4 - Adventurousness (plus) ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000018', text: 'Découvrir un lieu inconnu ou une culture différente me passionne', keyed: 'plus', domain: 'O', facet: 4 },
  // === A4 - Cooperation (plus) ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000019', text: 'En cas de désaccord, je cherche toujours un compromis plutôt que le conflit', keyed: 'plus', domain: 'A', facet: 4 },
  // === C4 - Achievement-striving (minus) ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000020', text: 'Je me contente souvent du minimum quand une tâche ne m\'intéresse pas', keyed: 'minus', domain: 'C', facet: 4 },
  // === N5 - Immoderation (minus) ===
  { id: '9891b7ba-a494-4307-aafe-301d8db506c6', text: 'Je garde facilement le contrôle sur mes envies et mes pulsions', keyed: 'minus', domain: 'N', facet: 5 },
  // === E5 - Excitement-seeking (minus) ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000022', text: 'Je n\'ai pas besoin de sensations fortes pour me sentir vivant(e)', keyed: 'minus', domain: 'E', facet: 5 },
  // === O5 - Intellect (minus) ===
  { id: '95a3f20c-f933-4d19-a2c1-a7dbdf63c562', text: 'Les questions philosophiques ou abstraites ne m\'intéressent pas', keyed: 'minus', domain: 'O', facet: 5 },
  // === A5 - Modesty (plus) ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000024', text: 'Je n\'aime pas me mettre en avant ou me vanter de mes accomplissements', keyed: 'plus', domain: 'A', facet: 5 },
  // === C5 - Self-discipline (minus) ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000025', text: 'Je me laisse facilement distraire quand je devrais me concentrer', keyed: 'minus', domain: 'C', facet: 5 },
  // === N6 - Vulnerability (minus) ===
  { id: '88a3c2fe-3aa4-4f46-9322-da656332268a', text: 'Je reste calme et lucide même sous pression', keyed: 'minus', domain: 'N', facet: 6 },
  // === E6 - Cheerfulness (minus) ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000027', text: 'Je ne suis pas quelqu\'un de particulièrement enthousiaste ou expressif', keyed: 'minus', domain: 'E', facet: 6 },
  // === O6 - Liberalism (minus) ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000028', text: 'Les valeurs traditionnelles sont un repère important pour moi dans la vie', keyed: 'minus', domain: 'O', facet: 6 },
  // === A6 - Sympathy (minus) ===
  { id: '48bee420-60c0-45cd-be43-3893dbc1969a', text: 'Je préfère ne pas trop penser à la souffrance des autres', keyed: 'minus', domain: 'A', facet: 6 },
  // === C6 - Cautiousness (plus) ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000030', text: 'Je prends le temps de bien réfléchir avant de m\'engager dans quelque chose', keyed: 'plus', domain: 'C', facet: 6 },

  // ========== ROUND 3 (questions 61-90): third question per facet, angle différent ==========

  // === N1 - Anxiety (minus) — angle: serenity under uncertainty ===
  { id: '7f92ab2c-265c-4b84-8c74-09f9bb9d41a7', text: 'Je me sens rarement submergé(e) par des pensées catastrophiques', keyed: 'minus', domain: 'N', facet: 1 },
  // === E1 - Friendliness (plus) — angle: social energy ===
  { id: 'af55f014-788c-4b6e-92c4-b2b59dc8a28d', text: 'Je me sens bien et énergisé(e) quand je suis entouré(e)', keyed: 'plus', domain: 'E', facet: 1 },
  // === O1 - Imagination (minus) — angle: practical thinking ===
  { id: '08ff6dca-02a5-4aeb-aaa4-2ecf2526f143', text: 'Je ne vois pas l\'intérêt de rêvasser ou de me perdre dans mes pensées', keyed: 'minus', domain: 'O', facet: 1 },
  // === A1 - Trust (plus) — angle: credulity ===
  { id: 'c63e6121-c3ed-40cc-abc2-c1e6ea1e0858', text: 'Quand quelqu\'un me dit quelque chose, j\'ai tendance à le croire', keyed: 'plus', domain: 'A', facet: 1 },
  // === C1 - Self-efficacy (plus) — angle: task completion ===
  { id: 'c7f53c3c-2e77-432f-bb71-7470b67d3aa9', text: 'Quand je commence un projet, je le termine toujours', keyed: 'plus', domain: 'C', facet: 1 },
  // === N2 - Anger (plus) — angle: daily irritability ===
  { id: '7dab2a37-8635-4fc7-86b7-0abf13c183c9', text: 'Les petits désagréments du quotidien m\'agacent rapidement', keyed: 'plus', domain: 'N', facet: 2 },
  // === E2 - Gregariousness (minus) — angle: social selectivity ===
  { id: '28ab59a0-e7cd-4fce-94e3-bba2ecc023b6', text: 'En soirée, je reste plutôt avec les gens que je connais déjà', keyed: 'minus', domain: 'E', facet: 2 },
  // === O2 - Artistic interests (plus) — angle: aesthetic perception ===
  { id: 'b5919f2f-cded-4745-a9ce-c02703cee807', text: 'Je remarque des détails esthétiques que les autres ne voient pas', keyed: 'plus', domain: 'O', facet: 2 },
  // === A2 - Morality (minus) — angle: manipulation ===
  { id: '0cf79e27-e702-45c2-9471-04ac96b58e0e', text: 'Je suis capable de manipuler les gens pour arriver à mes fins', keyed: 'minus', domain: 'A', facet: 2 },
  // === C2 - Orderliness (minus) — angle: messiness ===
  { id: 'f4891687-0ff0-47af-a4f6-d1202c8f6676', text: 'Mon espace de vie ou de travail est souvent en désordre', keyed: 'minus', domain: 'C', facet: 2 },
  // === N3 - Depression (minus) — angle: emotional resilience ===
  { id: '743d8973-1de1-4485-91b4-8a5cf63e7d44', text: 'J\'arrive à tourner la page rapidement après un moment difficile', keyed: 'minus', domain: 'N', facet: 3 },
  // === E3 - Assertiveness (plus) — angle: natural leadership ===
  { id: '8af754f2-68e9-48f3-8c5d-2e6633d4472c', text: 'Je prends naturellement le rôle de leader dans un groupe', keyed: 'plus', domain: 'E', facet: 3 },
  // === O3 - Emotionality (minus) — angle: emotional restraint ===
  { id: '2a300001-6e05-4c79-b8b5-2ccae4c3d463', text: 'Je vis mes émotions de manière plutôt modérée et contenue', keyed: 'minus', domain: 'O', facet: 3 },
  // === A3 - Altruism (plus) — angle: personal satisfaction from helping ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000014', text: 'Aider les autres me procure une vraie satisfaction personnelle', keyed: 'plus', domain: 'A', facet: 3 },
  // === C3 - Dutifulness (plus) — angle: honesty under discomfort ===
  { id: 'c55e3958-00c4-4fc3-9118-47d8f31bfde1', text: 'Je dis la vérité même quand c\'est inconfortable', keyed: 'plus', domain: 'C', facet: 3 },
  // === N4 - Self-consciousness (plus) — angle: discomfort with strangers ===
  { id: 'b2d9ef74-73f5-4ea8-b00c-7aaca15937df', text: 'Je suis mal à l\'aise à l\'idée de parler à quelqu\'un que je ne connais pas', keyed: 'plus', domain: 'N', facet: 4 },
  // === E4 - Activity level (minus) — angle: preference for calm ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000017', text: 'Je préfère les journées calmes sans trop d\'activités prévues', keyed: 'minus', domain: 'E', facet: 4 },
  // === O4 - Adventurousness (minus) — angle: comfort zone ===
  { id: '33b81fd0-7e32-4cd8-a13a-d5f5f754f998', text: 'Je préfère rester dans ma zone de confort plutôt que d\'essayer du nouveau', keyed: 'minus', domain: 'O', facet: 4 },
  // === A4 - Cooperation (minus) — angle: yelling when angry ===
  { id: 'd9a9a180-29c9-4ec5-8621-2256d411def7', text: 'Quand je suis en colère, il m\'arrive de hausser le ton ou de crier', keyed: 'minus', domain: 'A', facet: 4 },
  // === C4 - Achievement-striving (plus) — angle: giving one's best ===
  { id: 'b7fc949b-02b6-4cb9-a3e2-dbb3d824b55f', text: 'Je donne le meilleur de moi-même dans tout ce que j\'entreprends', keyed: 'plus', domain: 'C', facet: 4 },
  // === N5 - Immoderation (minus) — angle: self-control ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000021', text: 'Je sais m\'arrêter quand j\'ai assez, même si c\'est tentant de continuer', keyed: 'minus', domain: 'N', facet: 5 },
  // === E5 - Excitement-seeking (plus) — angle: risk for thrill ===
  { id: '10f90fa9-649c-4631-ac4c-3dd3f751597d', text: 'Il m\'arrive de prendre des risques juste pour le frisson', keyed: 'plus', domain: 'E', facet: 5 },
  // === O5 - Intellect (minus) — angle: preference for simplicity ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000023', text: 'Les réflexions trop profondes ou théoriques m\'ennuient rapidement', keyed: 'minus', domain: 'O', facet: 5 },
  // === A5 - Modesty (minus) — angle: entitlement ===
  { id: '7df44711-4cd4-4b05-8830-73fcc3ebdab5', text: 'Je pense mériter plus de reconnaissance que ce que je reçois', keyed: 'minus', domain: 'A', facet: 5 },
  // === C5 - Self-discipline (minus) — angle: procrastination ===
  { id: '51403620-968c-42fa-a772-65ba5ad8396f', text: 'J\'ai du mal à me motiver pour commencer une tâche que je dois faire', keyed: 'minus', domain: 'C', facet: 5 },
  // === N6 - Vulnerability (plus) — angle: destabilized by surprise ===
  { id: 'a1b2c3d4-1111-4a00-b000-000000000026', text: 'Face à un imprévu, je me sens facilement déstabilisé(e) et stressé(e)', keyed: 'plus', domain: 'N', facet: 6 },
  // === E6 - Cheerfulness (minus) — angle: emotional reserve ===
  { id: 'e7b31bdc-5f6b-40ec-ba91-f5919b0f170e', text: 'On me reproche parfois de ne pas montrer assez d\'enthousiasme', keyed: 'minus', domain: 'E', facet: 6 },
  // === O6 - Liberalism (plus) — angle: moral relativism ===
  { id: 'f08e1b27-3673-4898-9cae-896482d0d9f9', text: 'Je pense que ce qui est bien ou mal dépend du contexte', keyed: 'plus', domain: 'O', facet: 6 },
  // === A6 - Sympathy (plus) — angle: empathy for the less fortunate ===
  { id: 'c2038c12-7a37-47a8-9983-831bd6692aab', text: 'Je ressens de l\'empathie pour les personnes qui ont moins de chance que moi', keyed: 'plus', domain: 'A', facet: 6 },
  // === C6 - Cautiousness (minus) — angle: acting without thinking ===
  { id: 'ea3327ea-3529-4be4-8e2d-2174731ae4d7', text: 'Je me lance dans les choses sans trop réfléchir aux risques', keyed: 'minus', domain: 'C', facet: 6 }
] as const

export const questions: Question[] = rawQuestions.map((q, i) => ({
  ...q,
  num: i + 1,
  domain: q.domain as Question['domain'],
  keyed: q.keyed as Question['keyed']
}))

export const domainLabels: Record<string, string> = {
  O: 'Ouverture d\'esprit',
  C: 'Conscienciosité',
  E: 'Extraversion',
  A: 'Agréabilité',
  N: 'Stabilité émotionnelle'
}

export const QUESTIONS_PER_PAGE = 5
