const KM_TO_LAT = 0.00904371732;
const KM_TO_LON = (lat) => {
  return 0.00898311174 * Math.cos(lat);
};

function findAllLandmarksInRadius(landmarks, lat, lon, searchRadius) {
  let landmarksInRadius = [];
  landmarks.forEach((landmark) => {
    if (
      !(
        Math.abs(lat - landmark.lat) > searchRadius * KM_TO_LAT ||
        Math.abs(lon - landmark.lon) > Math.abs(searchRadius * KM_TO_LON(lat))
      )
    ) {
      landmarksInRadius.push(landmark);
    }
  });

  return landmarksInRadius;
}

async function convertToLandmarks(landmarks, calculateRatingForLandmark) {
  let landmarksObjects = [];

  for (i = 0; i < landmarks.length; i++) {
    var { rating } = await calculateRatingForLandmark(landmarks[i].id);
    const landmarkObj = {
      id: landmarks[i].id,
      name: landmarks[i].name,
      description: landmarks[i].description,
      image: landmarks[i].image,
      lat: landmarks[i].lat,
      lon: landmarks[i].lon,
      visits: landmarks[i].visits,
      rating: rating,
    };
    landmarksObjects.push(landmarkObj);
  }

  return landmarksObjects;
}

function sortByDistance(landmarks, lat, lon) {
  let nearestLandmarksPair = [];

  landmarks.forEach((landmark) => {
    c = Math.sqrt(
      Math.pow(lat - landmark.lat, 2) + Math.pow(lon - landmark.lon, 2)
    );

    nearestLandmarksPair.push({ dist: c, landmark: landmark });
  });

  nearestLandmarksPair.sort((a, b) => a.dist - b.dist);

  let nearestLandmarks = [];
  nearestLandmarksPair.forEach((pair) => {
    nearestLandmarks.push(pair.landmark);
  });
  return nearestLandmarks;
}

module.exports = function makeGetNearLandmarks(Landmark) {
  return async function getNearLandmarks(
    lat,
    lon,
    searchRadius,
    calculateRatingForLandmark
  ) {
    const landmarks = await Landmark.findAll();

    const landmarksInRadius = findAllLandmarksInRadius(
      landmarks,
      lat,
      lon,
      searchRadius
    );
    const nearestLandmarks = sortByDistance(landmarksInRadius, lat, lon);

    const landmarksObj = await convertToLandmarks(
      nearestLandmarks,
      calculateRatingForLandmark
    );
    return landmarksObj.slice(0, 5);
  };
};
