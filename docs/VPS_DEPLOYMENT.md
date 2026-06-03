# Déploiement direct sur VPS Ubuntu

Ce guide part du choix produit suivant : AFRITE est développé et lancé directement sur un VPS, au lieu d'être limité au `localhost` de la machine du développeur.

## Architecture VPS simple

```txt
Internet
  │
  ▼
Caddy :80/:443
  │ HTTPS automatique
  ▼
Next.js AFRITE :3000
  │
  ├── PostgreSQL + pgvector :5432 réseau Docker privé
  ├── Meilisearch :7700 réseau Docker privé
  └── MinIO/S3 :9000 réseau Docker privé
```

Le fichier `docker-compose.prod.yml` lance ces services en production. Seul Caddy expose les ports publics `80` et `443`. Les services applicatifs et données restent sur le réseau Docker privé.

## Préparer le VPS

Sur le VPS, installer Docker avant de lancer `docker compose`. Si la commande `docker` répond `Command 'docker' not found`, exécuter :

```bash
apt update
apt install -y git curl ca-certificates docker.io
apt install -y docker-compose-v2 || apt install -y docker-compose-plugin
systemctl enable --now docker
docker --version
docker compose version
```

Sur Ubuntu 24.04/Noble, le paquet Compose peut s'appeler `docker-compose-v2` au lieu de `docker-compose-plugin`. Le script du dépôt gère ce fallback automatiquement. Alternative depuis le dépôt, après `git clone` :

```bash
./scripts/install-vps-docker.sh
```

Créer un dossier pour l'application :

```bash
sudo mkdir -p /opt/afrite
sudo chown -R $USER:$USER /opt/afrite
cd /opt/afrite
```

Cloner le dépôt :

```bash
git clone https://github.com/mfahdzaoui/Afrite.git .
```

## Configurer le domaine

Créer un enregistrement DNS `A` vers l'IP publique du VPS :

```txt
afrite.example.com  A  IP_DU_VPS
```

Remplacer `afrite.example.com` par le vrai domaine choisi pour AFRITE.

## Configurer les secrets

```bash
cp .env.production.example .env.production
nano .env.production
```

À changer obligatoirement :

- `DOMAIN`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `POSTGRES_PASSWORD`
- `DATABASE_URL`
- `MEILI_MASTER_KEY`
- `MEILISEARCH_API_KEY`
- `MINIO_ROOT_PASSWORD`
- `S3_SECRET_ACCESS_KEY`
- `OPENAI_API_KEY` quand l'IA est activée
- `MAPBOX_TOKEN` quand la carte est activée

## Lancer AFRITE sur le VPS

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build
```

Vérifier les services :

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production ps
```

Voir les logs de l'application :

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production logs -f app
```

## Migrations Prisma

Après le premier build et à chaque changement de schéma :

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production exec app npx prisma migrate deploy
```

## Mise à jour du VPS

```bash
cd /opt/afrite
git pull
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build
docker compose -f docker-compose.prod.yml --env-file .env.production exec app npx prisma migrate deploy
```

## Sauvegardes minimales

PostgreSQL :

```bash
mkdir -p /opt/afrite/backups
docker compose -f docker-compose.prod.yml --env-file .env.production exec -T postgres pg_dump -U afrite afrite > /opt/afrite/backups/afrite-$(date +%F).sql
```

Volumes importants à sauvegarder :

- `postgres-data`
- `meili-data`
- `minio-data`
- `caddy-data`

## Règles de sécurité minimum

- Ne jamais commiter `.env.production`.
- Utiliser des mots de passe longs et uniques.
- Garder uniquement les ports `80`, `443` et `22` ouverts publiquement.
- Restreindre SSH par clé privée.
- Faire des sauvegardes automatiques avant d'importer beaucoup de données.
