module.exports = function makeAddVisit(Visit, makeVisit) {
  return async function addVisit(userId, landmarkId, visitDate) {
    const visitEntity = await Visit.findOne({
      where: {
        UserId: userId,
        LandmarkId: landmarkId,
      },
    });

    console.log(visitEntity + "-- VISIT");
    if (visitEntity) {
      throw new Error("Потребителят вече е посещавал тази забележителност");
    }

    const visitInfo = {
      userId: userId,
      landmarkId: landmarkId,
      visitDate: visitDate,
    };

    const visit = makeVisit(visitInfo);

    await Visit.create({
      UserId: visit.getUserId(),
      LandmarkId: visit.getLandmarkId(),
      visitDate: visit.getVisitDate(),
    });
    console.log(visit);
    return visit;
  };
};
