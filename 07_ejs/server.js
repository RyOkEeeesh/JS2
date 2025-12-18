import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

// TODO: ルーティング設定をインポート
import routes from './src/routes/index.js';

// TODO: express-ejs-layouts をインポート: expressLayouts
import expressLayouts from 'express-ejs-layouts';

// TODO: express-session をインポート
// import session from 'express-session';

// dotenv から環境変数を読み込む
dotenv.config();
const host = process.env.HOST;
const port = process.env.PORT;

const secretKey = process.env.SECRET_KEY;
const siteTitle = process.env.SITE_TITLE;

// 現在のディレクトリを取得
const __dirname = path.resolve();

// Express アプリケーションを初期化
const app = express();

// TODO: レイアウトを有効にする
app.use(expressLayouts);
app.set('layout', 'layout');

// TODO: テンプレートエンジン EJS を使用: src/views ディレクトリを設定
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'src', 'views'));

// 静的コンテンツの公開
app.use(express.static('public'));
// TODO: URLエンコードされたデータの解析
// app.use(express.urlencoded({ extended: true }));

// TODO: セッションの設定
// app.use(session({
//     secret: secretKey,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false }
// }));

// ミドルウェア
app.use((req, res, next) => {
    // TODO: サイトタイトルをビューに渡す

    // TODO: セッションをビュー全体に渡す: res.locals.session = req.session;

    // TODO: カート内の全アイテムの quantity を合計する
    // const cart = req.session.cart || [];
    // const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    // res.locals.cartCount = cartCount;

    next();
});

// ルーティング設定を使用
app.use('/', routes);

app.listen(port, host, () => {
    console.log(`App listening at http://${host}:${port}`);
});

export const viteNodeApp = app;
