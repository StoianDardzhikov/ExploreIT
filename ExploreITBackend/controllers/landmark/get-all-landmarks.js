module.exports = function makeGetAllLandmakrs(
  getAllLandmarks,
  calculateRatingForLandmark,
  checkIfLandmarkIsVisited,
  getUserByName
) {
  return async function GetAllLandmarks(httpRequest) {
    try {
      const user = await getUserByName(httpRequest.user.username);
      console.log(user);
      const landmarks = await getAllLandmarks(
        calculateRatingForLandmark,
        checkIfLandmarkIsVisited,
        user.id
      );
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: { landmarks },
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
