module.exports = (sequelize, DataTypes) => {
  const Reservations = sequelize.define('Reservations', {
    id: {
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
      type: DataTypes.STRING,
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
  };

  return Reservations;
};