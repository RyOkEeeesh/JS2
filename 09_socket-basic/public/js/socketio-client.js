const messageInput = document.getElementById('message-input');
const socketIdContainer = document.getElementById(`socketId`);
const logContainer = document.getElementById(`log`);
const sendBtn = document.getElementById(`send-btn`);

let socketId = '';

// ログ表示共通関数
const appendLog = (message) => {
    if (!logContainer) return;
    const time = new Date().toLocaleTimeString();
    const logItem = `
        <div class="border-l-2 border-gray-700 pl-3 py-1">
            <span class="text-white text-xs mr-2">[${time}]</span>
            <span class="text-emerald-400">${message}</span>
        </div>
    `;
    logContainer.innerHTML += logItem;
    logContainer.scrollTop = logContainer.scrollHeight;
};

const clearLogs = () => {
    if (!logContainer) return;
    logContainer.innerHTML = '';
};

// ステータス更新共通関数
const updateStatus = (isConnected) => {
    const el = document.getElementById(`status`);
    if (!el) return;
    if (isConnected) {
        el.innerText = 'Connected';
        el.className = 'text-[10px] bg-emerald-500 text-white px-3 py-1 rounded-full font-bold uppercase animate-pulse';
    } else {
        el.innerText = 'Disconnected';
        el.className = 'text-[10px] bg-red-500 text-white px-3 py-1 rounded-full font-bold uppercase';
    }
};

// Socket.io インスタンス (Port 3002)
const uri = 'http://localhost:3002';
// TODO: Socket.ioインスタンス生成: io()
const socketio = io(uri);

// TODO: 接続イベント: イベント名: connected
socketio.on('connected', () => {
    socketId = socketio.id
    socketIdContainer.innerText = socketId;
    updateStatus(true);
    clearLogs();
});

// 切断イベント
socketio.on('disconnect', () => {
    updateStatus(false);
});

// TODO: ユーザ入室通に時: イベント名: joined
socketio.on('joined', (data) => {
    appendLog(data.message);
});

// TODO: メッセージ受信: イベント名: message
socketio.on('message', (data) => {
    const sender = senderName(data.socketId);
    const message = `${sender}: ${data.message}`;
    appendLog(message);
});

function senderName(socketId) {
    const sender = socketId ? socketId : 'System';
    return sender;
}

// 送信関数
function send() {
    const text = messageInput.value;
    if (!text) return;

    // TODO: メッセージ送信: emit()
    // イベント名: message
    socketio.emit('message', text)

    // 入力クリア
    messageInput.value = '';
}

// 送信
sendBtn.addEventListener('click', send);

// Enterキーで送信
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        send();
    }
});