#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
export VERIFY_RUN_ID="${VERIFY_RUN_ID:-run-$(date +%s)}"
RUN_DIR="$REPO_ROOT/.verification/stadiyums/$VERIFY_RUN_ID"
PID_DIR="$RUN_DIR/pids"
ARTIFACTS_DIR="$RUN_DIR/artifacts"
FAN_PORT="${VERIFY_FAN_PORT:-${FAN_PORT:-3000}}"
LOG_DIR="$RUN_DIR/logs"

mkdir -p "$PID_DIR" "$ARTIFACTS_DIR" "$LOG_DIR"

port_in_use() {
  lsof -nP -iTCP:"$1" -sTCP:LISTEN >/dev/null 2>&1
}

pid_alive() {
  kill -0 "$1" 2>/dev/null
}

foreign_listener() {
  local port="$1"
  local our_pid_file="$PID_DIR/$2.pid"
  local our_pid=""
  if [[ -f "$our_pid_file" ]]; then
    our_pid="$(cat "$our_pid_file")"
    if pid_alive "$our_pid"; then
      return 1
    fi
  fi
  if port_in_use "$port"; then
    echo "launch: port $port already in use by another process — stop it or use your existing dev stack and skip launch." >&2
    exit 1
  fi
  return 0
}

ensure_fan_env() {
  local target="$REPO_ROOT/apps/fan/.env.local"
  if [[ ! -e "$target" ]]; then
    ln -sfn ../../.env.local "$target"
    echo "launch: linked apps/fan/.env.local -> ../../.env.local"
  fi
}

start_convex() {
  if [[ -f "$PID_DIR/convex.pid" ]] && pid_alive "$(cat "$PID_DIR/convex.pid")"; then
    echo "launch: convex already running (pid $(cat "$PID_DIR/convex.pid"))"
    return
  fi
  if [[ -z "${VERIFY_ALLOW_FOREIGN_CONVEX:-}" ]] && [[ -f "$REPO_ROOT/.env.local" ]]; then
  echo "launch: assuming convex dev may already be running for this deployment"
  else
    foreign_listener 3210 convex || true
  fi
  if port_in_use 3210; then
    echo "launch: convex dev appears to be running (port 3210 listening)"
    return
  fi
  (
    cd "$REPO_ROOT"
    npx convex dev >"$LOG_DIR/convex.log" 2>&1 &
    echo $! >"$PID_DIR/convex.pid"
  )
  echo "launch: started convex dev (pid $(cat "$PID_DIR/convex.pid"))"
}

wait_for_fan() {
  local attempts=60
  for ((i = 1; i <= attempts; i++)); do
    if curl -fsS "http://127.0.0.1:$FAN_PORT/" >/dev/null 2>&1; then
      echo "launch: fan ready on :$FAN_PORT"
      return 0
    fi
    sleep 1
  done
  echo "launch: fan did not become ready within ${attempts}s — see $LOG_DIR/fan.log" >&2
  exit 1
}

start_fan() {
  if [[ -f "$PID_DIR/fan.pid" ]] && pid_alive "$(cat "$PID_DIR/fan.pid")"; then
    echo "launch: fan already running (pid $(cat "$PID_DIR/fan.pid"))"
    wait_for_fan
    return
  fi
  foreign_listener "$FAN_PORT" fan
  ensure_fan_env
  (
    cd "$REPO_ROOT"
    pnpm --filter @stadiyums/fan dev >"$LOG_DIR/fan.log" 2>&1 &
    echo $! >"$PID_DIR/fan.pid"
  )
  echo "launch: started fan (pid $(cat "$PID_DIR/fan.pid"))"
  wait_for_fan
}

echo "launch: VERIFY_RUN_ID=$VERIFY_RUN_ID"
start_convex
start_fan
echo "launch: run directory $RUN_DIR"
echo "launch: next — node scripts/doctor.mjs (with VERIFY_RUN_ID exported)"
