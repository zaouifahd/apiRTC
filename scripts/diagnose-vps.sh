#!/usr/bin/env bash
set -euo pipefail

echo "=== OS ==="
cat /etc/os-release || true

echo "=== USER / PATH ==="
whoami || true
pwd || true

echo "=== APT PACKAGES ==="
apt-cache policy docker.io docker-compose-v2 docker-compose-plugin containerd runc 2>/dev/null || true

echo "=== INSTALLED PACKAGES ==="
dpkg -l | grep -E 'docker|containerd|runc|compose' || true

echo "=== SYSTEMD DOCKER ==="
systemctl status docker --no-pager || true

echo "=== BINARIES ==="
which docker || true
which docker-compose || true
docker --version || true
docker compose version || true
docker-compose version || true

echo "=== AFRITE FILES ==="
ls -la docker-compose.prod.yml .env.production 2>/dev/null || true
