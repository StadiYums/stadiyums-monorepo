#!/usr/bin/env bash
# Resolves DATABASE_URL for verification from env, run state, or .env.local.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
VERIFY_RUN_ID="${VERIFY_RUN_ID:?VERIFY_RUN_ID is required}"
RUN_DIR="$REPO_ROOT/.verification/stadiyums/$VERIFY_RUN_ID"

mkdir -p "$RUN_DIR"

if [[ -n "${DATABASE_URL:-}" ]]; then
  echo "$DATABASE_URL" >"$RUN_DIR/database.url"
  echo "bootstrap-db: using DATABASE_URL from environment"
  exit 0
fi

if [[ -f "$RUN_DIR/database.url" ]]; then
  export DATABASE_URL="$(cat "$RUN_DIR/database.url")"
  echo "bootstrap-db: using DATABASE_URL from run state"
  exit 0
fi

if [[ -f "$REPO_ROOT/.env.local" ]] && grep -q '^DATABASE_URL=' "$REPO_ROOT/.env.local"; then
  export DATABASE_URL="$(grep '^DATABASE_URL=' "$REPO_ROOT/.env.local" | head -1 | cut -d= -f2-)"
  echo "$DATABASE_URL" >"$RUN_DIR/database.url"
  echo "bootstrap-db: using DATABASE_URL from .env.local"
  exit 0
fi

echo "bootstrap-db: DATABASE_URL not set." >&2
echo "bootstrap-db: copy .env.example to .env.local and set a Neon (or compatible) PostgreSQL URL." >&2
exit 1
