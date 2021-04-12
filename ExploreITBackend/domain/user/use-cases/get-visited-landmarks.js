const evalMonth = (month) => {
  switch (month) {
    case "Jan":
      return "януари";
    case "Feb":
      return "февруари";
    case "Mar":
      return "март";
    case "Apr":
      return "април";
    case "May":
      return "май";
    case "Jun":
      return "юни";
    case "Jul":
      return "юли";
    case "Aug":
      return "август";
    case "Sep":
      return "септември";
    case "Oct":
      return "октомври";
    case "Nov":
      return "ноември";
    case "Dec":
      return "декември";
  }
};

module.exports = function makeGetVisitedLandmarks(Visit) {
  return async function getVisitedLandmarks(userId) {
    const visitsEntities = await Visit.findAll({
      where: { UserId: userId },
    });

    const visits = [];

    for (i = 0; i < visitsEntities.length; i++) {
      const landmark = await visitsEntities[i].getLandmark();
      const dateStr = String(visitsEntities[i].visitDate);
      const dateStrs = dateStr.split(" ");
      const date = {
        year: dateStrs[3],
        month: evalMonth(dateStrs[1]),
        day: dateStrs[2],
      };
      visits.push({
        landmarkName: landmark.name,
        visitDate: date,
      });
    }

    return visits;
  };
};
