//Nethmi
module.exports = (sequelize, Datatypes) => {
  const RoomItems = sequelize.define("RoomItems", {
    RoomItemNo: {
      type: Datatypes.STRING,
      allowNull: false,
      primaryKey: true,
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
    RoomItems.belongsToMany(models.RoomTypes, { through: "ItemRoomTypes" });
  };

  return RoomItems;
};
