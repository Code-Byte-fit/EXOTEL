module.exports=(sequelize,Datatypes)=>{
    const MiniBarRestock=sequelize.define("MiniBarRestock",{
      RestockId: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },  
      ResNumber:{
            type:Datatypes.INTEGER,
            // allowNull:false,
        },
        LastRestocked:{
            type:Datatypes.DATEONLY,
            allowNull:false,
        },
        ItemName:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        Quantity:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        Amount:{
            type:Datatypes.FLOAT,
            // allowNull:false,
        }
    },
    {
        timestamps: false
        
    });
    MiniBarRestock.associate = (models) =>{
        MiniBarRestock.belongsTo(models.TaskAllocations, { foreignKey: 'taskId' });
        MiniBarRestock.belongsToMany(models.MiniBarItems,{through:'MRestockItem'});

    }

    return MiniBarRestock;
}