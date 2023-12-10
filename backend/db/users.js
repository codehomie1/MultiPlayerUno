const db = require("./connections");

const USERS_EXISTENCE = `SELECT COUNT(*) 
FROM users 
WHERE email=$1 `;

const ADD_USER = `INSERT INTO users (username, email, password) 
VALUES ($1, $2, $3) 
RETURNING id, email`;

const SIGN_USER_IN = `SELECT * FROM users 
WHERE email=$1`;

const email_exists = (email) =>
  db
    .one(USERS_EXISTENCE, [email])
    .then((_) => true)
    .catch((_) => false);

const create = () => db.one(ADD_USER, [username, email, password]);
const find_by_email = (email) => db.one(SIGN_USER_IN, [email]);

module.exports = {
  email_exists,
  create,
  find_by_email,
};