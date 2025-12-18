import Product from '../models/productModel.js';
import Channel from '../models/channelModel.js';
import Category from '../models/categoryModel.js';

const index = (req, res) => {
    // 最新の商品、チャンネル、カテゴリーを取得
    const latestProducts = Product().latests();
    const latestChannels = Channel().latests();
    const categories = Category().fetchAll();

    // TODO: ビューに渡すデータを設定: data オブジェクト
    // 1. latestProducts
    // 2. latestChannels
    // 3. categories
    const data = {
        latestProducts,
        latestChannels,
        categories,
    }

    // TODO: ビュー表示
    // 1. views/home/index.ejs をレンダリング: res.render()
    // 2. data データを渡す
    return res.render('home/index', data);

    // TODO: 仮のレスポンス: コメントアウトして削除
    // res.end('res.render() で views/home/index.ejs をレンダリングが必要');
};

export default {
    index
};
