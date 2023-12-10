const express = require("express");
const router = express.Router();

// TODO: GET SESSION saved in redirect

router.get("/", (req, res) => {
  console.log("--------in lobby route ---------");
  console.log(req.session);
  console.log("--------in lobby route ---------");

  if (req.session.username) {
    res.render("lobby", { name: req.session.user.username });
  }

  res.render("lobby", { name: "Guest" });
});

module.exports = router;
