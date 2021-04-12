module.exports = function makeCheckIfLandmarkIsRated(Rating) {
  return async function checkIfLandmarkIsRated(userId, landmarkId) {
    const userRating = await Rating.findOne({
      where: { LandmarkId: landmarkId, UserId: userId },
    });

    if (!userRating) return false;
    return true;
  };
};
