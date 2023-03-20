module.exports = (sequelize, DataTypes) => {
    const CancelledReservations = sequelize.define('CancelledReservations', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
    }, {
      timestamps: false
    });
  
    CancelledReservations.associate = (models) => {
      CancelledReservations.belongsTo(models.Reservations, { foreignKey: 'reservationId' });
    };
  
    return CancelledReservations;
  };
  