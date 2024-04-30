const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3002;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db1',
  password: '8969',
  port: 5432
});

app.use(express.json());

// Get all todos
app.get('/todos', (req, res) => {
  pool.query('SELECT * FROM todos', (error, result) => {
    if (error) {
      console.error("Error fetching todos:", error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result.rows);
    }
  });
});

// Post new todo
app.post('/todos', (req, res) => {
  const { title, completed } = req.body;
  pool.query('INSERT INTO todos (title, completed) VALUES ($1, $2)', [title, completed], (error) => {
    if (error) {
      console.error('Error creating todo:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Todo created successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
