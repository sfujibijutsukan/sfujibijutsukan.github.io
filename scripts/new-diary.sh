#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 YYYYMMDD" >&2
  exit 1
fi

DATE_RAW="$1"

if [[ ! "$DATE_RAW" =~ ^[0-9]{8}$ ]]; then
  echo "Invalid date format. Use YYYYMMDD." >&2
  exit 1
fi

YEAR=${DATE_RAW:0:4}
MONTH=${DATE_RAW:4:2}
DAY=${DATE_RAW:6:2}
DATE_FORMATTED="$YEAR-$MONTH-$DAY"

ROOT_DIR=$(git rev-parse --show-toplevel)
TARGET_DIR="$ROOT_DIR/src/content/diary"
TARGET_FILE="$TARGET_DIR/$DATE_RAW.md"

if [ -e "$TARGET_FILE" ]; then
  echo "File already exists: $TARGET_FILE" >&2
  exit 1
fi

cat <<EOF > "$TARGET_FILE"
---
date: "$DATE_FORMATTED"
title: "タイトル"
draft: true
---

ここに本文を書きましょう
EOF

echo "Created: $TARGET_FILE"
