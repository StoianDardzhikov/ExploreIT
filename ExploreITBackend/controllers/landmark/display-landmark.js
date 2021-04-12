module.exports = function makeDisplayLandmark(
  getLandmarkById,
  calculateRatingForLandmark,
  checkIfLandmarkIsRated,
  getUserByName
) {
  return async function DisplayLandmark(httpRequest) {
    try {
      const { landmarkId } = httpRequest.params;

      const landmark = await getLandmarkById(landmarkId);
      const { rating, ratingsCount } = await calculateRatingForLandmark(
        landmarkId
      );
      const user = await getUserByName(httpRequest.user.username);
      const isRated = await checkIfLandmarkIsRated(user.id, landmarkId);

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: {
          name: landmark.name,
          description: landmark.description,
          image: landmark.image,
          lat: landmark.lat,
          lon: landmark.lon,
          visits: landmark.visits,
          rating: rating,
          ratingsCount: ratingsCount,
          isRated: isRated,
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
