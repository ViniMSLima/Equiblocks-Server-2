const express = require("express");
const ChallengeController = require("../controller/challengeController");
const router = express.Router();

router
  .get("/getstatus", ChallengeController.getstatus)
  .get("/start", ChallengeController.start)
  .get("/stop", ChallengeController.stop);

module.exports = router;
