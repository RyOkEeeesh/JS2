import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';

const index = (req, res) => {
    // TODO: 商品リストを取得: Product().fetchAll()
    const products = {};
    // カテゴリーリストを取得
    const categories = Category().fetchAll();
    // ビューに渡すデータを設定
    const data = {
        products,
        categories,
    }
    // ビューに商品リストを渡す
    res.render('product/index', data);
};

const show = (req, res) => {
    // TODO: リクエストパラメータから商品IDを取得
    const id = 0;
    // TODO: 商品を取得
    const product = {};
    // 商品カテゴリーリストを取得
    const categories = Category().fetchAll();
    // ビューに渡すデータを設定
    const data = {
        product,
        categories,
    }
    // 商品詳細ビューに商品とカテゴリーリストを渡す
    res.render('product/show', data);
};

export default {
    index,
    show,
};
