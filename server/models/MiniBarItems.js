module.exports=(sequelize,Datatypes)=>{
    const MiniBarItems=sequelize.define("MiniBarItems",{
        ItemName:{
            type:Datatypes.STRING,
            primaryKey: true,
        },
        ItemPrice:{
            type:Datatypes.FLOAT,
            allowNull:false,
        },
        addInfo:{
            type:Datatypes.STRING,
            allowNull:false,
        },
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