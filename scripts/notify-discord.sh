#!/bin/bash

# 環境変数が設定されているか確認
if [ -z "$DISCORD_WEBHOOK_URL" ]; then
  echo "Error: DISCORD_WEBHOOK_URL is not set"
  exit 1
fi

WEBHOOK_URL="${DISCORD_WEBHOOK_URL}"
DATE = $(date +%Y-%m-%d) 

curl -X POST \
  -H "Content-Type: application/json" \
  -d @- "$WEBHOOK_URL" << EOF
{
  "content": "@everyone https://github.com/sfujibijutsukan/sfujibijutsukan.github.io/blob/main/src/content/diary/${DATE}.md"
}
EOF
