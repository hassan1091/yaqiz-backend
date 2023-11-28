const express = require("express");
const router = express.Router();
const db = require("../db.js");

router.get("/", (req, res) => {
  let sql = "SELECT * FROM user";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/:id", (req, res) => {
  let sql = "SELECT * FROM user WHERE Employee_ID = ?";
  db.query(sql, req.params.id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.post("/login", (req, res) => {
  let sql =
    "SELECT * FROM user WHERE Employee_ID = ? AND Employee_Password = ?";
  let { id, password } = req.body;
  db.query(sql, [id, password], (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

router.post("/", (req, res) => {
  let sql = "INSERT INTO user SET ?";
  let user = req.body;
  db.query(sql, user, (err, insertResult) => {
    if (err) throw err;
    let sql = "SELECT * FROM user WHERE Employee_ID = ?";
    db.query(sql, insertResult["insertId"], (err, result) => {
      if (err) throw err;
      res.send(result[0]);
    });
  });
});

router.put("/:id", (req, res) => {
  let sql = "UPDATE user SET ? WHERE Employee_ID = ?";
  db.query(sql, [req.body, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.delete("/:id", (req, res) => {
  let sql = "DELETE FROM user WHERE Employee_ID = ?";
  db.query(sql, req.params.id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
