module.exports = (sequelize, DataTypes) => {
    const RemovedAddOn = sequelize.define("RemovedAddOn", {
      addonID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      AddOn: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Charge: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      AddInfo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      timestamps: false
    });
  
    RemovedAddOn.associate = (models) => {
        RemovedAddOn.belongsToMany(models.Reservations, { through: 'ReservationAddOn' });
    };
  
    return RemovedAddOn;
  }
  