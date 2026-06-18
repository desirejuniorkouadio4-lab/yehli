// Structure de la navigation principale (méga-menus inclus).

export type NavLeaf = {
  label: string;
  href: string;
  description?: string;
  icon?: string;
};

export type NavColumn = {
  title?: string;
  links: NavLeaf[];
};

export type NavFeatured = {
  title: string;
  text: string;
  href: string;
  cta: string;
  /** Image de fond du panneau featured (optionnelle) */
  image?: string;
};

export type NavItem =
  | { type: "link"; label: string; href: string }
  | {
      type: "mega";
      label: string;
      href?: string;
      columns: NavColumn[];
      featured?: NavFeatured;
      /** Disposition des liens : liste simple ou grille à cartes avec icônes */
      variant?: "list" | "grid";
    };

/** Les 8 axes d'intervention (méga-menu « Nos actions »). */
export const NAV_ACTIONS: NavLeaf[] = [
  { label: "Éducation", href: "/nos-actions/education", description: "Pédagogies innovantes et inclusives", icon: "GraduationCap" },
  { label: "Vulgarisation scientifique", href: "/nos-actions/vulgarisation-scientifique", description: "La science accessible à tous", icon: "FlaskConical" },
  { label: "Ateliers philo & pensée critique", href: "/nos-actions/ateliers-philo-pensee-critique", description: "Apprendre à réfléchir", icon: "Brain" },
  { label: "Environnement", href: "/nos-actions/environnement", description: "Agir pour notre planète", icon: "Leaf" },
  { label: "Inclusion & égalité", href: "/nos-actions/inclusion-egalite", description: "Une éducation pour chacun", icon: "Heart" },
  { label: "Numérique éducatif", href: "/nos-actions/numerique-educatif", description: "Technologies & IA pour apprendre", icon: "Monitor" },
  { label: "Formation des enseignants", href: "/nos-actions/formation-des-enseignants", description: "Soutenir ceux qui transmettent", icon: "Users" },
  { label: "Actions communautaires", href: "/nos-actions/actions-communautaires", description: "S'engager localement", icon: "Globe" },
];

/** Modes de soutien (méga-menu « Nous soutenir »). */
export const NAV_SUPPORT: NavLeaf[] = [
  { label: "Faire un don", href: "/faire-un-don", description: "Soutenir nos actions financièrement", icon: "HandHeart" },
  { label: "Adhérer à l'association", href: "/adherer", description: "Devenir membre de YEHLI", icon: "UserPlus" },
  { label: "Devenir bénévole", href: "/devenir-benevole", description: "Offrir son temps et ses compétences", icon: "Heart" },
  { label: "Devenir partenaire", href: "/contact", description: "Construire un partenariat", icon: "Handshake" },
];

export const MAIN_NAV: NavItem[] = [
  { type: "link", label: "Accueil", href: "/" },
  {
    type: "mega",
    label: "Qui sommes-nous",
    href: "/qui-sommes-nous",
    variant: "list",
    columns: [
      {
        title: "L'association",
        links: [
          { label: "Notre histoire", href: "/qui-sommes-nous#histoire", description: "La genèse et la vision de YEHLI" },
          { label: "Mission & valeurs", href: "/qui-sommes-nous#mission", description: "Curiosité, confiance, humanité" },
          { label: "Notre équipe", href: "/qui-sommes-nous#equipe", description: "Les femmes et les hommes de YEHLI" },
          { label: "Nos partenaires", href: "/partenaires", description: "Ils nous font confiance" },
        ],
      },
    ],
    featured: {
      title: "Notre mission",
      text: "Éveiller la curiosité, révéler la confiance et construire l'avenir des enfants et des jeunes de Côte d'Ivoire.",
      href: "/qui-sommes-nous",
      cta: "Découvrir YEHLI",
      image: "/images/soutenir.jpg",
    },
  },
  {
    type: "mega",
    label: "Nos actions",
    href: "/nos-actions",
    variant: "grid",
    columns: [{ links: NAV_ACTIONS }],
    featured: {
      title: "Besoin d'une intervention ?",
      text: "Écoles, associations, collectivités : sollicitez un atelier, une conférence ou une formation.",
      href: "/demander-une-intervention",
      cta: "Demander une intervention",
      image: "/images/nos%20actions.jpg",
    },
  },
  {
    type: "mega",
    label: "Formations",
    href: "/formations",
    variant: "list",
    columns: [
      {
        title: "Catalogue",
        links: [
          { label: "Toutes les formations", href: "/formations", description: "12 formations et ateliers" },
          { label: "Pour les enseignants", href: "/formations?audience=Enseignants", description: "Formation continue" },
          { label: "Pour les élèves", href: "/formations?audience=Lycéens", description: "Ateliers scientifiques & philo" },
          { label: "Vulgarisation scientifique", href: "/formations?theme=Physique", description: "Sciences accessibles" },
        ],
      },
    ],
    featured: {
      title: "Une intervention sur mesure",
      text: "Nos interventions sont flexibles et adaptées à votre public. Parlons de votre projet.",
      href: "/demander-une-intervention",
      cta: "Demander une intervention",
      image: "/images/formation.jpg",
    },
  },
  {
    type: "mega",
    label: "Ressources",
    variant: "list",
    columns: [
      {
        title: "Suivre YEHLI",
        links: [
          { label: "Blog & ressources", href: "/blog", description: "Articles de vulgarisation", icon: "FileText" },
          { label: "Événements", href: "/evenements", description: "Forums, ateliers, rencontres", icon: "Calendar" },
          { label: "Galerie", href: "/galerie", description: "Photos de nos actions", icon: "Image" },
        ],
      },
    ],
  },
  {
    type: "mega",
    label: "Nous soutenir",
    href: "/nous-soutenir",
    variant: "grid",
    columns: [{ links: NAV_SUPPORT }],
    featured: {
      title: "Votre soutien change des vies",
      text: "Chaque contribution finance des ateliers, des formations et des ressources pour les enfants.",
      href: "/nous-soutenir",
      cta: "Toutes les façons d'aider",
      image: "/images/hero-enfants.jpg",
    },
  },
  { type: "link", label: "Contact", href: "/contact" },
];

/** Liens regroupés pour le pied de page. */
export const FOOTER_NAV = {
  association: {
    title: "L'association",
    links: [
      { label: "Qui sommes-nous", href: "/qui-sommes-nous" },
      { label: "Notre équipe", href: "/qui-sommes-nous#equipe" },
      { label: "Nos partenaires", href: "/partenaires" },
      { label: "Blog & ressources", href: "/blog" },
      { label: "Événements", href: "/evenements" },
    ],
  },
  actions: {
    title: "Nos actions",
    links: [
      { label: "Toutes nos actions", href: "/nos-actions" },
      { label: "Formations", href: "/formations" },
      { label: "Vulgarisation scientifique", href: "/nos-actions/vulgarisation-scientifique" },
      { label: "Numérique éducatif", href: "/nos-actions/numerique-educatif" },
      { label: "Galerie", href: "/galerie" },
    ],
  },
  join: {
    title: "Nous rejoindre",
    links: [
      { label: "Demander une intervention", href: "/demander-une-intervention" },
      { label: "Faire un don", href: "/faire-un-don" },
      { label: "Devenir bénévole", href: "/devenir-benevole" },
      { label: "Adhérer", href: "/adherer" },
      { label: "Nous soutenir", href: "/nous-soutenir" },
    ],
  },
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
    { label: "Conditions d'utilisation", href: "/conditions-utilisation" },
  ],
};
