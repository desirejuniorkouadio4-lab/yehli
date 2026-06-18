// Listes d'options partagées par les formulaires (UI + validation).

export const STRUCTURE_TYPES = [
  "Établissement scolaire",
  "Association / ONG",
  "Collectivité locale",
  "Entreprise",
  "Institution",
  "Autre",
] as const;

export const INTERVENTION_TYPES = [
  "Atelier",
  "Conférence",
  "Formation",
  "Sensibilisation",
  "Autre",
] as const;

export const AUDIENCES = [
  "Élèves du primaire",
  "Collégiens",
  "Lycéens",
  "Étudiants",
  "Enseignants",
  "Adultes",
  "Public mixte",
] as const;

export const THEMES = [
  "Éducation",
  "Vulgarisation scientifique",
  "Ateliers philo & pensée critique",
  "Environnement",
  "Inclusion & égalité",
  "Numérique éducatif",
  "Formation des enseignants",
  "Actions communautaires",
  "Autre",
] as const;

export const COUNTRIES = [
  "Côte d'Ivoire",
  "Bénin",
  "Burkina Faso",
  "Cameroun",
  "France",
  "Ghana",
  "Guinée",
  "Mali",
  "Niger",
  "Sénégal",
  "Togo",
  "Autre",
] as const;

export const MEMBERSHIP_TYPES = [
  "Membre actif",
  "Membre bienfaiteur",
  "Membre honoraire",
  "Autre",
] as const;

export const DONATION_TYPES = ["Ponctuel", "Récurrent"] as const;

export const DONATION_AMOUNTS = [5000, 10000, 25000, 50000] as const;

export const DONATION_DESTINATIONS = [
  "Là où le besoin est le plus grand",
  "Ateliers pour les élèves",
  "Formation des enseignants",
  "Ressources pédagogiques",
] as const;

export const VOLUNTEER_INTERESTS = [
  "Animation d'ateliers",
  "Vulgarisation scientifique",
  "Environnement",
  "Numérique éducatif",
  "Communication",
  "Logistique",
  "Collecte de fonds",
  "Mentorat",
  "Administration",
  "Autre",
] as const;

export const CONTACT_SUBJECTS = [
  "Demande d'information",
  "Partenariat",
  "Presse",
  "Autre",
] as const;
