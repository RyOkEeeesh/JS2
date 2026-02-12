import { Router } from "express";
import { authRequired } from "../middlewares/authenticateRequest.js";
import { upload } from "../lib/util.js";
import * as userController from "../controllers/UserController.js";

const router = Router();

// ミドルウェア: 認証必須
router.get("/:id/edit", authRequired, userController.edit);
// ミドルウェア: 認証必須
router.get("/:id", authRequired, userController.index);
// ミドルウェア: 認証必須、アップロード画像
router.post("/update", authRequired, upload.single('avatar'), userController.update);

export default router;