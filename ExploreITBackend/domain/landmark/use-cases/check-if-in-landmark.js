const KM_TO_LAT = 0.00904371732;
const KM_TO_LON = (lat) => {
  return 0.00898311174 * Math.cos(lat);
};

module.exports = function makeCheckIfInLandmark() {
  return function checkIfInLandmark(lat, lon, landmark) {
    if (
      !(
        Math.abs(lat - landmark.lat) > Math.abs(0.1 * KM_TO_LAT) ||
        Math.abs(lon - landmark.lon) > Math.abs(0.1 * KM_TO_LON(lat))
      )
    ) {
      return true;
    }
    return false;
  };
};
