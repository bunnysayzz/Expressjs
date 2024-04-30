const express = require("express");
const sequelize = require("./sequelize");
const Todo = require("./models/todo");
const app = express();
const PORT = 3000;
// models/Todo
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    // Synchronize defined models with the database
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
app.use(express.json());

app.get("/todos", (req, res) => {
  Todo.findAll()
    .then((todos) => {
      res.json(todos);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
});

app.put("/todos/:id", (req, res) => {
  const todoId = req.params.id;
  const { title, completed } = req.body;
  Todo.findByPk(todoId)
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      // Update the todo
      todo.title = title;
      todo.completed = completed;
      // Save the updated todo
      return todo.save();
    })
    .then((updatedTodo) => {
      res.json(updatedTodo);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
});

app.post("/todos", (req, res) => {
  const { title, completed } = req.body;
  Todo.create({ title, completed })
    .then((todo) => {
      res.status(201).json(todo);
    })
    .catch((error) => {
      res.status(400).json({ error: "Bad request" });
    });
});

app.listen(PORT)