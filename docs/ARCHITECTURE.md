# Architecture AFRITE

## Vision

AFRITE n'est pas un annuaire classique. L'interface principale est une conversation avec une IA locale capable de transformer une phrase en intention, filtres, recherche hybride et recommandations actionnables.

## Modules fonctionnels

| Module | Rôle | Modèles principaux |
| --- | --- | --- |
| Explore | Découverte de lieux : restaurants, hôtels, cafés, médecins, garages, tourisme | `Place`, `Category`, `OpeningHour`, `Review`, `MediaAsset` |
| Services | Profils professionnels publics, portfolio, avis, badges | `ProfessionalProfile`, `PortfolioItem`, `Badge`, `UserBadge` |
| Voisins | Entraide locale entre particuliers | `ServiceRequest`, `Proposal`, `Message`, `ReputationScore` |
| Demandes | Missions, devis, candidatures, messagerie | `ServiceRequest`, `Proposal`, `Message`, `Review` |
| AI | Recherche conversationnelle, matching, résumé, détection de faux avis | `Embedding`, `SearchQueryLog`, services IA applicatifs |

## Structure Next.js

```txt
app/
  layout.tsx
  page.tsx
  globals.css
components/
lib/
  ai/matching.ts
  product/pillars.ts
  reputation/score.ts
  search/meilisearch.ts
prisma/schema.prisma
docs/
docker/
tests/
```

## Architecture API cible

Les routes API seront organisées par domaine :

```txt
app/api/auth/[...nextauth]/route.ts
app/api/search/route.ts
app/api/places/route.ts
app/api/places/[id]/route.ts
app/api/reviews/route.ts
app/api/requests/route.ts
app/api/requests/[id]/proposals/route.ts
app/api/messages/route.ts
app/api/ai/plan-day/route.ts
app/api/ai/summarize-reviews/route.ts
```

## Authentification

- Auth.js/NextAuth avec Prisma Adapter.
- Connexion email magic link, OAuth et téléphone OTP à ajouter selon fournisseur local.
- Tables compatibles : `User`, `Account`, `Session`, `VerificationToken`.
- Autorisations par rôle : `USER`, `PROFESSIONAL`, `MODERATOR`, `ADMIN`.
- Vérification graduelle : téléphone, email, identité, badge professionnel.

## Réputation universelle

Le `Score Afrite` est stocké dans `ReputationScore` et recalculé par job asynchrone après avis, mission ou vérification. La fonction initiale pondère note moyenne, missions, ancienneté, identité, téléphone, taux de réponse et satisfaction.

## Badges

Badges de confiance prévus :

- `PHONE_VERIFIED`
- `IDENTITY_VERIFIED`
- `AFRITE_PRO`
- `FAST_RESPONDER`
- `TOP_RATED`
- `LOCAL_EXPERT`
- `TRUSTED_NEIGHBOR`

## Notation et avis

Les avis peuvent viser un lieu, un profil professionnel, une mission ou un utilisateur. Le champ `aiSignals` conserve les signaux anti-fraude : similarité textuelle, compte récent, duplication, rythme de publication, divergence note/texte.

## Recherche IA

Pipeline cible :

1. L'utilisateur écrit une phrase libre.
2. L'IA extrait intention, ville, budget, date, catégorie, ambiance, contraintes.
3. Meilisearch récupère les candidats textuels et géographiques.
4. Les embeddings récupèrent les candidats sémantiquement proches.
5. Le moteur de matching classe selon distance, avis, disponibilité, budget et Score Afrite.
6. L'IA produit une réponse courte, locale et actionnable.

## Meilisearch

Trois index initiaux sont définis dans `lib/search/meilisearch.ts` : `places`, `professionals`, `requests`. Les documents doivent inclure `_geo` pour les lieux et profils géolocalisés.

## Embeddings

Chaque objet recherchable produit un texte canonique :

- Place : nom, catégorie, ville, description, avis résumés, tags.
- Profil : métier, bio, portfolio, villes servies, avis.
- Demande : besoin, budget, deadline, localisation.

Les vecteurs sont stockés dans `Embedding` avec `objectType`, `objectId`, `model`, `text`, `metadata` et une colonne PostgreSQL vectorielle prévue pour pgvector.

## Scalabilité jusqu'à 1 million d'utilisateurs

1. PostgreSQL managé ou VPS dédié avec réplica lecture.
2. Meilisearch séparé avec snapshots et RAM dimensionnée.
3. Jobs asynchrones pour embeddings, emails, scoring et modération.
4. CDN + stockage S3 pour médias.
5. Cache applicatif sur pages publiques et requêtes populaires.
6. Partitionnement logique des gros volumes : avis, logs de recherche, messages.
7. Observabilité : logs structurés, métriques, alertes, traces par requête IA.
