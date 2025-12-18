// http モジュール読み込み
import http from "http";
// fs, path, url モジュール読み込み
import fs from "fs";
import path from "path";
import url from "url";
// child_process モジュール読み込み
import { exec } from "child_process";

const HOST = "localhost";
const PORT = 3000;

// 現在のディレクトリパス
const __dirname = path.resolve();

// 公開ディレクトリ
const publicDir = path.join(__dirname, "public");

// MIMEタイプマップ
const mimeTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
};

// ==============================
// HTTPサーバ本体
// ==============================
const server = http.createServer((req, res) => {
    // TODO: URLパース: url.parse()
    // URLを解析する
    // http://localhost:3000/?name=abc などのURLを解析
    const parsed = url.parse(req.url);
    // TODO: パス名取得: pathname
    // http://localhost:3000/ = > /
    // http://localhost:3000/about.html = > /about.html
    let pathname = parsed.pathname;
    // パス名ログ出力
    console.log(`pathname: ${pathname}`);

    // TODO: パスが「 / 」なら pathname = /index.html
    if (pathname === "/") pathname = "/index.html";

    // アクセスファイルの絶対パス
    // ./public/index.html, ./public/about.html など
    const filePath = path.join(publicDir, pathname);

    // ファイル存在チェック
    // 仮に profile.html がきたときは、存在しないので 404 にする
    if (!fs.existsSync(filePath)) {
        // TODO: 404 Not Found
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("404 Not Found\n");
        return;
    }

    // ファイル読み込み（非同期）
    fs.readFile(filePath, (err, data) => {
        // ファイル読み込みエラー → 500
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("500 Internal Server Error\n");
            return;
        }

        // 拡張子を取得
        const ext = path.extname(filePath).toLowerCase();
        // MIMEタイプ取得
        const mime = mimeTypes[ext] || "application/octet-stream";

        // 番外編：動的コンテンツ処理(php, python コマンドが実行可能な場合)
        // if (ext === ".php" || ext === ".py") {
        //     execFile(ext, filePath, res);
        //     return;
        // }

        // TODO: 200 OK → ファイルのデータをレスポンス
        res.writeHead(200, { "Content-Type": mime });
        // TODO データをレスポンスに書き込む: res.end()
        res.end(data);
    });
});

// ==============================
// サーバ起動
// ==============================
server.listen(PORT, HOST, () => {
    console.log(`🚀 Server running at http://${HOST}:${PORT}`);
});

// 番外編：プログラム実行関数
function execFile(ext, filePath, res) {
    if (ext === ".php") execCommand("php", filePath, res);
    if (ext === ".py") execCommand("python", filePath, res);
}

function execCommand(command, filePath, res) {
    // コマンド組み立て
    let cmd = `${command} ${filePath}`;
    console.log(`exec: ${cmd}`);

    // コマンド実行
    exec(cmd, (err, stdout, stderr) => {
        // 実行エラーの場合
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
            res.end(stderr);
            return;
        }
        // プログラム実行成功の場合、結果取得＆レスポンス
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(stdout);
    });
    return;
}
