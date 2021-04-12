module.exports = function makeAddLandmark(Landmark, makeLandmark, fs, path) {
  return async function addLandmark(landmarkInfo) {
    const landmark = makeLandmark(landmarkInfo);

    if (!landmark) throw new Error("Нещо се обърка");

    var imageData = fs.readFileSync(
      path.join(__dirname, "../../../") +
        "/images/" +
        landmarkInfo.imageName +
        ".jpeg"
    );
    console.log(imageData);
    await Landmark.create({
      name: landmark.getName(),
      description: landmark.getDescription(),
      image: imageData,
      lat: landmark.getCoordinates().lat,
      lon: landmark.getCoordinates().lon,
      visits: landmark.getVisits(),
    });

    return landmark;
  };
};
