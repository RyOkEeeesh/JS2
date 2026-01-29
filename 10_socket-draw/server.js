const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

// 環境変数
dotenv.config();
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;
const origin = process.env.ORIGIN || "http://localhost:3000";

// Express アプリと HTTP サーバーを作成
const app = express();
const server = http.createServer(app);

// public フォルダを静的配信
app.use(express.static('public'));

// ルームデータ（履歴保存用）
const roomData = {};

// Socket.IO サーバーを作成
const io = new Server(server, { cors: { origin } });

// 接続イベント
io.on("connection", (socket) => {
    // TODO: ルームへの参加
    socket.on("join-room", (roomName) => {
        // TODO: ルームへの参加
        socket.join(roomName);

        // TODO: 現在のルーム名を保存
        socket.currentRoom = roomName;
        console.log(`${socket.id} joined: ${roomName}`);

        // 履歴
        if (roomData[roomName]) {
            // TODO: 履歴があれば、入室ユーザーに送信
            // 送信先: 入室ユーザー
            // イベント名: history
            // データ: roomData[roomName]
            socket.emit("history", roomData[roomName]);
        } else {
            // ルームの履歴を初期化
            roomData[roomName] = [];
        }

        // TODO: 入室情報を送信
        // 送信先: 入室ユーザー
        // イベント名: join-room
        // データ: roomName
        socket.emit("join-room", roomName)
    });

    // 特定のルームにのみ描画データを送信
    socket.on("draw", (data) => {
        // 現在のルーム名
        const room = socket.currentRoom;
        if (room) {
            // TODO: 履歴追加
            roomData[room].push(data);

            // TODO: 特定のルームにのみ描画データを送信
            // 送信先: 特定のルーム
            // イベント名: draw
            // データ: data
            socket.to(room).emit("draw", data);
        }
    });

    // 特定のルームのみクリア
    socket.on("clear", () => {
        // 現在のルーム名
        const room = socket.currentRoom;
        if (room) {
            // TODO: ルームの履歴をリセット
            roomData[room] = [];
            // TODO: 特定のルームのみクリア
            // 送信先: 特定のルーム
            // イベント名: clear
            // データ: room
            socket.to(room).emit("clear")
        }
    });
});

server.listen(port, host, () => {
    console.log(`http://${host}:${port}`);
});
