const makeRating = require("../index");
const makeAddRating = require("./add-rating");
const makeCalculateRatingForLandmark = require("./calculate-rating-for-landmark");

const { Rating } = require("../../../data-access/models");

const addRating = makeAddRating(Rating, makeRating);
const calculateRatingForLandmark = makeCalculateRatingForLandmark(Rating);

module.exports = ratingService = Object.freeze({
  addRating,
  calculateRatingForLandmark,
});
