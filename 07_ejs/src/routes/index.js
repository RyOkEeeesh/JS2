import express from 'express';
// Express Router でルーターを作成
const router = express.Router();

import homeController from '../controllers/homeController.js';
import channelController from '../controllers/channelController.js';

import productController from '../controllers/productController.js';
import cartController from '../controllers/cartController.js';
import likeController from '../controllers/likeController.js';

// エンドポイント対応するコントローラーを設定
// homeController.index をルート '/' に対応させる
router.get('/', homeController.index);

// TODO: channelController のルーティング
// GET: /channels: channelController.index
// GET: /channels/:id: channelController.show

// productController
router.get('/products', productController.index);
router.get('/products/:id', productController.show);

// cartController
router.get('/cart', cartController.index);
router.post('/cart/add', cartController.add);
router.post('/cart/remove', cartController.remove);
router.get('/cart/payment', cartController.payment);
router.post('/cart/checkout', cartController.checkout);
router.get('/cart/complete', cartController.complete);

// likeController
router.get('/likes', likeController.index);
router.post('/likes/add', likeController.add);
router.post('/likes/remove', likeController.remove);

export default router;
