module.exports = function makeGetLandmarkById(Landmark, makeLandmark) {
  return async function getLandmarkById(id) {
    const landmarkEntity = await Landmark.findOne({ where: { id: id } });

    if (!landmarkEntity)
      throw new Error("Не съществува такава забележителност");

    const landmark = makeLandmark(landmarkEntity);

    return {
      name: landmark.getName(),
      description: landmark.getDescription(),
      image: landmarkEntity.image,
      lat: landmark.getCoordinates().lat,
      lon: landmark.getCoordinates().lon,
      visits: landmark.getVisits(),
    };
  };
};