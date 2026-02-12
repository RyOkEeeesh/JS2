import { Router } from "express";
import * as HomeController from "../controllers/HomeController.js";
import * as LoginController from "../controllers/LoginController.js";
import { guestOnly, authRequired } from "../middlewares/authenticateRequest.js";
import { validate, loginValidationRules } from "../middlewares/validator.js";

const router = Router();

// トップページはミドルウェアなし
router.get("/", HomeController.index);
// ミドルウェア: ゲストのみ
router.get("/login", guestOnly, LoginController.index);
// ミドルウェア: ゲストのみ、バリデーションしてから、認証処理へ
router.post("/login", guestOnly, loginValidationRules, validate, LoginController.auth);
// ミドルウェア: 認証必須、ログアウト処理へ
router.post("/logout", authRequired, LoginController.logout);

export default router;