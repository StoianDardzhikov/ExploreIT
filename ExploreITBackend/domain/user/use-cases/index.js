const makeUser = require("../index");
const makeGetUserByName = require("./get-user-by-name");
const makeCheckIfLandmarkIsVisited = require("./check-if-landmark-is-visited");
const makeCheckIfLandmarkIsRated = require("./check-if-landmark-is-rated");
const makeGetVisitedLandmarks = require("./get-visited-landmarks");

const { User, Visit, Rating } = require("../../../data-access/models");

const getUserByName = makeGetUserByName(User);
const checkIfLandmarkIsVisited = makeCheckIfLandmarkIsVisited(Visit);
const checkIfLandmarkIsRated = makeCheckIfLandmarkIsRated(Rating);
const getVisitedLandmarks = makeGetVisitedLandmarks(Visit);

module.exports = userService = Object.freeze({
  getUserByName,
  checkIfLandmarkIsVisited,
  checkIfLandmarkIsRated,
  getVisitedLandmarks,
});
