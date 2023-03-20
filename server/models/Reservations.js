module.exports = (sequelize, DataTypes) => {
  const Reservations = sequelize.define('Reservations', {
    resId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    CheckIn: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    CheckOut: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Source: {
      type: DataTypes.ENUM('Phone', 'Walk-In'),
      allowNull: false
    },
    ReservationStatus: {
      type: DataTypes.ENUM('active', 'cancelled', 'expired'),
      allowNull: false
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    timestamps: false
  });

  Reservations.associate = (models) => {
    Reservations.belongsTo(models.Guests, { foreignKey: 'guestId' });
    Reservations.belongsToMany(models.Rooms, { through: 'ReservationRoom' });
    Reservations.belongsToMany(models.Addons, { through: 'ReservationAddOn' });
    Reservations.belongsTo(models.Promotion, { foreignKey: 'PromoCode' });
    Reservations.hasMany(models.TaskAllocations, { foreignKey: 'resId' });
    Reservations.belongsTo(models.Bill, { foreignKey: 'billNumber' });


  };

  return Reservations;
};