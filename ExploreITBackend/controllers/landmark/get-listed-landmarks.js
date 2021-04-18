module.exports = function makeGetListedLandmarks(getListedLandmarks, calculateRatingForLandmark, checkIfLandmarkIsRated, getUserByName) {
    return async function GetListedLandmarks(httpRequest) {
        try {
            const user = await getUserByName(httpRequest.user.username);

            const landmarks = await getListedLandmarks(user.id, calculateRatingForLandmark, checkIfLandmarkIsRated);

            return {
                headers: {
                    "Content-Type": "application/json",
                },
                statusCode: 201,
                body: { landmarks },
            };
        }
        catch (err) {
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
    }
}