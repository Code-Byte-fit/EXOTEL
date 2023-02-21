module.exports = (sequelize, DataTypes) => {
    const ReservationRoom = sequelize.define('ReservationRoom', {
      // no attributes are defined
    },{
      timestamps: false
    });
  
    ReservationRoom.associate = (models) => {
      models.Reservations.belongsToMany(models.Rooms, { through: ReservationRoom });
      models.Rooms.belongsToMany(models.Reservations, { through: ReservationRoom });
    };
  
    return ReservationRoom;
  };