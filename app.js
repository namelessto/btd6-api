const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/towers", (req, res) => {
  const towers = [];
  const folderPath = "./BTD6";

  const files = fs.readdirSync(folderPath);
  let jsonFiles = [];
  for (const file of files) {
    // Load the JSON file into a JavaScript variable.
    const jsonData = JSON.parse(fs.readFileSync(folderPath + "/" + file));

    // Add the JSON data to the array.
    towers.push(jsonData);
  }

  // Send the array of JSON files as a JSON response.
  res.json(towers);
});

// GET a single todo by id
app.get("/towers/:id", (req, res) => {
  const fileID = req.params.id;
  const filePath = `./BTD6/${fileID}.json`;

  const jsonData = JSON.parse(fs.readFileSync(filePath));

  res.json(jsonData);
});

// POST a new todo
app.post("/todos", (req, res) => {
  const todo = req.body;
  todo.id = todos.length + 1;
  todos.push(todo);
  res.status(201).json(todo);
});

// PUT (update) a todo by id
app.put("/todos/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id === parseInt(req.params.id));
  if (!todo) {
    res.status(404).json({ message: "Todo not found" });
  } else {
    Object.assign(todo, req.body);
    res.json(todo);
  }
});

// DELETE a todo by id
app.delete("/todos/:id", (req, res) => {
  const todoIndex = todos.findIndex(
    (todo) => todo.id === parseInt(req.params.id)
  );
  if (todoIndex === -1) {
    res.status(404).json({ message: "Todo not found" });
  } else {
    todos.splice(todoIndex, 1);
    res.status(204).send();
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
