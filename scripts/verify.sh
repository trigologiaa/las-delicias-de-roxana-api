#!/usr/bin/env bash
# Verificación única de delicias-api. Igual en local y en CI.
#   ./scripts/verify.sh        -> completo
#   ./scripts/verify.sh fast   -> lint + tipos + arquitectura + unit
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."
MODE="${1:-full}"

step() { printf '\n\033[1;34m▶ %s\033[0m\n' "$*"; }

case "$MODE" in
  full | fast) ;;
  *) echo "Uso: $0 [full|fast]" >&2; exit 2 ;;
esac

command -v pnpm >/dev/null 2>&1 || { echo "pnpm no está instalado" >&2; exit 1; }

if [ ! -d node_modules ] || [ -n "${CI:-}" ]; then
  step "Instalando dependencias"
  pnpm install --frozen-lockfile
fi

step "Lint y formato (Biome)"
pnpm lint

step "Tipos (tsc)"
pnpm typecheck

step "Arquitectura (regla de dependencia hexagonal)"
pnpm arch:check

step "Tests unitarios (dominio y casos de uso)"
pnpm test:unit

if [ "$MODE" = "full" ]; then
  if [ -z "${CI:-}" ] && [ -z "${DATABASE_URL:-}" ]; then
    command -v docker >/dev/null 2>&1 || { echo "Docker es necesario para los tests de integración" >&2; exit 1; }
    step "Levantando Postgres local"
    docker compose up -d --wait db
  fi
  step "Tests de integración (Postgres real)"
  pnpm test:integration
  step "Tests de aceptación HTTP (e2e)"
  pnpm test:e2e
  step "Contrato OpenAPI al día"
  pnpm openapi:check
  step "Build"
  pnpm build
fi

printf '\n\033[1;32m✔ verify (%s) OK\033[0m\n' "$MODE"
