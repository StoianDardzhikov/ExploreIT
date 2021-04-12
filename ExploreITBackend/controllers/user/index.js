const userService = require("../../domain/user/use-cases/index");
const makeGetUser = require("./get-user");
const makeGetVisitedLandmarks = require("./get-visited-landmarks");

const getUser = makeGetUser(userService.getUserByName);
const getVisitedLandmarks = makeGetVisitedLandmarks(
  userService.getVisitedLandmarks,
  userService.getUserByName
);

module.exports = userController = Object.freeze({
  getUser,
  getVisitedLandmarks,
});
