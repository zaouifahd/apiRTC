#!/usr/bin/env bash
set -euo pipefail

if ! command -v apt-get >/dev/null 2>&1; then
  echo "This installer targets Ubuntu/Debian VPS servers with apt-get." >&2
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive

apt-get update
apt-get install -y git curl ca-certificates docker.io docker-compose-plugin
systemctl enable --now docker

docker --version
docker compose version
