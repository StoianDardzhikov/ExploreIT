module.exports = function buildMakeUser() {
  return function makeUser({ username, password } = {}) {
    if (!username) {
      throw new Error("Потребителят трябва да има потребителско име");
    }
    // TODO: Fix username validation
    // if (!usernameIsValid(username)) {
    //   throw new Error("Потребителското име съдържа невалидни символи");
    // }

    if (username.length < 3) {
      throw new Error(
        "Потребителското име не трябва да е по-малко от 3 символа"
      );
    }

    if (username.length > 255) {
      throw new Error(
        "Потребителското име не трябва да е по-голямо от 255 символа"
      );
    }

    if (!password) {
      throw new Error("Потребителят трябва да име парола");
    }

    return Object.freeze({
      getUsername: () => username,
      getPassword: () => password,
    });

    function usernameIsValid(username) {
      var valid = new RegExp(
        "^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
      );

      if (valid.test(username)) {
        return true;
      } else return false;
    }
  };
};
