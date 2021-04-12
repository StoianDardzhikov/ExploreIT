const makeCallback = require("../express-callback/index");
const authController = require("../authentication/index");
const authenticateToken = require("../authentication/authenticateToken");
const userController = require("../controllers/user/index");
const express = require("express");
var router = express.Router();

router.post("/register", makeCallback(authController.registerUser));
router.post("/login", makeCallback(authController.loginUser));

router.get(
  "/visited",
  authenticateToken,
  makeCallback(userController.getVisitedLandmarks)
);

module.exports = router;
