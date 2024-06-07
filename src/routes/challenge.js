const express = require("express");
const ChallengeController = require("../controller/challengeController");
const router = express.Router();

router
  .get("/getstatus", ChallengeController.getStatus)
  .get("/start", ChallengeController.start)
  .get("/stop", ChallengeController.stop)
  .get("/finish", ChallengeController.finish)
  
  .post("/postvalues", ChallengeController.postValues)
  .get("/getvalues", ChallengeController.getValues)

  .get("/gettime", ChallengeController.getTime)
  .post("/posttime", ChallengeController.postTime)

  .get("/getactiveprocess", ChallengeController.getActiveProcess)
  .post("/finishprocess", ChallengeController.finishProcess)
  .post("/postprocess", ChallengeController.postProcess)

module.exports = router;
