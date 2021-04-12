module.exports = function makeGetVisitedLandmarks(
  getVisitedLandmarks,
  getUserByName
) {
  return async function GetVisitedLandmarks(httpRequest) {
    try {
      const user = await getUserByName(httpRequest.user.username);
      const visitedLandmarks = await getVisitedLandmarks(user.id);

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: { visits: visitedLandmarks },
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
