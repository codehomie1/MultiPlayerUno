const express = require("express");
const router = express.Router();

router.get("/sign_up", (req, res) => {
  res.render("sign_up");
});

router.get("/sign_in", (req, res) => {
  res.render("sign_in");
});

module.exports = router;
