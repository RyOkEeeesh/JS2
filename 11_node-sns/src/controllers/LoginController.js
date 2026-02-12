import userModel from "../models/User.js";
import * as authService from "../services/authService.js";

// ログインページ
export const index = (req, res) => {
    // セッションからデータを取得
    const data = {
        input: req.session.input || {},
        errors: req.session.errors || [],
    }
    // セッションクリア
    req.session.errors = [];
    // Render login
    return res.render("login", data);
};

// ログイン処理
export const auth = async (req, res) => {
    const { email, password } = req.body;
    // ログイン検証
    const result = await authService.verifyLogin(email, password);
    const { user, accessToken, refreshToken } = result ?? {};

    // ログイン失敗
    if (!user) {
        // TODO: セッション登録
        req.session.input = { email };
        req.session.errors = ["メールアドレスとパスワードが間違っています。"];
        return res.redirect("/login");
    }

    // ログイン成功
    // TODO: ユーザセッション登録: req.session.authUser
    req.session.authUser = user;

    // JWT: アクセストークン: Cookie保存
    authService.setAuthCookies(res, accessToken, refreshToken);

    // セッションクリア
    req.session.errors = [];
    req.session.input = {};

    // Redirect /feed
    return res.redirect("/feed");
};

// ログアウト
export const logout = async (req, res) => {
    const user = req.session?.authUser;
    // セッションにログインユーザーがなければ/loginへリダイレクト
    if (!user) return res.redirect("/login");

    // 1. DBのリフレッシュトークンを消去
    await userModel.updateRefreshToken(user.id, null);

    // 2. Cookieを消去
    authService.clearAuthCookies(res);

    // 3. ユーザセッションを破棄
    req.session.authUser = null;
    // Redirect /login
    return res.redirect("/login");
};

// ユーザー登録ページ
export const register = (req, res) => {
    res.render("register", { user: userModel.initUser() });
};