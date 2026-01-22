# Docker を使ったビルド / プレビュー手順

ローカルに Node.js を入れずにコンテナ内でビルド・プレビューできます。

ビルド用イメージを作る:
```bash
docker build -t astro-builder .
```

コンテナ内でビルドしてそのままプレビュー（ホストの `3000` に公開）:
```bash
docker run --rm -p 3000:3000 astro-builder
# または docker-compose を使う
docker compose up --build
```

ビルド成果物 (`dist`) をホスト上に取り出したい場合（必要ならコミット可能）:
```bash
# ホストの ./dist に出力する例（ホストに dist が作られます）
docker run --rm -v "$(pwd)/dist":/output astro-builder sh -c "npm run build && cp -r dist/* /output/"
```

プレビューだけを一時的に確認したい場合は、上の `docker run` / `docker compose up` を使ってください。
