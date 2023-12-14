const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("--------in lobby route ---------");
  console.log(req.session);
  console.log("--------in lobby route ---------");

  if (req.session.user.username) {
    res.render("lobby", { name: req.session.user.username });
  }

  res.render("lobby", { name: "Guest" });
});

module.exports = router;
