const express = require("express");
const router = express.Router();
const {
    signin,
    register,
    signout,
    getUserSession,
} = require("./authentication.js");

router.post("/sign_in", signin);
router.post("/sign_up", register);
router.get("/signout", signout);
router.get("/user-session", getUserSession);

module.exports = router;
