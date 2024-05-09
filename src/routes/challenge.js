const express = require("express");
const ChallengeController = require("../controller/challengeController");
const router = express.Router();

router
  .get("/getstatus", ChallengeController.getStatus)
  .get("/start", ChallengeController.start)
  .get("/stop", ChallengeController.stop)
  .post("/postvalues", ChallengeController.postValues)
  .get("/getvalues", ChallengeController.getValues)

module.exports = router;
