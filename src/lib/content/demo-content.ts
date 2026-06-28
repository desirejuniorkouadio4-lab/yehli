// ============================================================
//  YEHLI — Contenu de démonstration réaliste (aucun lorem ipsum).
//  Source unique de vérité partagée entre :
//   • prisma/seed.ts  → écriture en base de données
//   • src/lib/data/*  → repli runtime quand la base est absente
//  Les visuels utilisent Lorem Picsum (URLs stables) ; remplaçables via l'admin.
// ============================================================

import type {
  ActionVM,
  ArticleVM,
  CategoryVM,
  EventVM,
  GalleryAlbumVM,
  GalleryItemVM,
  ImpactStatVM,
  PartnerVM,
  SiteSettings,
  TagVM,
  TeamMemberVM,
  TestimonialVM,
  TrainingVM,
} from "../data/types";

/** Visuel de démonstration stable (Lorem Picsum). */
export const img = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const d = (iso: string) => new Date(iso);

// ── Paramètres du site ──────────────────────────────────────
export const DEMO_SETTINGS: SiteSettings = {
  site_name: "YEHLI",
  site_tagline: "L'éducation, une lumière pour changer des vies",
  site_description:
    "YEHLI est une ONG dédiée à l'éducation et à l'épanouissement des enfants et des jeunes en Côte d'Ivoire.",
  site_creator: "Digital Access — Département Digital Web Solution",
  contact_email: "contact@yehli.org",
  contact_phone: "+225 07 00 00 00 00",
  contact_whatsapp: "+225 07 00 00 00 00",
  contact_address: "Abidjan, Côte d'Ivoire",
  social_facebook: "https://facebook.com/yehli.ci",
  social_instagram: "https://instagram.com/yehli.ci",
  social_linkedin: "https://linkedin.com/company/yehli",
  social_youtube: "",
  // Objectif annuel (barre de progression sur l'accueil)
  goal_enabled: "true",
  goal_label: "Objectif 2025 : toucher 500 élèves",
  goal_description:
    "Aidez-nous à atteindre notre objectif d'éveiller la curiosité scientifique de 500 enfants cette année.",
  goal_current: "312",
  goal_target: "500",
  goal_unit: "élèves",
};

// ── Statistiques d'impact ───────────────────────────────────
export const DEMO_IMPACT_STATS: ImpactStatVM[] = [
  { label: "Élèves touchés", value: "300+", icon: "GraduationCap", order: 1 },
  { label: "Formations réalisées", value: "50+", icon: "BookOpen", order: 2 },
  { label: "Années d'impact", value: "5+", icon: "Calendar", order: 3 },
  { label: "Établissements partenaires", value: "20+", icon: "School", order: 4 },
];

// ── Équipe ──────────────────────────────────────────────────
export const DEMO_TEAM: TeamMemberVM[] = [
  {
    id: "team-mariame",
    name: "Dr Mariame Coulibaly",
    role: "Fondatrice — Maître de conférences en physique-chimie",
    bio: "Maître de conférences en physique-chimie, Dr Mariame Coulibaly a fondé YEHLI avec la conviction que l'éducation est le levier le plus puissant pour transformer la société. Passionnée de vulgarisation scientifique, elle croit en la capacité de chaque enfant à devenir une lumière pour son entourage.",
    photo: null,
    email: null,
    linkedin: null,
    order: 1,
  },
  {
    id: "team-safiatou",
    name: "Dr Safiatou Coulibaly",
    role: "Co-fondatrice",
    bio: "Co-fondatrice de YEHLI, Dr Safiatou Coulibaly apporte son expertise académique et son engagement social au service de l'éducation inclusive. Elle pilote les partenariats institutionnels et le développement des programmes de formation.",
    photo: null,
    email: null,
    linkedin: null,
    order: 2,
  },
  {
    id: "team-getheme",
    name: "Gethème Kouadio",
    role: "Secrétaire Général",
    bio: "Gethème Kouadio assure la coordination administrative et opérationnelle de l'association. Il veille à la bonne organisation des actions de terrain et à la cohérence de toutes les activités de YEHLI.",
    photo: null,
    email: null,
    linkedin: null,
    order: 3,
  },
];

// ── Catégories d'articles ───────────────────────────────────
export const DEMO_CATEGORIES: CategoryVM[] = [
  { id: "cat-vulgarisation", name: "Vulgarisation scientifique", slug: "vulgarisation-scientifique", description: "Rendre la science claire et accessible à tous.", count: 0 },
  { id: "cat-physique-chimie", name: "Physique-Chimie", slug: "physique-chimie", description: "Comprendre les phénomènes du quotidien.", count: 1 },
  { id: "cat-tice", name: "TICE", slug: "tice", description: "Les technologies au service de l'apprentissage.", count: 0 },
  { id: "cat-ia", name: "Intelligence artificielle", slug: "intelligence-artificielle", description: "L'IA expliquée et mise au service de l'éducation.", count: 1 },
  { id: "cat-environnement", name: "Environnement", slug: "environnement", description: "Éduquer pour préserver notre planète.", count: 0 },
  { id: "cat-education", name: "Éducation", slug: "education", description: "Pratiques pédagogiques innovantes et inclusives.", count: 1 },
  { id: "cat-inclusion", name: "Inclusion", slug: "inclusion", description: "L'éducation pour chaque enfant, sans exception.", count: 0 },
  { id: "cat-pensee-critique", name: "Pensée critique", slug: "pensee-critique", description: "Apprendre à réfléchir, douter et argumenter.", count: 0 },
  { id: "cat-actualites", name: "Actualités YEHLI", slug: "actualites-yehli", description: "La vie et les actions de l'association.", count: 0 },
];

