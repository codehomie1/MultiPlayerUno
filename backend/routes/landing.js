const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("landing", { error: false, name: "Guest" });
});

// router.get("/:name", (req, res) => {
//   res.render("landing", { error: false, name: req.params.name });
// });

module.exports = router;
