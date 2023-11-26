const express = require("express");
const bodyParser = require("body-parser");
const xlsx = require('xlsx')
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

const app = express();

const redData = xlsx.utils.sheet_to_json(xlsx.readFile(__dirname +"\\" +"red.xlsm").Sheets["Sheet1"])
const yellwData = xlsx.utils.sheet_to_json(xlsx.readFile(__dirname +"\\"+"yellow.xlsm").Sheets["Sheet1"])
const greenData = xlsx.utils.sheet_to_json(xlsx.readFile(__dirname +"\\"+"green.xlsm").Sheets["Sheet1"])

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/red', (req, res)=> {
    res.send(redData);
})
app.get('/yellow', (req, res)=> {
    res.send(yellwData);
})
app.get('/green', (req, res)=> {
    res.send(greenData);
})



app.listen(process.env.PORT || 8080, function() {
  console.log("Server started on port 8080");
});
