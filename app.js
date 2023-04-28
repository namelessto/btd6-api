const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const queryString = require("querystring");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/towers", (req, res) => {
  let jsonResponse = [];
  const { allData } = req.query;
  const shouldReturnAllData = allData === "true";
  jsonResponse = handleAllTowers(shouldReturnAllData);

  res.json(jsonResponse);
});

app.get("/tower/:id", (req, res) => {
  const fileID = req.params.id;
  const filePath = `./BTD6/Towers/${fileID}.json`;

  const jsonData = JSON.parse(fs.readFileSync(filePath));

  res.json(jsonData);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

function handleAllTowers(allData) {
  const towers = [];

  const folderPath = "./BTD6/Towers";

  const files = fs.readdirSync(folderPath);
  for (const file of files) {
    let tower = {}; // create a new tower object in each iteration

    // Load the JSON file into a JavaScript variable.
    const jsonData = JSON.parse(fs.readFileSync(`${folderPath}/${file}`));
    if (!allData) {
      const desiredProps = ["id", "name", "image", "inGameDesc"];

      desiredProps.forEach((prop) => {
        tower[prop] = jsonData[prop];
      });
    } else {
      tower = jsonData;
    }
    // console.log(tower["id"]);

    // Add the JSON data to the array.
    towers.push(tower);
  }

  return towers;
}