// ── Tags ────────────────────────────────────────────────────
export const DEMO_TAGS: TagVM[] = [
  "science", "enfants", "éducation", "IA", "philosophie", "environnement",
  "inclusion", "numérique", "formation", "enseignants", "Côte d'Ivoire",
  "bénévolat", "jeunesse", "physique", "chimie",
].map((name) => ({
  id: `tag-${name}`,
  name,
  slug: name
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, ""),
}));

// ── Témoignages ─────────────────────────────────────────────
export const DEMO_TESTIMONIALS: TestimonialVM[] = [
  {
    id: "temoignage-adjoua",
    name: "Mme Adjoua Koffi",
    role: "Directrice d'école primaire, Abidjan",
    content:
      "L'intervention de YEHLI dans notre établissement a transformé l'ambiance de classe. Les enfants ont découvert que la science peut être amusante et accessible. Nos enseignants sont repartis avec des outils concrets et une nouvelle énergie pour enseigner.",
    photo: null,
    order: 1,
  },
  {
    id: "temoignage-kouassi",
    name: "M. Kouassi Brou",
    role: "Enseignant de sciences, Yamoussoukro",
    content:
      "La formation sur les neurosciences et la métacognition suivie avec YEHLI a changé ma façon d'enseigner. Je comprends mieux comment mes élèves apprennent, et ils progressent davantage depuis. Je recommande ces formations à tous mes collègues.",
    photo: null,
    order: 2,
  },
  {
    id: "temoignage-fatou",
    name: "Fatou Diarra",
    role: "Mère d'élève, Bouaké",
    content:
      "Mon fils de 12 ans a participé à un atelier de philosophie organisé par YEHLI. En rentrant à la maison, il m'a posé des questions profondes sur le bonheur et l'amitié. YEHLI a allumé une étincelle en lui que je n'attendais pas.",
    photo: null,
    order: 3,
  },
];

// ── Partenaires ─────────────────────────────────────────────
export const DEMO_PARTNERS: PartnerVM[] = [
  { id: "partner-men", name: "Ministère de l'Éducation Nationale de Côte d'Ivoire", type: "institutionnel", description: "Partenaire institutionnel de référence pour le déploiement des actions éducatives.", logo: null, website: null, order: 1 },
  { id: "partner-unicef", name: "UNICEF Côte d'Ivoire", type: "institutionnel", description: "Appui aux programmes d'inclusion et de protection de l'enfance.", logo: null, website: null, order: 2 },
  { id: "partner-orange", name: "Fondation Orange Côte d'Ivoire", type: "financier", description: "Soutien financier des projets de numérique éducatif.", logo: null, website: null, order: 3 },
  { id: "partner-educi", name: "ONG Educi", type: "technique", description: "Collaboration technique sur les contenus pédagogiques.", logo: null, website: null, order: 4 },
  { id: "partner-sainte-marie", name: "Lycée Sainte-Marie d'Abidjan", type: "ecole_beneficiaire", description: "Établissement bénéficiaire des ateliers scientifiques.", logo: null, website: null, order: 5 },
  { id: "partner-cocody", name: "École Primaire Publique Cocody Centre", type: "ecole_beneficiaire", description: "Établissement bénéficiaire des ateliers de philosophie et de sciences.", logo: null, website: null, order: 6 },
];

