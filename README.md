# YEHLI — Site web officiel

Plateforme web institutionnelle, éditoriale, interactive et administrable de l'ONG / Association **YEHLI**, dédiée à l'éducation et à l'épanouissement des enfants et des jeunes en Côte d'Ivoire.

> _« Chaque enfant qui apprend est une lumière qui grandit »_
> L'éducation, une lumière pour changer des vies.

---

## ✨ Aperçu

- **Site public** complet : accueil, qui-sommes-nous, nos actions, formations, blog, événements, galerie, partenaires, pages de soutien et formulaires d'engagement.
- **Header à méga-menus** (desktop) et **drawer animé** (mobile).
- **Espace administrateur** sécurisé : tableau de bord, gestion de tout le contenu, des demandes et des paramètres.
- **8 formulaires** fonctionnels (validation client + serveur, emails, anti-spam).
- **SEO technique** : metadata par page, sitemap dynamique, robots, JSON-LD, image OpenGraph.
- **Mode prévisualisation sans base de données** : le site affiche un contenu de démonstration réaliste tant qu'aucune base PostgreSQL n'est connectée.

## 🧱 Stack technique

| Élément | Choix |
|---|---|
| Framework | Next.js 14 (App Router) |
| Langage | TypeScript (strict) |
| Base de données | PostgreSQL + Prisma ORM |
| Authentification | NextAuth.js (Credentials + JWT, bcrypt) |
| Validation | Zod + React Hook Form |
| Emails | Resend (repli : journalisation console) |
| Upload médias | UploadThing (repli : champs URL) |
| Styles | Tailwind CSS 3 + composants custom |
| Police | Plus Jakarta Sans + Playfair Display |
| Icônes | Lucide React (+ icônes de marque custom) |
| Animations | Framer Motion |
| Graphiques admin | Recharts |
| Éditeur riche | TipTap |
| Déploiement | Vercel |

## 📋 Prérequis

- **Node.js** 18.18+ (testé avec Node 22/24)
- **PostgreSQL** 13+ (pour le mode pleinement fonctionnel)

## 🚀 Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
cp .env.example .env
# puis renseigner les variables (voir ci-dessous)

# 3. Générer le client Prisma
npm run db:generate
```

### Variables d'environnement essentielles

```env
DATABASE_URL="postgresql://user:password@localhost:5432/yehli_db?schema=public"
NEXTAUTH_SECRET="<générer : openssl rand -base64 32>"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@yehli.org"
ADMIN_PASSWORD="YehliAdmin2024!"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Variables optionnelles (activent les services correspondants) : `RESEND_API_KEY`,
`UPLOADTHING_TOKEN`, `PAYMENT_PROVIDER`… (voir `.env.example`).

## 🗄️ Base de données

Avec une instance PostgreSQL accessible via `DATABASE_URL` :

```bash
# Créer les tables
npm run db:migrate        # (ou : npx prisma migrate dev --name init)

# Insérer les données de démonstration réalistes (admin, contenus, etc.)
npm run db:seed
```

> **Sans base de données**, le site reste consultable : la couche d'accès aux
> données bascule automatiquement sur un contenu de démonstration. Les formulaires
> répondent correctement (les soumissions sont journalisées), et l'espace admin est
> accessible via l'administrateur par défaut.

## ▶️ Démarrage

```bash
npm run dev       # développement    → http://localhost:3000
npm run build     # build de production
npm run start     # serveur de production
npm run lint      # ESLint
npm run typecheck # vérification TypeScript
```

## 🔐 Espace administrateur

- URL : `/admin`
- Identifiants par défaut (créés par le seed, ou utilisés en repli sans base) :
  - **Email** : `admin@yehli.org`
  - **Mot de passe** : `YehliAdmin2024!`

> ⚠️ **Changez ces identifiants** via les variables d'environnement avant toute mise en production.

**Rôles** : `SUPER_ADMIN` (tout, dont utilisateurs) · `ADMIN` (tout sauf utilisateurs) · `EDITOR` (contenu) · `VIEWER` (lecture).

## ☁️ Déploiement (Vercel)

