// Connect to DB
const { Client } = require("pg");
const DB_NAME = "localhost:5432/bbqbaddies";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client({
  connectionString: DB_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

// export
module.exports = {
  client,
  // db methods
};
