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
      const φ1 = lat * Math.PI / 180, φ2 = landmark.lat * Math.PI / 180, Δλ = (landmark.lon - lon) * Math.PI / 180, R = 6371e3;
      const d = Math.acos(Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)) * R;
      landmarksInRadius.push({ landmark: landmark, d: d });
    }
  });

  return landmarksInRadius;
}

async function convertToLandmarks(landmarks) {
  let landmarksObjects = [];

  landmarks.sort(function (a, b) {
    return a.d - b.d;
  });

  if (!landmarks) throw new Error("Няма намерени близки забележителности");
  for (i = 0; i < landmarks.length; i++) {
    const landmarkObj = {
      id: landmarks[i].landmark.id,
      name: landmarks[i].landmark.name,
      lat: landmarks[i].landmark.lat,
      lon: landmarks[i].landmark.lon,
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
