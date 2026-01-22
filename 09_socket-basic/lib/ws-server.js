// TODO: WebSocketServerインポート
// import { WebSocketServer } from 'ws';
import crypto from 'crypto';

export default (port, origin) => {
    // TODO: WebSocketサーバー起動: new WebSocketServer()
    const wss = {};

    // TODO: クライアント接続: connection イベント
    wss.on('', (ws) => {
        // TODO: WebSocketにIDを付与
        ws.id = crypto.randomUUID();
        const dateString = new Date().toLocaleTimeString();

        // クライアントリスト
        const clients = [];
        clients.push(ws);

        // 接続時にメッセージ送信（システムメッセージ）
        // ws.send(JSON.stringify({
        //     message: "wsサーバーに接続しました",
        //     date: dateString
        // }));

        // TODO: メッセージ受信: message イベント
        ws.on('', (buffer) => {
            const data = JSON.stringify({
                socketId: ws.id,
                message: buffer.toString(),
                date: dateString
            });
            // 全クライアントに送信
            wss.clients.forEach(client => {
                if (client.readyState === 1) {
                    // TODO: クライアントにデータ送信: send()
                }
            });
        });

        // TODO: 切断: close イベント
        ws.on('', () => {
            const data = JSON.stringify({
                socketId: ws.id,
                message: "wsサーバーから切断しました",
                date: dateString
            });
            // 全クライアントに送信
            wss.clients.forEach(client => {
                if (client.readyState === 1) {
                    // TODO: クライアントにデータ送信: send()
                }
            });
        });
    });
};