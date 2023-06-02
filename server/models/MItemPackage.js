module.exports = (sequelize, DataTypes) => {
    const MItemPackage = sequelize.define("MItemPackage", {},{
      timestamps: false
    });
  
    MItemPackage.associate = (models) => {
      const MinibarPackage = models.MinibarPackage;
      const MiniBarItems = models.MiniBarItems;
      MinibarPackage.belongsToMany(MiniBarItems, { through: MItemPackage });
      MiniBarItems.belongsToMany(MinibarPackage, { through: MItemPackage });
    };
    return MItemPackage;
  };
  