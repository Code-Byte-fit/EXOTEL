module.exports = (sequelize, DataTypes) => {
  const Reservations = sequelize.define(
    "Reservations",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      CheckIn: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      CheckOut: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      CheckInTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CheckOutTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Source: {
        type: DataTypes.ENUM("Phone", "Walk-In"),
        allowNull: false,
      },
      ReservationStatus: {
        type: DataTypes.ENUM(
          "active",
          "cancelled",
          "expired",
          "Checked-In",
          "Checked-Out"
        ),
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Reservations.associate = (models) => {
    Reservations.belongsTo(models.Guests, { foreignKey: "guestId" });
    Reservations.belongsToMany(models.Rooms, { through: "ReservationRoom" });
    Reservations.belongsToMany(models.Addons, { through: "ReservationAddOn" });
    Reservations.belongsTo(models.Promotion, { foreignKey: "PromoCode" });
    Reservations.hasMany(models.TaskAllocations, { foreignKey: "Id" });
    // Reservations.belongsTo(models.Bill, { foreignKey: "billNumber" });
  };

  return Reservations;
};
