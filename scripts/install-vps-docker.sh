#!/usr/bin/env bash
set -euo pipefail

if ! command -v apt-get >/dev/null 2>&1; then
  echo "This installer targets Ubuntu/Debian VPS servers with apt-get." >&2
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive
COMPOSE_VERSION="${COMPOSE_VERSION:-v2.40.3}"

apt-get update
apt-get install -y git curl ca-certificates docker.io

install_compose_from_apt() {
  if apt-cache show docker-compose-v2 >/dev/null 2>&1; then
    apt-get install -y docker-compose-v2
    return 0
  fi

  if apt-cache show docker-compose-plugin >/dev/null 2>&1; then
    apt-get install -y docker-compose-plugin
    return 0
  fi

  return 1
}

install_compose_from_github() {
  local arch
  arch="$(uname -m)"
  case "$arch" in
    x86_64|amd64) arch="x86_64" ;;
    aarch64|arm64) arch="aarch64" ;;
    *)
      echo "Unsupported architecture for automatic Docker Compose install: $arch" >&2
      return 1
      ;;
  esac

  mkdir -p /usr/local/lib/docker/cli-plugins
  curl -fsSL \
    "https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-linux-${arch}" \
    -o /usr/local/lib/docker/cli-plugins/docker-compose
  chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
}

if ! install_compose_from_apt; then
  echo "Docker Compose apt package was not found. Falling back to GitHub release ${COMPOSE_VERSION}."
  install_compose_from_github
fi

systemctl enable --now docker

docker --version
docker compose version
