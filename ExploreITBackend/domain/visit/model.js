module.exports = function buildMakeVisit() {
  return function makeVisit({ userId, landmarkId, visitDate }) {
    if (!userId) {
      throw new Error("Посещението трябва да съдържа потребител");
    }
    if (!landmarkId) {
      throw new Error("Посещението трябва да съдържа забележителност");
    }
    if (!visitDate) {
      throw new Error("Посещението трябва да съдържа дата");
    }

    const visit = Object.freeze({
      getUserId: () => userId,
      getLandmarkId: () => landmarkId,
      getVisitDate: () => visitDate,
    });

    return visit;
  };
};
