require("dotenv").config();

module.exports = function makeLoginUser(loginUser, signToken) {
  return async function LoginUser(httpRequest) {
    try {
      const { ...userInfo } = httpRequest.body;
      const result = await loginUser(userInfo);
      let accessToken;
      if (result) {
        const user = { username: userInfo.username };
        accessToken = signToken(user, process.env.ACCESS_TOKEN_SECRET);
      } else throw new Error("Невалидни данни");
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: { accessToken },
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
