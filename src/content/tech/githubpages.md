---
date: "2026-01-22"
title: "Github PagesでAstroサイトを公開する"
draft: false
tags: ["github","astro"]
---

Github Pagesを使えば、無料で自分のWebサイトを全世界に公開することができます！
ドメインを取得すれば(有料)、独自ドメインでの公開も可能です。

やったこと
1. Cloudflareで独自ドメインを取得(やらなくても良いしやっても良い)
    - Cloudflareでドメインを買うと、DNSの管理もCloudflareでできるので良い
2. Github Pagesを使ってサイトを公開
    - sfujibijutsukan.github.io リポジトリを作成
    - リポジトリのSettings > Pages で公開設定
        - sfujibijutsukan.github.ioにアクセスすればサイトを表示できるようになる
3. Astroという静的サイトジェネレータでサイトの中身を作成
    - HugoとかJekyllとか他にも色々あるジェネレータを使うのが楽
        - markdownで文章かけるし、テンプレートをベースにサイトをいじれます
        - いい感じのテンプレートがあったのでAstroを選びました
    - Astro baseテンプレートのgithubリポジトリをsfujibijutsukan.github.ioにクローンしてゴニョゴニョ
4. Github Actionsでビルドとデプロイの自動化
    - .github/workflows/pages.yml にビルドとデプロイの設定を記述
    - ローカルで編集したものが、pushするたびに自動でビルドとデプロイが走るようになる

最近文章力がなくなってきているのをひしひしと感じるので、
日記や技術メモを書くのに、今後も使っていきたいと思います！