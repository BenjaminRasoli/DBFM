
module.exports = (sequelize, DataTypes) => {
  const Bookings = sequelize.define("Bookings", {
    name: {
      type: DataTypes.STRING,
    },
    MovieName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    MovieImage: {
      type: DataTypes.STRING,
    }
  });
  return Bookings;
};
