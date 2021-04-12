module.exports = function makeGetUserByName(User) {
  return async function getUserByName(username) {
    const userEntity = await User.findOne({
      where: {
        username: username,
      },
    });
    console.log(userEntity.id);
    if (!userEntity) throw new Error("Потребителя не е намерен");
    else return userEntity;
  };
};
