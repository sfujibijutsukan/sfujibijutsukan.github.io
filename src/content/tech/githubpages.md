---
date: "2026-01-22"
title: "Github Pagesで自分のWebサイトを公開する"
draft: false
tags: ["github","astro"]
---


## 本編

Github Pagesを使えば、無料で自分のWebサイトを全世界に公開することができます！

ドメインを取得すれば(有料)、独自ドメインでの公開も可能です。

やったこと
1. Cloudflareで独自ドメインを取得(やらなくても良いしやっても良い)
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


## Webサイトにアップロードする画像のメタデータを自動で削除する
Webサイトに位置情報などのメタデータが含まれた画像をアップロードすると、
プライバシーの観点から問題がある場合があります。

Gitのpre-commitフックを活用することで、commit時に指定したスクリプトを実行できます。
これを利用して、Commit時に画像のメタデータを削除するスクリプトを実行するようにしました。

- .githook/pre-commitにメタデータ削除スクリプトを記述
- pre-commitフックに、.githook/pre-commitを実行するように設定
    - 多分.git/hooks/pre-commitにスクリプトを置くのが普通なんですが、Gitで管理したかったので、.githook/pre-commitにスクリプトを置いて、core.hooksPathで.githookを指定するようにしました。
    ```
    $ git config core.hooksPath .githooks
    $ git config --get core.hooksPath
    .githooks # こう出力されればOK
    ```

これで、Webサイトにアップロードする際に画像のメタデータを消し忘れることはありません！