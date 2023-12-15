const pgp = require('pg-promise')();

// Database connection parameters (modify these according to your database)
const dbConfig = {
  host: 'localhost',
  port: '5432',
  database: 'DB_UNO',
  user: 'postgres',
  password: 'Ok042519!',
};

// Create a database connection
const db = pgp(dbConfig);

module.exports = db;
