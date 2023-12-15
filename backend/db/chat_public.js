const db = require('./db');

const createMessage = async (username, message) => {
  return await db.one(
    'INSERT INTO lobby_chat (username, message) VALUES ($1, $2)',
    [username, message]
  );
};

const getMessages = async () => {
  return await db.any('SELECT * FROM lobby_chat');
};

module.exports = {
  createMessage,
  getMessages,
};
