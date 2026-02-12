import userModel from "../models/User.js";

// ユーザー登録ページ
export const index = (req, res) => {
    // TODO: セッション：前回の入力値を保持 
    // TODO: セッション：エラーメッセージを表示
    res.render("register", {
        input: req.session.input || {},
        errors: req.session.errors || [],
    });
    // セッションをクリア
    req.session.errors = [];
};

// ユーザー登録処理
export const add = async (req, res) => {
    // ユーザ情報生成
    const { name, email, password } = req.body;

    const newUser = { name, email, password, };
    // TODO: ユーザー登録: await userModel.save(newUser)
    const isSuccess = await userModel.save(newUser);

    // 登録成功の場合、ログインページへ
    if (isSuccess) {
        req.session.errors = [];
        req.session.input = {};
        // Redirect /login
        return res.redirect("/login");
    }

    // TODO: 登録失敗の場合、セッション：前回の入力値とエラーメッセージを保持
    req.session.input = { name, email, };
    req.session.errors = ["登録に失敗しました"];

    // ユーザ登録画面へ
    return res.redirect('/register')
};