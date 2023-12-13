const express = require("express");
const router = express.Router();
const {
    signin,
    register,
} = require("./authentication.js");

router.post("/sign_in", signin);
router.post("/sign_up", register);

module.exports = router;
