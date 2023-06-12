module.exports = (sequelize, Datatypes) => {
  const HotelStatus = sequelize.define(
    "HotelStatus",
    {
      StatusNo: {
        type: Datatypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      startDate: {
        type: Datatypes.DATEONLY,
        allowNull: false,
      },

      endDate: {
        type: Datatypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return HotelStatus;
};
