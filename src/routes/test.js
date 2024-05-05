const express = require("express");
const TestController = require("../controller/testController");
const router = express.Router();

router
  .get("/getstatustest", TestController.getstatusteste)
  .get("/starttest", TestController.startTeste)
  .get("/stoptest", TestController.stopTeste)

module.exports = router;
