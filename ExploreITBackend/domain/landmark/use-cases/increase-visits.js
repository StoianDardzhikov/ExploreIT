module.exports = function makeIncreaseVisits(Landmark, makeLandmark) {
  return async function increaseVisits(landmarkId) {
    const landmarkEntity = await Landmark.findOne({
      where: { id: landmarkId },
    });

    if (!landmarkEntity) {
      throw new Error("Не съществува такава забележителност");
    }

    const landmarkInfo = {
      name: landmarkEntity.name,
      description: landmarkEntity.description,
      lat: landmarkEntity.lat,
      lon: landmarkEntity.lon,
      visits: landmarkEntity.visits,
    };

    const landmark = makeLandmark(landmarkInfo);
    landmark.incrementVisits();

    landmarkEntity.visits = landmark.getVisits();

    await landmarkEntity.save();
  };
};
