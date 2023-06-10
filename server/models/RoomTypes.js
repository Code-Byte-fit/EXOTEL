module.exports = (sequelize, DataTypes) => {
  const RoomTypes = sequelize.define(
    "RoomTypes",
    {
      RoomTypeID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      TypeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      View: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      NoOfBeds: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sqFeet: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      StandardCharge: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      AddInfo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      uniqueKeys: {
        uniqueRoomTypeAndViews: {
          fields: ["TypeName", "View"],
        },
      },
    }
  );

  RoomTypes.associate = (models) => {
    RoomTypes.hasMany(models.Rooms, { foreignKey: "RoomTypeID" });
  };

  return RoomTypes;
};
