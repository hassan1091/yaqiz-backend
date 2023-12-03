const express = require("express");
const router = express.Router();
const db = require("../db.js");

router.get("/", (req, res) => {
  let sql =
    "SELECT device.Device_ID,device.Device_Location,User_Employee_ID FROM `user_has_device` JOIN `user`JOIN `device` WHERE Device_Device_ID = device.Device_ID and User_Employee_ID = user.Employee_ID";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/all/:id", (req, res) => {
  let sql =
    "SELECT Device_ID, (SELECT EXISTS (SELECT 1 FROM user_has_device WHERE user_has_device.Device_Device_ID = device.Device_ID AND user_has_device.User_Employee_ID = 4)) AS has FROM device;";
  db.query(sql, req.params.id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/:id", (req, res) => {
  let sql =
    "SELECT device.Device_ID, device.Device_Location, vital_signs.Priority FROM `user_has_device` JOIN `user` ON user.Employee_ID = user_has_device.User_Employee_ID JOIN `device` ON device.Device_ID = user_has_device.Device_Device_ID JOIN device_has_vital_signs ON device.Device_ID = device_has_vital_signs.Device_Device_ID JOIN vital_signs ON device_has_vital_signs.Vital_Signs_Vital_ID = vital_signs.Vital_ID WHERE User_Employee_ID = ?;";
  db.query(sql, req.params.id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/signs/:id", (req, res) => {
  let sql =
    "SELECT vital_signs.* FROM `user_has_device` JOIN `user` JOIN `device` JOIN device_has_vital_signs JOIN vital_signs WHERE user_has_device.Device_Device_ID = device.Device_ID and user_has_device.User_Employee_ID = user.Employee_ID and device.Device_ID = device_has_vital_signs.Device_Device_ID and device_has_vital_signs.Vital_Signs_Vital_ID = vital_signs.Vital_ID and user_has_device.Device_Device_ID = ? GROUP BY vital_signs.Vital_ID";
  db.query(sql, req.params.id, (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

module.exports = router;
