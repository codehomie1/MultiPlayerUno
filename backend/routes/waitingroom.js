const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  res.render("waitingroom");
});

router.get("/:id/start", (req, res) => {
    const io = req.app.get("io");
    const game_id = req.params;

    try {
        // if (!io.sockets.adapter.rooms.get(+game_id)) {
        //     res.send({ message: "An error occured", status: 500 });
        //     return;
        // }

        io.in(+game_id).emit("redirect-to-game-room", { game_id });
        res.send({ message: "Starting game...", status: 200 });

    } catch (err) {
        console.log(err);
        res.send({ message: "Error Occured...", status:500 });
    }
});

module.exports = router;
