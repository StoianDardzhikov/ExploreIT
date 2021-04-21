module.exports = function makeCheckIfInLandmark() {
  return function checkIfInLandmark(lat, lon, landmark) {

    //Използваме сферичен закон на косинусите да намерим дължината между забележителността и нашата позиция
    const φ1 = lat * Math.PI / 180, φ2 = landmark.lat * Math.PI / 180, Δλ = (landmark.lon - lon) * Math.PI / 180, R = 6371e3;
    const d = Math.acos(Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)) * R;

    console.log(landmark.name)
    console.log(d)

    if (d <= 100) {
      return true;
    }
    return false;
  };
};