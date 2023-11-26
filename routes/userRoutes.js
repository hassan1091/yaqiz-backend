const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.get('/', (req, res) => {
  let sql = 'SELECT * FROM user';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/:id', (req, res) => {
  let sql = 'SELECT * FROM user WHERE Employee_ID = ?';
  db.query(sql, req.params.id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.post('/', (req, res) => {
  let sql = 'INSERT INTO user SET ?';
  let user = req.body;
  db.query(sql, user, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.put('/:id', (req, res) => {
  let sql = 'UPDATE user SET ? WHERE Employee_ID = ?';
  db.query(sql, [req.body, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.delete('/:id', (req, res) => {
  let sql = 'DELETE FROM user WHERE Employee_ID = ?';
  db.query(sql, req.params.id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
