module.exports = function buildMakeRating() {
  return function makeRating({ userId, landmarkId, ratingValue }) {
    if (!userId) {
      throw new Error("Рейтинга трябва да съдържа потребител");
    }
    if (!landmarkId) {
      throw new Error("Рейтинга трябва да съдържа забележителност");
    }
    if (!ratingValue) {
      throw new Error("Рейтинга трябва да съдържа стойност");
    }
    if (ratingValue < 1 || ratingValue > 5) {
      throw new Error("Стойността на рейтинга трябва да е между 1 и 5");
    }

    const rating = Object.freeze({
      getUserId: () => userId,
      getLandmarkId: () => landmarkId,
      getRatingValue: () => ratingValue,
    });

    return rating;
  };
};
