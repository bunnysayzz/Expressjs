// Import required modules
const express = require('express');
const { Pool } = require('pg');

// Create an instance of Express
const app = express();

// Define the PostgreSQL connection configuration
const pool = new Pool({
  user: 'PostgreSQL', // Your PostgreSQL username
  host: 'localhost',
  database: 'db1', // Your PostgreSQL database name
  password: '8969', // Your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

// Define a route
app.get('/', async (req, res) => {
  try {
    // Example query: Select all rows from a table called 'example_table'
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM example_table');
    client.release(); // Release the client back to the pool
    res.json(result.rows); // Send the query result as JSON response
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error executing query');
  }
});

// Start the server on port 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
