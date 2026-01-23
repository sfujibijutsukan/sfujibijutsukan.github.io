---
date: "2026-01-22"
title: "Github Pagesで自分のWebサイトを公開する"
draft: false
tags: ["github","astro"]
---


## 本編

Github Pagesを使えば、無料で自分のWebサイトを全世界に公開することができます！
<br>
ドメインを取得すれば(有料)、独自ドメインでの公開も可能です。

### 大体の流れ
1. Cloudflareで独自ドメインを取得(やらなくても良いしやっても良い)
    - Github PagesのDNS設定をやる
2. Github Pagesを使ってサイトを公開
    - sfujibijutsukan.github.io リポジトリを作成
    - リポジトリのSettings > Pages で公開設定
        - ここまできたら、sfujibijutsukan.github.ioにアクセスすればサイトを表示できるようになる(多分READMEの内容が表示される)
3. Astroという静的サイトジェネレータでサイトの中身を作成
    - HugoとかJekyllとか他にも色々あるジェネレータを使うのが楽
        - markdownで文章かけるし、テンプレートをベースにサイトをいじれます
        - いい感じのテンプレートがあったのでAstroを選びました
    - テンプレート(Astro baseというのを採用)のgithubリポジトリをsfujibijutsukan.github.ioにクローンしてゴニョゴニョ
        - ここまできたら、Astro Baseのデモ画面が出るので、色々いじっていく
4. Github Actionsでビルドとデプロイの自動化
    - .github/workflows/pages.yml にビルドとデプロイの設定を記述
        - Astroのドキュメントにあるものを貼ればオーケー
    - ローカルで編集したものが、pushするたびに自動でビルドとデプロイが走るようになる
        - Actionsがデプロイまでやってくれるので、思いついたときにスマホからメモしてpushするだけでいいのが便利

最近文章力がなくなってきているのをひしひしと感じるので、
日記や技術メモを書くのに、今後も使っていきたいと思います！


## Webサイトにアップロードする画像のメタデータを自動で削除する
Webサイトに位置情報などのメタデータが含まれた画像をアップロードすると、
プライバシーの観点から問題がある場合があります。

Gitのpre-commitフックを活用することで、commit時に指定したスクリプトを実行できます。
これを利用して、commit時に画像のメタデータを削除するスクリプトを実行するようにしました。

- .githook/pre-commitにメタデータ削除スクリプトを記述
- pre-commitフックに、.githook/pre-commitを実行するように設定
    - 多分.git/hooks/pre-commitにスクリプトを置くのが普通なんですが、Gitで管理したかったので、.githook/pre-commitにスクリプトを置いて、core.hooksPathで.githookを指定するようにしました。
    ```
    $ git config core.hooksPath .githooks
    $ git config --get core.hooksPath
    .githooks # こう出力されればOK
    ```

これで、Webサイトにアップロードする際に画像のメタデータを消し忘れることはありません！