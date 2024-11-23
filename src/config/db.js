// src/config/db.js
import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Create a connection to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST,      // Using environment variable for host
  user: process.env.DB_USER,      // Using environment variable for user
  password: process.env.DB_PASSWORD,  // Using environment variable for password
  database: process.env.DB_NAME,  // Using environment variable for database name
  port: process.env.DB_PORT       // Using environment variable for port
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database!');
});

export default db;
