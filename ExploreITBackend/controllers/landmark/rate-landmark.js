module.exports = function makeRateLandmark(addRating, getUserByName, calculateRatingForLandmark) {
  return async function RateLandmark(httpRequest) {
    try {
      const { ratingValue, landmarkId } = httpRequest.body;
      const user = await getUserByName(httpRequest.user.username);
      await addRating(user.id, landmarkId, ratingValue);
      const { rating } = await calculateRatingForLandmark(landmarkId);
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: {
          rating: rating,
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
