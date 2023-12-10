const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("--------in lobby route ---------");
  console.log(req.session);
  console.log("--------in lobby route ---------");

  if (req.session.username) {
    res.render("lobby", { name: req.session.username });
  }

  res.render("lobby", { name: "Guest" });
});

router.get("/:name", (req, res) => {
  console.log("--------in lobby route 2---------");
  console.log(req.session);
  console.log("--------in lobby route2 ---------");
  res.render("lobby", { name: req.params.name });
});

module.exports = router;
