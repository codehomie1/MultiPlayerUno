const Auth = {};

Auth.isAuthenticated = (req, res, next) => {
    const { user } = req.session;

    if (user !== undefined && user.id !== undefined) {
        req.body.user_id = user.id;
        next();
    } else {
        res.redirect("/auth/sing_in");
    }
};

Auth.redirectToLobby = (req, res, next) => {
    const { user } = req.session;

    if (user !== undefined && user.id !== undefined) {
        res.redirect("/landing");
    } else {
        next();
    }
};

module.exports = Auth;
