module.exports = function buildMakeLandmark() {
  return function makeLandmark({
    name,
    description,
    //image,
    lat,
    lon,
    visits = 0,
  } = {}) {
    if (!name) {
      throw new Error("Забележителността трябва да има име");
    }

    if (name.length < 3) {
      throw new Error(
        "Името на забележителността не може да е по-малко от 3 символа"
      );
    }

    if (name.length > 255) {
      throw new Error(
        "Името на забележителността не може да е по-голямо от 255 символа"
      );
    }

    if (!description) {
      throw new Error("Забележителността трябва да име описание");
    }

    if (description.length < 10) {
      throw new Error(
        "Описанието на забележителността не може да е по-малко от 10 символа"
      );
    }

    if (description.length > 2000) {
      throw new Error(
        "Описанието на забележителността не може да е по-голямо от 2000 символа"
      );
    }

    if (!lat) {
      throw new Error("Забележителността трябва да има географска ширина");
    }

    if (lat < -90) {
      throw new Error(
        "Географската ширина на забележителността не може да е по-малка от -90 градуса"
      );
    }

    if (lat > 90) {
      throw new Error(
        "Географската ширина на забележителността не може да е по-голяма от 90 градуса"
      );
    }

    if (!lon) {
      throw new Error("Забележителността трябва да има географска дължина");
    }

    if (lon < -180) {
      throw new Error(
        "Географската дължина не може да е по-малка от -180 градуса"
      );
    }

    if (lon > 180) {
      throw new Error(
        "Географската дължина не може да е по-голяма от 180 градуса"
      );
    }

    return Object.freeze({
      getName: () => name,
      getDescription: () => description,
      //getImage: () => image,
      getVisits: () => visits,
      getCoordinates: () => {
        return { lat, lon };
      },
      incrementVisits: () => (visits += 1),
    });
  };
};
