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

  return RepairRequestItems;
};
