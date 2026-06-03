# Docker AFRITE

## Développement local

```bash
docker compose up -d postgres meilisearch minio
cp .env.example .env
npm install
npm run prisma:generate
npm run dev
```

## Production VPS Ubuntu

- Séparer l'application, PostgreSQL, Meilisearch et le stockage objet si le trafic augmente.
- Activer sauvegardes PostgreSQL quotidiennes et snapshots Meilisearch.
- Mettre Nginx/Caddy devant Next.js avec TLS.
- Utiliser des secrets hors dépôt pour `DATABASE_URL`, `NEXTAUTH_SECRET`, clés S3, Meilisearch et OpenAI.
- Lancer les jobs IA dans un worker séparé dès que les imports et embeddings deviennent volumineux.
