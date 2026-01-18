# 課題06-NodeJS-オリジナルアプリ

## 概要
Expressを使ってReactをSSRできる、vite風なんちゃってフレームワークを作成しました。
CSSのフレームワークに、[Tailwind CSS](https://tailwindcss.com/) を用いており、開発時には自動でコンパイルできるようになってます。
中身のページを作る時間がなかったので、[NTで作ったサイト](https://github.com/RyOkEeeesh/ip/tree/main/ip-app)を、SSR用にすこしいじって流用しました。

## セットアップ
### windows
```bash
# ZIP をダウンロード
Invoke-WebRequest https://github.com/RyOkEeeesh/JS2/releases/latest/download/kadai6.zip -OutFile node06_15_加地良寅.zip
# 解凍
Expand-Archive node06_15_加地良寅.zip -DestinationPath .
```
### mac linux
```bash
# ZIP をダウンロード
curl  -L -o node06_15_加地良寅.zip https://github.com/RyOkEeeesh/JS2/releases/latest/download/kadai6.zip

# 解凍
unzip node06_15_加地良寅.zip
```
### その他
直接[ここ](https://github.com/RyOkEeeesh/JS2/releases)からダウンロード
### 共通
```bash
cd kadai6
npm i
```
## 起動
### 開発時
```bash
npm run dev
```
`/src`内のファイルを編集すると、webページが自動リロードされ編集した内容が反映される。
`/src/app/app.tsx`でページを編集できる。
### 本番時
```bash
npm run start
```
自動リロードはされない。