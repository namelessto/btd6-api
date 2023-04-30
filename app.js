const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/towers", (req, res) => {
  let jsonResponse = [];
  const { allData } = req.query;
  const shouldReturnAllData = allData === "true";
  const folderPath = "./BTD6/Towers";
  const fileCategory = "towers";
  jsonResponse = handleAllItems(shouldReturnAllData, folderPath, fileCategory);

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

function handleAllItems(allData, folderPath, fileCategory) {
  const itemsToReturn = [];
  let desiredProps = [];

  if (fileCategory === "towers") {
    desiredProps = ["id", "name", "type", "inGameDesc", "image"];
  } else if (fileCategory === "heroes") {
    desiredProps = ["id", "name", "inGameDesc", "image"];
  } else if (fileCategory === "bloons") {
    desiredProps = ["id", "name", "type", "image"];
  } else if (fileCategory === "bosses") {
    desiredProps = ["id", "name", "type", "image"];
  } else if (fileCategory === "maps") {
    desiredProps = ["id", "name", "inGameDesc", "image"];
  }

  const files = fs.readdirSync(folderPath);
  for (const file of files) {
    let item = {};

    const jsonData = JSON.parse(fs.readFileSync(`${folderPath}/${file}`));
    if (!allData) {
      desiredProps.forEach((prop) => {
        item[prop] = jsonData[prop];
      });
    } else {
      item = jsonData;
    }

    itemsToReturn.push(item);
  }

  return itemsToReturn;
}
