const express = require('express');
const readline = require('readline');

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());

let todoList = [];

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// API endpoint to get todos
app.get('/todos', (req, res) => {
  res.json(todoList);
});

// API endpoint to add a new todo
app.post('/todos', (req, res) => {
  const newTodo = req.body.todo;
  todoList.push(newTodo);
  res.json({ message: 'Todo added successfully!' });
});

// API endpoint to delete a todo
app.delete('/todos/:index', (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < todoList.length) {
    todoList.splice(index, 1);
    res.json({ message: 'Todo deleted successfully!' });
  } else {
    res.status(404).json({ error: 'Invalid index.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
