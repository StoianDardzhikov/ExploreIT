module.exports = function makeGetListedLandmarks(Landmarks) {
    return async function getListedLandmarks(userId, calculateRatingForLandmark, checkIfLandmarkIsRated) {
        const landmarksEntities = await Landmarks.findAll();
        let landmarks = [];
        for (i = 0; i < landmarksEntities.length; i++) {
            let { rating } = await calculateRatingForLandmark(landmarksEntities[i].id);
            let isRated = await checkIfLandmarkIsRated(userId, landmarksEntities[i].id)

            const landmark = {
                id: landmarksEntities[i].id,
                name: landmarksEntities[i].name,
                image: landmarksEntities[i].image,
                rating: rating,
                isRated: isRated
            }
            landmarks.push(landmark)
        }
        console.log(landmarks)
        return landmarks;
    }
}