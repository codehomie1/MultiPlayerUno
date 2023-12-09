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
  // given a clear text password, encrypt and check for credential
  const { email, password, username, confirm_password } = req.body;

  console.log({ email, username, password, confirm_password });
  console.log(req.body);

  // first check if they exist and redirect to sign in
  const user_exists = await Users.email_exists(email);
  if (user_exists) {
    res.redirect(`/${username}`);
    return;
  }

  // user doesnt exists => Encrypt the clear text password (new_user)
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  // Store in the DB
  const { id } = Users.create(username, email, hash);

  // Store in session

  // Redirect to Lobby
  console.log(req.body);
  res.redirect("/lobby");
});

router.post("/sign_in", async (req, res) => {
  // Given data, add user to Users table; redirect to global lobby
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const user = await Users.find_by_email(email);
    console.log(user);
    const isValidUser = password == user.password ? true : false;
    // TODO: ADD BYcrypt compare after inserting new users

    if (isValidUser) {
      // TODO : Store in session
      req.username = user.username;
      res.redirect("/lobby/" + req.username);
      return;
    } else {
      // TODO: INVALID credentials, try to add to front-end
      res.render("sign_in");
    }
  } catch (error) {
    console.log(error);
    res.render("sign_in");
  }
});

module.exports = router;
