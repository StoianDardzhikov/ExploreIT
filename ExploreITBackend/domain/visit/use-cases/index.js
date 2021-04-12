const makeVisit = require("../index");
const makeAddVisit = require("./add-visit");

const { Visit } = require("../../../data-access/models");

const addVisit = makeAddVisit(Visit, makeVisit);

module.exports = visitService = Object.freeze({
  addVisit,
});
