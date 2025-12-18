import Cart from '../models/cartModel.js';

// カート一覧表示
const index = (req, res) => {
    // TODO: セッションからカート情報を取得: req.session.cart
    const sessionCart = [];
    // セッションからカート情報を取得
    const cart = Cart(sessionCart);
    // 表示用データを取得
    const cartItems = cart.getDetails();
    // 合計金額を取得
    const total = cart.getTotalPrice();

    // 商品カートのレンダリング
    res.render('cart/index', {
        cartItems,
        total
    });
};

// カートに商品を追加
const add = (req, res) => {
    // TODO: POSTデータから商品IDと数量を取得: req.body
    const { productId, quantity } = req.body;
    const qty = Number(quantity, 10) || 1;

    // TODO: セッションにカート情報がなければ初期化
    // if (!req.session.cart) {
    //     req.session.cart = [];
    // }

    // カートから商品を検索
    const existingItemIndex = req.session.cart.findIndex(item => item.productId === productId);
    if (existingItemIndex > -1) {
        // TODO: カートに同じ商品が存在する場合は数量を増やす
    } else {
        // TODO: カートに同じ商品が存在しない場合は追加
    }

    // TODO: カートページにリダイレクト
    res.end("/cart にリダイレクトする処理が必要");
};

// カートから商品を削除
const remove = (req, res) => {
    const { productId } = req.body;
    // 商品カートがある場合
    if (req.session.cart) {
        // TODO: カートから商品を削除: 商品IDが一致しないアイテムだけをフィルタリング
    }

    // TODO: カートページにリダイレクト
    res.end("/cart にリダイレクトする処理が必要");
};

// 支払いページ表示
const payment = (req, res) => {
    // 商品カートがなければカートページにリダイレクト
    if (!req.session.cart || req.session.cart.length === 0) {
        return res.redirect('/cart');
    }

    // セッションからカート情報を取得
    const cart = Cart(req.session.cart);
    const total = cart.getTotalPrice();

    // 支払いページのレンダリング
    res.render('cart/payment', {
        total
    });
};

// チェックアウト処理
const checkout = (req, res) => {
    // TODO: カートを空にする
    // TODO: 完了画面にリダイレクト
};

// 完了画面表示
const complete = (req, res) => {
    res.render('cart/complete');
};

export default {
    index,
    add,
    remove,
    payment,
    checkout,
    complete
};
