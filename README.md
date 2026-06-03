# 🧞 AFRITE

**AFRITE** est une plateforme IA locale pour l'Algérie qui connecte lieux, commerces, professionnels, particuliers, services, besoins et bons plans dans une seule application.

> Promesse produit : **Décrivez ce que vous cherchez. Afrite trouve la meilleure solution.**

## MVP recommandé

Le projet doit démarrer par un périmètre utilisable rapidement :

1. **Explore** : lieux, fiches, photos, horaires, téléphone, itinéraire.
2. **Avis** : notes, commentaires, signaux anti-spam, résumé IA.
3. **Profils utilisateurs** : identité, téléphone, badges, Score Afrite.
4. **Demandes** : publication de besoins, propositions, messagerie.
5. **IA** : recherche conversationnelle, matching, recommandations.

## Stack

- Next.js 15, TypeScript, Tailwind CSS, shadcn-ready.
- PostgreSQL, Prisma, Auth.js/NextAuth.
- Meilisearch pour la recherche textuelle et géographique.
- OpenAI embeddings + matching applicatif.
- S3 compatible pour les médias.
- Docker Compose pour le développement et une base de production VPS.

## Commandes

```bash
cp .env.example .env
npm install
npm run dev
```

## Documentation projet

- [Architecture complète](docs/ARCHITECTURE.md)
- [Roadmap et plan 12 phases](docs/ROADMAP.md)
- [Wireframes mobile et desktop](docs/WIREFRAMES.md)
- [SEO et collecte de données](docs/SEO_DATA.md)
- [Déploiement Docker](docker/README.md)
