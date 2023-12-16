const express = require("express");
const router = express.Router();

const REDIRECT_TO_GAME_ROOM = require("../../frontend/constants");

router.get("/:id", (req, res) => {
  res.render("waitingroom");
});

router.get("/:id/start", (req, res) => {
  const io = req.app.get("io");
  const game_id = req.params;

  try {
    io.in(+game_id).emit(REDIRECT_TO_GAME_ROOM, { game_id });
    res.send({ message: "Starting game...", status: 200 });
  } catch (err) {
    console.log(err);
    res.send({ message: "Error Occured...", status: 500 });
  }
});

module.exports = router;