// ── Axes d'intervention (Nos actions) ───────────────────────
export const DEMO_ACTIONS: ActionVM[] = [
  {
    id: "action-education",
    title: "Éducation",
    slug: "education",
    shortDesc: "Pratiques pédagogiques innovantes et inclusives.",
    description:
      "YEHLI accompagne les écoles et les enseignants dans l'adoption de pratiques pédagogiques actives, qui placent l'enfant au cœur de son apprentissage. Nous concevons des séquences vivantes, fondées sur la manipulation, le questionnement et la coopération.\n\nNotre approche valorise la diversité des intelligences et des rythmes : chaque enfant peut réussir lorsqu'on lui offre le bon cadre, la bonne méthode et la confiance nécessaire.",
    targetAudience: "Écoles, enseignants, élèves du primaire au lycée",
    objectives:
      "Rendre les apprentissages concrets et motivants\nDévelopper l'autonomie et la coopération des élèves\nOutiller les enseignants en pédagogie active",
    image: img("yehli-action-education", 1200, 800),
    icon: "GraduationCap",
    order: 1,
  },
  {
    id: "action-vulgarisation",
    title: "Vulgarisation scientifique",
    slug: "vulgarisation-scientifique",
    shortDesc: "Rendre la science accessible à tous.",
    description:
      "À travers des ateliers, des démonstrations et des expériences simples, YEHLI montre que la science n'est pas réservée à une élite : elle se cache dans le quotidien, de l'ampoule qui s'allume à l'eau qui bout.\n\nNous suscitons l'émerveillement et la curiosité, puis nous accompagnons les jeunes vers la compréhension des phénomènes, en français clair et avec du matériel accessible.",
    targetAudience: "Élèves, familles, grand public",
    objectives:
      "Éveiller la curiosité scientifique dès le plus jeune âge\nDémystifier les phénomènes physiques et chimiques\nDonner le goût des études scientifiques",
    image: img("yehli-action-science", 1200, 800),
    icon: "FlaskConical",
    order: 2,
  },
  {
    id: "action-philo",
    title: "Ateliers philo & pensée critique",
    slug: "ateliers-philo-pensee-critique",
    shortDesc: "Apprendre à réfléchir et à argumenter.",
    description:
      "Dès l'école primaire, les ateliers de philosophie apprennent aux enfants à penser par eux-mêmes, à écouter les autres et à construire un raisonnement. On y discute du bonheur, de l'amitié, de la justice ou de la liberté.\n\nCes moments d'échange développent l'empathie, la confiance en soi et l'esprit critique — des compétences essentielles pour devenir des citoyens libres et responsables.",
    targetAudience: "Élèves du primaire et du collège",
    objectives:
      "Développer la pensée critique et l'argumentation\nRenforcer l'écoute et le respect de l'autre\nCultiver la confiance en soi",
    image: img("yehli-action-philo", 1200, 800),
    icon: "Brain",
    order: 3,
  },
  {
    id: "action-environnement",
    title: "Environnement",
    slug: "environnement",
    shortDesc: "Agir pour notre planète dès l'école.",
    description:
      "YEHLI sensibilise les enfants et les jeunes aux enjeux écologiques à travers des projets concrets : tri des déchets, plantation d'arbres, économie de l'eau et de l'énergie.\n\nNous croyons que comprendre, c'est déjà agir. En reliant la science à l'écologie, nous formons une génération consciente et engagée pour la transition.",
    targetAudience: "Tous publics, scolaires et communautés",
    objectives:
      "Comprendre les grands équilibres écologiques\nAdopter des gestes responsables au quotidien\nMener des projets verts à l'école et dans le quartier",
    image: img("yehli-action-environnement", 1200, 800),
    icon: "Leaf",
    order: 4,
  },
  {
    id: "action-inclusion",
    title: "Inclusion & égalité",
    slug: "inclusion-egalite",
    shortDesc: "L'éducation pour chaque enfant, sans exception.",
    description:
      "Chaque enfant a droit à une éducation de qualité, quels que soient son origine, son genre ou sa situation. YEHLI agit pour lever les obstacles qui éloignent les plus vulnérables de l'école.\n\nNous sensibilisons les communautés, formons les enseignants à la gestion bienveillante de la diversité et valorisons l'égalité des chances comme un moteur de développement.",
    targetAudience: "Enfants vulnérables, filles, communautés",
    objectives:
      "Favoriser l'accès et le maintien à l'école\nLutter contre les stéréotypes et les inégalités\nFormer à une pédagogie inclusive",
    image: img("yehli-action-inclusion", 1200, 800),
    icon: "Heart",
    order: 5,
  },
  {
    id: "action-numerique",
    title: "Numérique éducatif",
    slug: "numerique-educatif",
    shortDesc: "Technologies et IA au service de l'apprentissage.",
    description:
      "Le numérique transforme l'éducation. YEHLI initie élèves et enseignants à un usage responsable et créatif des outils numériques : initiation au code, découverte de l'intelligence artificielle, ressources en ligne.\n\nNous mettons l'accent sur l'esprit critique face aux écrans et sur le potentiel de la technologie pour apprendre autrement.",
    targetAudience: "Collégiens, lycéens, enseignants",
    objectives:
      "Initier au code et à la culture numérique\nDécouvrir l'IA de manière éthique\nDévelopper un usage responsable des écrans",
    image: img("yehli-action-numerique", 1200, 800),
    icon: "Monitor",
    order: 6,
  },
  {
    id: "action-formation",
    title: "Formation des enseignants",
    slug: "formation-des-enseignants",
    shortDesc: "Soutenir ceux qui transmettent le savoir.",
    description:
      "Les enseignants sont au cœur de la réussite éducative. YEHLI leur propose des formations continues sur les neurosciences, la métacognition, la gestion de classe et l'intégration du numérique.\n\nNous créons des espaces d'échange entre pairs, où chacun repart avec des outils concrets et renouvelés pour sa pratique.",
    targetAudience: "Enseignants du primaire au lycée",
    objectives:
      "Renforcer les compétences pédagogiques\nDiffuser les apports des neurosciences\nFavoriser le partage de pratiques",
    image: img("yehli-action-formation", 1200, 800),
    icon: "Users",
    order: 7,
  },
  {
    id: "action-communautaire",
    title: "Actions communautaires",
    slug: "actions-communautaires",
    shortDesc: "S'engager dans le tissu local et communautaire.",
    description:
      "YEHLI s'enracine dans les communautés : caravanes éducatives, journées de sensibilisation, accompagnement des familles et des associations locales.\n\nEn travaillant main dans la main avec les acteurs du terrain, nous démultiplions l'impact et construisons un environnement favorable à l'épanouissement des enfants.",
    targetAudience: "Familles, associations, collectivités",
    objectives:
      "Mobiliser les communautés autour de l'éducation\nAccompagner les familles\nCréer des synergies locales durables",
    image: img("yehli-action-communaute", 1200, 800),
    icon: "Globe",
    order: 8,
  },
];

