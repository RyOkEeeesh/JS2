export const index = async (req, res) => {
    // TODO: ユーザセッションチェック: req.session.authUser
    // 1. セッションがあれば /feed にリダイレクト
    // 2. セッションがなければ /login にリダイレクト
    if (req.session.authUser) {
        // Redirect /feed
        return res.redirect("/feed");
    }
    return res.redirect("/login");
};