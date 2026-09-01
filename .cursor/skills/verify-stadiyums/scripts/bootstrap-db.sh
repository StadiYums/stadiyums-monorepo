#!/usr/bin/env bash
# Resolves DATABASE_URL for verification from env, run state, or .env.local.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"

resolve_database_url() {
  local verify_run_id="${VERIFY_RUN_ID:?VERIFY_RUN_ID is required}"
  local run_dir="$REPO_ROOT/.verification/stadiyums/$verify_run_id"

  mkdir -p "$run_dir"

  if [[ -n "${DATABASE_URL:-}" ]]; then
    DATABASE_URL="$(printf '%s' "$DATABASE_URL" | tr -d '"' | tr -d "'")"
    export DATABASE_URL
    echo "$DATABASE_URL" >"$run_dir/database.url"
    echo "bootstrap-db: using DATABASE_URL from environment"
    return 0
  fi

  if [[ -f "$run_dir/database.url" ]]; then
    export DATABASE_URL="$(tr -d '"' <"$run_dir/database.url" | tr -d "'")"
    echo "bootstrap-db: using DATABASE_URL from run state"
    return 0
  fi

  if [[ -f "$REPO_ROOT/.env.local" ]] && grep -q '^DATABASE_URL=' "$REPO_ROOT/.env.local"; then
    export DATABASE_URL="$(grep '^DATABASE_URL=' "$REPO_ROOT/.env.local" | head -1 | cut -d= -f2- | tr -d '"' | tr -d "'")"
    echo "$DATABASE_URL" >"$run_dir/database.url"
    echo "bootstrap-db: using DATABASE_URL from .env.local"
    return 0
  fi

  echo "bootstrap-db: DATABASE_URL not set." >&2
  echo "bootstrap-db: copy .env.example to .env.local and set a Neon PostgreSQL URL." >&2
  return 1
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  resolve_database_url
  exit $?
fi
