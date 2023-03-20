module.exports=(sequelize,Datatypes)=>{
    const MiniBarItems=sequelize.define("MiniBarItems",{
        ItemId:{
            type:Datatypes.STRING,
            primaryKey: true,
        },
        ItemName:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        Volume:{
            type:Datatypes.FLOAT,
            allowNull:false,
        },
        ItemPrice:{
            type:Datatypes.FLOAT,
            allowNull:false,
        }
    },
    {
        timestamps: false
        
    });
    MiniBarItems.associate = (models) =>{
        MiniBarItems.belongsToMany(models.MinibarPackage,{through:'MItemPackage'});
        MiniBarItems.belongsToMany(models.MiniBarRestock,{through:'MRestockItem'});
        
    }
    return MiniBarItems;
}