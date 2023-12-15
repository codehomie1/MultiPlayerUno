const express = require("express");
const router = express.Router();
const lobbyChat = require("../db/chat_public");
const Lobby = {};

router.get("/", (req, res) => {
  res.render("lobby");
});

router.post("/send-message", async (req, res) => {
  const { message, user_id, username } = req.body;
  console.log("----------Message-Body----------");
  console.log(req.body);
  console.log("----------Message-Body----------");
  const io = req.app.get("io");

  if (!user_id || !username) {
    res.send({ message: "Please type a message", status:400 });
    return;
  }

  try {
    await lobbyChat.createMessage(username, message);
    // io.in(game_id).emit("chat", {message, username});
    res.send({ message: message, username: username, status: 200 });
  } catch (err) {
    console.log(err);
    res.send({ message: "Error sending message", status:500 });
    return;
  }
});

router.get("/get-messages", async (req, res) => {
  try {
    const messageArray = await lobbyChat.getMessages();
    res.status(200).json({ messageArray });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching messages" });
  }
});


module.exports = router;
