module.exports = function makeRateLandmark(addRating, getUserByName) {
  return async function RateLandmark(httpRequest) {
    try {
      const { ratingValue, landmarkId } = httpRequest.body;
      const user = await getUserByName(httpRequest.user.username);
      const rating = await addRating(user.id, landmarkId, ratingValue);
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: {
          rating: {
            userId: rating.getUserId(),
            landmarkId: rating.getLandmarkId(),
            ratingValue: rating.getRatingValue(),
          },
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