// ── Formations ──────────────────────────────────────────────
export const DEMO_TRAININGS: TrainingVM[] = [
  {
    id: "training-energie",
    title: "L'énergie dans tous ses états",
    slug: "l-energie-dans-tous-ses-etats",
    summary: "Comprendre l'énergie, ses formes et ses transformations à travers des expériences simples.",
    description:
      "Qu'est-ce que l'énergie ? D'où vient-elle et comment se transforme-t-elle ? Cet atelier propose un voyage concret au cœur de la physique : énergie mécanique, thermique, électrique et lumineuse.\n\nÀ partir d'expériences accessibles, les élèves manipulent, observent et formulent des hypothèses. Ils découvrent les grands principes de conservation et de transformation de l'énergie, et leur lien avec les enjeux actuels de transition énergétique.",
    objectives:
      "Identifier les différentes formes d'énergie\nComprendre les transformations énergétiques\nRelier la physique aux enjeux énergétiques actuels",
    targetAudience: "Collégiens / Lycéens",
    duration: "3h",
    format: "Atelier",
    theme: "Physique",
    prerequisites: "Aucun prérequis particulier",
    image: img("yehli-formation-energie", 1200, 800),
  },
  {
    id: "training-neurosciences",
    title: "Neurosciences et métacognition",
    slug: "neurosciences-et-metacognition",
    summary: "Comprendre comment le cerveau apprend pour mieux enseigner et accompagner les élèves.",
    description:
      "Que nous disent les neurosciences sur l'apprentissage ? Cette formation outille les enseignants avec les apports récents de la recherche : attention, mémoire, erreur, motivation.\n\nLes participants découvrent des stratégies métacognitives concrètes — apprendre à apprendre — qu'ils peuvent transmettre à leurs élèves pour les rendre plus autonomes et plus confiants.",
    objectives:
      "Comprendre les mécanismes cérébraux de l'apprentissage\nIntégrer des stratégies métacognitives en classe\nAccompagner l'autonomie des élèves",
    targetAudience: "Enseignants",
    duration: "Demi-journée",
    format: "Formation",
    theme: "Apprendre à apprendre",
    prerequisites: "Destiné aux enseignants en exercice",
    image: img("yehli-formation-neuro", 1200, 800),
  },
  {
    id: "training-chimie",
    title: "Tout est chimie : du vivant aux technologies",
    slug: "tout-est-chimie-du-vivant-aux-technologies",
    summary: "Découvrir la chimie omniprésente, du corps humain aux objets technologiques.",
    description:
      "La chimie est partout : dans la cuisine, dans notre corps, dans nos téléphones. Cet atelier révèle la chimie du quotidien à travers des expériences spectaculaires et sûres.\n\nLes lycéens explorent les réactions, les molécules et les matériaux, et comprennent comment la chimie façonne le vivant et les technologies modernes.",
    objectives:
      "Relier la chimie aux objets du quotidien\nComprendre les réactions et transformations\nSusciter des vocations scientifiques",
    targetAudience: "Lycéens",
    duration: "2h",
    format: "Atelier",
    theme: "Chimie du quotidien",
    prerequisites: "Notions de base de sciences physiques",
    image: img("yehli-formation-chimie", 1200, 800),
  },
  {
    id: "training-numerique",
    title: "Découvrir les langages numériques",
    slug: "decouvrir-les-langages-numeriques",
    summary: "Une initiation ludique au code et à la logique algorithmique.",
    description:
      "Comment parle-t-on aux machines ? Cet atelier d'initiation au code fait découvrir la logique algorithmique de façon ludique, avec ou sans ordinateur.\n\nLes collégiens créent leurs premiers programmes, comprennent les notions de boucle, de condition et de variable, et développent une pensée structurée transférable à d'autres disciplines.",
    objectives:
      "Découvrir la logique algorithmique\nÉcrire ses premiers programmes\nDévelopper une pensée structurée",
    targetAudience: "Collégiens",
    duration: "2h",
    format: "Atelier",
    theme: "Initiation au code",
    prerequisites: "Aucun prérequis particulier",
    image: img("yehli-formation-code", 1200, 800),
  },
  {
    id: "training-bonheur",
    title: "Le bonheur",
    slug: "le-bonheur-atelier-philo",
    summary: "Un atelier de philosophie pour réfléchir ensemble à ce qui rend heureux.",
    description:
      "Qu'est-ce que le bonheur ? Peut-on être heureux tout le temps ? Dans cet atelier de philosophie adapté aux enfants, on apprend à poser des questions, à écouter et à argumenter.\n\nÀ travers le dialogue, les participants explorent leurs idées, confrontent leurs points de vue et découvrent le plaisir de penser ensemble.",
    objectives:
      "Réfléchir à la notion de bonheur\nApprendre à argumenter et à écouter\nDévelopper la confiance en soi",
    targetAudience: "Primaire / Collège",
    duration: "1h30",
    format: "Atelier philo",
    theme: "Atelier philo",
    prerequisites: "Aucun prérequis particulier",
    image: img("yehli-formation-bonheur", 1200, 800),
  },
  {
    id: "training-amitie",
    title: "L'amitié",
    slug: "l-amitie-atelier-philo",
    summary: "Un atelier de philosophie pour comprendre ce que veut dire être un ami.",
    description:
      "C'est quoi un véritable ami ? Cet atelier de philosophie invite les plus jeunes à explorer l'amitié, la confiance et le respect.\n\nEn discutant à partir de situations concrètes, les enfants apprennent à nommer leurs émotions, à comprendre celles des autres et à construire des relations bienveillantes.",
    objectives:
      "Explorer la notion d'amitié\nDévelopper l'empathie\nApprendre à exprimer ses émotions",
    targetAudience: "Primaire",
    duration: "1h",
    format: "Atelier philo",
    theme: "Atelier philo",
    prerequisites: "Aucun prérequis particulier",
    image: img("yehli-formation-amitie", 1200, 800),
  },
  {
    id: "training-ia",
    title: "Apprendre à l'ère de l'intelligence artificielle",
    slug: "apprendre-a-l-ere-de-l-intelligence-artificielle",
    summary: "Comprendre l'IA et son impact pour enseigner et apprendre autrement.",
    description:
      "L'intelligence artificielle bouleverse l'éducation. Cette formation aide les enseignants à comprendre ce qu'est réellement l'IA, ses possibilités et ses limites.\n\nLes participants explorent des usages pédagogiques concrets et éthiques, et réfléchissent à la place de l'esprit critique à l'heure des outils génératifs.",
    objectives:
      "Comprendre les principes de l'IA\nIdentifier des usages pédagogiques éthiques\nDévelopper l'esprit critique face aux outils",
    targetAudience: "Enseignants",
    duration: "Demi-journée",
    format: "Formation",
    theme: "IA éducative",
    prerequisites: "Aucun prérequis technique",
    image: img("yehli-formation-ia", 1200, 800),
  },
  {
    id: "training-economie-connaissance",
    title: "Enseigner dans une économie basée sur la connaissance",
    slug: "enseigner-economie-de-la-connaissance",
    summary: "Repenser l'enseignement pour préparer les jeunes au monde de demain.",
    description:
      "Dans une économie où la connaissance est la première richesse, le rôle de l'école évolue. Cette journée de formation invite les enseignants à repenser leurs pratiques pour développer des compétences durables : créativité, coopération, esprit critique.\n\nÀ travers des études de cas et des ateliers, les participants construisent des situations d'apprentissage tournées vers l'avenir.",
    objectives:
      "Comprendre les enjeux de l'économie de la connaissance\nDévelopper les compétences du XXIᵉ siècle\nConcevoir des situations d'apprentissage durables",
    targetAudience: "Enseignants",
    duration: "Journée",
    format: "Formation",
    theme: "Pédagogie",
    prerequisites: "Destiné aux enseignants et cadres éducatifs",
    image: img("yehli-formation-economie", 1200, 800),
  },
  {
    id: "training-environnement",
    title: "Protection de l'environnement : nous sommes la transition",
    slug: "protection-de-l-environnement-transition",
    summary: "Sensibiliser et passer à l'action pour préserver notre planète.",
    description:
      "Et si chacun devenait un acteur de la transition écologique ? Cette intervention sensibilise tous les publics aux grands enjeux environnementaux et propose des gestes concrets à mettre en œuvre.\n\nDe la compréhension du changement climatique aux solutions locales, les participants repartent avec des clés pour agir à leur échelle.",
    objectives:
      "Comprendre les enjeux environnementaux\nAdopter des gestes responsables\nLancer des initiatives locales",
    targetAudience: "Tous publics",
    duration: "2h",
    format: "Sensibilisation",
    theme: "Environnement",
    prerequisites: "Aucun prérequis particulier",
    image: img("yehli-formation-transition", 1200, 800),
  },
  {
    id: "training-connaissance",
    title: "Le pouvoir de la connaissance",
    slug: "le-pouvoir-de-la-connaissance",
    summary: "Une conférence inspirante sur le savoir comme moteur de liberté et de développement.",
    description:
      "La connaissance libère, émancipe et transforme. Cette conférence interactive montre aux jeunes comment le savoir est un levier de réussite personnelle et de développement collectif.\n\nÀ travers des exemples inspirants, les participants prennent conscience de leur potentiel et du rôle qu'ils peuvent jouer dans leur communauté.",
    objectives:
      "Valoriser la connaissance comme moteur de progrès\nInspirer l'engagement citoyen\nRenforcer la confiance des jeunes en leur avenir",
    targetAudience: "Lycéens / Étudiants",
    duration: "1h30",
    format: "Conférence",
    theme: "Citoyenneté",
    prerequisites: "Aucun prérequis particulier",
    image: img("yehli-formation-savoir", 1200, 800),
  },
  {
    id: "training-histoire-science",
    title: "Histoire de la science : de la physique à la sociologie",
    slug: "histoire-de-la-science",
    summary: "Un parcours dans l'histoire des idées scientifiques et leur impact sur la société.",
    description:
      "Comment la science s'est-elle construite au fil des siècles ? Cet atelier retrace les grandes étapes de la pensée scientifique, des lois de la physique aux sciences humaines.\n\nLes lycéens découvrent que la science est une aventure humaine, faite de doutes, de débats et de découvertes, et comprennent son rôle dans la transformation des sociétés.",
    objectives:
      "Découvrir l'histoire des idées scientifiques\nComprendre la démarche scientifique\nRelier sciences et société",
    targetAudience: "Lycéens",
    duration: "2h",
    format: "Atelier",
    theme: "Culture scientifique",
    prerequisites: "Aucun prérequis particulier",
    image: img("yehli-formation-histoire", 1200, 800),
  },
  {
    id: "training-gestion-classe",
    title: "Gestion bienveillante de la classe",
    slug: "gestion-bienveillante-de-la-classe",
    summary: "Des outils concrets pour instaurer un climat de classe serein et inclusif.",
    description:
      "Un climat de classe apaisé est la condition de tout apprentissage. Cette formation propose aux enseignants des outils de gestion bienveillante : cadre clair, communication non violente, valorisation des réussites.\n\nLes participants apprennent à prévenir les conflits, à accueillir la diversité et à créer un environnement où chaque élève se sent en sécurité et capable de réussir.",
    objectives:
      "Instaurer un cadre bienveillant et structurant\nPrévenir et gérer les conflits\nFavoriser l'inclusion de tous les élèves",
    targetAudience: "Enseignants",
    duration: "Demi-journée",
    format: "Formation",
    theme: "Inclusion",
    prerequisites: "Destiné aux enseignants en exercice",
    image: img("yehli-formation-classe", 1200, 800),
  },
];

