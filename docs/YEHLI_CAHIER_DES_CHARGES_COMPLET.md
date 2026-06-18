# CAHIER DES CHARGES COMPLET — SITE WEB OFFICIEL DE L'ASSOCIATION YEHLI
## Fonctionnel · Technique · Design · Charte graphique

| Champ | Détail |
|-------|--------|
| **Projet** | Création du site web officiel de l'ONG / Association YEHLI |
| **Bénéficiaire** | ONG / Association YEHLI |
| **Concepteur et réalisateur** | Digital Access — Département Digital Web Solution |
| **Nature** | Plateforme web institutionnelle, éditoriale, interactive et administrable |
| **Destination** | Claude Code — Instructions complètes de construction |
| **Date** | Juin 2026 |
| **Version** | 2.0 — Cahier des charges fonctionnel, technique et design |

---

## PRÉAMBULE — MESSAGE À CLAUDE CODE

Bonjour Claude Code,

Tu dois construire entièrement le site web officiel de l'ONG / Association YEHLI à partir de ce cahier des charges.

Ce document est **complet et définitif** : il contient les spécifications fonctionnelles, la stack technique, le schéma de base de données Prisma, les formulaires, l'espace administrateur, le SEO, la sécurité et la direction artistique avec la charte graphique.

**Règles impératives :**
1. Lis ce document **dans son intégralité** avant de commencer.
2. Propose un plan d'exécution clair structuré par étapes.
3. Développe étape par étape sans sauter ni supprimer de fonctionnalité.
4. Vérifie que le projet **compile correctement** avant de passer à l'étape suivante.
5. Le design visuel est **entièrement libre** — tu choisis la direction artistique. Les seules contraintes sont : les couleurs de la charte graphique YEHLI (vert + jaune soleil), l'utilisation d'une **police légèrement arrondie** pour le corps du texte, et le fait que le résultat doit être **professionnel, institutionnel, moderne, chaleureux et responsive**.
6. Le créateur du site est **Digital Access — Département Digital Web Solution**. Cette mention doit apparaître discrètement dans le footer.
7. Le logo YEHLI (`/public/images/logo-yehli.png`) doit être utilisé dans la navbar et le footer.
8. **Aucun lorem ipsum.** Toutes les données de démonstration doivent être réalistes et cohérentes avec la mission de YEHLI.

Le résultat attendu est une **vraie application web institutionnelle** digne d'une ONG éducative sérieuse qui travaille pour les enfants et les jeunes de Côte d'Ivoire.

---

## PARTIE I — IDENTITÉ, POSITIONNEMENT ET VISION

### 1.1 Présentation de YEHLI

YEHLI est une ONG / association dédiée à l'éducation et à l'épanouissement des enfants et des jeunes en Côte d'Ivoire, avec un accent particulier sur les populations les plus vulnérables.

**Fondatrice :** Dr Mariame Coulibaly, maître de conférences en physique-chimie  
**Co-fondatrice :** Dr Safiatou Coulibaly  
**Secrétaire Général :** Gethème Kouadio

**Signature associative :** *"Chaque enfant qui apprend est une lumière qui grandit"*  
**Slogan principal :** *"L'éducation, une lumière pour changer des vies"*  
**Slogan alternatif :** *"Éveiller la curiosité, révéler la confiance, construire l'avenir."*

### 1.2 Mission et valeurs

**Mission :** YEHLI combine la vulgarisation scientifique, la formation continue des enseignants, la sensibilisation à l'inclusion et au numérique éducatif, et le développement de la pensée critique chez les jeunes.

**Trois valeurs fondamentales :**
- **Curiosité** — nourrir l'envie d'apprendre
- **Confiance** — permettre la réalisation de soi
- **Humanité** — favoriser le partage et le respect

### 1.3 Domaines d'intervention

| Domaine | Description |
|---------|-------------|
| Éducation | Pratiques pédagogiques innovantes et inclusives |
| Vulgarisation scientifique | Rendre la science accessible à tous |
| Esprit critique | Ateliers de philosophie, débats, argumentation |
| Environnement | Sensibilisation écologique dès le plus jeune âge |
| Inclusion & égalité | L'éducation pour chaque enfant sans exception |
| Numérique éducatif | Technologies, IA, usage responsable |
| Formation des enseignants | Soutenir ceux qui transmettent |
| Actions communautaires | S'engager dans le tissu local |

### 1.4 Vision stratégique du site

Le site ne doit **pas être pensé comme une simple vitrine**, mais comme une **plateforme de communication, de mobilisation, de gestion et d'impact**. Il doit aider YEHLI à être mieux comprise, mieux contactée, mieux soutenue et mieux reconnue.

### 1.5 Positionnement éditorial proposé

> *YEHLI accompagne les enfants, les jeunes, les enseignants et les communautés à travers des actions éducatives, scientifiques, environnementales et numériques qui éveillent la curiosité, renforcent la confiance, développent l'esprit critique et favorisent l'égalité des chances.*

### 1.6 Ton éditorial

Le ton du site doit être **professionnel, chaleureux, clair, inspirant, accessible et pédagogique**. Il doit parler à la fois aux familles, aux enseignants, aux partenaires institutionnels, aux donateurs et aux jeunes publics, avec une exigence constante de clarté et de crédibilité.

- Titres affirmatifs, inspirants, jamais condescendants
- Textes accessibles, sans jargon inutile
- Appels à l'action clairs, engageants, bienveillants
- Le site doit donner envie d'agir, de soutenir, de rejoindre

---

## PARTIE II — CHARTE GRAPHIQUE

### 2.1 Palette de couleurs

La charte est directement inspirée du logo YEHLI : typographie scripturale verte élégante et soleil jaune doré.

```css
/* === COULEURS PRINCIPALES === */

/* Vert — couleur dominante du logo YEHLI */
--color-primary:       #1A6B2A;   /* Vert forêt profond — titres, boutons, header */
--color-primary-light: #2E8B42;   /* Vert vif — survols, accents */
--color-primary-pale:  #EAF4EC;   /* Vert très clair — fonds de sections */
--color-primary-mid:   #C5E0C9;   /* Vert doux — bordures, badges */

/* Jaune soleil — accent chaleureux issu du soleil du logo */
--color-accent:        #F5C518;   /* Jaune soleil — CTA, highlights */
--color-accent-light:  #FFF8D6;   /* Jaune très clair — fonds doux */
--color-accent-dark:   #D4A017;   /* Jaune foncé — survols */

/* Neutres */
--color-dark:          #1C1C2E;   /* Texte titres principal */
--color-body:          #374151;   /* Texte courant */
--color-muted:         #6B7280;   /* Texte secondaire, captions */
--color-border:        #E5E7EB;   /* Bordures légères */
--color-surface:       #F9FAFB;   /* Fond de page général */
--color-white:         #FFFFFF;

/* États fonctionnels */
--color-success:       #16A34A;
--color-error:         #DC2626;
--color-warning:       #D97706;
--color-info:          #2563EB;
```

**Règles d'usage :**
- Le vert `--color-primary` est la couleur dominante institutionnelle : header, boutons primaires, icônes, liens
- Le jaune `--color-accent` est l'accent chaleureux et lumineux : CTA secondaires, badges d'impact, étoiles, soulignements
- Les fonds alternent entre `--color-white` et `--color-primary-pale` selon les sections
- Footer en vert foncé (`--color-primary`) avec texte blanc

### 2.2 Typographie — police légèrement arrondie obligatoire

