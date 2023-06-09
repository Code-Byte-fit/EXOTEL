module.exports = (sequelize, Datatypes) => {
  const RepairRequest = sequelize.define("RepairRequest", {
    RepairRequestNo: {
      type: Datatypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    Notes: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  RepairRequest.associate = (models) => {
    RepairRequest.belongsTo(models.Rooms, { foreignKey: "RoomNo" });
    RepairRequest.belongsTo(models.RoomItems, { foreignKey: "RoomItemNo" });
  };

  return RepairRequest;
};