// ── Articles de blog (contenu riche) ────────────────────────
export const DEMO_ARTICLES: ArticleVM[] = [
  {
    id: "article-electricite",
    title: "L'électricité, c'est magique ? Non, c'est de la physique !",
    slug: "l-electricite-cest-de-la-physique",
    excerpt:
      "Comprendre l'électricité de manière simple et ludique pour les enfants de 10 à 15 ans : qu'est-ce qu'un électron, comment fonctionne une pile, pourquoi l'ampoule s'allume ?",
    coverImage: img("yehli-article-electricite", 1280, 720),
    publishedAt: d("2026-05-12"),
    author: "Dr Mariame Coulibaly",
    category: { name: "Physique-Chimie", slug: "physique-chimie" },
    tags: [
      { name: "physique", slug: "physique" },
      { name: "science", slug: "science" },
      { name: "enfants", slug: "enfants" },
    ],
    content: `<p>Quand on appuie sur un interrupteur et que la lumière jaillit, cela ressemble à de la magie. Pourtant, derrière ce geste du quotidien se cache une histoire passionnante : celle de l'électricité. Et la bonne nouvelle, c'est qu'elle s'explique très simplement.</p>
<h2>De minuscules voyageurs : les électrons</h2>
<p>Toute la matière qui nous entoure est faite de particules minuscules appelées <strong>atomes</strong>. Autour de ces atomes tournent des particules encore plus petites : les <strong>électrons</strong>. L'électricité, ce n'est rien d'autre que le déplacement organisé de ces électrons à travers un matériau.</p>
<p>Certains matériaux, comme le cuivre, laissent très bien circuler les électrons : on les appelle des <strong>conducteurs</strong>. D'autres, comme le plastique, les bloquent : ce sont des <strong>isolants</strong>. C'est pour cela que les fils électriques sont en métal… mais entourés de plastique !</p>
<h2>La pile : une pompe à électrons</h2>
<p>Une pile, c'est un peu comme une pompe. Elle pousse les électrons d'un côté (le pôle « moins ») vers l'autre (le pôle « plus »). Pour que les électrons se mettent en mouvement, il faut leur tracer un chemin fermé : c'est ce qu'on appelle un <strong>circuit électrique</strong>.</p>
<ul>
<li>Si le circuit est <strong>fermé</strong>, les électrons circulent et l'ampoule s'allume.</li>
<li>Si le circuit est <strong>ouvert</strong> (un fil débranché), plus rien ne passe : l'ampoule s'éteint.</li>
</ul>
<h2>Pourquoi l'ampoule s'allume-t-elle ?</h2>
<p>À l'intérieur d'une ampoule se trouve un fil très fin. Quand les électrons le traversent, ils le font chauffer énormément, jusqu'à ce qu'il devienne incandescent et produise de la lumière. L'énergie électrique se transforme alors en énergie lumineuse et en chaleur.</p>
<blockquote>La science ne supprime pas l'émerveillement : elle le rend plus profond. Comprendre comment fonctionne la lumière la rend encore plus belle.</blockquote>
<h2>Une règle d'or : la sécurité</h2>
<p>L'électricité est une amie formidable, mais elle peut être dangereuse. On ne joue jamais avec les prises de la maison, qui transportent une électricité bien plus puissante que celle d'une pile. Pour expérimenter, on utilise toujours des piles et du petit matériel, sous la surveillance d'un adulte.</p>
<p>Lors de nos ateliers, les enfants construisent eux-mêmes des circuits, allument des ampoules et comprennent enfin ce qui se passe « pour de vrai ». Et à ce moment-là, leurs yeux brillent autant que la lumière qu'ils viennent d'allumer.</p>`,
  },
  {
    id: "article-philosophie",
    title: "Pourquoi enseigner la philosophie dès l'école primaire ?",
    slug: "enseigner-la-philosophie-des-l-ecole-primaire",
    excerpt:
      "Des études récentes montrent que les ateliers philosophiques développent l'empathie, la pensée critique et la capacité d'écoute chez les enfants dès 6 ans.",
    coverImage: img("yehli-article-philosophie", 1280, 720),
    publishedAt: d("2026-04-03"),
    author: "L'équipe YEHLI",
    category: { name: "Éducation", slug: "education" },
    tags: [
      { name: "philosophie", slug: "philosophie" },
      { name: "éducation", slug: "education" },
      { name: "enfants", slug: "enfants" },
    ],
    content: `<p>La philosophie réservée aux grands élèves ? C'est une idée reçue. Partout dans le monde, des ateliers de philosophie pour enfants se développent, et les résultats sont remarquables. Dès 6 ans, les enfants sont capables de réfléchir à de grandes questions : qu'est-ce que la justice ? Peut-on tout dire ? C'est quoi grandir ?</p>
<h2>Apprendre à penser par soi-même</h2>
<p>Un atelier de philosophie n'a pas pour but de donner des réponses, mais d'apprendre à <strong>poser des questions</strong> et à construire un raisonnement. L'animateur guide la discussion, relance, demande des exemples, invite à justifier. Peu à peu, l'enfant comprend qu'une idée se défend avec des arguments.</p>
<h2>Trois bénéfices observés</h2>
<ul>
<li><strong>L'empathie :</strong> en écoutant les autres, l'enfant découvre qu'il existe d'autres points de vue que le sien.</li>
<li><strong>La pensée critique :</strong> il apprend à ne pas tout accepter sans réfléchir et à distinguer une opinion d'un fait.</li>
<li><strong>La confiance en soi :</strong> il ose prendre la parole devant le groupe et voit ses idées prises au sérieux.</li>
</ul>
<h2>Comment se déroule un atelier ?</h2>
<p>Les enfants s'installent en cercle, pour que chacun se voie et s'écoute. On part souvent d'une histoire, d'une image ou d'une question simple. Puis la parole circule, encadrée par quelques règles : on lève la main, on ne se moque pas, on a le droit de changer d'avis.</p>
<blockquote>« En rentrant à la maison, mon fils m'a posé des questions profondes sur le bonheur et l'amitié. » Ce témoignage d'une maman résume tout l'enjeu de la démarche.</blockquote>
<h2>Une compétence pour la vie</h2>
<p>À l'heure des réseaux sociaux et des fausses informations, apprendre à réfléchir, à douter et à argumenter n'est pas un luxe : c'est une nécessité. En semant très tôt ces graines, nous aidons les enfants à devenir des citoyens libres, capables de penser et de vivre ensemble.</p>`,
  },
  {
    id: "article-ia",
    title: "L'intelligence artificielle expliquée à nos enfants",
    slug: "l-intelligence-artificielle-expliquee-a-nos-enfants",
    excerpt:
      "Comment initier les élèves à l'IA de manière éthique, bienveillante et accessible en classe, avec des exemples du quotidien qu'ils connaissent déjà.",
    coverImage: img("yehli-article-ia", 1280, 720),
    publishedAt: d("2026-03-08"),
    author: "Dr Mariame Coulibaly",
    category: { name: "Intelligence artificielle", slug: "intelligence-artificielle" },
    tags: [
      { name: "IA", slug: "ia" },
      { name: "numérique", slug: "numerique" },
      { name: "éducation", slug: "education" },
    ],
    content: `<p>L'intelligence artificielle est partout : elle recommande des vidéos, reconnaît des visages, traduit des langues. Nos enfants grandissent avec elle. Plutôt que de la subir, apprenons-leur à la comprendre et à l'utiliser avec discernement.</p>
<h2>C'est quoi, une intelligence artificielle ?</h2>
<p>Une IA est un programme informatique capable d'apprendre à partir d'exemples. Pour reconnaître un chat, on ne lui donne pas une définition : on lui montre des milliers de photos de chats, jusqu'à ce qu'elle repère elle-même ce qui fait « un chat ». C'est ce qu'on appelle l'<strong>apprentissage automatique</strong>.</p>
<h2>Des exemples que les enfants connaissent déjà</h2>
<ul>
<li>La voix qui répond sur un téléphone.</li>
<li>Les suggestions de vidéos ou de musiques.</li>
<li>Les filtres rigolos des applications photo.</li>
<li>Les correcteurs d'orthographe.</li>
</ul>
<p>Partir de ces usages familiers permet de démystifier l'IA : ce n'est ni magique, ni un être vivant, mais un outil créé par des humains.</p>
<h2>Garder l'esprit critique</h2>
<p>Une IA peut se tromper, car elle dépend des exemples qu'on lui a donnés. Elle peut aussi reproduire des préjugés. C'est pourquoi nous insistons sur une règle simple avec les élèves : <strong>une IA propose, mais c'est l'humain qui décide et qui vérifie</strong>.</p>
<blockquote>Apprendre l'IA, ce n'est pas former de petits informaticiens : c'est former des citoyens lucides, créatifs et responsables face à la technologie.</blockquote>
<h2>Une approche éthique et bienveillante</h2>
<p>Dans nos formations, enseignants et élèves explorent l'IA à travers des activités concrètes, débattent de ses limites et de ses dangers (vie privée, dépendance, désinformation) et imaginent des usages utiles pour leur communauté. L'objectif : que la technologie reste au service de l'humain, et non l'inverse.</p>`,
  },
];

