module.exports = (sequelize, Datatypes) => {
  const RepairRequest = sequelize.define("RepairRequest", {
    RepairRequestNo: {
      type: Datatypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    SentStatus: {
      type: Datatypes.ENUM("Sent", "Waiting"),
      allowNull: false,
      defaultValue: "Waiting",
    },
    DoneStatus: {
      type: Datatypes.ENUM("Done", "Waiting"),
      allowNull: false,
      defaultValue: "Waiting",
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
