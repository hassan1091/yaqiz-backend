const express = require("express");
const bodyParser = require("body-parser");
const xlsx = require("xlsx");
const db = require("./db.js");

//router routes
const userRoutes = require("./routes/userRoutes");
const deviceRoutes = require("./routes/deviceRoutes");

const app = express();

app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/user", userRoutes);
app.use("/device", deviceRoutes);

const redData = xlsx.utils.sheet_to_json(
  xlsx.readFile(__dirname + "\\red.xlsm").Sheets["Sheet1"]
);
const yellwData = xlsx.utils.sheet_to_json(
  xlsx.readFile(__dirname + "\\yellow.xlsm").Sheets["Sheet1"]
);
const greenData = xlsx.utils.sheet_to_json(
  xlsx.readFile(__dirname + "\\green.xlsm").Sheets["Sheet1"]
);

app.get("/red", async (req, res) => {
  for (let i = 0; i < redData.length; i++) {
    const element = redData[i];
    console.log("R:");
    console.log(element);
    await delay(5000);
  }
  res.send(redData);
});
app.get("/yellow", async (req, res) => {
  for (let i = 0; i < redData.length; i++) {
    const element = yellwData[i];
    console.log("Y:");
    console.log(element);
    await delay(5000);
  }
  res.send(yellwData);
});
app.get("/green", async (req, res) => {
  for (let i = 0; i < redData.length; i++) {
    const element = greenData[i];
    console.log("G:");
    console.log(element);
    await delay(5000);
  }
  res.send(greenData);
});

app.get('/start',async (req, res) => {
  for (let i = 0; i < redData.length; i++) {
    const element = redData[i];
    await delay(12000);
    let sql =
      "UPDATE `vital_signs` SET `HR` = '" +
      element["Heart Rate"] +
      "', `SPO2` = '" +
      element["SpO2 (%)"] +
      "', `BP` = '" +
      element["blood pressure"] +
      "', `Temp` = '" +
      element["Temperature (°C)"] +
      "', `Respiratory_Rate`" +
      " = '" +
      element["Respiratory Rate "] +
      "', `Priority` = '" +
      element["P"] +
      "' WHERE `vital_signs`.`Vital_ID` in (4533,4532)";
    db.query(sql, (err, result) => {
    });
  }
})

app.listen(process.env.PORT || 8080, function () {
  console.log("Server started on port 8080");
});

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
