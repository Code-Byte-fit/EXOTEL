module.exports = (sequelize, Datatypes) => {
  const RoomTypes = sequelize.define(
    "RoomTypes",
    {
      TypeName: {
        type: Datatypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      NoOfBeds: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      sqFeet: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      StandardCharge: {
        type: Datatypes.FLOAT,
        allowNull: false,
      },
      AddInfo: {
        type: Datatypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

  RoomTypes.associate = (models) => {
    RoomTypes.hasMany(models.Rooms, { foreignKey: "TypeName" });
    RoomTypes.belongsToMany(models.RoomItems, { through: "ItemRoomTypes" });
  };

  return RoomTypes;
};
