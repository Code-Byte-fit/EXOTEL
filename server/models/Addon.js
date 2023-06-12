module.exports = (sequelize, DataTypes) => {
  const Addons = sequelize.define("Addons", {
    addonID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    AddOn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Charge: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AddInfo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    timestamps: false
  });

  Addons.associate = (models) => {
    Addons.belongsToMany(models.Reservations, { through: 'ReservationAddOn' });
  };

  return Addons;
}