const express = require("express");
const router = express.Router();
const lobbyChat = require("../db/chat_public");
const games = require("../db/games.js");

const getRandomCard = () => {
  let color, number;

  do {
    color = Math.floor(Math.random() * 5);
    number = Math.floor(Math.random() * 15);
  } while (
    (number >= 13 && color < 4) ||
    (number < 13 && (color === 3 || color === 4))
  );

  return [color, number];
};

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
    res.send({ message: "Please type a message", status: 400 });
    return;
  }

  try {
    await lobbyChat.createMessage(username, message);
    res.send({ message: message, username: username, status: 200 });
  } catch (err) {
    console.log(err);
    res.send({ message: "Error sending message", status: 500 });
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

router.post("/create-game", async (req, res) => {
  const { gametitle, user_id } = req.body;
  const io = req.app.get("io");

  console.log("----------Game body----------");
  console.log(req.body);
  console.log("----------Game body----------");
  if (!user_id) {
    res.send({ message: "Bad Request", status: 400 });
    return;
  }

  if (!gametitle || gametitle.trim().length === 0) {
    res.send({ message: "Cannot leave blank!", status: 400 });
    return;
  }
  const title = gametitle;

  let top_deck = getRandomCard();
  top_deck = `${top_deck[0]}-${top_deck[1]}`;
  let top_discard_arr = getRandomCard();
  top_discard = `${top_discard_arr[0]}-${top_discard_arr[1]}`;

  const maxAttempts = 20;
  let attempts = 0;
  while (top_deck === top_discard && attempts < maxAttempts) {
    top_deck_arr = getRandomCard();
    top_deck = `${top_deck_arr[0]}-${top_deck_arr[1]}`;
    top_discard_arr = getRandomCard();
    top_discard = `${top_discard_arr[0]}-${top_discard_arr[1]}`;
    attempts++;
  }

  console.log("=====");

  const { id: game_id } = await games.create(
    gametitle,
    false,
    top_deck,
    top_discard,
    0,
  );

  res.send({
    game_id: game_id,
    gametitle: gametitle,
    ongoing: false,
    user_id: user_id,
    status: 201,
  });
});

router.get("/get-games", async (req, res) => {
  try {
    const messageArray = await games.getAll();
    res.send({ messageArray: messageArray, status: 200 });
  } catch (err) {
    res.send({ message: "Error getting all messages", status: 500 });
  }
});

module.exports = router;
