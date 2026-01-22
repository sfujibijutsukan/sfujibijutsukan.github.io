#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(git rev-parse --show-toplevel)
cd "$ROOT_DIR"

if ! command -v exiftool >/dev/null 2>&1; then
  echo "exiftool is not installed. Install it to strip image metadata." >&2
  echo "On Ubuntu: sudo apt-get install -y libimage-exiftool-perl" >&2
  exit 1
fi

mapfile -t STAGED_IMAGES < <(
  git diff --cached --name-only --diff-filter=ACM | \
    grep -Ei '\.(jpe?g|png|webp|tiff?|gif|heic|avif)$' || true
)

if [ ${#STAGED_IMAGES[@]} -eq 0 ]; then
  exit 0
fi

for IMAGE_PATH in "${STAGED_IMAGES[@]}"; do
  if [ -f "$IMAGE_PATH" ]; then
    exiftool -all= -overwrite_original "$IMAGE_PATH" >/dev/null
    git add "$IMAGE_PATH"
  fi
done
