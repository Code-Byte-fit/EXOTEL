//Nethmi
module.exports = (sequelize, Datatypes) => {
  const ItemRoomTypes = sequelize.define(
    "ItemRoomTypes",
    {},
    {
      timestamps: false,
    }
  );

  ItemRoomTypes.associate = (models) => {
    models.RoomItems.belongsToMany(models.RoomTypes, {
      through: ItemRoomTypes,
    });
    models.RoomTypes.belongsToMany(models.RoomItems, {
      through: ItemRoomTypes,
    });
  };

  return ItemRoomTypes;
};
