const landmarkService = require("../../domain/landmark/use-cases/index");
const userService = require("../../domain/user/use-cases/index");
const visitService = require("../../domain/visit/use-cases/index");
const ratingService = require("../../domain/rating/use-cases/index");
const makeGetNearLandmarks = require("./get-near-landmarks");
const makeAddLandmark = require("./add-landmark");
const makeVisitLandmark = require("./visit-landmark");
const makeGetAllLandmarks = require("./get-all-landmarks");
const makeRateLandmark = require("./rate-landmark");
const makeDisplayLandmark = require("./display-landmark");

const addLandmark = makeAddLandmark(landmarkService.addLandmark);
const getNearLandmarks = makeGetNearLandmarks(
  landmarkService.getNearLandmanks,
  ratingService.calculateRatingForLandmark
);
const visitLandmark = makeVisitLandmark(
  landmarkService.increaseVisits,
  visitService.addVisit,
  userService.getUserByName,
  landmarkService.getNearLandmanks,
  landmarkService.checkIfInLandmark
);
const rateLandmark = makeRateLandmark(
  ratingService.addRating,
  userService.getUserByName
);
const getAllLandmarks = makeGetAllLandmarks(
  landmarkService.getAllLandmarks,
  ratingService.calculateRatingForLandmark,
  userService.checkIfLandmarkIsVisited,
  userService.getUserByName
);
const displayLandmark = makeDisplayLandmark(
  landmarkService.getLandmarkById,
  ratingService.calculateRatingForLandmark,
  userService.checkIfLandmarkIsRated,
  userService.getUserByName
);

module.exports = landmarkController = Object.freeze({
  addLandmark,
  getNearLandmarks,
  visitLandmark,
  getAllLandmarks,
  rateLandmark,
  displayLandmark,
});
