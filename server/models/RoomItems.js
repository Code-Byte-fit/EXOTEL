//Nethmi
module.exports = (sequelize, Datatypes) => {
  const RoomItems = sequelize.define("RoomItems", {
    RoomItemNo: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    RoomItemName: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  // RoomItems.associate = (models) => {
  //   RoomItems.belongsToMany(models.RepairReq, {
  //     through: "RepairRequestItems",
  //   });
  // };

  return RoomItems;
};
