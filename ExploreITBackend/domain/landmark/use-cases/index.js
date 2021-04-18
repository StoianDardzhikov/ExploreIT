const makeAddLandmark = require("./add-landmark");
const makeGetNearLandmarks = require("./get-near-landmarks");
const makeIncreaseVisits = require("./increase-visits.js");
const makeCheckIfInLandmark = require("./check-if-in-landmark");
const makeGetAllLandmarks = require("./get-all-landmarks");
const makeGetLandmarkById = require("./get-landmark-by-id");
const makeGetListedLandmarks = require("./get-listed-landmarks");
const makeLandmark = require("../index");
const fs = require("fs");
const path = require("path");

const { Landmark } = require("../../../data-access/models");

const addLandmark = makeAddLandmark(Landmark, makeLandmark, fs, path);
const getNearLandmanks = makeGetNearLandmarks(Landmark);
const checkIfInLandmark = makeCheckIfInLandmark();
const increaseVisits = makeIncreaseVisits(Landmark, makeLandmark);
const getAllLandmarks = makeGetAllLandmarks(Landmark);
const getLandmarkById = makeGetLandmarkById(Landmark, makeLandmark);
const getListedLandmarks = makeGetListedLandmarks(Landmark);

module.exports = landmarkService = Object.freeze({
  addLandmark,
  getNearLandmanks,
  increaseVisits,
  checkIfInLandmark,
  getAllLandmarks,
  getLandmarkById,
  getListedLandmarks
});
