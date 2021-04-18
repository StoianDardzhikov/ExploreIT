module.exports = function makeVisitLandmark(
  increaseVisits,
  addVisit,
  getUserByName,
  getNearLandmarks,
  checkIfInLandmark
) {
  return async function VisitLandmark(httpRequest) {
    try {
      const username = httpRequest.user.username;
      const { lat, lon, searchRadius, visitDate } = httpRequest.body;

      const landmarksInRadius = await getNearLandmarks(lat, lon, searchRadius);
      if (landmarksInRadius.length == 0) throw new Error("Не се намирате в забележителност");
      const landmark = landmarksInRadius[0];
      const isIn = checkIfInLandmark(lat, lon, landmark);
      let visit;
      if (isIn) {
        const user = await getUserByName(username);
        visit = await addVisit(user.id, landmark.id, visitDate);
        await increaseVisits(landmark.id);
      } else throw new Error("Не се намирате в забележителност");
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: {
          name: landmark.name,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: err.message,
        },
      };
    }
  };
};
