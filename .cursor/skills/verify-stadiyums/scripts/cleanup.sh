#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"

if [[ -z "${VERIFY_RUN_ID:-}" ]]; then
  echo "cleanup: VERIFY_RUN_ID is required" >&2
  exit 1
fi

RUN_DIR="$REPO_ROOT/.verification/stadiyums/$VERIFY_RUN_ID"
PID_DIR="$RUN_DIR/pids"
ARTIFACTS_DIR="$RUN_DIR/artifacts"

stop_pid_file() {
  local name="$1"
  local file="$PID_DIR/$name.pid"
  if [[ ! -f "$file" ]]; then
    return 0
  fi
  local pid
  pid="$(cat "$file")"
  if kill -0 "$pid" 2>/dev/null; then
  kill "$pid" 2>/dev/null || true
  sleep 1
  if kill -0 "$pid" 2>/dev/null; then
    kill -9 "$pid" 2>/dev/null || true
  fi
  echo "cleanup: stopped $name (pid $pid)"
  else
    echo "cleanup: $name pid $pid already exited"
  fi
  rm -f "$file"
}

stop_pid_file fan
stop_pid_file convex

if [[ -d "$ARTIFACTS_DIR" ]] && [[ -n "$(ls -A "$ARTIFACTS_DIR" 2>/dev/null || true)" ]]; then
  echo "cleanup: preserved artifacts at $ARTIFACTS_DIR"
else
  echo "cleanup: no artifacts in $ARTIFACTS_DIR"
fi

echo "cleanup: done for $VERIFY_RUN_ID"
