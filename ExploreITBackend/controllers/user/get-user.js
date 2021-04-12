module.exports = function makeGetUser(getUser) {
  return async function GetUser(httpRequest) {
    try {
      const usernameParam = httpRequest.query.username;

      const { username, visitsCount } = await getUser(usernameParam);

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: { username, visitsCount },
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
