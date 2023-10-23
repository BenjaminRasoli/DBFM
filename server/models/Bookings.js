// Defining schema

module.exports = (sequelize, DataTypes) => {
  const Bookings = sequelize.define("Bookings", {
    name: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    MovieName: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    MovieImage: {
      type: DataTypes.STRING,
    }
  });
  return Bookings;
};
