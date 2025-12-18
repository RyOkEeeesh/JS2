// mock data
import { categories } from '../data/testCategories.js';
import Like from '../models/likeModel.js';

const index = (req, res) => {
    const like = Like(req.session.likes);
    const likedItems = like.getDetails();

    // ビューに渡すデータを設定: data オブジェクト
    const data = {
        likedItems,
        categories
    }
    // ビューに渡すデータを設定: data オブジェクト
    res.render('likes/index', data);
};

const add = (req, res) => {
    // TODO: POSTデータから商品IDを取得
    const { productId } = 0;

    // セッションにlikes情報がない場合は初期化
    if (!req.session.likes) {
        req.session.likes = [];
    }

    // Likeモデルのインスタンスを作成
    const like = Like(req.session.likes);
    // likeに商品を追加
    like.add(productId);

    // TODO: セッションのlikesを更新: session.likes

    // likes一覧ページにリダイレクト
    res.redirect('/likes');
};

const remove = (req, res) => {
    // TODO: POSTデータから商品IDを取得
    const { productId } = 0;

    // セッションにlikes情報がある場合
    if (req.session.likes) {
        const like = Like(req.session.likes);
        // likesから商品を削除
        like.remove(productId);

        // TODO: セッションのlikesを更新: session.likes
    }

    // likes一覧ページにリダイレクト
    res.redirect('/likes');
};

export default {
    index,
    add,
    remove
};
