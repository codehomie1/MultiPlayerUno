const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../db/users.js");

const User = {};
const SALT_ROUNDS = 10;

const register = async () => {
  const form = document.getElementById("register-form");
  const formData = new FormData(form);
  const formDataJson = {};

  for (const [key, val] of formData) {
    formDataJson[key] = val;
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataJson),
  };

  try{
    const result = await fetch(`/api/users/register`, options);
    const data = await res.json();

    if (data.status === 400 || data.status === 500) {
      showMessageAuth(data);
      return;
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = data.url;
  } catch (err) {
    console.log(err);
  }
};

User.register = async (req, res) => {
  const { username, password } = req.body;
  const email = req.body.email;

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  try{
    const exists = await Users.find_by_email(email);
    if (exists?.email) {
      res.send({ message: "Error signing up", status: 400 });
      return;
    }
    
    const result = await Users.create(username, email, hash);
    const id = result.id;

    req.session.user = {
      id,
      username,
      email,
    };
    
    res.send({
      url: "/lobby",
      status: 200,
      user: { username: username, id: id },
    });
  } catch (error) {
    res.send({ message: "Error Signing up", status: 500 });
  }
};

User.signin = async (req, res) => {
  const {password} = req.body;
  const Username = req.body.username;
  const email = req.body.email;

  try{
    const {
      id,
      username,
      password: hash,
    } = await Users.find_by_email(email);
    const isUser = await bcrypt.compare(password, hash);

    if (isUser) {
      req.session.user = {
        id,
        username,
        email,
      };

      res.send({
        url: "/lobby",
        status: 200,
        user: { username: username, id: id },
      });
    } else {
      res.send({ message: "Error signing in", status: 500 });
    }
  } catch (error) {
    res.send({ message: "Error signing in", status: 500 });
  }
};

// router.post("/sign_up", async (req, res) => {
//   // given a clear text password, encrypt and check for credential
//   const { email, password, username, confirm_password } = req.body;

//   console.log({ email, username, password, confirm_password });
//   console.log(req.body);

//   // first check if they exist and redirect to sign in
//   const user_exists = await Users.email_exists(email);
//   if (user_exists) {
//     res.redirect(`/lobby/` + username);
//     return;
//   }

//   // user doesnt exists => Encrypt the clear text password (new_user)
//   const salt = await bcrypt.genSalt(SALT_ROUNDS);
//   const hash = await bcrypt.hash(password, salt);

//   // Store in the DB
//   const { id } = Users.create(username, email, hash);

//   // Store in session
//   req.session.user = {
//     id,
//     username,
//     email,
//   };

//   // Redirect to Lobby
//   console.log(req.body);
//   res.redirect("/lobby");
// });

// router.post("/sign_in", async (req, res) => {
//   // Given data, add user to Users table; redirect to global lobby
//   const { email, password } = req.body;
//   console.log(req.body);

//   try {
//     const user = await Users.find_by_email(email);
//     const isValidUser = password == user.password ? true : false;
//     // TODO: ADD BYcrypt compare after inserting new users

//     if (isValidUser) {
//       // Store user in session
//       req.session.user = {
//         id: user["id"],
//         username: user["username"],
//         email,
//       };

//       console.log({ user, session: req.session });

//       res.redirect("/lobby");
//     } else {
//       // TODO: INVALID credentials, try to add to front-end
//       res.render("sign_in", {
//         error: "The credentials you supplied are invalid.",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     // TODO: INVALID credentials, try to add to front-end
//     res.render("sign_in", {
//       error: "The credentials you supplied are invalid.",
//     });
//   }
// });

// TODO: ADD TO FRONTEND : logout endpoint

User.signout = async (req, res) => {
  try {
    req.session.destroy();
    res.send({ url: "/", status: 200 });
  } catch (err) {
    res.send({ message: "Error logging out", status: 500 });
  }
};

User.getUserSession = async (req, res) => {
  res.send({ user: req.session.user });
};

module.exports = User;