```css
/*
  POLICE PRINCIPALE : Plus Jakarta Sans
  Raison : légèrement arrondie, moderne, institutionnelle et très lisible.
  Alternative acceptable : Nunito Sans ou Sora.
  NE PAS utiliser Inter (trop neutre) ni Playfair Display seul.
*/

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');

/* Corps de texte, navigation, boutons, labels */
--font-body:    'Plus Jakarta Sans', 'Nunito Sans', system-ui, sans-serif;

/* Titres H1/H2 sur pages institutionnelles (accueil, qui sommes-nous) */
--font-heading: 'Playfair Display', Georgia, serif;

/* Tailles */
--text-xs:   0.75rem;    /*  12px */
--text-sm:   0.875rem;   /*  14px */
--text-base: 1rem;       /*  16px */
--text-lg:   1.125rem;   /*  18px */
--text-xl:   1.25rem;    /*  20px */
--text-2xl:  1.5rem;     /*  24px */
--text-3xl:  1.875rem;   /*  30px */
--text-4xl:  2.25rem;    /*  36px */
--text-5xl:  3rem;       /*  48px */
--text-6xl:  3.75rem;    /*  60px */
```

**Règles typographiques :**
- `Plus Jakarta Sans` pour tous les corps de texte, boutons, formulaires, navigation
- `Playfair Display` pour les grands titres H1/H2 institutionnels (hero, sections d'impact)
- Taille minimum : 16px (accessibilité)
- Citations et slogans : `Playfair Display` italic ou `Plus Jakarta Sans` semi-bold

### 2.3 Espacements, layout et rayons

```css
--spacing-xs:  0.25rem;   /*  4px */
--spacing-sm:  0.5rem;    /*  8px */
--spacing-md:  1rem;      /* 16px */
--spacing-lg:  1.5rem;    /* 24px */
--spacing-xl:  2rem;      /* 32px */
--spacing-2xl: 3rem;      /* 48px */
--spacing-3xl: 4rem;      /* 64px */
--spacing-4xl: 6rem;      /* 96px */

--container-max:     1280px;
--container-padding: 1.5rem;   /* mobile */

/* Rayons arrondis cohérents avec la police douce */
--radius-sm:   8px;
--radius-md:   14px;
--radius-lg:   22px;
--radius-xl:   32px;
--radius-full: 9999px;
```

### 2.4 Composants UI — directives de style

**Boutons :**
```css
/* Primaire : vert, arrondi complet */
.btn-primary {
  background: var(--color-primary);
  color: white;
  padding: 0.75rem 1.75rem;
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.9375rem;
  letter-spacing: 0.01em;
  transition: all 0.2s ease;
}
.btn-primary:hover {
  background: var(--color-primary-light);
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(26, 107, 42, 0.28);
}

/* Secondaire : contour vert */
.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  padding: 0.75rem 1.75rem;
  border-radius: var(--radius-full);
  font-weight: 600;
}

/* Accent : jaune soleil */
.btn-accent {
  background: var(--color-accent);
  color: var(--color-dark);
  border: none;
  padding: 0.75rem 1.75rem;
  border-radius: var(--radius-full);
  font-weight: 700;
}
```

**Cartes :**
```css
.card {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  border: 1px solid var(--color-border);
  transition: all 0.25s ease;
  overflow: hidden;
}
.card:hover {
  box-shadow: 0 10px 28px rgba(26, 107, 42, 0.10);
  transform: translateY(-4px);
}
/* Accent haut de carte */
.card-featured { border-top: 4px solid var(--color-primary); }
.card-accent    { border-top: 4px solid var(--color-accent); }
```

**Badges :**
```css
.badge-green  { background: var(--color-primary-pale); color: var(--color-primary); font-weight: 600; border-radius: var(--radius-full); padding: 0.25rem 0.875rem; font-size: var(--text-sm); }
.badge-yellow { background: var(--color-accent-light); color: #92610A; font-weight: 600; border-radius: var(--radius-full); padding: 0.25rem 0.875rem; font-size: var(--text-sm); }
```

**Animations :**
- Apparition au scroll : fade-in + translateY(20px → 0) — utiliser Framer Motion ou Tailwind animate
- Survol des cartes : translateY(-4px) + ombre verte
- Chiffres d'impact : comptage animé au scroll (CountUp)
- Transitions de page : légères et rapides (< 300ms)
- **Sobriété obligatoire** : pas d'animations ostentatoires, le site doit rester professionnel

### 2.5 Structure visuelle globale

**Séparateurs de sections :** Vagues SVG douces entre sections (alternance fond blanc / fond vert pâle) pour un rendu organique.

**En-têtes de section :** Chaque grande section doit avoir :
- Un badge coloré au-dessus (vert ou jaune)
- Un grand titre (Playfair Display ou Plus Jakarta Sans Bold)
- Un sous-titre court en Plus Jakarta Sans
- Un séparateur visuel ou ligne décorative

**Images :** Utiliser des photos Unsplash libres de droits avec thèmes éducatifs (enfants qui apprennent, enseignants, science, nature, Afrique). Format 16:9 ou 4:3 pour les couvertures, 1:1 pour les avatars d'équipe.

### 2.6 Navigation principale (Navbar)

```
[Logo YEHLI]  Accueil · Qui sommes-nous · Nos actions · Formations · Blog · Événements
                                          [Nous soutenir ▾]  [Contact]  [Demander une intervention →]
```

- Fond blanc, légère ombre en scroll, sticky en haut
- Logo YEHLI (`/public/images/logo-yehli.png`) à gauche
- Bouton "Demander une intervention" : bouton primaire vert, arrondi complet
- Mobile : hamburger → drawer latéral animé

### 2.7 Hero page d'accueil — directives

**Structure en deux colonnes :**
- Colonne gauche : badge catégorie + grand titre `Playfair Display` + sous-titre `Plus Jakarta Sans` + 2 CTA + stats en ligne
- Colonne droite : image ou illustration éducative lumineuse

**Message principal du hero :**
> *"Chaque enfant qui apprend est une lumière qui grandit"*

Sous-titre suggéré :
> *"YEHLI accompagne les enfants, les jeunes et les éducateurs de Côte d'Ivoire vers l'excellence éducative, scientifique et citoyenne."*

CTA hero : `[Demander une intervention]` (primaire vert) + `[Faire un don]` (secondaire)

Stats : `300+ élèves touchés` · `50+ formations` · `5+ années d'impact` · `20+ établissements`

### 2.8 Footer

Fond vert foncé (`--color-primary`), texte blanc, logo YEHLI version blanche.

```
Colonne 1 : Logo + slogan + réseaux sociaux
Colonne 2 : L'association (liens)
Colonne 3 : Nos actions (liens)
Colonne 4 : Nous rejoindre (bénévole, adhérer, don)
Colonne 5 : Contact (email, téléphone, WhatsApp)

Bande basse :
© 2024 YEHLI · Mentions légales · Politique de confidentialité · Conditions d'utilisation
Site conçu et réalisé par Digital Access — Département Digital Web Solution
```

---

## PARTIE III — OBJECTIFS DU PROJET

### 3.1 Objectif général

Concevoir et développer une plateforme web moderne, responsive, administrable et optimisée pour l'ONG / Association YEHLI, afin de :
- Renforcer sa visibilité et sa crédibilité institutionnelle
- Structurer sa communication
- Faciliter l'engagement de ses publics (écoles, familles, donateurs, bénévoles, institutions)
- Valoriser son impact éducatif, scientifique et social

### 3.2 Objectifs spécifiques

1. Créer une identité digitale professionnelle, cohérente et crédible pour YEHLI
2. Présenter clairement l'association, son histoire, sa mission, sa vision et ses valeurs
3. Valoriser les domaines d'intervention, programmes, formations, ateliers et conférences
4. Permettre aux écoles, associations, collectivités et institutions de soumettre des demandes d'intervention
5. Faciliter les inscriptions de bénévoles, les adhésions, les dons et les partenariats
6. Publier des articles, ressources pédagogiques et contenus de vulgarisation scientifique
7. Mettre en avant les événements, activités, projets, témoignages et partenaires
8. Créer un espace administrateur sécurisé pour gérer contenus et demandes
9. Optimiser le site pour le référencement naturel, la performance, la sécurité et l'accessibilité

### 3.3 Nature du projet

Application web complète — **non une vitrine statique** — comprenant :
1. Interface publique accessible aux visiteurs
2. Espace d'administration sécurisé
3. Base de données relationnelle (PostgreSQL + Prisma)
4. Formulaires fonctionnels avec validation client + serveur
5. Emails automatiques transactionnels
6. Gestion dynamique de tous les contenus
7. Gestion des médias (upload, albums, galerie)
8. SEO technique complet
9. Architecture évolutive pour les prochaines phases

---

## PARTIE IV — PUBLICS CIBLES

| Public | Besoin principal | Réponse attendue du site |
|--------|-----------------|--------------------------|
| Enfants et jeunes | Voir les programmes et activités qui leur sont destinés | Pages vivantes, galerie, activités, langage accessible |
| Parents et familles | Comprendre les valeurs et l'impact sur leurs enfants | Présentation claire, valeurs, témoignages, contacts visibles |
| Enseignants et établissements | Demander une formation, un atelier ou une conférence | Catalogue, fiches détaillées, formulaire d'intervention |
| Associations et ONG | Collaborer autour d'actions éducatives | Parcours de demande adapté, présentation des partenariats |
| Collectivités et institutions | Identifier un partenaire fiable et structuré | Page institutionnelle, actions, impact, équipe, documents |
| Donateurs et mécènes | Comprendre l'usage concret des contributions | Page don rassurante, transparence, indicateurs d'impact |
| Bénévoles | Savoir comment aider et proposer ses compétences | Formulaire bénévole, domaines d'engagement, confirmation |
| Partenaires techniques/financiers | Évaluer la crédibilité et initier une collaboration | Projets, partenaires actuels, contact direct, dossier |

---

## PARTIE V — ARBORESCENCES

### 5.1 Arborescence publique

```
/
├── qui-sommes-nous
├── nos-actions
│   └── [slug]
├── formations
│   └── [slug]
├── demander-une-intervention
├── nous-soutenir
├── faire-un-don
├── adherer
├── devenir-benevole
├── blog
│   └── [slug]
├── evenements
│   └── [slug]
├── galerie
├── partenaires
├── contact
├── mentions-legales
├── politique-de-confidentialite
└── conditions-utilisation
```

### 5.2 Arborescence administrateur

```
/admin
├── dashboard
├── articles
├── categories
├── tags
├── formations
├── actions
├── demandes-intervention
├── benevoles
├── adhesions
├── dons
├── evenements
├── galerie
├── partenaires
├── temoignages
├── equipe
├── newsletter
├── messages
├── utilisateurs
├── stats-impact
└── parametres
```

### 5.3 Parcours utilisateurs prioritaires

| Parcours | Déclencheur | Action attendue |
|----------|-------------|-----------------|
| École / enseignant | Découverte d'une formation | Remplir une demande d'intervention |
| Donateur | Lecture de l'impact et des besoins | Faire un don ou financer une activité |
| Bénévole | Intérêt pour la cause éducative | Soumettre une candidature de bénévolat |
| Institution / partenaire | Recherche de collaboration | Contacter YEHLI ou proposer un partenariat |
| Lecteur | Article de vulgarisation | Lire d'autres ressources et s'abonner à la newsletter |

---

## PARTIE VI — FONCTIONNALITÉS PUBLIQUES DÉTAILLÉES

### 6.1 Page d'accueil `/`

Page longue, sections en alternance fond blanc / fond vert pâle, séparateurs en vague SVG.

**Sections dans l'ordre :**

1. **Hero** — cf. directives section 2.7
2. **Notre mission en chiffres** — 4 statistiques animées au scroll sur fond vert pâle
3. **Nos domaines d'action** — 8 cartes (icône Lucide + titre + description + lien)
4. **Nos formations phares** — 3 formations mises en avant + bouton "Voir toutes"
5. **Pourquoi soutenir YEHLI** — Texte gauche + visuel droit + liste d'impact concrète
6. **Nos dernières actualités** — 3 articles récents du blog
7. **Événements à venir** — 2-3 prochains événements
8. **Galerie aperçu** — 6 photos en grille
9. **Témoignages** — Carousel ou grille de 3 témoignages
10. **Nos partenaires** — Logos sur fond blanc
11. **Nous rejoindre** — Section CTA pleine largeur en vert, 4 boutons d'action
12. **Newsletter** — Bloc d'inscription simple et chaleureux
13. **Contact rapide** — Email + téléphone + WhatsApp + lien vers page contact

**4 CTA obligatoires sur l'accueil :**
- Demander une intervention
- Faire un don
- Devenir bénévole
- Adhérer

---

### 6.2 Page "Qui sommes-nous ?" `/qui-sommes-nous`

**Sections :**
1. En-tête de page — breadcrumb + titre + sous-titre + image de couverture
2. Notre histoire — texte narratif sur la genèse de l'association
3. Mission, vision, valeurs — 3 colonnes avec icônes
4. Mot de la fondatrice — citation en encadré stylisé (Playfair Display italic)
5. Notre équipe — cartes membres (photo, nom, titre, bio courte) — données administrables
6. Nos engagements — liste visuelle illustrée
7. Gouvernance — section discrète si documents disponibles
8. CTA fin de page — "Rejoignez notre mission"

**Membres initiaux :**

| Nom | Rôle |
|-----|------|
| Dr Mariame Coulibaly | Fondatrice — Maître de conférences en physique-chimie |
| Dr Safiatou Coulibaly | Co-fondatrice |
| Gethème Kouadio | Secrétaire Général |

---

### 6.3 Page "Nos actions" `/nos-actions`

Grille de cartes d'actions avec image, icône thématique, titre, courte description, public cible et lien détail.

**Axes à prévoir :**

| Axe | Icône Lucide | Description |
|-----|-------------|-------------|
| Éducation | GraduationCap | Pratiques pédagogiques innovantes et inclusives |
| Vulgarisation scientifique | FlaskConical | Rendre la science accessible à tous |
| Ateliers philo & pensée critique | Brain | Apprendre à réfléchir et à argumenter |
| Environnement | Leaf | Agir pour notre planète dès l'école |
| Inclusion & égalité | Heart | L'éducation pour chaque enfant sans exception |
| Numérique éducatif | Monitor | Technologies et IA au service de l'apprentissage |
| Formation des enseignants | Users | Soutenir ceux qui transmettent le savoir |
| Actions communautaires | Globe | S'engager dans le tissu local et communautaire |

Chaque action (page détail) contient :
- titre, slug, courte description, description longue riche
- public cible, objectifs détaillés
- exemples d'activités réalisées
- image principale + galerie associée
- bouton "Demander une intervention sur ce thème"
- statut publié/brouillon, ordre d'affichage

---

### 6.4 Page "Formations" `/formations` et `/formations/[slug]`

**Page liste :** Catalogue filtrable — grille 3 colonnes + filtres (thématique, public cible, format).

**Page détail :** Titre + résumé + contenu riche + objectifs + durée + format + public + bouton demande.

**Fonctionnalités :**
- Recherche par mot-clé
- Filtre par thématique
- Filtre par public cible (élèves / enseignants / tous publics)
- Bouton "Demander cette formation" → vers formulaire d'intervention

**12 formations initiales (données réalistes, sans lorem ipsum) :**

| Titre | Thème | Public | Durée |
|-------|-------|--------|-------|
| L'énergie dans tous ses états | Physique | Collégiens / Lycéens | 3h |
| Neurosciences et métacognition | Apprendre à apprendre | Enseignants | Demi-journée |
| Tout est chimie : du vivant aux technologies | Chimie du quotidien | Lycéens | 2h |
| Découvrir les langages numériques | Initiation code | Collégiens | 2h |
| Le bonheur | Atelier philo | Primaire / Collège | 1h30 |
| L'amitié | Atelier philo | Primaire | 1h |
| Apprendre à l'ère de l'intelligence artificielle | IA éducative | Enseignants | Demi-journée |
| Enseigner dans une économie basée sur la connaissance | Pédagogie | Enseignants | Journée |
| Protection de l'environnement : nous sommes la transition | Environnement | Tous publics | 2h |
| Le pouvoir de la connaissance | Citoyenneté | Lycéens / Étudiants | 1h30 |
| Histoire de la science : de la physique à la sociologie | Culture scientifique | Lycéens | 2h |
| Gestion bienveillante de la classe | Inclusion | Enseignants | Demi-journée |

---

### 6.5 Page "Demander une intervention" `/demander-une-intervention`

**Introduction :** Texte chaleureux présentant la gratuité et la flexibilité des interventions.

**Formulaire (tous les champs) :**

*Informations sur la structure*
- Nom de la structure `*`
- Type de structure `*` : établissement scolaire / association–ONG / collectivité locale / entreprise / institution / autre
- Ville `*`
- Commune
- Pays `*` (liste, Côte d'Ivoire en premier)

*Responsable du contact*
- Nom `*`
- Prénom `*`
- Fonction `*`
- Email `*`
- Téléphone / WhatsApp `*`

*Détails de la demande*
- Public concerné `*` (élèves primaire / collégiens / lycéens / étudiants / enseignants / adultes / mixte)
- Nombre estimé de participants
- Thématique souhaitée (liste déroulante reprenant les domaines YEHLI + "Autre")
- Type d'intervention `*` : atelier / conférence / formation / sensibilisation / autre
- Date souhaitée
- Budget indicatif si applicable
- Message complémentaire (textarea)

*Conditions*
- ☑ Consentement politique de confidentialité `*`

**Traitement :**
- Validation Zod client + serveur
- Enregistrement en base, statut `NEW`
- Email de confirmation chaleureux au demandeur
- Email de notification à l'admin
- Message de succès : *"Merci ! Nous avons bien reçu votre demande. Notre équipe vous contactera dans les meilleurs délais."*
- Rate limiting + honeypot anti-spam

---

### 6.6 Page "Nous soutenir" `/nous-soutenir`

**Sections :**
1. En-tête inspirant — pourquoi soutenir YEHLI
2. 6 modes de soutien en cartes visuelles :
   - Faire un don financier (→ `/faire-un-don`)
   - Adhérer à l'association (→ `/adherer`)
   - Devenir bénévole (→ `/devenir-benevole`)
   - Devenir partenaire (→ `/contact`)
   - Faire un don matériel (→ `/contact`)
   - Sponsoriser une activité / une formation (→ `/contact`)
3. À quoi servent vos contributions — liste illustrée de l'usage des dons
4. Témoignages de donateurs / bénévoles
5. CTA final

---

### 6.7 Page "Faire un don" `/faire-un-don`

**Design :** Sobre, rassurant, orienté impact. Explication de l'utilisation des dons avant le formulaire.

**Fonctionnalités :**
- Montants prédéfinis : 5 000 XOF / 10 000 XOF / 25 000 XOF / 50 000 XOF + montant libre
- Type de don : Ponctuel / Récurrent
- Destination optionnelle : Général / Ateliers élèves / Formation enseignants / Ressources pédagogiques

**Champs du formulaire :**
- Nom, Prénom, Email `*`, Téléphone
- Montant `*`, Devise (XOF par défaut)
- Type de don `*`
- Destination du don
- Message optionnel
- ☑ Souhait d'anonymat
- ☑ Consentement `*`

**Statuts de don :** PENDING / CONFIRMED / FAILED / CANCELLED / REFUNDED

**Abstraction paiement :** Créer `/lib/payment/index.ts` avec interface générique prête pour CinetPay, PayDunya, Stripe, Mobile Money. En l'absence de clés API, enregistrer l'intention de don (statut PENDING) et envoyer un email de confirmation.

---

### 6.8 Page "Adhérer" `/adherer`

**Présentation :** Avantages de l'adhésion, types disponibles.

**Champs :** Nom `*`, Prénom `*`, Email `*`, Téléphone, Ville, Commune, Pays `*`, Profession, Organisation éventuelle, Type d'adhésion `*` (membre actif / bienfaiteur / honoraire / autre), Motivation (textarea), Consentement `*`.

**Statuts :** NEW / IN_PROGRESS / ACCEPTED / REJECTED / ARCHIVED

---

### 6.9 Page "Devenir bénévole" `/devenir-benevole`

**Présentation :** Valoriser l'acte de bénévolat comme engagement citoyen fort.

**Champs :** Nom `*`, Prénom `*`, Email `*`, Téléphone, Ville, Commune, Pays `*`, Profession, Disponibilité (temps/semaine), Compétences (textarea).

**Domaines d'intérêt (checkboxes multi) :** Animation d'ateliers / Vulgarisation scientifique / Environnement / Numérique éducatif / Communication / Logistique / Collecte de fonds / Mentorat / Administration / Autre.

**Autres champs :** Expérience associative (textarea), Motivation `*` (textarea), Consentement `*`.

**Statuts :** NEW / IN_PROGRESS / RETAINED / NOT_RETAINED / ARCHIVED

---

### 6.10 Blog / Ressources `/blog` et `/blog/[slug]`

**Page liste :** Grille 3 colonnes — carte (image couverture, badge catégorie, titre, extrait, auteur, date). Filtres catégories + tags + recherche.

**Page article :** Image pleine largeur + breadcrumb + titre Playfair Display + méta auteur/date/catégorie + contenu riche + partage social + sidebar (articles liés, newsletter).

**Catégories initiales :**
Vulgarisation scientifique / Physique-Chimie / TICE / Intelligence artificielle / Environnement / Éducation / Inclusion / Pensée critique / Actualités YEHLI

**Partage social :** LinkedIn, Facebook, Twitter/X, WhatsApp

**3 articles de démonstration :**

**Article 1 :** *"L'électricité, c'est magique ? Non, c'est de la physique !"*
Catégorie : Physique-Chimie. Extrait : Comprendre l'électricité de manière simple et ludique pour les enfants de 10 à 15 ans : qu'est-ce qu'un électron, comment fonctionne une pile, pourquoi l'ampoule s'allume ?

**Article 2 :** *"Pourquoi enseigner la philosophie dès l'école primaire ?"*
Catégorie : Éducation. Extrait : Des études récentes montrent que les ateliers philosophiques développent l'empathie, la pensée critique et la capacité d'écoute chez les enfants dès 6 ans.

**Article 3 :** *"L'intelligence artificielle expliquée à nos enfants"*
Catégorie : Intelligence artificielle. Extrait : Comment initier les élèves à l'IA de manière éthique, bienveillante et accessible en classe, avec des exemples du quotidien qu'ils connaissent déjà.

**Mots-clés SEO à travailler :** association éducation Côte d'Ivoire · ONG éducation enfants · vulgarisation scientifique · formation enseignants Côte d'Ivoire · ateliers scientifiques enfants · éducation inclusive · numérique éducatif · intelligence artificielle éducation · pensée critique enfants

---

### 6.11 Événements `/evenements` et `/evenements/[slug]`

**Page liste :** Deux sections distinctes — "Événements à venir" + "Événements passés". Cartes visuelles avec date mise en avant graphiquement.

**Page détail :** Description complète + lieu + programme + intervenants + galerie + formulaire d'inscription si ouvert.

**Chaque événement :** titre, slug, description longue, date début/fin, lieu, ville, pays, image principale, capacité, inscriptions ouvertes/fermées, statut.

**2 événements de démonstration :**
- *"Forum de l'éducation inclusive de Côte d'Ivoire"* — À venir — Abidjan — inscriptions ouvertes
- *"Atelier Sciences et Curiosité — Édition 2024"* — Passé — Yamoussoukro — galerie photos

---

### 6.12 Galerie `/galerie`

**Design :** Grille masonry responsive. Filtres : albums / type de média / année.

Chaque média : titre, description, type (IMAGE / VIDEO), URL, miniature, album, date, lieu, statut.

**2 albums de démonstration :** "Ateliers Sciences 2024" (3 photos) + "Formation Enseignants 2024" (3 photos). Photos Unsplash thème éducation/science.

**Lightbox** pour affichage détaillé de chaque média.

---

### 6.13 Partenaires `/partenaires`

**Design :** Logos organisés par type + section "Devenir partenaire".

**Types :** institutionnel / technique / financier / école bénéficiaire

---

### 6.14 Contact `/contact`

**Deux colonnes :** Infos de contact à gauche (email, téléphone, WhatsApp, adresse, réseaux sociaux) + formulaire à droite.

**Champs formulaire :** Nom `*`, Email `*`, Téléphone, Sujet `*` (liste : Demande d'info / Partenariat / Presse / Autre), Message `*`, Consentement `*`.

---

### 6.15 Pages légales

- `/mentions-legales` — Informations légales sur l'association et l'hébergeur
- `/politique-de-confidentialite` — Données collectées, durée de conservation, droits des utilisateurs
- `/conditions-utilisation` — Conditions d'usage de la plateforme

Administrables via `SiteSetting` (clé + valeur texte long) ou en contenu statique dans le code.

---

## PARTIE VII — ESPACE ADMINISTRATEUR

### 7.1 Design de l'interface admin

- Sidebar gauche fixe, fond blanc / gris très clair
- Accents verts pour éléments actifs
- Header avec nom utilisateur + bouton déconnexion + notifications
- Breadcrumb sur chaque page
- Tableaux avec pagination, tri par colonne, filtres
- Design system cohérent avec le front (même police, même radius)

### 7.2 Authentification

- NextAuth.js avec Credentials Provider
- Hachage bcrypt des mots de passe
- Sessions sécurisées (JWT ou database sessions)
- Middleware de protection sur toutes les routes `/admin/*`

**Rôles :**

| Rôle | Accès |
|------|-------|
| SUPER_ADMIN | Total — y compris gestion des utilisateurs |
| ADMIN | Total sauf gestion des utilisateurs |
| EDITOR | Articles, formations, événements, galerie |
| VIEWER | Lecture seule |

### 7.3 Dashboard `/admin/dashboard`

- Compteurs en cards : articles publiés, formations, demandes d'intervention (nouvelles), bénévoles, adhésions, dons, événements, abonnés newsletter
- Graphique demandes par mois (Recharts)
- 5 derniers messages de contact
- 5 dernières demandes d'intervention
- Raccourcis rapides vers les actions les plus fréquentes

### 7.4 Articles `/admin/articles`

CRUD complet + éditeur riche (TipTap ou react-quill) + upload image couverture + catégorie + tags + SEO (meta title, meta description) + brouillon/publié/archivé.

### 7.5 Formations `/admin/formations`

CRUD complet — tous les champs du modèle Training + filtres par thématique et statut.

### 7.6 Actions `/admin/actions`

CRUD complet pour les 8 axes d'intervention + ordre d'affichage + images.

### 7.7 Demandes d'intervention `/admin/demandes-intervention`

Liste + filtres (statut, type de structure, date) + vue détail + modification statut + notes internes + **export CSV**.

**Statuts gérés :** NEW → IN_PROGRESS → ACCEPTED → SCHEDULED → COMPLETED → REJECTED → ARCHIVED

### 7.8 Bénévoles `/admin/benevoles`

Liste + filtres (statut, domaines) + vue détail + modification statut + notes internes + **export CSV**.

### 7.9 Adhésions `/admin/adhesions`

Liste + filtres (statut, type) + vue détail + modification statut + **export CSV**.

### 7.10 Dons `/admin/dons`

Liste + montant total affiché + filtres (statut, période) + vue détail + **export CSV**.

### 7.11 Événements `/admin/evenements`

CRUD complet + gestion inscriptions (si ouvertes) + liste des inscrits.

### 7.12 Galerie `/admin/galerie`

Upload images (UploadThing) + enregistrement vidéo via URL + création albums + légendes + publication/masquage/suppression.

### 7.13 Partenaires `/admin/partenaires`

CRUD : nom, logo, type, description, site web, ordre, statut.

### 7.14 Témoignages `/admin/temoignages`

CRUD : nom, fonction, contenu, photo optionnelle, ordre, statut.

### 7.15 Équipe `/admin/equipe`

CRUD des membres de l'équipe affichés sur "Qui sommes-nous ?" : nom, rôle, bio, photo, ordre, statut.

### 7.16 Newsletter `/admin/newsletter`

Liste abonnés (email, nom, date) + suppression + **export CSV**.

### 7.17 Messages `/admin/messages`

Liste + marquage lu/non-lu/traité + archivage.

### 7.18 Statistiques d'impact `/admin/stats-impact`

CRUD des chiffres affichés sur l'accueil (label, valeur, icône, ordre).

### 7.19 Paramètres `/admin/parametres`

Gérer via `SiteSetting` :
- Nom du site, slogan
- Email officiel, téléphone, WhatsApp, adresse
- Réseaux sociaux (Facebook, Instagram, LinkedIn, YouTube)
- SEO global (meta description du site)
- Pages légales (contenu textuel)

---

## PARTIE VIII — MODÈLES DE DONNÉES

### 8.1 Stack technique

```
Framework       : Next.js 14+ (App Router)
Langage         : TypeScript strict
Base de données : PostgreSQL
ORM             : Prisma ORM
Auth            : NextAuth.js (Auth.js) — Credentials Provider
Validation      : Zod
Formulaires     : React Hook Form + @hookform/resolvers/zod
Email           : Resend (fallback : Nodemailer)
Upload médias   : UploadThing (fallback : Cloudinary)
CSS             : Tailwind CSS
UI Components   : shadcn/ui + composants custom
Police          : Plus Jakarta Sans (Google Fonts) — légèrement arrondie
Icônes          : Lucide React
Animations      : Framer Motion (sobres)
Graphiques admin: Recharts
Déploiement     : Vercel
```

### 8.2 Schéma Prisma complet

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============ ENUMS ============

enum UserRole {
  SUPER_ADMIN
  ADMIN
  EDITOR
  VIEWER
}

enum PublishStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum RequestStatus {
  NEW
  IN_PROGRESS
  ACCEPTED
  SCHEDULED
  COMPLETED
  REJECTED
  ARCHIVED
}

enum DonationStatus {
  PENDING
  CONFIRMED
  FAILED
  CANCELLED
  REFUNDED
}

enum MediaType {
  IMAGE
  VIDEO
}

// ============ MODÈLES ============

model User {
  id           String    @id @default(cuid())
  name         String?
  email        String    @unique
  passwordHash String?
  role         UserRole  @default(VIEWER)
  image        String?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  articles     Article[]
}

model Category {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  description String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  articles    Article[]
}

model Tag {
  id        String       @id @default(cuid())
  name      String
  slug      String       @unique
  createdAt DateTime     @default(now())
  articles  ArticleTag[]
}

model Article {
  id              String        @id @default(cuid())
  title           String
  slug            String        @unique
  excerpt         String?
  content         String        @db.Text
  coverImage      String?
  status          PublishStatus @default(DRAFT)
  publishedAt     DateTime?
  metaTitle       String?
  metaDescription String?
  authorId        String?
  author          User?         @relation(fields: [authorId], references: [id])
  categoryId      String?
  category        Category?     @relation(fields: [categoryId], references: [id])
  tags            ArticleTag[]
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

model ArticleTag {
  articleId String
  tagId     String
  article   Article @relation(fields: [articleId], references: [id], onDelete: Cascade)
  tag       Tag     @relation(fields: [tagId], references: [id], onDelete: Cascade)
  @@id([articleId, tagId])
}

model Training {
  id              String        @id @default(cuid())
  title           String
  slug            String        @unique
  summary         String?
  description     String        @db.Text
  objectives      String?       @db.Text
  targetAudience  String?
  duration        String?
  format          String?
  theme           String?
  prerequisites   String?
  image           String?
  status          PublishStatus @default(DRAFT)
  metaTitle       String?
  metaDescription String?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

model ActionProgram {
  id             String        @id @default(cuid())
  title          String
  slug           String        @unique
  shortDesc      String?
  description    String        @db.Text
  targetAudience String?
  objectives     String?       @db.Text
  image          String?
  icon           String?
  order          Int           @default(0)
  status         PublishStatus @default(DRAFT)
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt
}

model TeamMember {
  id        String        @id @default(cuid())
  name      String
  role      String
  bio       String?       @db.Text
  photo     String?
  email     String?
  linkedin  String?
  order     Int           @default(0)
  status    PublishStatus @default(PUBLISHED)
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt
}

model InterventionRequest {
  id                    String        @id @default(cuid())
  structureName          String
  structureType          String
  managerFirstName       String?
  managerLastName        String?
  managerRole            String?
  email                  String
  phone                  String?
  city                   String?
  commune                String?
  country                String?
  targetAudience         String?
  estimatedParticipants  Int?
  requestedTheme         String?
  interventionType       String?
  desiredDate            DateTime?
  indicativeBudget       String?
  message                String?       @db.Text
  status                 RequestStatus @default(NEW)
  internalNote           String?       @db.Text
  createdAt              DateTime      @default(now())
  updatedAt              DateTime      @updatedAt
}

model VolunteerApplication {
  id                    String        @id @default(cuid())
  firstName              String
  lastName               String
  email                  String
  phone                  String?
  city                   String?
  commune                String?
  country                String?
  profession             String?
  availability           String?
  skills                 String?       @db.Text
  interests              String?
  associativeExperience  String?       @db.Text
  motivation             String?       @db.Text
  status                 RequestStatus @default(NEW)
  internalNote           String?       @db.Text
  createdAt              DateTime      @default(now())
  updatedAt              DateTime      @updatedAt
}

model MembershipApplication {
  id             String        @id @default(cuid())
  firstName       String
  lastName        String
  email           String
  phone           String?
  city            String?
  commune         String?
  country         String?
  profession      String?
  organization    String?
  membershipType  String?
  motivation      String?       @db.Text
  status          RequestStatus @default(NEW)
  internalNote    String?       @db.Text
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

model Donation {
  id               String         @id @default(cuid())
  firstName         String?
  lastName          String?
  email             String
  phone             String?
  amount            Decimal        @db.Decimal(12, 2)
  currency          String         @default("XOF")
  donationType      String?
  destination       String?
  message           String?
  anonymous         Boolean        @default(false)
  status            DonationStatus @default(PENDING)
  paymentProvider   String?
  paymentReference  String?
  createdAt         DateTime       @default(now())
  updatedAt         DateTime       @updatedAt
}

model Event {
  id               String              @id @default(cuid())
  title            String
  slug             String              @unique
  description      String              @db.Text
  startDate        DateTime
  endDate          DateTime?
  location         String?
  city             String?
  country          String?
  coverImage       String?
  capacity         Int?
  registrationOpen Boolean             @default(false)
  status           PublishStatus       @default(DRAFT)
  createdAt        DateTime            @default(now())
  updatedAt        DateTime            @updatedAt
  registrations    EventRegistration[]
}

model EventRegistration {
  id        String   @id @default(cuid())
  eventId   String
  event     Event    @relation(fields: [eventId], references: [id], onDelete: Cascade)
  firstName String
  lastName  String
  email     String
  phone     String?
  createdAt DateTime @default(now())
}

model GalleryAlbum {
  id          String        @id @default(cuid())
  title       String
  slug        String        @unique
  description String?
  coverImage  String?
  status      PublishStatus @default(PUBLISHED)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  items       GalleryItem[]
}

model GalleryItem {
  id          String        @id @default(cuid())
  title       String
  description String?
  type        MediaType
  url         String
  thumbnail   String?
  date        DateTime?
  location    String?
  status      PublishStatus @default(PUBLISHED)
  albumId     String?
  album       GalleryAlbum? @relation(fields: [albumId], references: [id])
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

model Partner {
  id          String        @id @default(cuid())
  name        String
  type        String?
  description String?
  logo        String?
  website     String?
  order       Int           @default(0)
  status      PublishStatus @default(PUBLISHED)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

model Testimonial {
  id        String        @id @default(cuid())
  name      String
  role      String?
  content   String        @db.Text
  photo     String?
  order     Int           @default(0)
  status    PublishStatus @default(PUBLISHED)
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt
}

model NewsletterSubscriber {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
}

model ContactMessage {
  id        String        @id @default(cuid())
  name      String
  email     String
  phone     String?
  subject   String?
  message   String        @db.Text
  status    RequestStatus @default(NEW)
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt
}

model SiteSetting {
  id        String   @id @default(cuid())
  key       String   @unique
  value     String?  @db.Text
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model ImpactStat {
  id        String   @id @default(cuid())
  label     String
  value     String
  icon      String?
  order     Int      @default(0)
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model PageSEO {
  id          String   @id @default(cuid())
  pageKey      String   @unique
  title        String?
  description  String?
  ogImage      String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

---

## PARTIE IX — DONNÉES DE DÉMONSTRATION (SEED)

Fichier : `prisma/seed.ts`. **Aucun lorem ipsum. Toutes les données sont réalistes et cohérentes.**

### 9.1 Administrateur par défaut

```typescript
{
  email:    process.env.ADMIN_EMAIL    || "admin@yehli.org",
  password: process.env.ADMIN_PASSWORD || "YehliAdmin2024!",  // hashé bcrypt
  name:     "Administrateur YEHLI",
  role:     "SUPER_ADMIN"
}
```

### 9.2 Membres de l'équipe

```typescript
[
  {
    name:  "Dr Mariame Coulibaly",
    role:  "Fondatrice",
    bio:   "Maître de conférences en physique-chimie, Dr Mariame Coulibaly a fondé YEHLI avec la conviction que l'éducation est le levier le plus puissant pour transformer la société. Passionnée de vulgarisation scientifique, elle croit en la capacité de chaque enfant à devenir une lumière pour son entourage.",
    order: 1
  },
  {
    name:  "Dr Safiatou Coulibaly",
    role:  "Co-fondatrice",
    bio:   "Co-fondatrice de YEHLI, Dr Safiatou Coulibaly apporte son expertise académique et son engagement social au service de l'éducation inclusive. Elle pilote les partenariats institutionnels et le développement des programmes de formation.",
    order: 2
  },
  {
    name:  "Gethème Kouadio",
    role:  "Secrétaire Général",
    bio:   "Gethème Kouadio assure la coordination administrative et opérationnelle de l'association. Il veille à la bonne organisation des actions de terrain et à la cohérence de toutes les activités de YEHLI.",
    order: 3
  }
]
```

### 9.3 Statistiques d'impact

```typescript
[
  { label: "Élèves touchés",              value: "300+", icon: "GraduationCap", order: 1 },
  { label: "Formations réalisées",        value: "50+",  icon: "BookOpen",      order: 2 },
  { label: "Années d'impact",             value: "5+",   icon: "Calendar",      order: 3 },
  { label: "Établissements partenaires",  value: "20+",  icon: "School",        order: 4 }
]
```

### 9.4 Paramètres du site

```typescript
[
  { key: "site_name",        value: "YEHLI" },
  { key: "site_tagline",     value: "L'éducation, une lumière pour changer des vies" },
  { key: "site_description", value: "YEHLI est une ONG dédiée à l'éducation et à l'épanouissement des enfants et des jeunes en Côte d'Ivoire." },
  { key: "site_creator",     value: "Digital Access — Département Digital Web Solution" },
  { key: "contact_email",    value: "contact@yehli.org" },
  { key: "contact_phone",    value: "+225 07 00 00 00 00" },
  { key: "contact_whatsapp", value: "+225 07 00 00 00 00" },
  { key: "contact_address",  value: "Abidjan, Côte d'Ivoire" },
  { key: "social_facebook",  value: "https://facebook.com/yehli.ci" },
  { key: "social_instagram", value: "https://instagram.com/yehli.ci" },
  { key: "social_linkedin",  value: "https://linkedin.com/company/yehli" },
  { key: "social_youtube",   value: "" }
]
```

### 9.5 Catégories d'articles (9 catégories)

Vulgarisation scientifique · Physique-Chimie · TICE · Intelligence artificielle · Environnement · Éducation · Inclusion · Pensée critique · Actualités YEHLI

### 9.6 Tags

science · enfants · éducation · IA · philosophie · environnement · inclusion · numérique · formation · enseignants · Côte-d'Ivoire · bénévolat · jeunesse · physique · chimie

### 9.7 Témoignages

```typescript
[
  {
    name:    "Mme Adjoua Koffi",
    role:    "Directrice d'école primaire, Abidjan",
    content: "L'intervention de YEHLI dans notre établissement a transformé l'ambiance de classe. Les enfants ont découvert que la science peut être amusante et accessible. Nos enseignants sont repartis avec des outils concrets et une nouvelle énergie pour enseigner.",
    order: 1
  },
  {
    name:    "M. Kouassi Brou",
    role:    "Enseignant de sciences, Yamoussoukro",
    content: "La formation sur les neurosciences et la métacognition suivie avec YEHLI a changé ma façon d'enseigner. Je comprends mieux comment mes élèves apprennent, et ils progressent davantage depuis. Je recommande ces formations à tous mes collègues.",
    order: 2
  },
  {
    name:    "Fatou Diarra",
    role:    "Mère d'élève, Bouaké",
    content: "Mon fils de 12 ans a participé à un atelier de philosophie organisé par YEHLI. En rentrant à la maison, il m'a posé des questions profondes sur le bonheur et l'amitié. YEHLI a allumé une étincelle en lui que je n'attendais pas.",
    order: 3
  }
]
```

### 9.8 Partenaires

```typescript
[
  { name: "Ministère de l'Éducation Nationale de Côte d'Ivoire", type: "institutionnel",    order: 1 },
  { name: "UNICEF Côte d'Ivoire",                                type: "institutionnel",    order: 2 },
  { name: "Fondation Orange Côte d'Ivoire",                      type: "financier",         order: 3 },
  { name: "ONG Educi",                                           type: "technique",         order: 4 },
  { name: "Lycée Sainte-Marie d'Abidjan",                        type: "ecole_beneficiaire",order: 5 },
  { name: "École Primaire Publique Cocody Centre",               type: "ecole_beneficiaire",order: 6 }
]
```

---

## PARTIE X — GESTION DES EMAILS

### 10.1 Service recommandé

**Resend** (resend.com) — API REST simple, templates React, domaine personnalisé, logs. Fallback : Nodemailer + SMTP.

### 10.2 Design des templates

Tous les templates email doivent :
- Afficher le logo YEHLI en en-tête
- Utiliser les couleurs YEHLI (vert `#1A6B2A`, jaune `#F5C518`)
- Police `Plus Jakarta Sans` ou fallback Arial
- Ton chaleureux et humain
- Signature : *"L'équipe YEHLI — L'éducation, une lumière pour changer des vies"*
- Lien vers le site en pied de template

### 10.3 Les 12 emails automatiques obligatoires

| # | Destinataire | Déclencheur |
|---|-------------|-------------|
| 1 | Demandeur | Confirmation de demande d'intervention |
| 2 | Admin | Notification nouvelle demande d'intervention |
| 3 | Candidat | Confirmation de candidature bénévole |
| 4 | Admin | Notification nouvelle candidature bénévole |
| 5 | Demandeur | Confirmation de demande d'adhésion |
| 6 | Admin | Notification nouvelle adhésion |
| 7 | Donateur | Confirmation d'intention de don |
| 8 | Admin | Notification nouveau don |
| 9 | Expéditeur | Confirmation de message de contact |
| 10 | Admin | Notification nouveau message de contact |
| 11 | Inscrit | Confirmation d'inscription à un événement |
| 12 | Abonné | Confirmation d'abonnement newsletter |

---

## PARTIE XI — SEO TECHNIQUE

```typescript
// app/layout.tsx — Metadata globale
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yehli.org'),
  title: {
    default:  "YEHLI — L'éducation, une lumière pour changer des vies",
    template: '%s | YEHLI'
  },
  description: "YEHLI est une ONG dédiée à l'éducation et à l'épanouissement des enfants et des jeunes en Côte d'Ivoire.",
  keywords: ["éducation", "Côte d'Ivoire", "enfants", "science", "formation enseignants", "ONG", "association", "vulgarisation scientifique", "IA éducative"],
  openGraph: {
    type:     'website',
    locale:   'fr_CI',
    siteName: 'YEHLI'
  },
  twitter: { card: 'summary_large_image' },
  robots:  { index: true, follow: true }
}
```

**Éléments SEO obligatoires :**
- Balises title + meta description uniques par page
- Open Graph + Twitter Cards
- `sitemap.xml` dynamique (articles, formations, événements, actions)
- `robots.txt`
- URLs propres, slugs SEO-friendly
- JSON-LD : Organization, Article, Event, BreadcrumbList
- Alt descriptif sur toutes les images
- Canonical URLs
- Metadata dynamique pour articles, événements, formations
- Maillage interne entre pages connexes

**Mots-clés stratégiques prioritaires :**
association éducation Côte d'Ivoire · ONG éducation enfants Côte d'Ivoire · vulgarisation scientifique Côte d'Ivoire · formation enseignants Côte d'Ivoire · ateliers scientifiques enfants · éducation inclusive · numérique éducatif · intelligence artificielle éducation · pensée critique enfants · association enfants vulnérables

---

## PARTIE XII — SÉCURITÉ ET PERFORMANCE

### 12.1 Sécurité

- Middleware NextAuth sur toutes les routes `/admin/*`
- Validation Zod côté serveur sur tous les formulaires et server actions
- Rate limiting (upstash/ratelimit ou `express-rate-limit`) sur les formulaires publics
- Honeypot field anti-spam sur tous les formulaires
- Bcrypt pour le hachage des mots de passe (cost factor ≥ 12)
- Variables d'environnement pour tous les secrets — jamais dans le code source
- RBAC (contrôle des rôles) dans toutes les server actions admin
- Sanitization HTML (DOMPurify côté serveur)
- Protection injections SQL : Prisma paramétré nativement
- Validation type MIME + taille max (10 MB) sur les uploads
- Gestion des erreurs sans fuite d'informations sensibles (pas de stack traces en production)

### 12.2 Performance

- `next/image` avec optimisation automatique pour toutes les images
- Lazy loading natif
- SSG pour pages statiques (partenaires, mentions légales)
- ISR (revalidate: 3600) pour articles, formations, événements
- SSR pour pages avec données dynamiques
- Pagination par défaut : 12 items/page
- Requêtes Prisma : `select` uniquement les champs nécessaires
- Cache SiteSettings avec tag-based revalidation

### 12.3 Accessibilité (WCAG 2.1 AA)

- Focus visible sur tous les éléments interactifs
- Labels explicites sur tous les champs de formulaire
- Messages d'erreur associés aux champs (aria-describedby)
- Structure HTML sémantique : `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- H1 unique par page, hiérarchie respectée (H1 → H2 → H3)
- `alt` descriptif sur toutes les images
- Contraste minimum 4.5:1 (texte) et 3:1 (grands textes)
- Zones cliquables minimum 44×44px
- Compatible mobile/tablette/desktop (responsive)
- Attributs `aria-label` sur les boutons icônes

---

## PARTIE XIII — VARIABLES D'ENVIRONNEMENT

```env
# .env.example

# ── Base de données ──────────────────────────────────
DATABASE_URL="postgresql://user:password@localhost:5432/yehli_db"

# ── NextAuth ─────────────────────────────────────────
NEXTAUTH_SECRET="generate-a-strong-random-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# ── Administrateur (utilisé par le seed Prisma) ──────
ADMIN_EMAIL="admin@yehli.org"
ADMIN_PASSWORD="YehliAdmin2024!"

# ── Email (Resend) ───────────────────────────────────
RESEND_API_KEY=""
EMAIL_FROM="YEHLI <noreply@yehli.org>"
ADMIN_NOTIFICATION_EMAIL="contact@yehli.org"

# ── Upload médias (UploadThing) ──────────────────────
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""

# ── Site public ──────────────────────────────────────
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# ── Paiement (abstraction — compléter selon prestataire) ──
PAYMENT_PROVIDER=""           # cinetpay | paydunya | stripe | fedapay | mtn_momo
PAYMENT_API_KEY=""
PAYMENT_SECRET=""
PAYMENT_WEBHOOK_SECRET=""

# ── Rate limiting optionnel (Upstash Redis) ──────────
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""
```

---

## PARTIE XIV — ORDRE D'IMPLÉMENTATION

### Étape 1 — Initialisation

```bash
npx create-next-app@latest yehli-website \
  --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd yehli-website

# Dépendances principales
npm install prisma @prisma/client
npm install next-auth @auth/prisma-adapter
npm install bcryptjs && npm install -D @types/bcryptjs
npm install zod react-hook-form @hookform/resolvers
npm install resend
npm install uploadthing @uploadthing/react
npm install lucide-react
npm install framer-motion
npm install recharts
npm install @tanstack/react-table   # pour les tables admin

# shadcn/ui
npx shadcn@latest init

# Prisma
npx prisma init
```

Configurer `tailwind.config.ts` avec les tokens de couleur, police et radius de la charte graphique.

### Étape 2 — Base de données

```bash
# 1. Copier le schéma Prisma de la Partie VIII
npx prisma generate
npx prisma migrate dev --name init
# 2. Créer prisma/seed.ts avec les données de la Partie IX
npx prisma db seed
```

### Étape 3 — Charte graphique et composants de base

- Configurer Google Fonts `Plus Jakarta Sans` + `Playfair Display` dans `app/layout.tsx`
- Créer les tokens CSS dans `globals.css` ou `tailwind.config.ts`
- Créer composants : `Button`, `Card`, `Badge`, `Input`, `Textarea`, `Select`, `Navbar`, `Footer`
- Créer les composants de section réutilisables : `SectionHeader`, `StatCard`, `TestimonialCard`

### Étape 4 — Pages publiques

Dans l'ordre : Layout public → Accueil → Qui sommes-nous → Nos actions (liste + détail) → Formations (liste + détail) → Demander une intervention → Nous soutenir → Faire un don → Adhérer → Devenir bénévole → Blog (liste + détail) → Événements (liste + détail) → Galerie → Partenaires → Contact → Pages légales

### Étape 5 — Formulaires et server actions

- Schémas Zod pour chaque formulaire
- Server Actions dans `/app/actions/`
- Enregistrement en base
- Envoi emails avec Resend
- Rate limiting + honeypot

### Étape 6 — Authentification et espace admin

- Configuration NextAuth + Credentials Provider
- Middleware `/middleware.ts` protégeant `/admin`
- Layout admin (sidebar + header)
- Dashboard avec statistiques et graphique Recharts
- CRUD articles (avec éditeur riche TipTap)
- CRUD formations, actions
- Gestion demandes, bénévoles, adhésions, dons
- Galerie avec UploadThing
- Partenaires, témoignages, équipe
- Newsletter, messages
- Statistiques d'impact, paramètres

### Étape 7 — Upload médias

- Configuration UploadThing (`/app/api/uploadthing/`)
- Intégration dans formulaires admin (images articles, formations, galerie, logos)

### Étape 8 — SEO

- Metadata dynamique par page (articles, formations, événements)
- `app/sitemap.ts` générant le sitemap dynamique
- `app/robots.ts`
- JSON-LD dans les pages concernées

### Étape 9 — Sécurité et performance

- Rate limiting formulaires publics
- Honeypots sur tous les formulaires
- Audit images (`next/image` partout)
- Pagination sur toutes les listes
- Vérification des requêtes Prisma (select optimisé)

### Étape 10 — Build et validation finale

```bash
npx eslint . --fix
npx tsc --noEmit
npx next build
```

Corriger **toutes** les erreurs TypeScript et ESLint avant de livrer.

---

## PARTIE XV — CRITÈRES D'ACCEPTATION

Le projet est considéré terminé et livrable si :

1. ✅ Toutes les pages publiques de l'arborescence existent et sont responsive
2. ✅ La charte graphique YEHLI est appliquée (vert #1A6B2A + jaune #F5C518 + police arrondie Plus Jakarta Sans)
3. ✅ Le logo YEHLI apparaît dans la navbar et le footer
4. ✅ La mention "Digital Access — Département Digital Web Solution" apparaît dans le footer
5. ✅ Les 8 formulaires valident, enregistrent en base et envoient les emails
6. ✅ L'espace admin est entièrement protégé par authentification
7. ✅ Tous les CRUD admin fonctionnent (articles, formations, événements, galerie…)
8. ✅ L'export CSV fonctionne pour demandes, bénévoles, adhésions, dons, newsletter
9. ✅ La galerie fonctionne (upload, albums, lightbox)
10. ✅ Les événements fonctionnent avec inscriptions optionnelles
11. ✅ Le SEO de base est en place (metadata, sitemap, robots.txt, JSON-LD)
12. ✅ Les données de démonstration sont réalistes — aucun lorem ipsum
13. ✅ `npx next build` passe sans erreur TypeScript ni ESLint
14. ✅ Le projet est prêt à être déployé sur Vercel

---

## PARTIE XVI — LIVRABLES ATTENDUS

À la fin du développement :

1. Code source complet, propre et organisé
2. `prisma/schema.prisma` avec tous les modèles
3. Migrations Prisma
4. `prisma/seed.ts` avec données réalistes
5. Toutes les pages publiques
6. Interface admin sécurisée et complète
7. Tous les formulaires avec validation
8. Templates email intégrés (12 emails)
9. `app/sitemap.ts` + `app/robots.ts`
10. `.env.example` complet
11. `README.md` — instructions d'installation, démarrage et déploiement
12. Liste des fonctionnalités terminées
13. Liste des limites ou fonctionnalités non implémentées
14. Recommandations pour les prochaines évolutions (paiement en ligne CinetPay/PayDunya, multilingue français/anglais, application mobile, espace membre connecté)

---

## ANNEXE — RESSOURCES ET RÉFÉRENCES

### Fichiers fournis à placer dans `/public/`

```
/public/images/logo-yehli.png         → logo principal (fond blanc)
/public/images/logo-yehli-white.png   → version blanche pour footer (à dériver du logo)
/public/favicon.ico                   → favicon à générer depuis le logo
```

### Google Fonts à importer

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
```

### Icônes Lucide suggérées par contexte

| Contexte | Icônes |
|----------|--------|
| Navigation | Menu, X, ChevronDown, ArrowRight |
| Domaines d'action | GraduationCap, FlaskConical, Brain, Leaf, Heart, Monitor, Users, Globe |
| Stats impact | BookOpen, Calendar, School, Star, Sparkles |
| Formulaires | User, Mail, Phone, MapPin, MessageSquare, Send, CheckCircle |
| CTA | HandHeart, Handshake, DollarSign, UserPlus |
| Admin | LayoutDashboard, FileText, Settings, LogOut, Eye, Edit, Trash2, Plus, Download |
| Contact | Mail, Phone, MessageCircle, MapPin, Facebook, Instagram, Linkedin, Youtube |

### Informations institutionnelles

- Site web YEHLI : https://yehli.org/
- Créateur du site : **Digital Access — Département Digital Web Solution**
- Pays : Côte d'Ivoire
- Devise locale : XOF (Franc CFA)

### Photos de démonstration (Unsplash — libres de droits)

Utiliser des photos thématiques : enfants qui apprennent, salle de classe, enseignants, science, nature, Afrique. Exemples de requêtes : `children classroom africa`, `science education kids`, `teacher classroom`, `nature environment africa`.

---

*Ce cahier des charges constitue la référence complète et définitive pour la construction du site officiel de YEHLI.*

*Conçu et rédigé par **Digital Access — Département Digital Web Solution** pour l'ONG / Association YEHLI.*

*"Chaque enfant qui apprend est une lumière qui grandit."*

---
**Fin du document — Version 2.0 — Juin 2026**
