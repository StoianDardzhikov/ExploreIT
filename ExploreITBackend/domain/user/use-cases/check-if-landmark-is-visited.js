module.exports = function makeCheckIfLandmarkIsVisited(Visit) {
  return async function checkIfLandmarkIsVisited(userId, landmarkId) {
    const userVisit = await Visit.findOne({
      where: { LandmarkId: landmarkId, UserId: userId },
    });

    if (!userVisit) return false;
    return true;
  };
};
