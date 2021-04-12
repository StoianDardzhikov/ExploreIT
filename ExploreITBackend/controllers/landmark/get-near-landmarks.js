module.exports = function makeGetNearLandmarks(
  getNearLandmarks,
  calculateRatingForLandmark
) {
  return async function GetNearLandmarks(httpRequest) {
    try {
      const { lat, lon, searchRadius } = httpRequest.body;

      const landmarks = await getNearLandmarks(
        lat,
        lon,
        searchRadius,
        calculateRatingForLandmark
      );

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: { landmarks },
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
