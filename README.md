# sfujibijutsukan
https://sfuji.org/

## draw.io の図

- `diagrams/*.drawio.svg`: 編集情報を含む原本。draw.io で開いて編集し、図のデータを含めた SVG として保存します。
- `public/images/diagrams/*.drawio.svg`: 記事の表示用 SVG。原本のファイル名を保ち、編集情報を除いて生成します。直接編集せず、原本と一緒に Git にコミットしてください。
- `scripts/export-diagrams.mjs`: 原本を書き換えずに表示用 SVG を生成します。サブディレクトリも同じ構成で出力します。

Push時に`scripts/export-diagrams.mjs`が実行されます。