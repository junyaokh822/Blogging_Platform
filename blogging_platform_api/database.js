const { Pool } = require('pg');
require('dotenv').config();

console.log(process.env.DB_NAME)

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL
  );
  CREATE TABLE IF NOT EXISTS Posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    contents TEXT NOT NULL,
    postDate Date NOT NULL
  );
  CREATE TABLE IF NOT EXISTS Comments (
    id SERIAL PRIMARY KEY,
    contents TEXT NOT NULL,
    postDate Date NOT NULL
  );
`;

const createTable = async () => {
    try {
      await pool.query(createTableQuery);
      console.log('Table created successfully');
    } catch (err) {
      console.error('Error executing query', err.stack);
    }
  };
  
  createTable();

  module.exports = {
    query: (text, params, callback) => {
      console.log("QUERY:", text, params || "");
      return pool.query(text, params, callback);
    },
  };


