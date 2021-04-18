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

async function convertToLandmarks(landmarks) {
  let landmarksObjects = [];
  if (!landmarks) throw new Error("Няма намерени близки забележителности");
  for (i = 0; i < landmarks.length; i++) {
    const landmarkObj = {
      id: landmarks[i].id,
      name: landmarks[i].name,
      lat: landmarks[i].lat,
      lon: landmarks[i].lon,
    };
    landmarksObjects.push(landmarkObj);
  }

  return landmarksObjects;
}

module.exports = function makeGetNearLandmarks(Landmark) {
  return async function getNearLandmarks(
    lat,
    lon,
    searchRadius,
  ) {
    const landmarks = await Landmark.findAll();

    const landmarksInRadius = findAllLandmarksInRadius(
      landmarks,
      lat,
      lon,
      searchRadius
    );

    const landmarksObj = await convertToLandmarks(landmarksInRadius);
    return landmarksObj.slice(0, 5);
  };
};
