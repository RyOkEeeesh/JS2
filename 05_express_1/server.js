// dotenv インポート(ESM)
import dotenv from 'dotenv';
// path モジュールのインポート
import path from 'path';
// TODO: express インポート(ESM)
import express from 'express';

// TODO: カスタムモジュールの読み込み ./models/Product.js
import {
    fetchProducts,
    findProductById,
    searchProducts,
} from './models/Product.js';

// 環境変数の取得（デフォルト値も設定）
dotenv.config();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const BASE_URL = `http://${HOST}:${PORT}/`

// 現在のディレクトリパスを取得
const __dirname = path.resolve();

// サーバーステータスの表示
const status = { HOST, PORT, BASE_URL, __dirname };
console.log(status);

// TODO: Expressアプリケーションの初期化
const app = express()

// ミドルウェア設定
// リクエストログ用ミドルウェア
// どのリクエストがきても最初に実行される
app.use((req, res, next) => {
    console.log(`ミドルウェア: ${req.method} ${req.url}`);
    // 次の処理へ
    next();
});

// TODO: JSONボディパーサー
// app.use(express.json());

// TODO: URLエンコード: www-form-urlencoded ボディパーサー
// app.use(express.urlencoded({ extended: true }));

// TODO: 静的ファイルの公開: /public
app.use(express.static(__dirname + '/public'));

// ------------------------
// ルーティング
// ------------------------
// TODO: GET /test
app.get('/test', (req, res) => {
    console.log("ルーティング: /test");
    const message = 'Hello, Express!';
    // クライアントにレスポンスを送信
    res.send(message);
});

// TODO: ALL /info
app.all('/info', (req, res) => {
    console.log("ルーティング: /info");
    const message = 'どのHTTPメソッドでもOK!';
    // クライアントにレスポンスを送信
    res.send(message);
});

// TODO: POST /save
app.post('/save', (req, res) => {
    console.log("ルーティング: /save");
    const message = 'データを保存しました!';
    // クライアントにレスポンスを送信
    res.send(message);
});

// TODO: GET /
// /public/home.html
app.get('/', (req, res) => {
    console.log("ルーティング: /");
    // クライアントにレスポンスを送信
    const path = __dirname + '/public/home.html'
    res.sendFile(path);
});

// TODO: GET /about
// /public/about.html
app.get('/about', (req, res) => {
    console.log("ルーティング: /about");
    // クライアントにレスポンスを送信
    const path = __dirname + '/public/about.html'
    res.sendFile(path);
});

// TODO: GET /search  => keyword クエリパラメータ対応
// /public/home.html
// http://localhost:3000/search?keyword=xxxxx とかのURLでブラウザでアクセス
app.get('/search', (req, res) => {
    console.log("ルーティング: /search");
    // クエリパラメータで keyword を取得
    const keyword = req.query.keyword
    console.log(keyword)
    // クライアントにレスポンスを送信
    const path = __dirname + '/public/home.html'
    res.sendFile(path);
});

// TODO GET /product/:id  => id パスパラメータ対応
// /public/product.html
// http://localhost:3000/product/1 とかのURLでブラウザでアクセス
app.get('/product/:id', (req, res) => {
    console.log("ルーティング: /product/:id");
    // パスパラメータで id を取得
    const id = req.params.id
    console.log(id);
    // クライアントにレスポンスを送信
    const path = __dirname + '/public/product.html'
    res.sendFile(path);
});

// APIルーティング
// TODO: GET /api/product/list
app.get('/api/product/list', (req, res) => {
    console.log("ルーティング: /api/product/list");
    // 商品データを取得
    const products = fetchProducts()
    // JSON レスポンスを送信
    res.json({ products });
});

// TODO: GET /api/product/show/:id
app.get('/api/product/show/:id', (req, res) => {
    console.log("ルーティング: /api/product/show/:id");
    // 商品IDを取得
    const id = req.params.id
    // 商品データを取得
    const product = findProductById(id)
    // JSON レスポンスを送信
    res.json(product);
});

// TODO: GET /api/search?keyword=xxxx
app.get('/api/search', (req, res) => {
    console.log("ルーティング: /api/seach");
    // キーワード取得（クエリーパラメータ）
    const keyword = req.query.keyword
    // 商品データを取得
    const products = searchProducts(keyword)
    // JSON レスポンスを送信
    res.json({ products });
});

// TODO: Express 起動
app.listen(PORT, HOST, () => {
    console.log(`Server running: ${BASE_URL}`);
});