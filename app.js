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
app.get("/tower/:id", (req, res) => {
  const fileID = req.params.id;
  const filePath = `./BTD6/${fileID}.json`;

  const jsonData = JSON.parse(fs.readFileSync(filePath));

  res.json(jsonData);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
