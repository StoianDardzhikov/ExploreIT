module.exports = function makeAddRating(Rating, makeRating) {
  return async function addRating(userId, landmarkId, ratingValue) {
    const ratingEntity = await Rating.findOne({
      where: {
        UserId: userId,
        LandmarkId: landmarkId,
      },
    });

    if (ratingEntity) {
      throw new Error("Потребителят вече е оценил тази забележителност");
    }

    const ratingInfo = {
      userId: userId,
      landmarkId: landmarkId,
      ratingValue: ratingValue,
    };

    const rating = makeRating(ratingInfo);

    await Rating.create({
      UserId: rating.getUserId(),
      LandmarkId: rating.getLandmarkId(),
      rating: rating.getRatingValue(),
    });
    return rating;
  };
};
