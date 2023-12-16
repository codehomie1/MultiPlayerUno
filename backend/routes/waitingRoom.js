const express = require("express");
const router = express.Router();

const WaitingRoom = {};
const REDIRECT_TO_GAME_ROOM = "redirect-to-game-room";
const Games = require("../db/games.js");

WaitingRoom.isOnGoingGame = async (req, res) => {
  const { game_id } = req.params;

  try {
    const { ongoing } = await Games.isGameStarted(game_id);

    if (ongoing) {
      res.send({
        message: "Game has already started",
        status: 200,
        ongoing: ongoing,
      });
      return;
    }

    res.send({
      message: "Game has not started...",
      status: 200,
      ongoing: ongoing,
    });
  } catch (err) {
    console.log(err);
    res.send({ message: "Error occured...", status: 500 });
  }
};

module.exports = WaitingRoom;
