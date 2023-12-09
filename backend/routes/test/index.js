const express = require("express");
const router = express.Router();
const db = require("../../db/connections.js");

router.get("/insert_test_table", (_request, response) => {
  db.any(`INSERT INTO test_table ("test_string") VALUES ($1)`, [
    `Hello on ${new Date().toLocaleDateString("en-us", {
      hour: "numeric",
      minute: "numeric",
      month: "short",
      day: "numeric",
      weekday: "long",
      year: "numeric",
    })}`,
  ]);

  db.any(`SELECT * FROM test_table`)
    .then((results) => response.json(results))
    .catch((error) => {
      console.log(error);
      response.json({ error });
    });
});

router.get("/show_users", (_request, response) => {
  db.any(`SELECT * FROM users`)
    .then((results) => {
      response.json(results);
      console.log(results);
    })
    .catch((error) => {
      console.log(error);
      response.json({ error });
    });
});

// Todo: add script to insert new_user
router.get("create_user/:uname:email:password", (req, res) => {});

module.exports = router;
