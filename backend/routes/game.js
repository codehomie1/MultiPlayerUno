const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const uId = req.session.user ? req.session.user.id: "";

  res.render("game", { 
    id,
    user_id: uId,
    title: "",
   });
});


router.post("/:game_id/send", async (req, res) =>{
  const { message, user_id, username, game_id } = req.body;
  const io = req.app.get("io");

  if (!user_id || !username) {
    res.send({ message: "Bad Request", status: 400 });
    return;
  }

  if (!message || message.trim().length === 0) {
    res.send({ message: "Please type a message", status: 400 });
    return;
  }

  try {
    const room_id = game_id;
    await GAMECHAT.create(username, message, room_id);
    io.in(game_id).emit(CHAT, { message, username });
    res.send({ message: message, username: username, status: 200 });
  } catch (err) {
    res.send({ message: "Error sending message", status: 500 });
  }
});

// Get all Messages
router.get("/:game_id/get", async (req, res) => {
  const { game_id } = req.params;

  try {
    const messageArray = await GAMECHAT.get(game_id);
    res.send({ messageArray: messageArray, status: 200 });
  } catch (err) {
    res.send({ message: "Error getting all messages", status: 500 });
  }
});

module.exports = router;
