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

  // console.log('-----------req body--------------------------');
  // console.log({ email, username, password, confirm_password });
  // console.log('-----------req body--------------------------');

  const user_exists = await Users.email_exists(email);

  // console.log(`does user exist ------> ${user_exists} ------- \\
  // ${user_exists ? 'redirecting to sign_in' : 'creating new user...'}`);

  // if user exists redirect to sign_in form
  // or we could try sending them to lobby
  // depends on how we want to do it.
  if (user_exists) {
    res.render("sign_in");
    return;
  }

  // user doesnt exists => Encrypt the clear text password (new_user)
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  // Store in the DB
  // returns obj { id, username, email}
  const ret_usr = await Users.create(username, email, hash);

  //  STORE IN SESSION
  req.session.user = {
    id: ret_usr.id,
    username: ret_usr.username,
    email: ret_usr.email,
  };

  // console.log('----------session in sign up-------');
  // console.log(req.session);
  // console.log('----------session in sign up-------');

  // Redirect to Lobby
  console.log("redirecting to lobby....");
  res.redirect("/lobby");
});

router.post("/sign_in", async (req, res) => {
  // Given data, add user to Users table; redirect to global lobby
  const { email, password } = req.body;
  // console.log('--------sign in req body------------');
  // console.log(req.body);
  // console.log('--------sign in req body------------');

  try {
    const user = await Users.find_by_email(email);
    // console.log('-----user obj found by email--------');
    // console.log(user);
    // console.log('-----user obj found by email--------');

    const isValidUser = await bcrypt.compare(password, user.password);

    // console.log(`------ is user valid ? ${isValidUser} -------`);
    // console.log(`${isValidUser ? 'redirecting to landing..' : 'send back to sign_in page'}`);

    if (isValidUser) {
      // Store in session
      req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      // console.log('----------session in sign in-------');
      // console.log(req.session);
      // console.log('----------session in sign in-------');

      res.redirect("/lobby");
    } else {
      // send locals with error message saying user info
      // is invalid
      res.render("sign_in");
    }
  } catch (error) {
    // send locals with error message saying an unknown
    // error occurred
    console.log(error);
    res.render("sign_in");
  }
});

// TODO: ADD TO FRONTEND : logout endpoint
router.get("/logout", (req, res) => {
  req.session.destroy();

  res.redirect("/landing");
});

module.exports = router;
