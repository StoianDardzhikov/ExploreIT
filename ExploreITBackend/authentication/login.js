module.exports = function makeLoginUser({ User, compare, makeUser }) {
  return async function loginUser(userInfo) {
    const userEntity = await User.findOne({
      where: { username: userInfo.username },
    });

    if (!userEntity) return false;

    const user = makeUser(userInfo);

    const result = await compare(user.getPassword(), userEntity.passwordHash);
    console.log(result);
    return result;
  };
};
