#!/bin/zsh

set -u

# :
#   ./heic-to-jpg.sh
#   ./heic-to-jpg.sh /
#
# 

INPUT_DIR="${1:-.}"
OUTPUT_DIR="${INPUT_DIR}/jpg"

if [[ ! -d "$INPUT_DIR" ]]; then
    echo ": : $INPUT_DIR" >&2
    exit 1
fi

mkdir -p "$OUTPUT_DIR"

converted=0
failed=0

# 
while IFS= read -r -d '' file; do
    filename="${file:t}"
    basename="${filename:r}"
    output="${OUTPUT_DIR}/${basename}.jpg"

    echo ": $filename"

    if sips \
        --setProperty format jpeg \
        --setProperty formatOptions 90 \
        "$file" \
        --out "$output" >/dev/null; then
        echo "  -> $output"
        ((converted++))
    else
        echo "  : $file" >&2
        ((failed++))
    fi
done < <(
    find "$INPUT_DIR" \
        -maxdepth 1 \
        -type f \
        \( -iname '*.heic' -o -iname '*.heif' \) \
        -print0
)

echo
echo ""
echo ": ${converted}"
echo ": ${failed}"
echo ": $OUTPUT_DIR"

if (( failed > 0 )); then
    exit 1
fi
