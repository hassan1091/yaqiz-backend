const express = require("express");
const router = express.Router();
const db = require("../db.js");
// SELECT device.Device_ID,device.Device_Location FROM `user_has_device` JOIN `user`JOIN `device` WHERE Device_Device_ID = device.Device_ID and User_Employee_ID = user.Employee_ID and User_Employee_ID = 4;
router.get("/", (req, res) => {
  let sql = "SELECT device.Device_ID,device.Device_Location,User_Employee_ID FROM `user_has_device` JOIN `user`JOIN `device` WHERE Device_Device_ID = device.Device_ID and User_Employee_ID = user.Employee_ID";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
//SELECT device.Device_ID,device.Device_Location,vital_signs.* FROM `user_has_device` JOIN `user` JOIN `device` JOIN device_has_vital_signs JOIN vital_signs WHERE user_has_device.Device_Device_ID = device.Device_ID and user_has_device.User_Employee_ID = user.Employee_ID and device.Device_ID = device_has_vital_signs.Device_Device_ID and device_has_vital_signs.Vital_Signs_Vital_ID = vital_signs.Vital_ID and user.Employee_ID = 4;
router.get("/:id", (req, res) => {
  let sql = "SELECT device.Device_ID,device.Device_Location FROM `user_has_device` JOIN `user`JOIN `device` WHERE Device_Device_ID = device.Device_ID and User_Employee_ID = user.Employee_ID and User_Employee_ID = ?";
  db.query(sql, req.params.id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/signs/:id", (req, res) => {
  let sql = "SELECT vital_signs.* FROM `user_has_device` JOIN `user` JOIN `device` JOIN device_has_vital_signs JOIN vital_signs WHERE user_has_device.Device_Device_ID = device.Device_ID and user_has_device.User_Employee_ID = user.Employee_ID and device.Device_ID = device_has_vital_signs.Device_Device_ID and device_has_vital_signs.Vital_Signs_Vital_ID = vital_signs.Vital_ID and user.Employee_ID = ?";
  db.query(sql, req.params.id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
module.exports = router;