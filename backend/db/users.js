const database = require("./connections");
const { connection: db, pgp } = database;

const USERS_EXISTENCE = `SELECT email 
FROM users 
WHERE email=$1`;

const ADD_USER = `INSERT INTO users (username, email, password) 
VALUES ($1, $2, $3) 
RETURNING id, username, email`;

const SIGN_USER_IN = `SELECT * FROM users 
WHERE email=$1`;

const email_exists = (email) =>
  db
    .one(USERS_EXISTENCE, [email])
    .then((_) => true)
    .catch((_) => false);

const create = (username, email, password) =>
  db.one(ADD_USER, [username, email, password]).then((res) => {
    return res;
  });

const find_by_email = (email) =>
  db.one(SIGN_USER_IN, [email]).then((res) => {
    return res;
  });

module.exports = {
  email_exists,
  create,
  find_by_email,
};
