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

const desiredPropsByCategory = {
  towers: ["id", "name", "type", "inGameDesc", "image"],
  heroes: ["id", "name", "inGameDesc", "image"],
  maps: ["id", "name", "inGameDesc", "image"],
  bloons: ["id", "name", "type", "image"],
  bosses: ["id", "name", "type", "image"],
};

function handleAllItems(allData, folderPath, fileCategory) {
  const itemsToReturn = [];

  const desiredProps = desiredPropsByCategory[fileCategory];

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