// ── Événements ──────────────────────────────────────────────
export const DEMO_EVENTS: EventVM[] = [
  {
    id: "event-forum-inclusion",
    title: "Forum de l'éducation inclusive de Côte d'Ivoire",
    slug: "forum-education-inclusive-cote-divoire",
    description:
      "YEHLI organise la première édition du Forum de l'éducation inclusive de Côte d'Ivoire, une journée d'échanges et de partage réunissant enseignants, parents, institutions et associations.\n\nAu programme : conférences d'experts, tables rondes, ateliers pratiques et témoignages inspirants autour d'une conviction : l'éducation est un droit pour chaque enfant, sans exception. Une occasion unique de réfléchir ensemble aux leviers d'une école véritablement inclusive.",
    startDate: d("2026-09-25T08:30:00"),
    endDate: d("2026-09-25T17:00:00"),
    location: "Palais de la Culture de Treichville",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    coverImage: img("yehli-event-forum", 1280, 720),
    capacity: 200,
    registrationOpen: true,
  },
  {
    id: "event-atelier-sciences",
    title: "Atelier Sciences et Curiosité — Édition 2024",
    slug: "atelier-sciences-et-curiosite-edition-2024",
    description:
      "L'édition 2024 de l'Atelier Sciences et Curiosité a rassemblé plus d'une centaine d'élèves autour d'expériences ludiques et de démonstrations scientifiques.\n\nPendant une journée, les enfants ont mené des expériences, observé des phénomènes étonnants et compris que la science est avant tout une aventure joyeuse. Retrouvez les temps forts de cette belle journée dans notre galerie.",
    startDate: d("2024-11-16T09:00:00"),
    endDate: d("2024-11-16T16:00:00"),
    location: "Espace Jeunesse",
    city: "Yamoussoukro",
    country: "Côte d'Ivoire",
    coverImage: img("yehli-event-atelier", 1280, 720),
    capacity: null,
    registrationOpen: false,
  },
];

