#!/usr/bin/env bash
# Polls the live site, e.g. during a deploy: every few seconds a random page from the sitemap
# must answer 200 with a full page (the footer is there). Prints the version each answer came from.
# Usage: scripts/check-uptime.sh [seconds=600] [interval=5] [base=https://namesofukraine.com]
set -u
duration=${1:-600}
interval=${2:-5}
base=${3:-https://namesofukraine.com}

urls=$(curl -fsS -m 10 "$base/sitemap-0.xml" | grep -o '<loc>[^<]*' | sed 's/<loc>//')
[ -n "$urls" ] || urls="$base/uk/"
count=$(printf '%s\n' "$urls" | wc -l | tr -d ' ')

ok=0
failed=0
end=$((SECONDS + duration))
while [ "$SECONDS" -lt "$end" ]; do
  url=$(printf '%s\n' "$urls" | sed -n "$((RANDOM % count + 1))p")
  response=$(curl -sS -m 10 -w $'\n%{http_code}' "$url" 2>&1)
  code=${response##*$'\n'}
  page=${response%$'\n'*}
  version=$(printf '%s' "$page" | grep -o 'data-version="[^"]*"' | head -1 | cut -d'"' -f2)
  if [ "$code" = 200 ] && printf '%s' "$page" | grep -q '</footer>'; then
    ok=$((ok + 1)); status=OK
  else
    failed=$((failed + 1)); status=FAIL
  fi
  printf '%s %-4s %s %-6s %s\n' "$(date +%H:%M:%S)" "$status" "$code" "${version:--}" "$url"
  sleep "$interval"
done

echo "Done: $ok OK, $failed failed"
[ "$failed" -eq 0 ]
