require("dotenv").config();

module.exports = function makeRegisterUser(registerUser, signToken) {
  return async function RegisterUser(httpRequest) {
    try {
      const { ...userInfo } = httpRequest.body;
      const result = await registerUser(userInfo);
      let accessToken;
      if (result) {
        const user = { username: userInfo.username };
        accessToken = signToken(user, process.env.ACCESS_TOKEN_SECRET);
      }
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
        statusCode: err.message == "Вече съществува потребител с това име" ? 450 : 400,
        body: {
          error: err.message,
        },
      };
    }
  };
};
