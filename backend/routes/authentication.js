const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Users } = require("../db");

const SALT_ROUNDS = 10;

router.get("/sign_up", (req, res) => {
  res.render("sign_up");
});

router.get("/sign_in", (req, res) => {
  res.render("sign_in");
});

router.post("/sign_up", async (req, res) => {
  const { email, password, username, confirm_password } = req.body;

  const user_exists = await Users.email_exists(email);

  if (user_exists) {
    res.render("sign_in");
    return;
  }

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  const ret_usr = await Users.create(username, email, hash);

  req.session.user = {
    id: ret_usr.id,
    username: ret_usr.username,
    email: ret_usr.email,
  };

  console.log("redirecting to lobby....");
  res.redirect("/lobby");
});

router.post("/sign_in", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.find_by_email(email);
    const isValidUser = await bcrypt.compare(password, user.password);

    if (isValidUser) {
      req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email,
      };
      res.redirect("/lobby");
    } else {
      res.render("sign_in");
    }
  } catch (error) {
    console.log(error);
    res.render("sign_in");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();

  res.redirect("/landing");
});

router.get("/status", (req, res) => {
  if (req.session && req.session.user) {
    res.send({ user: req.session.user, isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
    console.log("This shit aint getting authenticated");
  }
});

module.exports = router;