1. Pousser le code sur un dépôt Git (GitHub, GitLab…).
2. Importer le projet sur [Vercel](https://vercel.com).
3. Configurer les variables d'environnement (au minimum `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `NEXT_PUBLIC_SITE_URL`).
4. Provisionner une base PostgreSQL managée (Vercel Postgres, Neon, Supabase…).
5. Le `postinstall` exécute `prisma generate`. Lancer ensuite `prisma migrate deploy` puis `prisma db seed`.

## 🗂️ Structure du projet

```
prisma/                 # schéma + seed
src/
├─ app/
│  ├─ (public)/         # pages publiques (layout navbar + footer)
│  ├─ admin/            # espace admin (login + (panel) protégé)
│  ├─ actions/          # server actions (formulaires, admin)
│  ├─ api/              # NextAuth + export CSV
│  ├─ sitemap.ts, robots.ts, opengraph-image.tsx
├─ components/          # ui, layout, cards, forms, sections, admin, brand
├─ config/              # navigation, site, admin-nav
├─ lib/                 # prisma, data (résilient), email, auth, rbac, validations…
docs/                   # cahier des charges + logos sources
```

## ✅ Fonctionnalités terminées

- [x] Charte graphique inspirée du logo (vert #1A6B2A + jaune soleil #F5C518, police arrondie)
- [x] Header avec **méga-menus** desktop + drawer mobile animé
- [x] Page d'accueil (13 sections, stats animées, vagues SVG, animations sobres)
- [x] Toutes les pages publiques de l'arborescence + pages légales
- [x] Listes filtrables (formations, blog) + pagination + recherche
- [x] Galerie masonry avec lightbox
- [x] 8 formulaires (intervention, don, adhésion, bénévole, contact, newsletter, inscription événement) — validation Zod client + serveur, honeypot, rate-limiting
- [x] 12 emails transactionnels (gabarit aux couleurs YEHLI ; repli console sans clé Resend)
- [x] Abstraction de paiement (`src/lib/payment`) prête pour CinetPay / PayDunya / Stripe / Mobile Money
- [x] Authentification NextAuth + middleware + RBAC
- [x] Espace admin complet : dashboard (Recharts), CRUD (articles avec éditeur riche, formations, actions, événements, galerie, partenaires, témoignages, équipe, stats, catégories, tags), gestion des demandes/bénévoles/adhésions/dons/messages/newsletter avec **export CSV**, paramètres, utilisateurs
- [x] SEO : metadata par page, sitemap dynamique, robots, JSON-LD (Organization, Article, Event, BreadcrumbList), image OpenGraph, ISR
- [x] Accessibilité (HTML sémantique, focus visible, labels, aria, lien d'évitement)
- [x] `npm run build`, `npm run lint` et `npm run typecheck` passent sans erreur

## ⚠️ Limites / non implémenté

- **Images de démonstration** : placeholders via Lorem Picsum (toujours valides). À remplacer par de vraies photos via l'admin ou en branchant UploadThing/Cloudinary.
- **Upload de fichiers** : les formulaires admin utilisent des champs **URL** d'image. L'intégration UploadThing est prête à câbler (clés requises).
- **Paiement en ligne** : seul le mode « manuel » (intention de don enregistrée) est actif. Les prestataires sont à implémenter dans `src/lib/payment`.
- **Emails** : sans `RESEND_API_KEY`, les emails sont journalisés en console (non envoyés).
- **Liste des inscrits à un événement** : stockée en base, non encore affichée dans l'admin.

## 🔮 Évolutions recommandées

1. Intégration d'un prestataire de **paiement en ligne** (CinetPay / PayDunya / Mobile Money).
2. **Upload de médias** via UploadThing + génération de miniatures.
3. **Multilingue** (français / anglais).
4. **Application mobile** ou PWA.
5. **Espace membre** connecté (suivi des dons, adhésions, inscriptions).
6. Tableau de bord d'**impact public** et rapports téléchargeables.

---

## 👤 Crédits

Site conçu et réalisé par **Digital Access — Département Digital Web Solution** pour l'ONG / Association YEHLI.

Le cahier des charges complet est disponible dans [`docs/`](./docs/).
