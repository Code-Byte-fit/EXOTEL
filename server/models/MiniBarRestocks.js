const MiniBarItems = require('./MiniBarItems');

module.exports=(sequelize,Datatypes)=>{
    const MiniBarRestock=sequelize.define("MiniBarRestock",{
      RestockId: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
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
        timestamps: false,
        hooks: {
            beforeCreate: async (restock, options) => {
                const { ItemName, Quantity } = restock;
                const item = await sequelize.models.MiniBarItems.findOne({ where: { ItemName } }); // Find the item by name
                restock.Amount = item.ItemPrice * Quantity; // Multiply the item price and quantity
              },
              
        },
        
    });
    MiniBarRestock.associate = (models) =>{
        MiniBarRestock.belongsTo(models.TaskAllocations, { foreignKey: 'taskId' });
        MiniBarRestock.belongsToMany(models.MiniBarItems,{through:'MRestockItem'});
        MiniBarRestock.belongsTo(models.Reservations, { foreignKey: 'ReservationId' });

    }

    return MiniBarRestock;
}