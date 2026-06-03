#!/usr/bin/env bash
set -euo pipefail

if ! command -v apt-get >/dev/null 2>&1; then
  echo "This installer targets Ubuntu/Debian VPS servers with apt-get." >&2
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive

apt-get update
apt-get install -y git curl ca-certificates docker.io

if apt-cache show docker-compose-plugin >/dev/null 2>&1; then
  apt-get install -y docker-compose-plugin
elif apt-cache show docker-compose-v2 >/dev/null 2>&1; then
  apt-get install -y docker-compose-v2
else
  echo "Neither docker-compose-plugin nor docker-compose-v2 is available from apt." >&2
  echo "Install Docker Compose manually from Docker's official instructions, then rerun docker compose version." >&2
  exit 1
fi

systemctl enable --now docker

docker --version
docker compose version
