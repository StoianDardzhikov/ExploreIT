const makeUser = require("../domain/user/index");
const makeLoginUser = require("./login");
const makeRegisterUser = require("./register");
const { User } = require("../data-access/models");
const { hash, compare } = require("bcrypt");

const loginUser = makeLoginUser({ User, makeUser, compare });
const registerUser = makeRegisterUser({ User, makeUser, hash });

const authService = Object.freeze({
  loginUser,
  registerUser,
});

module.exports = authService;
