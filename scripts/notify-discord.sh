#!/bin/bash

set -euo pipefail

# Check if DISCORD_WEBHOOK_URL is set
if [ -z "${DISCORD_WEBHOOK_URL:-}" ]; then
  echo "Error: DISCORD_WEBHOOK_URL is not set"
  exit 1
fi

# Get the current date in JST
DATE=$(TZ=Asia/Tokyo date +%Y%m%d)

curl --fail-with-body -X POST \
  -H "Content-Type: application/json" \
  -d @- "$DISCORD_WEBHOOK_URL" << EOF
{
  "content": "@everyone https://github.com/sfujibijutsukan/sfujibijutsukan.github.io/blob/main/src/content/diary/${DATE}.md"
}
EOF