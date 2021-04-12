module.exports = function makeAddLandmark(addLandmark) {
  return async function AddLandmark(httpRequest) {
    try {
      const landmarkInfo = httpRequest.body;

      const landmark = await addLandmark(landmarkInfo);

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: {
          name: landmark.getName(),
          description: landmark.getDescription(),
          coordinates: landmark.getCoordinates(),
          visits: landmark.getVisits(),
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
