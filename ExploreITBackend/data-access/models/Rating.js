module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define("Rating", {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return Rating;
};
