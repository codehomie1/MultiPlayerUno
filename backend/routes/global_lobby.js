const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.username) {
    res.render("lobby", { name: req.username });
  }
  res.render("lobby", { name: "Guest" });
});

router.get("/:name", (req, res) => {
  res.render("lobby", { name: req.params.name });
});

module.exports = router;
