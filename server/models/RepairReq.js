//Nethmi
module.exports = (sequelize, Datatypes) => {
  const RepairReq = sequelize.define("RepairReq", {
    RepairNo: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    RoomNo: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    RepairDate: {
      type: Datatypes.DATEONLY,
      allowNull: false,
    },
    ApprovalStatus: {
      type: Datatypes.ENUM("Approved, Not-Approved"),
    },
    Note: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  RepairReq.associate = (models) => {
    RepairReq.belongsTo(models.Rooms, { foreignKey: "RoomNo" });
    RepairReq.belongsToMany(models.RoomItems, {
      through: "RepairRequestItems",
      foreignKey: "RepairNo",
    });
  };

  return RepairReq;
};
