const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const db = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  host: "localhost",
  database: "employee_tracker",
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test the database connection
db.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to database:", err.stack);
  } else {
    console.log("Connected to the employee_tracker database");
    release(); // Release the client back to the pool
  }
});

module.exports = db;
