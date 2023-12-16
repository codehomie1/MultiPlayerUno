const pgp = require("pg-promise")();

// Database connection parameters (modify these according to your database)
const dbConfig = {
  host: "localhost",
  port: "5432",
  database: process.env.DB_NAME,
  user: "postgres",
  password: process.env.DB_PASS,
};

// Create a database connection
const db = pgp(dbConfig);

module.exports = db;
