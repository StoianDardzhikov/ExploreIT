module.exports = function makeRegisterUser({ User, hash, makeUser }) {
  return async function registerUser(userInfo) {
    const userEntity = await User.findOne({
      where: {
        username: userInfo.username,
      },
    });

    if (userEntity) throw new Error("Вече съществува потребител с това име");

    const user = makeUser(userInfo);
    const passHash = await hash(user.getPassword(), 10);

    await User.create({
      username: user.getUsername(),
      passwordHash: passHash,
      visitsCount: 0,
    });

    return true;
  };
};
