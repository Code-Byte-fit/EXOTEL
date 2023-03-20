//Nethmi
module.exports = (sequelize, Datatypes) => {
  const RepairRequestItems = sequelize.define("RepairRequestItems", {
    RepairNo: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    RoomItemNo: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  RepairRequestItems.associate = (models) => {
    models.RepairReq.belongsToMany(models.RoomItem, {
      through: RepairRequestItems,
    });
    models.RoomItem.belongsToMany(models.RepairReq, {
      through: RepairRequestItems,
    });
  };

  return RepairRequestItems;
};
