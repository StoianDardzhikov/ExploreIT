module.exports = function makeGetAllLandmarks(Landmark) {
  return async function getAllLandmarks(
    calculateRatingForLandmark,
    checkIfLandmarkIsVisited,
    userId
  ) {
    var landmarkEntities = await Landmark.findAll();

    let landmarksObjects = [];

    for (i = 0; i < landmarkEntities.length; i++) {
      var { rating } = await calculateRatingForLandmark(landmarkEntities[i].id);
      var isVisited = await checkIfLandmarkIsVisited(
        userId,
        landmarkEntities[i].id
      );
      const landmarkObj = {
        id: landmarkEntities[i].id,
        name: landmarkEntities[i].name,
        lat: landmarkEntities[i].lat,
        lon: landmarkEntities[i].lon,
        rating: rating,
        isVisited: isVisited,
      };
      landmarksObjects.push(landmarkObj);
    }

    return landmarksObjects;
  };
};
