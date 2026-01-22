// Socket.io インポート
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();

export default (port, origin) => {
    // TODO: Socket.io サーバー起動: new Server()
    // TODO: cors origin 設定
    const io = new Server(port, { cors: { origin }});

    // TODO: クライアント接続: connection イベント
    io.on('connection', (socket) => {
        console.log(`[Socket.io] 接続: ${socket.id}`);
        const dateString = new Date().toLocaleTimeString();
        let data = {}

        // TODO: 接続時に本人にメッセージ送信: emit() 
        // イベント名: connected
        data = {
            socketId: socket.id,
            message: "接続しました",
            date: dateString
        };
        // 接続完了通知を本人のみに送信
        socket.emit('connected', data)

        // TODO: 接続時にブロードキャストメッセージ送信: broadcast.emit()
        // イベント名: joined
        // message: ${socket.id} が接続しました
        // date: 現在時刻
        data = {
            message: `${socket.id} が入室しました`,
            date: dateString,
        }
        socket.broadcast.emit('joined', data)

        // TODO: メッセージ受信: on() イベント名: message
        socket.on('message', (msg) => {
            // イベント名: message
            data = {
                socketId: socket.id,
                message: msg,
                date: dateString
            };
            // TODO: 全クライアントに送信: io.emit()
            io.emit('message', data)
        });

        // 切断
        socket.on('disconnect', () => {
            // 全クライアントに送信
            io.emit('message', {
                message: `${socket.id} が退出しました`,
                date: dateString
            });
        });
    });
};