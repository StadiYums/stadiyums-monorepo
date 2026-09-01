#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
export VERIFY_RUN_ID="${VERIFY_RUN_ID:-verify-$(date +%s)}"
RUN_DIR="$REPO_ROOT/.verification/stadiyums/$VERIFY_RUN_ID"
PID_DIR="$RUN_DIR/pids"
ARTIFACTS_DIR="$RUN_DIR/artifacts"
LOG_DIR="$RUN_DIR/logs"
FAN_PORT="${VERIFY_FAN_PORT:-${FAN_PORT:-3000}}"

mkdir -p "$PID_DIR" "$ARTIFACTS_DIR" "$LOG_DIR"

port_in_use() {
  lsof -nP -iTCP:"$1" -sTCP:LISTEN >/dev/null 2>&1
}

pid_alive() {
  kill -0 "$1" 2>/dev/null
}

foreign_listener() {
  local port="$1"
  local name="$2"
  local our_pid_file="$PID_DIR/$name.pid"
  if [[ -f "$our_pid_file" ]]; then
    local our_pid
    our_pid="$(cat "$our_pid_file")"
    if pid_alive "$our_pid"; then
      return 1
    fi
  fi
  if port_in_use "$port"; then
    echo "launch: port $port already in use — stop the other process or reuse your dev stack and skip launch." >&2
    exit 1
  fi
  return 0
}

ensure_fan_env() {
  local target="$REPO_ROOT/apps/fan/.env.local"
  if [[ ! -e "$target" ]] && [[ -f "$REPO_ROOT/.env.local" ]]; then
    ln -sfn ../../.env.local "$target"
    echo "launch: linked apps/fan/.env.local -> ../../.env.local"
  fi
}

bootstrap_database() {
  # shellcheck disable=SC1091
  source "$SCRIPT_DIR/bootstrap-db.sh"
  resolve_database_url
  (
    cd "$REPO_ROOT"
    DATABASE_URL="${DATABASE_URL:-}" pnpm db:migrate
    DATABASE_URL="${DATABASE_URL:-}" pnpm db:seed
  )
}

start_fan() {
  if [[ -f "$PID_DIR/fan.pid" ]] && pid_alive "$(cat "$PID_DIR/fan.pid")"; then
    echo "launch: fan already running (pid $(cat "$PID_DIR/fan.pid"))"
    return
  fi
  foreign_listener "$FAN_PORT" fan
  ensure_fan_env
  (
    cd "$REPO_ROOT/apps/fan"
    DATABASE_URL="${DATABASE_URL:-}" pnpm exec next dev --port "$FAN_PORT" >"$LOG_DIR/fan.log" 2>&1 &
    echo $! >"$PID_DIR/fan.pid"
  )
  echo "launch: started fan on :$FAN_PORT (pid $(cat "$PID_DIR/fan.pid"))"
}

wait_for_fan() {
  local attempts=90
  for ((i = 1; i <= attempts; i++)); do
    if curl -fsS "http://127.0.0.1:$FAN_PORT/" >/dev/null 2>&1; then
      echo "launch: fan ready at http://127.0.0.1:$FAN_PORT"
      return 0
    fi
    sleep 1
  done
  echo "launch: fan did not become ready — see $LOG_DIR/fan.log" >&2
  exit 1
}

echo "launch: VERIFY_RUN_ID=$VERIFY_RUN_ID"
bootstrap_database
start_fan
wait_for_fan
echo "launch: run directory $RUN_DIR"
echo "launch: next — node .cursor/skills/verify-stadiyums/scripts/doctor.mjs"
