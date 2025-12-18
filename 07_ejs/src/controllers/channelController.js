import Channel from '../models/channelModel.js';

// チャンネル一覧表示
const index = (req, res) => {
    // チャンネルリストを取得
    const channels = Channel().fetchAll();
    // ビューに渡すデータを設定
    const data = {
        channels,
    }
    // TODO: ビューにチャンネルリストを渡す
    // 1. views/channel/index.ejs を設定: res.render()
    // 2. データをビューに渡す
    res.end("views/channel/index.ejs を res.render() で表示");
};

// チャンネル詳細表示
const show = (req, res) => {
    // TODO: リクエストパラメータからチャンネルIDを取得
    const id = 1;
    // TODO: チャンネルを取得: Channelモデルのfindメソッドを使用: Channel().find(id)
    const channel = {};
    if (!channel) {
        // チャンネルが存在しない場合は、トップページにリダイレクト
        res.redirect('/');
    }
    // ビューに渡すデータを設定
    const data = {
        channel,
    }
    // TODO: views/channel/show.ejs ビューにチャンネルを渡す
    res.end("views/channel/show.ejs を res.render() で表示");
};

export default {
    index,
    show,
};