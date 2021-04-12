const authService = require("./authService");
const makeLoginController = require("./login-user");
const makeRegisterController = require("./register-user");
const jwt = require("jsonwebtoken");

const loginUser = makeLoginController(authService.loginUser, jwt.sign);
const registerUser = makeRegisterController(authService.registerUser, jwt.sign);

const authController = Object.freeze({
  loginUser,
  registerUser,
});

module.exports = authController;
