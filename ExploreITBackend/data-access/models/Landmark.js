module.exports = (sequelize, DataTypes) => {
  const Landmark = sequelize.define(
    "Landmark",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      description: {
        type: DataTypes.STRING(2000),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      image: {
        type: DataTypes.BLOB("long"),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      lat: {
        type: DataTypes.DECIMAL(15, 13),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      lon: {
        type: DataTypes.DECIMAL(16, 13),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      visits: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );

  return Landmark;
};
