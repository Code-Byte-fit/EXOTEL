module.exports = (sequelize, DataTypes) => {
  const RepairRequestItems = sequelize.define(
    "RepairRequestItems",
    {},
    {
      timestamps: false,
    }
  );

  RepairRequestItems.associate = (models) => {
    models.RoomItems.belongsToMany(models.RepairReq, {
      through: RepairRequestItems,
    });
    models.RepairReq.belongsToMany(models.RoomItems, {
      through: RepairRequestItems,
    });
  };

  return RepairRequestItems;
};
