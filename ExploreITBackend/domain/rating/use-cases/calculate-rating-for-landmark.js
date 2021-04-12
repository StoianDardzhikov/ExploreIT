module.exports = function makeCalculateRatingForLandmark(Rating) {
  return async function calculateRatingForLandmark(landmarkId) {
    const ratings = await Rating.findAll({ where: { LandmarkId: landmarkId } });

    var avg = 0;
    if (ratings.length != 0) {
      ratings.forEach((rating) => (avg += rating.rating));
      avg /= ratings.length;
    }

    return { rating: avg, ratingsCount: ratings.length };
  };
};
