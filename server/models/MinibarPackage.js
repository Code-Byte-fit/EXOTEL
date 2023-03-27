module.exports=(sequelize,Datatypes)=>{
    const MinibarPackage=sequelize.define("MinibarPackage",{
        PackageName:{
            type:Datatypes.STRING,
            primaryKey:true,
        },
        PackagePrice:{
            type:Datatypes.DOUBLE,
            allowNull:false,
        },
       
    },
        {
            timestamps: false
        });

        MinibarPackage.associate = (models) => {
            MinibarPackage.hasMany(models.MiniBar, { foreignKey: 'PackageName' });
            MinibarPackage.belongsToMany(models.MiniBarItems,{through:'MItemPackage'});
          };
      
    return MinibarPackage;
}