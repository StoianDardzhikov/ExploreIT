const makeCallback = require("../express-callback/index");
const authenticateToken = require("../authentication/authenticateToken");
const landmarkController = require("../controllers/landmark/index");
const express = require("express");
var router = express.Router();

router.post(
  "/add",
  authenticateToken,
  makeCallback(landmarkController.addLandmark)
);
router.post(
  "/near",
  authenticateToken,
  makeCallback(landmarkController.getNearLandmarks)
);
router.post(
  "/visit",
  authenticateToken,
  makeCallback(landmarkController.visitLandmark)
);
router.get(
  "/markers",
  authenticateToken,
  makeCallback(landmarkController.getAllLandmarks)
);

router.post(
  "/rate",
  authenticateToken,
  makeCallback(landmarkController.rateLandmark)
);

router.get(
  "/:landmarkId",
  authenticateToken,
  makeCallback(landmarkController.displayLandmark)
);

module.exports = router;
