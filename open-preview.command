#!/bin/zsh

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
PORT=4175

if ! curl -fsS "http://127.0.0.1:${PORT}/?v=health" 2>/dev/null | grep -q "周迅"; then
  while lsof -nP -iTCP:${PORT} -sTCP:LISTEN >/dev/null 2>&1; do
    PORT=$((PORT + 1))
  done
  (cd "$PROJECT_DIR" && nohup python3 -m http.server "$PORT" --bind 127.0.0.1 > /tmp/zhou-xun-workspace-site.log 2>&1 &)
  sleep 1
fi

open "http://127.0.0.1:${PORT}/?v=20260903"
