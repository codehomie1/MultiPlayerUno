const db = require('./db');

const createMessage = async (username, message) => {
  return await db.one(
    'INSERT INTO inGame_Chat (username, message) VALUES ($1, $2)',
    [username, message]
  );
};

const getMessages = async () => {
  return await db.any('SELECT * FROM inGame_Chat');
};

module.exports = {
  createMessage,
  getMessages,
};
