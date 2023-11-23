const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  const { id } = req.params;

  res.render("game", { game_id: id });
});

module.exports = router;
