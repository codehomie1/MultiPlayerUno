const express = require("express");
const router = express.Router();
const { redirectToLobby } = require("../../middleware/authenticateCheck");

router.get("/sign_up", redirectToLobby, (_req, res) => {
    res.render("sign_up", {title: "Register"});
});

router.get("/sign_in", redirectToLobby, (_req, res) => {
    res.render("sign_in", {title: "Login"});
});

module.exports = router;
