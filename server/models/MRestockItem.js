module.exports = (sequelize, DataTypes) => {
    const MRestockItem = sequelize.define("MRestockItem", {});
  
    MRestockItem.associate = (models) => {
      const MiniBarItems = models.MiniBarItems;
      const MiniBarRestock = models.MiniBarRestock;
      MiniBarItems.belongsToMany(MiniBarRestock, { through: MRestockItem });
      MiniBarRestock.belongsToMany(MiniBarItems, { through: MRestockItem });
    };
    return MRestockItem;
  };
  