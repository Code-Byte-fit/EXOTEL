//Nethmi
module.exports = (sequelize, Datatypes) => {
  const RoomItems = sequelize.define("RoomItems", {
    RoomItemNo: {
      type: Datatypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    RoomItemName: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    Cost: {
      type: Datatypes.FLOAT,
      allowNull: false,
    },
  });

  RoomItems.associate = (models) => {
    RoomItems.hasMany(models.RepairRequest, { foreignKey: "RoomItemNo" });
  };

  return RoomItems;
};
