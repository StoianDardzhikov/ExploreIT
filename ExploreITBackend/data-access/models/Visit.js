module.exports = (sequelize, DataTypes) => {
  const Visit = sequelize.define("Visit", {
    visitDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return Visit;
};
