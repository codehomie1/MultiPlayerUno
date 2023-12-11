const express = require("express");
const router = express.Router();

const {
  createGame,
  startGame,
  endGame,
  playCard,
  drawCard,
  callUno,
  sendMessage,
  getAllMessages,
  saveGameState,
} = require("../controllers/games.js")

const {
  sendMessageLobby,
  getMessageLobby,
  getAllGames,
} = require("../controllers/lobby.js");

router.post("/create", createGame);
router.post("/lobby-chat", sendMessageLobby);
router.get("/lobby-chat", getMessageLobby);
router.post("/:game_id/start", startGame);
router.post("/:game_id/end", endGame);
router.put("/:game_id/play", playCard);
router.put("/:game_id/draw", drawCard);
router.put("/:game_id/uno", callUno);
router.post("/:game_id/chat", sendMessage);
router.get("/:game_id/chat", getAllMessages);
router.get("/all-games", getAllGames);
router.put("/:game_id/state", saveGameState);

module.exports = router;
