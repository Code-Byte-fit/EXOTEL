module.exports = (sequelize, DataTypes) => {
    const ReservationAddOn = sequelize.define('ReservationAddOn', {
    },{
      timestamps: false
    });
  
    ReservationAddOn.associate = (models) => {
      models.Reservations.belongsToMany(models.Addons, { through: ReservationAddOn });
      models.Addons.belongsToMany(models.Reservations, { through: ReservationAddOn });
    };
  
    return ReservationAddOn;
  };