// ── Galerie ─────────────────────────────────────────────────
export const DEMO_GALLERY_ALBUMS: GalleryAlbumVM[] = [
  {
    id: "album-sciences-2024",
    title: "Ateliers Sciences 2024",
    slug: "ateliers-sciences-2024",
    description: "Retour en images sur nos ateliers scientifiques menés auprès des élèves en 2024.",
    coverImage: img("yehli-gallery-sciences-1", 800, 800),
    itemCount: 3,
  },
  {
    id: "album-formation-2024",
    title: "Formation Enseignants 2024",
    slug: "formation-enseignants-2024",
    description: "Nos sessions de formation continue des enseignants tout au long de l'année 2024.",
    coverImage: img("yehli-gallery-formation-1", 800, 800),
    itemCount: 3,
  },
];

export const DEMO_GALLERY_ITEMS: GalleryItemVM[] = [
  { id: "gallery-1", title: "Expérience de chimie en classe", description: "Des élèves émerveillés devant une réaction colorée.", type: "IMAGE", url: img("yehli-gallery-sciences-1", 1000, 750), thumbnail: img("yehli-gallery-sciences-1", 600, 450), date: d("2024-11-16"), location: "Yamoussoukro", albumSlug: "ateliers-sciences-2024", albumTitle: "Ateliers Sciences 2024" },
  { id: "gallery-2", title: "Atelier d'électricité", description: "Construction de circuits électriques simples.", type: "IMAGE", url: img("yehli-gallery-sciences-2", 1000, 750), thumbnail: img("yehli-gallery-sciences-2", 600, 450), date: d("2024-11-16"), location: "Yamoussoukro", albumSlug: "ateliers-sciences-2024", albumTitle: "Ateliers Sciences 2024" },
  { id: "gallery-3", title: "Observation au microscope", description: "À la découverte de l'infiniment petit.", type: "IMAGE", url: img("yehli-gallery-sciences-3", 1000, 750), thumbnail: img("yehli-gallery-sciences-3", 600, 450), date: d("2024-11-16"), location: "Abidjan", albumSlug: "ateliers-sciences-2024", albumTitle: "Ateliers Sciences 2024" },
  { id: "gallery-4", title: "Session de formation des enseignants", description: "Échanges de pratiques entre enseignants.", type: "IMAGE", url: img("yehli-gallery-formation-1", 1000, 750), thumbnail: img("yehli-gallery-formation-1", 600, 450), date: d("2024-10-05"), location: "Abidjan", albumSlug: "formation-enseignants-2024", albumTitle: "Formation Enseignants 2024" },
  { id: "gallery-5", title: "Atelier métacognition", description: "Comprendre comment le cerveau apprend.", type: "IMAGE", url: img("yehli-gallery-formation-2", 1000, 750), thumbnail: img("yehli-gallery-formation-2", 600, 450), date: d("2024-10-05"), location: "Abidjan", albumSlug: "formation-enseignants-2024", albumTitle: "Formation Enseignants 2024" },
  { id: "gallery-6", title: "Travail en groupe", description: "Co-construction de séquences pédagogiques.", type: "IMAGE", url: img("yehli-gallery-formation-3", 1000, 750), thumbnail: img("yehli-gallery-formation-3", 600, 450), date: d("2024-10-05"), location: "Bouaké", albumSlug: "formation-enseignants-2024", albumTitle: "Formation Enseignants 2024" },
];
